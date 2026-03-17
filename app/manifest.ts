import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AWS CLF-C02 Study App",
    short_name: "CLF-C02",
    description: "Practice questions, mock exams, and service reference for the AWS Certified Cloud Practitioner exam",
    start_url: "/",
    display: "standalone",   // hides the browser chrome — feels like a native app
    background_color: "#09090e",
    theme_color: "#4f46e5",  // indigo — matches the UI accent colour
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["education", "productivity"],
  };
}
