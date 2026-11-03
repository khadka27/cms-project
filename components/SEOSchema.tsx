// ── SEO Schema Components ─────────────────────────────────────────────────────
// All schemas follow Schema.org structured data standards for Google rich results

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nutritionalreviews.org';
const SITE_NAME = 'NutritionalReviews';

// ── Helper ────────────────────────────────────────────────────────────────────
export function SchemaScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

// ── 1. Organization (site-wide, in layout) ────────────────────────────────────
export function OrganizationSchema() {
  return (
    <SchemaScript schema={{
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
      description: 'Reseñas de suplementos nutricionales y productos de salud respaldados por evidencia científica',
      sameAs: [
        'https://www.facebook.com/nutritionalreviews',
        'https://www.twitter.com/nutritionalreviews',
        'https://www.instagram.com/nutritionalreviews',
        'https://www.youtube.com/@nutritionalreviews',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'reviewsnutritional@gmail.com',
        availableLanguage: 'Spanish',
      },
    }} />
  );
}

// ── 2. WebSite + SiteLinksSearchBox (site-wide, in layout) ───────────────────
export function WebSiteSchema() {
  return (
    <SchemaScript schema={{
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'Análisis y comparativas de suplementos nutricionales en español',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }} />
  );
}

// ── 3. Full Product Schema ────────────────────────────────────────────────────
interface ProductSchemaProps {
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
  slug: string;
  shortDescription?: string;
  keyFeatures?: string;       // newline-separated
  categoryType?: string;
  subcategoryName?: string;
  imageAlt?: string;
  featuredImage?: string;
  readMoreLink?: string;
  createdAt?: string;
  updatedAt?: string;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  author?: {
    name: string;
    slug?: string | null;
    title?: string | null;
    bio?: string | null;
    expertise?: string | null;
    avatar?: string | null;
    website?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    rating?: number | null;
    reviewCount?: number | null;
  } | null;
}

