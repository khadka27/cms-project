import { NextRequest, NextResponse } from 'next/server';
import { CategoryType } from '@prisma/client';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get('type')?.toLowerCase();
    
    const categoryType = 
      typeParam === 'nutra' ? 'NUTRA' : 
      typeParam === 'ecom' ? 'ECOM' : 
      undefined;

    const categories = await prisma.category.findMany({
      where: categoryType ? { type: categoryType } : undefined,
      include: {
        subcategories: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const typeStr = (body.type || 'nutra').toString().toUpperCase();
    const type: CategoryType = typeStr === 'ECOM' ? CategoryType.ECOM : CategoryType.NUTRA;
    const slug = (body.slug || body.name)
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const categoryData = {
      name: body.name.trim(),
      slug,
      type,
      description: body.description?.trim() || '',
      image: body.image?.trim() || '',
    };
    
    const created = await prisma.category.create({
      data: categoryData,
    });
    
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('Categories POST error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A category with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
