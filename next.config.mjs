/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return [
      { source: "/cabanas", destination: "/alojamientos", permanent: true },
      { source: "/alojamientos/casa-palac-frente-a-playa", destination: "/alojamientos/casa-palac", permanent: true },
      { source: "/cabanas/casa-vip", destination: "/alojamientos/casa-palac", permanent: true },
      { source: "/nosotros", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
