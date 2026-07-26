import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XY Combinator — Connect. Collaborate. Conquer.",
  description:
    "XY Combinator is the next-generation video conferencing platform. Premium, minimal, lightning-fast. Built for teams that move at the speed of thought.",
  keywords: ["video conferencing", "meetings", "collaboration", "XY Combinator", "zoom alternative"],
  openGraph: {
    title: "XY Combinator",
    description: "The premium video conferencing platform for modern teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise">
        {children}
      </body>
    </html>
  );
}
