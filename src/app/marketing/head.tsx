export default function Head() {
  return (
    <>
      <title>CorrigeTesCours - La meilleure façon de réviser</title>
      <meta
        name="description"
        content="Génère des résumés et quiz à partir de tes cours automatiquement."
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="CorrigeTesCours - La meilleure façon de réviser"
      />
      <meta
        property="og:description"
        content="Génère des résumés et quiz à partir de tes cours automatiquement."
      />
      <meta
        property="og:image"
        content="https://corrige-tes-cours.vercel.app/preview.jpg"
      />
      <meta property="og:url" content="https://corrige-tes-cours.vercel.app" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="CorrigeTesCours - La meilleure façon de réviser"
      />
      <meta
        name="twitter:description"
        content="Génère des résumés et quiz à partir de tes cours automatiquement."
      />
      <meta
        name="twitter:image"
        content="https://corrige-tes-cours.vercel.app/preview.jpg"
      />
    </>
  );
}
