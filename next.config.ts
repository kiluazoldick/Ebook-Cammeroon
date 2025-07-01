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
    ],
  },
};

module.exports = nextConfig;
