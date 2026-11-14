import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maheen Fatima — Personal Portfolio",
  description: "Official portfolio of Maheen Fatima showcasing academic background, technical skills, achievements, certifications, and featured projects.",
  keywords: ["Maheen Fatima", "Portfolio", "Software Engineering", "Full-Stack Developer", "Computer Science", "Projects", "Achievements"],
  authors: [{ name: "Maheen Fatima" }],
  openGraph: {
    title: "Maheen Fatima — Personal Portfolio",
    description: "Official personal portfolio of Maheen Fatima.",
    type: "website",
    locale: "en_US",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-graphite text-cloud font-sans antialiased min-h-screen selection:bg-sunshine selection:text-graphite">
        {children}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
