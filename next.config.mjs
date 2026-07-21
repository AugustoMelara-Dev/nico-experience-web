/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/cabanas", destination: "/alojamientos", permanent: true },
      { source: "/cabanas/casa-vip", destination: "/alojamientos/casa-palac-frente-a-playa", permanent: true },
      { source: "/nosotros", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
