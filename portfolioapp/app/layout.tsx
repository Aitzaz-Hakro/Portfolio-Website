import type { Metadata } from "next";
import { Syne, Rubik, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer & Digital Architect",
  description:
    "Crafting exceptional digital experiences through innovative design and cutting-edge technology. Full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "full-stack developer",
    "web developer",
    "react developer",
    "next.js",
    "portfolio",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    title: "Portfolio | Full-Stack Developer & Digital Architect",
    description:
      "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${rubik.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
