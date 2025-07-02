// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Désactive ESLint pendant le build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore les erreurs TypeScript pendant le build
  },
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.gstatic.com",
      "pin.it",
      "drive.google.com",
      "edbpraqttgglpqggkzfr.supabase.co",
      "m.media-amazon.com",
      "upload.wikimedia.org",
      "covers.openlibrary.org",
      "gallica.bnf.fr",
      "lesecrituresdafrique.com",
      "edbpraqttgglpqggkzfr.supabase.co",
      "edbpraqttgglpqggkzfr.supabase.co",
      "edbpraqttgglpqggkzfr.supabase.co",
    ],
  },
};

module.exports = nextConfig;