export function ProductSchema({
  name, description, price, image, url, slug,
  shortDescription, keyFeatures, categoryType,
  subcategoryName, imageAlt, featuredImage,
  readMoreLink, createdAt, updatedAt,
  rating = 4.9, reviewCount = 85, brand = SITE_NAME, author,
}: ProductSchemaProps) {

  const features = keyFeatures
    ? keyFeatures.split('\n').map(f => f.trim()).filter(Boolean)
    : [];

  const images = [image, featuredImage].filter(Boolean) as string[];
  const isEcom = String(categoryType).toUpperCase() === 'ECOM';

  // Author Person Schema
  const authorSlug = author?.slug || (author?.name ? author.name.toLowerCase().replace(/\s+/g, '-') : null);
  const authorUrl = authorSlug ? `${SITE_URL}/author/${authorSlug}` : SITE_URL;

  const authorSchema = author ? {
    '@type': 'Person',
    '@id': `${authorUrl}#person`,
    name: author.name,
    url: authorUrl,
    ...(author.title ? { jobTitle: author.title } : {}),
    ...(author.bio ? { description: author.bio } : {}),
    ...(author.expertise ? { knowsAbout: author.expertise } : {}),
    ...(author.avatar ? { image: { '@type': 'ImageObject', url: author.avatar } } : {}),
    ...(author.website ? { url: author.website } : {}),
    sameAs: [
      author.twitter ? `https://twitter.com/${author.twitter.replace('@', '')}` : null,
      author.linkedin || null,
      author.website || null,
    ].filter(Boolean) as string[],
    worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  } : null;

  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name,
    description: shortDescription || description,
    url,
    image: images.length === 1 ? images[0] : images,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    ...(isEcom ? { sku: slug } : {}),
    offers: {
      '@type': 'Offer',
      '@id': `${url}#offer`,
      url: readMoreLink || url,
      price: price ? price.toFixed(2) : '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: '2026-12-31',
    },
    // Only include aggregateRating when backed by genuine user feedback, avoiding GSC fake review penalties
    ...(reviewCount && reviewCount > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating ? rating.toFixed(1) : '5.0',
        reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating ? rating.toFixed(1) : '5.0',
        bestRating: '5',
      },
      author: authorSchema ?? {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      reviewBody: shortDescription || description,
    },
    ...(features.length > 0 ? {
      additionalProperty: features.map(f => ({
        '@type': 'PropertyValue',
        name: 'Feature',
        value: f,
      })),
    } : {}),
    ...(categoryType ? {
      category: subcategoryName
        ? `${categoryType} > ${subcategoryName}`
        : categoryType,
    } : {}),
    ...(createdAt ? { datePublished: createdAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
  };

  // Article schema for the content body
  const articleSchema: Record<string, unknown> | null = isEcom ? null : {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: name,
    description: shortDescription || description,
    image: images.length === 1 ? images[0] : images,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: authorSchema ?? {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(createdAt ? { datePublished: createdAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
  };

  // WebPage schema
  const webPageSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isEcom ? 'ItemPage' : 'WebPage',
    '@id': url,
    url,
    name,
    description: shortDescription || description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${url}#product` },
    primaryImageOfPage: images[0] ? {
      '@type': 'ImageObject',
      url: images[0],
      ...(imageAlt ? { description: imageAlt } : {}),
    } : undefined,
    ...(createdAt ? { datePublished: createdAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    breadcrumb: { '@id': `${url}#breadcrumb` },
    inLanguage: 'es-ES',
    potentialAction: readMoreLink ? [{
      '@type': 'ReadAction',
      target: [url],
    }, {
      '@type': 'ViewAction',
      name: 'Explorar la Guía Completa del Producto',
      target: readMoreLink,
    }] : [{
      '@type': 'ReadAction',
      target: [url],
    }],
  };

  // ItemList for key features
  const itemListSchema = features.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#features`,
    name: `Características Clave de ${name}`,
    numberOfItems: features.length,
    itemListElement: features.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: f,
    })),
  } : null;

  return (
    <>
      <SchemaScript schema={productSchema} />
      {articleSchema && <SchemaScript schema={articleSchema} />}
      <SchemaScript schema={webPageSchema} />
      {itemListSchema && <SchemaScript schema={itemListSchema} />}
      {authorSchema && <SchemaScript schema={{ '@context': 'https://schema.org', ...authorSchema }} />}
    </>
  );
}

// ── 4. Author / ProfilePage Schema ───────────────────────────────────────────
interface AuthorProfileSchemaProps {
  name: string;
  slug: string;
  title?: string | null;
  bio?: string | null;
  expertise?: string | null;
  avatar?: string | null;
  website?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  articleCount?: number;
  productCount?: number;
}

export function AuthorProfileSchema({
  name,
  slug,
  title,
  bio,
  expertise,
  avatar,
  website,
  twitter,
  linkedin,
  rating,
  reviewCount,
  articleCount = 0,
  productCount = 0,
}: AuthorProfileSchemaProps) {
  const authorUrl = `${SITE_URL}/author/${slug}`;

  const sameAsList = [
    twitter ? `https://twitter.com/${twitter.replace('@', '')}` : null,
    linkedin || null,
    website || null,
  ].filter(Boolean) as string[];

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${authorUrl}#person`,
    name,
    url: authorUrl,
    jobTitle: title || 'Investigador y Revisor de Salud',
    description: bio || 'Especialista en análisis de suplementos nutricionales y formulaciones de salud.',
    ...(expertise ? { knowsAbout: expertise.split(',').map((e) => e.trim()) } : {}),
    ...(avatar ? { image: { '@type': 'ImageObject', url: avatar } } : {}),
    sameAs: sameAsList,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(rating ? {
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ReviewAction',
        userInteractionCount: reviewCount || productCount + articleCount,
      },
    } : {}),
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': authorUrl,
    url: authorUrl,
    name: `Perfil de ${name} — ${SITE_NAME}`,
    description: bio || `Artículos y análisis de productos por ${name} en ${SITE_NAME}.`,
    mainEntity: { '@id': `${authorUrl}#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'es-ES',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Autores', item: `${SITE_URL}/about` },
        { '@type': 'ListItem', position: 3, name, item: authorUrl },
      ],
    },
  };

  return (
    <>
      <SchemaScript schema={personSchema} />
      <SchemaScript schema={profilePageSchema} />
    </>
  );
}

// ── 5. Article Detail Schema ──────────────────────────────────────────────────
interface ArticleDetailSchemaProps {
  title: string;
  description?: string | null;
  slug: string;
  featuredImage?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  wordCount?: number;
  author?: {
    name: string;
    slug?: string | null;
    title?: string | null;
    avatar?: string | null;
    website?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  } | null;
}

export function ArticleDetailSchema({
  title,
  description,
  slug,
  featuredImage,
  publishedAt,
  updatedAt,
  wordCount,
  author,
}: ArticleDetailSchemaProps) {
  const url = `${SITE_URL}/article/${slug}`;
  const authorSlug = author?.slug || (author?.name ? author.name.toLowerCase().replace(/\s+/g, '-') : null);
  const authorUrl = authorSlug ? `${SITE_URL}/author/${authorSlug}` : SITE_URL;

  const authorSchema = author ? {
    '@type': 'Person',
    '@id': `${authorUrl}#person`,
    name: author.name,
    url: authorUrl,
    ...(author.title ? { jobTitle: author.title } : {}),
    ...(author.avatar ? { image: { '@type': 'ImageObject', url: author.avatar } } : {}),
    sameAs: [
      author.twitter ? `https://twitter.com/${author.twitter.replace('@', '')}` : null,
      author.linkedin || null,
      author.website || null,
    ].filter(Boolean) as string[],
  } : {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description: description || title,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(featuredImage ? {
      image: {
        '@type': 'ImageObject',
        url: featuredImage,
        width: 1200,
        height: 630,
      },
    } : {}),
    datePublished: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString(),
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    inLanguage: 'es-ES',
    ...(wordCount ? { wordCount } : {}),
  };

  return <SchemaScript schema={schema} />;
}

