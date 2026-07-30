import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XyncRoom — Video meetings, reimagined.",
  description:
    "XyncRoom is the next-generation video conferencing platform. Fast, secure, and beautifully designed for the way modern teams actually work.",
  keywords: ["video conferencing", "team meetings", "video calls", "collaboration", "XyncRoom"],
  authors: [{ name: "XyncRoom" }],
  openGraph: {
    title: "XyncRoom — Video meetings, reimagined.",
    description: "Fast, secure, beautiful video conferencing for modern teams.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "XyncRoom",
    description: "Video meetings, reimagined.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
