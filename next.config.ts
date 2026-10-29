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
  async redirects() {
    return [
      // www to non-www canonical consolidation
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.nutritionalreviews.org',
          },
        ],
        destination: 'https://nutritionalreviews.org/:path*',
        permanent: true,
      },
      // Spanish legal draft addresses permanently redirecting to primary /legal/ pages (no duplicate content)
      {
        source: '/politica-de-privacidad',
        destination: '/legal/privacy',
        permanent: true,
      },
      {
        source: '/terminos-de-uso',
        destination: '/legal/terms',
        permanent: true,
      },
      {
        source: '/descargo-de-responsabilidad',
        destination: '/legal/disclaimer',
        permanent: true,
      },
      {
        source: '/divulgacion-de-afiliados',
        destination: '/legal/affiliate',
        permanent: true,
      },
      {
        source: '/politica-de-cookies',
        destination: '/legal/cookies',
        permanent: true,
      },
      // Spanish navigation addresses permanently redirecting to primary routes
      {
        source: '/quienes-somos',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/sobre-nosotros',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contacto',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
