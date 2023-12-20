/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/intel",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        port: "",
        //pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
