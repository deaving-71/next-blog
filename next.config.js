/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/images/:imageName",
        destination: "/api/images/:imageName",
      },
    ];
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
