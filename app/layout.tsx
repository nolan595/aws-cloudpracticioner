import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS CLF-C02 Study App",
  description: "Practice questions, mock exams, and service reference for the AWS Certified Cloud Practitioner exam",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CLF-C02",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
