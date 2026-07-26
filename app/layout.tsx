import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XY Combinator — Video meetings, reimagined.",
  description:
    "XY Combinator is the next-generation video conferencing platform. Fast, secure, and beautifully designed for the way modern teams actually work.",
  keywords: ["video conferencing", "team meetings", "video calls", "collaboration", "XY Combinator"],
  authors: [{ name: "XY Combinator" }],
  openGraph: {
    title: "XY Combinator — Video meetings, reimagined.",
    description: "Fast, secure, beautiful video conferencing for modern teams.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "XY Combinator",
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
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
