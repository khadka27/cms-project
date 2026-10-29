require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

async function main() {
    console.log('🌱 Starting database seed...\n');

    // Initialize Prisma with adapter for version 7
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('❌ DATABASE_URL is not set');
        process.exit(1);
    }

    let poolConfig = { connectionString: databaseUrl };
    try {
        const url = new URL(databaseUrl);
        const sslmode = url.searchParams.get('sslmode');
        const ssl = url.searchParams.get('ssl');
        if (sslmode === 'disable' || ssl === 'false') {
            url.searchParams.delete('sslmode');
            url.searchParams.delete('ssl');
            poolConfig = { connectionString: url.toString(), ssl: false };
        } else if (sslmode || ssl === 'true' || url.searchParams.has('sslmode')) {
            url.searchParams.delete('sslmode');
            url.searchParams.delete('ssl');
            poolConfig = { connectionString: url.toString(), ssl: { rejectUnauthorized: false } };
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
    } catch {
        poolConfig = { connectionString: databaseUrl, ssl: { rejectUnauthorized: false } };
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const pool = new Pool(poolConfig);
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const email = process.env.SEED_ADMIN_EMAIL || 'admin@nutritionalreviews.org';
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
    const name = process.env.SEED_ADMIN_NAME || 'Admin User';

    try {
        // Check if admin user already exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            console.log('✓ Admin user already exists:', existing.email);
        } else {
            // Hash password
            const hashed = await bcrypt.hash(password, 12);

            // Create admin user
            const admin = await prisma.user.create({
                data: {
                    email,
                    password: hashed,
                    name,
                    role: 'ADMIN',
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                },
            });

            console.log('✓ Admin user created successfully:');
            console.log(`  Email: ${admin.email}`);
            console.log(`  Name: ${admin.name}`);
            console.log(`  Role: ${admin.role}`);
        }

        // Create or ensure sample categories
        console.log('\n🏷️ Ensuring sample categories...');

        const nutraCategory = await prisma.category.upsert({
            where: { slug: 'supplements' },
            update: {},
            create: {
                name: 'Supplements',
                slug: 'supplements',
                type: 'NUTRA',
                description: 'Health and nutrition supplements',
                image: '',
            },
        });

        const ecomCategory = await prisma.category.upsert({
            where: { slug: 'fitness-equipment' },
            update: {},
            create: {
                name: 'Fitness Equipment',
                slug: 'fitness-equipment',
                type: 'ECOM',
                description: 'Exercise and fitness gear',
                image: '',
            },
        });

        console.log('✓ Categories ready');

        // Create or ensure sample subcategories
        console.log('\n📂 Ensuring sample subcategories...');

        const vitaminsSub = await prisma.subcategory.upsert({
            where: { slug: 'vitamins' },
            update: {},
            create: {
                name: 'Vitamins',
                slug: 'vitamins',
                categoryType: 'NUTRA',
                description: 'Essential vitamins and minerals',
                image: '',
                categoryId: nutraCategory.id,
            },
        });

        const proteinSub = await prisma.subcategory.upsert({
            where: { slug: 'protein-supplements' },
            update: {},
            create: {
                name: 'Protein Supplements',
                slug: 'protein-supplements',
                categoryType: 'NUTRA',
                description: 'Protein powders and supplements',
                image: '',
                categoryId: nutraCategory.id,
            },
        });

        const cardioSub = await prisma.subcategory.upsert({
            where: { slug: 'cardio-equipment' },
            update: {},
            create: {
                name: 'Cardio Equipment',
                slug: 'cardio-equipment',
                categoryType: 'ECOM',
                description: 'Treadmills, bikes, and cardio machines',
                image: '',
                categoryId: ecomCategory.id,
            },
        });

        console.log('✓ Subcategories ready');

        // Create or ensure sample products
        console.log('\n🛍️ Ensuring sample products...');

        await prisma.product.upsert({
            where: { slug: 'vitamin-d3-1000-iu' },
            update: {},
            create: {
                name: 'Vitamin D3 1000 IU',
                slug: 'vitamin-d3-1000-iu',
                price: 19.99,
                categoryType: 'NUTRA',
                subcategoryId: vitaminsSub.id,
                shortDescription: 'High-quality Vitamin D3 supplement for bone health',
                detailedDescription: 'Our premium Vitamin D3 supplement provides 1000 IU per capsule to support bone health, immune function, and overall wellness.',
                metaTitle: 'Vitamin D3 1000 IU - Premium Supplement',
                metaDescription: 'High-quality Vitamin D3 supplement for bone health and immune support',
                image: '',
                featuredImage: '',
                readMoreLink: '',
            },
        });

        await prisma.product.upsert({
            where: { slug: 'whey-protein-powder' },
            update: {},
            create: {
                name: 'Whey Protein Powder',
                slug: 'whey-protein-powder',
                price: 49.99,
                categoryType: 'NUTRA',
                subcategoryId: proteinSub.id,
                shortDescription: 'Premium whey protein for muscle building',
                detailedDescription: 'High-quality whey protein powder with 25g protein per serving. Perfect for post-workout recovery and muscle building.',
                metaTitle: 'Whey Protein Powder - Premium Quality',
                metaDescription: 'Premium whey protein powder for muscle building and recovery',
                image: '',
                featuredImage: '',
                readMoreLink: '',
            },
        });

        await prisma.product.upsert({
            where: { slug: 'home-treadmill-pro' },
            update: {},
            create: {
                name: 'Home Treadmill Pro',
                slug: 'home-treadmill-pro',
                price: 899.99,
                categoryType: 'ECOM',
                subcategoryId: cardioSub.id,
                shortDescription: 'Professional-grade home treadmill',
                detailedDescription: 'High-performance treadmill with advanced features for home use. Includes heart rate monitoring, multiple workout programs, and foldable design.',
                metaTitle: 'Home Treadmill Pro - Professional Grade',
                metaDescription: 'Professional-grade home treadmill with advanced features',
                image: '',
                featuredImage: '',
                readMoreLink: '',
            },
        });

        console.log('✓ Sample products ready');

        console.log('\n✅ Database seed completed successfully!\n');
        console.log('📝 Admin Credentials:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        console.log('\n⚠️  Please change the password after first login!\n');

    } catch (error) {
        console.error('❌ Error during seed:', error.message);
        process.exitCode = 1;
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
