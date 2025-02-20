/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "svm-backend-iy0e.onrender.com",
        pathname: "/uploads/",
      },
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "https://svm-backend-iy0e.onrender.com/uploads/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
