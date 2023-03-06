const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ['assets.tina.io'],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
