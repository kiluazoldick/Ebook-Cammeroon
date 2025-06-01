import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Feature/Features";
import HowItWorks from "@/components/HowItWork/HowItWorks";
import Pricing from "@/components/Pricing/Pricing";
import Testimonials from "@/components/Testimonials/Testimonials";
import Cta from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>eBook Cameroun - Lis comme tu stream</title>
        <meta
          name="description"
          content="Découvre une nouvelle façon de lire tes livres préférés en streaming, comme sur Spotify mais pour les livres !"
        />

        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content="https://ebook-cameroun.vercel.app/marketing"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="eBook Cameroun - Lis comme tu stream"
        />
        <meta
          property="og:description"
          content="Découvre une nouvelle façon de lire tes livres préférés en streaming, comme sur Spotify mais pour les livres !"
        />
        <meta
          property="og:image"
          content="https://example.com/ebook-cameroun-cover.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ebook-cameroun.vercel.app" />
        <meta
          property="twitter:url"
          content="https://ebook-cameroun.vercel.app/marketing"
        />
        <meta
          name="twitter:title"
          content="eBook Cameroun - Lis comme tu stream"
        />
        <meta
          name="twitter:description"
          content="Lis tes livres préférés où que tu sois, en streaming depuis ton mobile ou ton ordi. Lecture continue garantie."
        />
        <meta
          name="twitter:image"
          content="https://example.com/ebook-cameroun-cover.png"
        />
      </Head>

      <div className="font-sans bg-gray-50 text-gray-800">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <Cta />
        </main>
        <Footer />
      </div>
    </>
  );
}
