/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.si.com"],
    remotePatterns: [
      {
        // We should not be doing this in production. 
        // We're allowing all urls to use our next js image resizing
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "**"
      },
    ]
  }
}

module.exports = nextConfig
