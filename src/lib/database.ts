const databaseUrl = process.env.DATABASE_URL || ''

export const isPooledDatabase = /pooler\.supabase\.com|:6543|pgbouncer=true/i.test(databaseUrl)

export function getDatabasePool() {
  return {
    connectionString: databaseUrl,
    max: isPooledDatabase ? 1 : 10,
  }
}
