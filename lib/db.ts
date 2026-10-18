import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

let prisma: PrismaClient;
let pool: Pool;

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    let poolConfig: any = { connectionString: databaseUrl };
    try {
      const url = new URL(databaseUrl);
      const sslmode = url.searchParams.get('sslmode');
      const ssl = url.searchParams.get('ssl');

      if (sslmode === 'disable' || ssl === 'false') {
        url.searchParams.delete('sslmode');
        url.searchParams.delete('ssl');
        poolConfig = {
          connectionString: url.toString(),
          ssl: false,
        };
      } else if (sslmode || ssl === 'true' || url.searchParams.has('sslmode')) {
        url.searchParams.delete('sslmode');
        url.searchParams.delete('ssl');
        poolConfig = {
          connectionString: url.toString(),
          ssl: { rejectUnauthorized: false },
        };
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      }
    } catch {
      poolConfig = {
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false },
      };
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    pool = new Pool(poolConfig);
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma;
      globalForPrisma.pool = pool;
    }
  } else {
    // Fallback for build time when DATABASE_URL is not available
    const dummyProxy: any = new Proxy({} as any, {
      get(_target, prop) {
        if (prop === '$connect' || prop === '$disconnect') {
          return async () => {};
        }
        return new Proxy({}, {
          get(_modelTarget, method) {
            return async () => {
              if (method === 'findMany') return [];
              if (method === 'count') return 0;
              return null;
            };
          },
        });
      },
    });
    prisma = dummyProxy as PrismaClient;
  }
}

export default prisma;
