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
        prisma.subcategory.findMany({
          select: {
            name: true,
            slug: true,
            description: true,
          },
        }),
        prisma.product.findMany({
          select: {
            name: true,
            slug: true,
            price: true,
            shortDescription: true,
            detailedDescription: true,
            keyFeatures: true,
            buyNowLink: true,
            readMoreLink: true,
            subcategory: {
              select: { name: true },
            },
            ingredients: {
              select: { name: true, description: true },
            },
          },
        }),
        prisma.article.findMany({
          select: {
            title: true,
            slug: true,
            excerpt: true,
            content: true,
            author: {
              select: { name: true },
            },
          },
        }),
      ]);
      subcategories = sub;
      products = prod;
      articles = art;
    } catch (e) {
      console.error("Error fetching db data for llms-full.txt", e);
    }
  }

  let content = `# Nutritional Reviews - Documentación Completa e Índice de Contenidos para IA\n\n`;
  content += `Nutritional Reviews es un portal editorial de confianza que organiza información de productos en análisis claros y equilibrados, y guías de compra. Ayudamos a los compradores a comprender productos populares, definiciones de categorías, detalles de precios y especificaciones clave antes de visitar las páginas oficiales de información o compra.\n\n`;

  content += `## Filosofía Editorial y Proceso\n`;
  content += `- **Claridad sin Presiones**: Nuestro contenido explica los productos en un lenguaje sencillo y accesible, evitando tácticas de venta agresivas.\n`;
  content += `- **Análisis Equilibrados**: Cada resumen destaca las características principales junto con limitaciones realistas, pros y contras.\n`;
  content += `- **Transparencia**: Algunos de nuestros análisis incluyen enlaces de afiliados a ofertas de terceros o sitios de fabricantes. Recomendamos revisar siempre los términos, condiciones y políticas de devolución en la página final del vendedor.\n\n`;

  content += `---\n\n`;

  content += `## Subcategorías y Colecciones\n\n`;
  if (subcategories.length > 0) {
    for (const sub of subcategories) {
      content += `### ${sub.name}\n`;
      content += `- **Enlace**: https://nutritionalreviews.org/subcategory/${sub.slug}\n`;
      content += `- **Descripción**: ${sub.description || "Sin descripción disponible."}\n\n`;
    }
  } else {
    content += `No hay subcategorías disponibles actualmente.\n\n`;
  }

  content += `---\n\n`;

  content += `## Análisis Detallados de Productos\n\n`;
  if (products.length > 0) {
    for (const prod of products) {
      content += `### ${prod.name}\n`;
      content += `- **Enlace**: https://nutritionalreviews.org/${prod.slug}\n`;
      content += `- **Subcategoría**: ${prod.subcategory?.name || "N/D"}\n`;
      content += `- **Precio**: $${prod.price}\n`;
      if (prod.buyNowLink) {
        content += `- **Enlace de Compra**: ${prod.buyNowLink}\n`;
      }
      if (prod.readMoreLink) {
        content += `- **Más Información**: ${prod.readMoreLink}\n`;
      }
      content += `- **Resumen**: ${prod.shortDescription}\n`;
      if (prod.keyFeatures) {
        content += `- **Características Principales**:\n${prod.keyFeatures.split("\n").map((line: string) => `  * ${line.trim()}`).join("\n")}\n`;
      }
      if (prod.ingredients && prod.ingredients.length > 0) {
        content += `- **Ingredientes Activos**:\n`;
        for (const ing of prod.ingredients) {
          content += `  * **${ing.name}**: ${ing.description || "N/D"}\n`;
        }
      }
      content += `- **Descripción Detallada**:\n${prod.detailedDescription}\n\n`;
      content += `---\n\n`;
    }
  } else {
    content += `No hay productos disponibles actualmente.\n\n`;
  }

  content += `## Artículos y Guías Publicados\n\n`;
  if (articles.length > 0) {
    for (const art of articles) {
      content += `### ${art.title}\n`;
      content += `- **Enlace**: https://nutritionalreviews.org/article/${art.slug}\n`;
      content += `- **Autor**: ${art.author?.name || "Equipo Editorial de Nutritional Reviews"}\n`;
      if (art.excerpt) {
        content += `- **Extracto**: ${art.excerpt}\n`;
      }
      content += `- **Contenido**:\n${art.content}\n\n`;
      content += `---\n\n`;
    }
  } else {
    content += `No hay artículos publicados actualmente.\n\n`;
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
