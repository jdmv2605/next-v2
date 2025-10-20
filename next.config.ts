import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
  // Ya no necesitas la configuración experimental ni webpack complejo
};

export default nextConfig;