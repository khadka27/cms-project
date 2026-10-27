import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  let subcategories: any[] = [];
  let products: any[] = [];
  let articles: any[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const prisma = (await import("@/lib/db")).default;
      const [sub, prod, art] = await Promise.all([
        prisma.subcategory.findMany({ select: { name: true, slug: true, description: true } }),
        prisma.product.findMany({ select: { name: true, slug: true, shortDescription: true } }),
        prisma.article.findMany({ select: { title: true, slug: true, excerpt: true } }),
      ]);
      subcategories = sub;
      products = prod;
      articles = art;
    } catch (e) {
      console.error("Error fetching db data for llms.txt", e);
    }
  }

  let content = `# Nutritional Reviews\n\nNutritional Reviews ayuda a los compradores a explorar análisis de productos, comparar características, comprender pros y contras, y aprender qué verificar antes de visitar una página de producto.\n\n`;

  content += `## Páginas Principales\n`;
  content += `- [Página de Inicio](https://nutritionalreviews.org) - Análisis selectos orientados al consumidor de suplementos y productos de bienestar en tendencia.\n`;
  content += `- [Todos los Productos](https://nutritionalreviews.org/products) - Catálogo completo de productos analizados en el sitio.\n`;
  content += `- [Sobre Nosotros](https://nutritionalreviews.org/about) - Información sobre nuestro proceso editorial y misión.\n`;
  content += `- [Contacto](https://nutritionalreviews.org/contact) - Formulario de contacto para consultas y soporte.\n\n`;

  content += `## Editorial y Directrices Legales\n`;
  content += `- [Cómo Evaluamos](https://nutritionalreviews.org/legal/how-we-review) - Nuestros principios editoriales y metodología de evaluación.\n`;
  content += `- [Términos y Condiciones](https://nutritionalreviews.org/legal/terms) - Términos que rigen el uso del sitio web.\n`;
  content += `- [Política de Privacidad](https://nutritionalreviews.org/legal/privacy) - Información sobre privacidad del usuario y cookies.\n`;
  content += `- [Política de Reembolsos](https://nutritionalreviews.org/legal/refunds) - Avisos y garantías sobre devoluciones.\n`;
  content += `- [Información de Envíos](https://nutritionalreviews.org/legal/shipping) - Directrices generales de envío y entrega.\n`;
  content += `- [Política de Cookies](https://nutritionalreviews.org/legal/cookies) - Información sobre el uso de cookies.\n\n`;

  if (subcategories.length > 0) {
    content += `## Subcategorías\n`;
    for (const sub of subcategories) {
      content += `- [${sub.name}](https://nutritionalreviews.org/subcategory/${sub.slug}) - ${sub.description || "Explorar análisis de productos en esta categoría."}\n`;
    }
    content += `\n`;
  }

  if (products.length > 0) {
    content += `## Análisis de Productos\n`;
    for (const prod of products) {
      content += `- [${prod.name}](https://nutritionalreviews.org/${prod.slug}) - ${prod.shortDescription || "Análisis detallado de especificaciones y producto."}\n`;
    }
    content += `\n`;
  }

  if (articles.length > 0) {
    content += `## Artículos y Guías\n`;
    for (const art of articles) {
      content += `- [${art.title}](https://nutritionalreviews.org/article/${art.slug}) - ${art.excerpt || "Lea nuestro artículo completo."}\n`;
    }
    content += `\n`;
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
