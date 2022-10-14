/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const path = require("path");

module.exports = nextConfig;

module.exports = {
  images: {
    domains: [
      "api.ofolio.ru",
      "backend.1026361-ca72388.tmweb.ru",
      "joeschmoe.io",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
