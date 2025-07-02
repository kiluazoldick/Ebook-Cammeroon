// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

module.exports = nextConfig;
