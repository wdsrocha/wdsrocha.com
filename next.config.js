const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/til/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["assets.tina.io"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
