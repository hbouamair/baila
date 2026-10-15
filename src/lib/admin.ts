import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'bailaimos_admin'

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || ''
}

export function adminToken(password = adminPassword()) {
  if (!password) return ''
  return createHmac('sha256', password).update('bailaimos-admin').digest('hex')
}

export function adminTokenMatches(value: string | undefined) {
  const expected = adminToken()
  if (!value || !expected) return false
  const left = Buffer.from(value)
  const right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}

export async function isAdminSession() {
  const jar = await cookies()
  return adminTokenMatches(jar.get(ADMIN_COOKIE)?.value)
}
