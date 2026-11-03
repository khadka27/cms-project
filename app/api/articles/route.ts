import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const slug = searchParams.get('slug');

    if (slug) {
      const article = await (prisma.article as any).findUnique({
        where: { slug },
        include: { author: true },
      });
      if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(article);
    }

    const articles = await (prisma.article as any).findMany({
      where: status ? { status: status.toUpperCase() } : undefined,
      include: { author: { select: { id: true, name: true, avatar: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Articles GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // If an ID is passed and the article exists, perform an update (prevents re-save failure from New Article)
    if (body.id) {
      const existing = await (prisma.article as any).findUnique({
        where: { id: body.id },
      });
      if (existing) {
        const updated = await (prisma.article as any).update({
          where: { id: body.id },
          data: {
            title: body.title !== undefined ? body.title : existing.title,
            slug: body.slug || existing.slug,
            excerpt: body.excerpt !== undefined ? body.excerpt : existing.excerpt,
            content: body.content !== undefined ? body.content : existing.content,
            featuredImage: body.featuredImage !== undefined ? body.featuredImage : existing.featuredImage,
            featuredImageAlt: body.featuredImageAlt !== undefined ? body.featuredImageAlt : existing.featuredImageAlt,
            metaTitle: body.metaTitle !== undefined ? body.metaTitle : existing.metaTitle,
            metaDescription: body.metaDescription !== undefined ? body.metaDescription : existing.metaDescription,
            metaKeywords: body.metaKeywords !== undefined ? body.metaKeywords : existing.metaKeywords,
            status: body.status === 'PUBLISHED' ? 'PUBLISHED' : (body.status === 'DRAFT' ? 'DRAFT' : existing.status),
            isHero: body.isHero !== undefined ? !!body.isHero : existing.isHero,
            publishedAt: body.status === 'PUBLISHED' ? (existing.publishedAt || new Date()) : (body.status === 'DRAFT' ? null : existing.publishedAt),
            authorId: body.authorId !== undefined ? body.authorId : existing.authorId,
          },
        });

        try {
          revalidatePath('/article');
          revalidatePath('/article/' + updated.slug);
          revalidatePath('/sitemap.xml');
          revalidatePath('/');
        } catch (e) {
          console.error('Revalidation error:', e);
        }

        return NextResponse.json(updated, { status: 200 });
      }
    }

    let baseSlug = (body.slug || body.title || 'articulo')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    if (!baseSlug) baseSlug = `articulo-${Date.now()}`;

    // Ensure unique slug to prevent unique constraint crash
    let slug = baseSlug;
    let counter = 1;
    while (await (prisma.article as any).findUnique({ where: { slug } })) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const article = await (prisma.article as any).create({
      data: {
        title: body.title || 'Sin Título',
        slug,
        excerpt: body.excerpt || null,
        content: body.content || '',
        featuredImage: body.featuredImage || null,
        featuredImageAlt: body.featuredImageAlt || null,
        metaTitle: body.metaTitle || body.title || 'Sin Título',
        metaDescription: body.metaDescription || body.excerpt || null,
        metaKeywords: body.metaKeywords || null,
        status: body.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
        isHero: !!body.isHero,
        publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
        authorId: body.authorId || null,
      },
    });

    try {
      revalidatePath('/article');
      revalidatePath('/article/' + article.slug);
      revalidatePath('/sitemap.xml');
      revalidatePath('/');
    } catch (e) {
      console.error('Revalidation error:', e);
    }

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error('Articles POST error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create article' },
      { status: 500 }
    );
  }
}
