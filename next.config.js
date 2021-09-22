/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: { domains: ['www.markdownguide.org', 'upload.wikimedia.org'] },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
