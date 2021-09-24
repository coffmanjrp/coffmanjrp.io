/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'www.markdownguide.org',
      'upload.wikimedia.org',
    ],
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
