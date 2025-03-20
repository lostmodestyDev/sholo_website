/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.resolve.modules.push('node_modules');
    return config;
  },
};

export default nextConfig;
