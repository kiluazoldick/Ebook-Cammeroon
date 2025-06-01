import type { Metadata } from "next";
import { Providers } from "../providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "EbookCameroun",
  description:
    "Votre plateforme de streaming de livres camerounais. Découvrez, écoutez et lisez des milliers de livres audio et ebooks.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
