import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (dbInstance) return dbInstance;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes('localhost') || connectionString.includes('placeholder')) {
    // Return null or handle offline fallback via repository services
    return null;
  }

  try {
    const pool = new Pool({ connectionString });
    dbInstance = drizzle(pool, { schema });
    return dbInstance;
  } catch (error) {
    console.warn('PostgreSQL connection initialization deferred:', error);
    return null;
  }
}

export * from './schema';
