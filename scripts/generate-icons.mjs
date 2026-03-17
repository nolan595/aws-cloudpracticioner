/**
 * Generates PWA icons (192x192 and 512x512 PNG) using only Node.js built-ins.
 * No external dependencies required.
 *
 * Design: dark navy background, indigo rounded square, white lightning bolt.
 */

import { createWriteStream, mkdirSync } from "fs";
import { createDeflate } from "zlib";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const SIZES = [192, 512];
const OUT_DIR = new URL("../public/icons", import.meta.url).pathname;

mkdirSync(OUT_DIR, { recursive: true });

// ── PNG encoding helpers ────────────────────────────────────────────────────

function crc32(buf) {
  let c = 0xffffffff;
  const table = buildCrcTable();
  for (const byte of buf) c = (c >>> 8) ^ table[(c ^ byte) & 0xff];
  return (c ^ 0xffffffff) >>> 0;
}

let _crcTable;
function buildCrcTable() {
  if (_crcTable) return _crcTable;
  _crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    _crcTable[i] = c;
  }
  return _crcTable;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBytes, data]);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, checksum]);
}

async function encodePng(width, height, pixels) {
  // pixels: Uint8Array of RGBA values, row by row
  // Build raw scanlines: each row prefixed with filter byte 0 (None)
  const scanlines = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4); // filter byte + RGBA
    row[0] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      row[1 + x * 4] = pixels[i];
      row[1 + x * 4 + 1] = pixels[i + 1];
      row[1 + x * 4 + 2] = pixels[i + 2];
      row[1 + x * 4 + 3] = pixels[i + 3];
    }
    scanlines.push(row);
  }
  const raw = Buffer.concat(scanlines);

  // Compress with zlib
  const compressed = await new Promise((resolve, reject) => {
    const chunks = [];
    const deflate = createDeflate({ level: 6 });
    deflate.on("data", (c) => chunks.push(c));
    deflate.on("end", () => resolve(Buffer.concat(chunks)));
    deflate.on("error", reject);
    deflate.write(raw);
    deflate.end();
  });

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // color type: RGBA
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), // PNG signature
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ── Icon renderer ────────────────────────────────────────────────────────────

function renderIcon(size) {
  const pixels = new Uint8Array(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const s = size / 512; // scale factor (icon is designed in 512x512 space)

  // Rounded rect corner radius (scaled from 96/512)
  const r = Math.round(96 * s);

  // Lightning bolt vertices in 512-space (Lucide Zap icon approximation)
  const boltPts = [
    [285, 70],
    [165, 265],
    [248, 265],
    [210, 440],
    [345, 245],
    [262, 245],
  ];
  const scaledBolt = boltPts.map(([x, y]) => [x * s, y * s]);

  // Check if point is inside rounded rectangle
  function inRoundedRect(x, y) {
    if (x < r && y < r) return (x - r) ** 2 + (y - r) ** 2 <= r * r;
    if (x > size - r && y < r) return (x - (size - r)) ** 2 + (y - r) ** 2 <= r * r;
    if (x < r && y > size - r) return (x - r) ** 2 + (y - (size - r)) ** 2 <= r * r;
    if (x > size - r && y > size - r) return (x - (size - r)) ** 2 + (y - (size - r)) ** 2 <= r * r;
    return x >= 0 && x < size && y >= 0 && y < size;
  }

  // Point-in-polygon for the bolt
  function inPolygon(px, py, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      const intersect =
        yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      if (!inRoundedRect(x, y)) {
        // Transparent outside rounded rect
        pixels[idx] = 0;
        pixels[idx + 1] = 0;
        pixels[idx + 2] = 0;
        pixels[idx + 3] = 0;
        continue;
      }

      // Background: dark navy #0f0f1a
      let rr = 15, gg = 15, bb = 26, aa = 255;

      // Subtle indigo gradient overlay in center
      const dx = (x - cx) / (size * 0.6);
      const dy = (y - cy) / (size * 0.6);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        const glow = Math.max(0, 1 - dist) * 0.15;
        rr = Math.round(rr + (99 - rr) * glow);
        gg = Math.round(gg + (102 - gg) * glow);
        bb = Math.round(bb + (241 - bb) * glow);
      }

      // Bolt: indigo-400 #818cf8
      if (inPolygon(x, y, scaledBolt)) {
        rr = 129; gg = 140; bb = 248;
      }

      pixels[idx] = rr;
      pixels[idx + 1] = gg;
      pixels[idx + 2] = bb;
      pixels[idx + 3] = aa;
    }
  }

  return pixels;
}

// ── Main ─────────────────────────────────────────────────────────────────────

for (const size of SIZES) {
  const pixels = renderIcon(size);
  const png = await encodePng(size, size, pixels);
  const path = `${OUT_DIR}/icon-${size}.png`;
  await new Promise((resolve, reject) => {
    const ws = createWriteStream(path);
    ws.on("finish", resolve);
    ws.on("error", reject);
    ws.write(png);
    ws.end();
  });
  console.log(`  ✓ Generated ${path} (${size}×${size}, ${png.length} bytes)`);
}
