import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { CategoryProvider } from "@/context/CategoryContext";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import SessionProvider from "@/components/providers/SessionProvider";
import { OrganizationSchema, WebSiteSchema } from "@/components/SEOSchema";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "NutritionalReviews | Portal Líder en Salud, Bienestar y Nutrición",
  description:
    "Descubra en NutritionalReviews análisis independientes basados en evidencia científica, comparativas de suplementos y guías de salud y bienestar.",
  keywords: [
    "análisis de nutrición",
    "reseñas de suplementos",
    "guías de salud",
    "productos de bienestar",
    "comparativas de salud",
    "opiniones de nutrición",
    "centro de análisis verificados",
    "ofertas exclusivas",
  ],


  authors: [{ name: "NutritionalReviews", url: "https://nutritionalreviews.org" }],
  creator: "NutritionalReviews",
  publisher: "NutritionalReviews",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org"),
  alternates: {
    canonical: "https://nutritionalreviews.org",
  },
  openGraph: {
  type: "website",
  locale: "es_ES",
  url: "https://nutritionalreviews.org",
  siteName: "NutritionalReviews",
  title: "NutritionalReviews - Análisis de Salud, Bienestar y Suplementos",
  description:
    "Descubra en NutritionalReviews análisis independientes basados en evidencia científica, comparativas de suplementos y guías de salud y bienestar.",
  images: [
    {
      url: "https://nutritionalreviews.org/og-image.png",
      width: 1200,
      height: 630,
      alt: "NutritionalReviews - Análisis de Salud y Nutrición",
    },
  ],
},

 twitter: {
  card: "summary_large_image",
  title: "NutritionalReviews - Análisis de Salud, Bienestar y Suplementos",
  description:
    "Descubra en NutritionalReviews análisis independientes basados en evidencia científica, comparativas de suplementos y guías de salud y bienestar.",
  images: ["https://nutritionalreviews.org/og-image.png"],
},
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
},

  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  verification: {
    google: "G-M6XNQ8Z0QF",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#03045e" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${roboto.variable} antialiased bg-[#eef8fb] text-slate-800 min-h-screen flex flex-col`} suppressHydrationWarning>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <SessionProvider>
          <CategoryProvider>
            <ConditionalHeader />
            <div className="flex-1 w-full">
              {children}
            </div>
            <ConditionalFooter />
          </CategoryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
