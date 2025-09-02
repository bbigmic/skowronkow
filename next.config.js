/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // experimental: {
  //   optimizeCss: true, // Wyłączone - powoduje błędy z critters w Next.js 14.2.32
  // },
  compress: true,
  poweredByHeader: false,
  output: 'standalone', // Dla Vercel
  trailingSlash: false,
}

module.exports = nextConfig 