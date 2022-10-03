/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const path = require("path");

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["backend.1026361-ca72388.tmweb.ru"],
    formats: ["image/webp"],
  },
};

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
