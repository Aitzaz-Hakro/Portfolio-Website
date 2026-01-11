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
    "Aitzaz Hassan is a passionate full-stack developer with expertise in React, Next.js, and modern web technologies. He builds clean, responsive, and user-friendly websites that turn ideas into exceptional digital experiences.",
  keywords: [
    "full-stack developer",
    "web developer",
    "aitzaz hassan hakro",
    "aitzaz hassan",
    "aitzaz hassan tech portfolio",
    "aitzaz hassan developer",
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
  alternates: {
    canonical: "https://www.aitzazhassan.tech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Portfolio | Aitzaz Hassan - Full-Stack Dev",
    description:
      "Aitzaz Hassan is a passionate full-stack developer building clean, responsive websites with React, Next.js, and modern web technologies.",
    
      type: "website",
    url: "https://www.aitzazhassan.tech",
    images: [
      {
        url: "https://www.aitzazhassan.tech/OGprofile.jpeg",
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
         <Script
          id="person-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aitzaz Hassan Hakro",
              "alternateName": [
                "Aitzaz Hakro",
                "Aitzaz Hassan",
                "Aitzaz"
              ],
              "url": "https://www.aitzazhassan.tech",
              "image": "https://www.aitzazhassan.tech/OGprofile.jpeg",
              "jobTitle": "Full Stack Developer",
              "sameAs": [
                "https://www.youtube.com/@aitzazhakro",
                "https://www.linkedin.com/in/aitzazhassan2005/",
                "https://github.com/Aitzaz-Hakro/",
                "https://x.com/aitzazhakro20",
                "https://www.instagram.com/aitzazhakro/",
                "https://www.facebook.com/aitzaz.hakro.2025/",
                
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${syne.variable} ${rubik.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
