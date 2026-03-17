import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // Cache all navigation requests so every page works offline
  cacheOnNavigation: true,
  // Reload tabs automatically when connectivity is restored
  reloadOnOnline: true,
  // Only inject the service worker in production builds
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {};

export default withSerwist(nextConfig);
