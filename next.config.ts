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
      // Spanish legal draft addresses permanently redirecting to primary /legal/ pages (HTTP 301)
      {
        source: '/politica-de-privacidad',
        destination: '/legal/privacy',
        statusCode: 301,
      },
      {
        source: '/terminos-de-uso',
        destination: '/legal/terms',
        statusCode: 301,
      },
      {
        source: '/descargo-de-responsabilidad',
        destination: '/legal/disclaimer',
        statusCode: 301,
      },
      {
        source: '/divulgacion-de-afiliados',
        destination: '/legal/affiliate',
        statusCode: 301,
      },
      {
        source: '/politica-de-cookies',
        destination: '/legal/cookies',
        statusCode: 301,
      },
      // Spanish navigation addresses permanently redirecting to primary routes (HTTP 301)
      {
        source: '/quienes-somos',
        destination: '/about',
        statusCode: 301,
      },
      {
        source: '/sobre-nosotros',
        destination: '/about',
        statusCode: 301,
      },
      {
        source: '/contacto',
        destination: '/contact',
        statusCode: 301,
      },
      {
        source: '/articulos',
        destination: '/article',
        statusCode: 301,
      },
      {
        source: '/articles',
        destination: '/article',
        statusCode: 301,
      },
      {
        source: '/autores',
        destination: '/author',
        statusCode: 301,
      },
      {
        source: '/authors',
        destination: '/author',
        statusCode: 301,
      },
      {
        source: '/productos',
        destination: '/products',
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
