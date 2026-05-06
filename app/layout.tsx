import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a160f",
};

export const metadata: Metadata = {
  title: "Dr. Chuck Stead — Eco Historian",
  description:
    "Research, storytelling, and field archaeology at the convergence of African and Native American Indigenous heritage. Adjunct professor, Ramapo College of NJ. Available for lectures, field trips, curriculum collaboration, and international partnerships.",
  keywords: [
    "Chuck Stead",
    "Eco Historian",
    "Black Indians",
    "African Village on Native Land",
    "Traditional Ecological Knowledge",
    "Underground Railroad",
    "Ramapo College",
    "Living History",
    "Angola curriculum",
  ],
  openGraph: {
    title: "Dr. Chuck Stead — Eco Historian",
    description:
      "Forever weaving ourselves into the fabric of our traditions, our failures, our reemergence.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inconsolata:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
