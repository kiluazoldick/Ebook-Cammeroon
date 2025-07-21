import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/lib/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EbookCameroun",
  description:
    "Votre plateforme de streaming de livres camerounais. Découvrez, écoutez et lisez des milliers de livres audio et ebooks.",
  icons: {
    icon: "/logo-orange.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "EbookCameroun - La littérature camerounaise à portée de clic",
    description:
      "Streaming de livres et ebooks camerounais. Accès illimité à la culture littéraire du Cameroun.",
    url: "https://ebookcameroun.cm",
    siteName: "EbookCameroun",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EbookCameroun - La littérature camerounaise à portée de clic",
    description:
      "Découvrez notre plateforme de streaming de livres camerounais",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="fr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
