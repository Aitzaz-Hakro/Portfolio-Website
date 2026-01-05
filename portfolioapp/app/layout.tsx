import type { Metadata } from "next";
import { Syne, Rubik, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Portfolio | Aitzaz Hassan - Full-Stack Dev",
  description:
    "Crafting exceptional digital experiences through innovative design and cutting-edge technology. Full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "full-stack developer",
    "web developer",
    "aitzaz hassan hakro",
    "aitzaz hakro",
    "aitzaz portfolio",
    "web development",
    "react developer",
    "next.js",
    "portfolio",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Aitzaz Hassan" }],
  openGraph: {
    title: "Portfolio | Aitzaz Hassan - Full-Stack Dev",
    description:
      "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
    type: "website",
    url: "https://aitzaz-dev.vercel.app",
    images: [
      {
        url: "https://aitzaz-dev.vercel.app/profile.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Open Graph Image",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LP0Y7PGPBG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LP0Y7PGPBG');
          `}
        </Script>
      </head>
      <body
        className={`${syne.variable} ${rubik.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
