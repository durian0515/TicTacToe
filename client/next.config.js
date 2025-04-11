/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Add any environment variables that need to be exposed to the client
  env: {
    // You can add environment variables here if needed
  }
}

module.exports = nextConfig
