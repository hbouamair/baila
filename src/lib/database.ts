const LOCAL_PLACEHOLDER = /127\.0\.0\.1|localhost|postgres:postgres/i
const POOLED = /pooler\.supabase\.com|:6543|pgbouncer=true/i

function isUsableRemoteUrl(url: string) {
  return Boolean(url) && !LOCAL_PLACEHOLDER.test(url)
}

export function getDatabaseUrl() {
  const candidates = [
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL,
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL_NON_POOLING,
  ].filter((value): value is string => Boolean(value))

  const remote = candidates.filter(isUsableRemoteUrl)
  return remote.find((url) => POOLED.test(url)) || remote[0] || candidates[0] || ''
}

export const isPooledDatabase = POOLED.test(getDatabaseUrl())

export function getDatabasePool() {
  return {
    connectionString: getDatabaseUrl(),
    max: isPooledDatabase ? 1 : 10,
  }
}
