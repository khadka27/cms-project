/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/politica-de-privacidad', destination: '/legal/privacy' },
      { source: '/terminos-de-uso', destination: '/legal/terms' },
      { source: '/descargo-de-responsabilidad', destination: '/legal/disclaimer' },
      { source: '/divulgacion-de-afiliados', destination: '/legal/affiliate' },
      { source: '/politica-de-cookies', destination: '/legal/cookies' },
    ];
  },
};

module.exports = nextConfig;
