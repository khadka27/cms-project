import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: {
        category: true,
        products: true,
      },
    });
    
    if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    return NextResponse.json(subcategory, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });
  } catch (error) {
    console.error('Subcategory GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch subcategory' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const typeStr = body.categoryType ? body.categoryType.toString().toUpperCase() : undefined;
    const categoryType = typeStr ? (typeStr === 'ECOM' ? 'ECOM' : 'NUTRA') : undefined;

    const data: Record<string, any> = {};
    if (typeof body.name === 'string' && body.name.trim()) {
      data.name = body.name.trim();
    }
    if (typeof body.slug === 'string' && body.slug.trim()) {
      data.slug = body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (categoryType) {
      data.categoryType = categoryType;
    }
    if (body.description !== undefined) {
      data.description = body.description || '';
    }
    if (body.image !== undefined) {
      data.image = body.image || '';
    }
    if (body.categoryId !== undefined) {
      data.categoryId = body.categoryId ? body.categoryId.trim() : null;
    }

    const updated = await prisma.subcategory.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
    
    return NextResponse.json(updated, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Subcategory PUT error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A subcategory with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const productCount = await prisma.product.count({
      where: { subcategoryId: id },
    });

    if (productCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete subcategory because ${productCount} product(s) are linked to it. Please reassign or delete the products first.` },
        { status: 400 }
      );
    }

    await prisma.subcategory.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subcategory DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
}
