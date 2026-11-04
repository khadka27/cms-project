import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            image: true,
            status: true,
          },
        },
      },
    });

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    // Attempt to locate associated editorial article
    let article = await (prisma.article as any).findUnique({
      where: { slug: ingredient.slug },
      include: {
        author: {
          select: { id: true, name: true, title: true, avatar: true },
        },
      },
    });

    if (!article) {
      const words = ingredient.name
        .split(/[\s,\(\)]+/)
        .filter((w: string) => w.length > 3);

      article = await (prisma.article as any).findFirst({
        where: {
          OR: [
            { slug: { contains: ingredient.slug } },
            { title: { contains: ingredient.name, mode: 'insensitive' } },
            ...words.map((w: string) => ({
              title: { contains: w, mode: 'insensitive' },
            })),
          ],
        },
        include: {
          author: {
            select: { id: true, name: true, title: true, avatar: true },
          },
        },
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      });
    }

    const payload = {
      id: ingredient.id,
      name: ingredient.name,
      slug: ingredient.slug,
      description: ingredient.description || article?.excerpt || '',
      keyFeatures: ingredient.keyFeatures || '',
      image: ingredient.image || article?.featuredImage || '',
      imageAlt: ingredient.imageAlt || article?.featuredImageAlt || '',
      createdAt: ingredient.createdAt,
      updatedAt: ingredient.updatedAt,
      // CMS Article & Editorial fields
      articleId: article?.id || null,
      content: article?.content || '',
      metaTitle: article?.metaTitle || '',
      metaDescription: article?.metaDescription || '',
      metaKeywords: article?.metaKeywords || '',
      authorId: article?.authorId || '',
      author: article?.author || null,
      status: article?.status || 'PUBLISHED',
      // Associated products
      products: ingredient.products || [],
      productIds: ingredient.products.map((p: any) => p.id),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Ingredient GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch ingredient' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();

    const existing = await prisma.ingredient.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    const newSlug = (body.slug || body.name || existing.slug)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // 1. Update ingredient record
    const updated = await prisma.ingredient.update({
      where: { id },
      data: {
        name: body.name || existing.name,
        slug: newSlug || existing.slug,
        description: body.description !== undefined ? body.description : existing.description,
        keyFeatures: body.keyFeatures !== undefined ? body.keyFeatures : existing.keyFeatures,
        image: body.image !== undefined ? body.image : existing.image,
        imageAlt: body.imageAlt !== undefined ? body.imageAlt : existing.imageAlt,
        ...(Array.isArray(body.productIds)
          ? {
              products: {
                set: body.productIds.map((pId: string) => ({ id: pId })),
              },
            }
          : {}),
      },
      include: {
        products: true,
      },
    });

    // 2. Synchronize / Upsert associated Article for CMS content
    let articleId = body.articleId;
    if (!articleId) {
      const match = await (prisma.article as any).findFirst({
        where: {
          OR: [
            { slug: existing.slug },
            { slug: newSlug },
            { title: { contains: existing.name, mode: 'insensitive' } },
          ],
        },
      });
      if (match) articleId = match.id;
    }

    if (articleId) {
      await (prisma.article as any).update({
        where: { id: articleId },
        data: {
          title: body.name || existing.name,
          slug: newSlug || existing.slug,
          excerpt: body.description || existing.description,
          content: body.content !== undefined ? body.content : undefined,
          featuredImage: body.image || existing.image,
          featuredImageAlt: body.imageAlt || existing.imageAlt,
          metaTitle: body.metaTitle || body.name || existing.name,
          metaDescription: body.metaDescription || body.description || existing.description,
          metaKeywords: body.metaKeywords || null,
          authorId: body.authorId || null,
          status: body.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
          publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
        },
      });
    } else if (body.content) {
      // Create new article entry if rich content was provided
      await (prisma.article as any).create({
        data: {
          title: body.name || existing.name,
          slug: newSlug || existing.slug,
          excerpt: body.description || existing.description,
          content: body.content,
          featuredImage: body.image || existing.image,
          featuredImageAlt: body.imageAlt || existing.imageAlt,
          metaTitle: body.metaTitle || body.name || existing.name,
          metaDescription: body.metaDescription || body.description || existing.description,
          metaKeywords: body.metaKeywords || null,
          authorId: body.authorId || null,
          status: body.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
          publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
        },
      });
    }

    // 3. Cache revalidation
    try {
      revalidatePath('/ingredients');
      revalidatePath(`/ingredients/${updated.slug}`);
      if (existing.slug !== updated.slug) {
        revalidatePath(`/ingredients/${existing.slug}`);
      }
      revalidatePath('/article');
      revalidatePath('/sitemap.xml');
      revalidatePath('/');
    } catch (e) {
      console.error('Revalidation error:', e);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Ingredient PUT error:', error);
    return NextResponse.json({ error: 'Failed to update ingredient' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const existing = await prisma.ingredient.findUnique({
      where: { id },
      select: { slug: true },
    });

    await prisma.ingredient.delete({
      where: { id },
    });

    try {
      revalidatePath('/ingredients');
      if (existing?.slug) {
        revalidatePath(`/ingredients/${existing.slug}`);
      }
      revalidatePath('/sitemap.xml');
      revalidatePath('/');
    } catch (e) {
      console.error('Revalidation error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ingredient DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete ingredient' }, { status: 500 });
  }
}
