import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';

export async function GET(_req: NextRequest) {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        products: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error('Ingredients GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let baseSlug = (body.slug || body.name || 'ingrediente')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    if (!baseSlug) baseSlug = `ingrediente-${Date.now()}`;

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.ingredient.findUnique({ where: { slug } })) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const created = await prisma.ingredient.create({
      data: {
        name: body.name || 'Sin Nombre',
        slug,
        description: body.description || '',
        keyFeatures: body.keyFeatures || null,
        image: body.image || '',
        imageAlt: body.imageAlt || '',
        ...(Array.isArray(body.productIds) && body.productIds.length > 0
          ? {
              products: {
                connect: body.productIds.map((pId: string) => ({ id: pId })),
              },
            }
          : {}),
      },
      include: {
        products: true,
      },
    });

    // If editorial article content or SEO was provided, also create the Article
    if (body.content || body.metaTitle || body.authorId) {
      try {
        await (prisma.article as any).create({
          data: {
            title: body.name || 'Sin Título',
            slug,
            excerpt: body.description || null,
            content: body.content || '',
            featuredImage: body.image || null,
            featuredImageAlt: body.imageAlt || null,
            metaTitle: body.metaTitle || body.name || null,
            metaDescription: body.metaDescription || body.description || null,
            metaKeywords: body.metaKeywords || null,
            authorId: body.authorId || null,
            status: body.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
            publishedAt: body.status === 'DRAFT' ? null : new Date(),
          },
        });
      } catch (artErr) {
        console.warn('Could not auto-create article for ingredient:', artErr);
      }
    }

    try {
      revalidatePath('/ingredients');
      revalidatePath(`/ingredients/${slug}`);
      revalidatePath('/article');
      revalidatePath('/sitemap.xml');
      revalidatePath('/');
    } catch (e) {
      console.error('Revalidation error:', e);
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Ingredients POST error:', error);
    return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
  }
}
