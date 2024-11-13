/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, //disabled es lint

  },
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com", "images.pexel.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://dr-hiro-service-test-1505102764.us-east-1.elb.amazonaws.com/:path*', // Proxy to Dr. Hiro AWS
      },
    ];
  },
};

export default nextConfig;
