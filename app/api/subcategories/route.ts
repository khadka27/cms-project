import { NextRequest, NextResponse } from 'next/server';
import { CategoryType } from '@prisma/client';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get('type')?.toLowerCase();
    
    // Only apply categoryType filter if it explicitly matches 'nutra' or 'ecom'
    const categoryType = 
      typeParam === 'nutra' ? 'NUTRA' : 
      typeParam === 'ecom' ? 'ECOM' : 
      undefined;

    const subcategories = await prisma.subcategory.findMany({
      where: categoryType ? { categoryType } : undefined,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(subcategories, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });
  } catch (error) {
    console.error('Subcategories GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: 'Subcategory name is required' }, { status: 400 });
    }

    const typeStr = (body.categoryType || 'nutra').toString().toUpperCase();
    const categoryType: CategoryType = typeStr === 'ECOM' ? CategoryType.ECOM : CategoryType.NUTRA;
    
    const baseSlug = (body.slug || body.name)
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const subcategoryData = {
      name: body.name.trim(),
      slug: baseSlug,
      categoryType,
      description: body.description?.trim() || '',
      image: body.image?.trim() || '',
      categoryId: body.categoryId?.trim() || null,
    };
    
    const created = await prisma.subcategory.create({
      data: subcategoryData,
      include: {
        category: true,
      },
    });
    
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('Subcategories POST error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A subcategory with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
  }
}
