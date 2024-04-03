// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // compiler: {
  //   removeConsole: true,
  // },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60, // 1 day in seconds

    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "mypustak-6.s3.amazonaws.com",
      "mypustak-5.s3.ap-south-1.amazonaws.com",
      "d1f2zer3rm8sjv.cloudfront.net",
      "d239pyg5al708u.cloudfront.net",
      "d34a0mln2492j4.cloudfront.net",
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
// const withOptimizedImages = require("next-optimized-images");
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })

// module.exports = withBundleAnalyzer({
//   nextConfig,
//   env: {
//     NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
//   },
// })
module.exports = nextConfig;
// withOptimizedImages({}),
// withBundleAnalyzer(nextConfig);
