/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "eu.ui-avatars.com",
        pathname: "/api/**",
        port: "",
      },
    ],
  },
};
module.exports = nextConfig;