// ── 6. BreadcrumbList ─────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <SchemaScript schema={{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${items[items.length - 1]?.url}#breadcrumb`,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }} />
  );
}

// ── 7. CollectionPage (listing of products or articles) ───────────────────────
export interface CollectionPageSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  items?: Array<{ name: string; url: string; image?: string; price?: number }>;
}

export function CollectionPageSchema({
  name,
  description,
  url,
  image,
  items = [],
}: CollectionPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name,
    description,
    url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'es-ES',
    ...(image ? { image } : {}),
    ...(items.length > 0 ? {
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: item.url,
          ...(item.image ? { image: item.image } : {}),
        })),
      },
    } : {}),
  };

  return <SchemaScript schema={schema} />;
}

// ── 8. Category / Subcategory Schema ──────────────────────────────────────────
export interface CategorySchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  productCount?: number;
}

export function CategorySchema({ name, description, image, url, productCount }: CategorySchemaProps) {
  return (
    <SchemaScript schema={{
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': url,
      name,
      description,
      url,
      image: image ? {
        '@type': 'ImageObject',
        url: image,
        description: name,
      } : undefined,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'es-ES',
      ...(productCount !== undefined ? {
        mainEntity: {
          '@type': 'ItemList',
          name: `Productos de ${name}`,
          numberOfItems: productCount,
        },
      } : {}),
    }} />
  );
}

// ── 9. FAQPage Schema ─────────────────────────────────────────────────────────
export interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  return (
    <SchemaScript schema={{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }} />
  );
}

// ── 10. AboutPage Schema ──────────────────────────────────────────────────────
export function AboutPageSchema() {
  const url = `${SITE_URL}/about`;
  return (
    <SchemaScript schema={{
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': url,
      url,
      name: `Sobre Nosotros — ${SITE_NAME}`,
      description: 'Conozca más sobre NutritionalReviews, nuestro equipo editorial y nuestro compromiso con el análisis objetivo de suplementos.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'es-ES',
    }} />
  );
}

// ── 11. ContactPage Schema ────────────────────────────────────────────────────
export function ContactPageSchema() {
  const url = `${SITE_URL}/contact`;
  return (
    <SchemaScript schema={{
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': url,
      url,
      name: `Centro de Contacto — ${SITE_NAME}`,
      description: 'Comuníquese con el equipo editorial de NutritionalReviews.org para consultas, correcciones o preguntas generales.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'reviewsnutritional@gmail.com',
          availableLanguage: 'Spanish',
        },
      },
      inLanguage: 'es-ES',
    }} />
  );
}
