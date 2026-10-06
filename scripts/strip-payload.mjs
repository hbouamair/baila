import { rmSync } from 'node:fs'
import { resolve } from 'node:path'

const leftovers = [
  'src/app/(payload)',
  'src/collections',
  'src/globals',
  'src/seed',
  'src/payload.config.ts',
]

for (const relative of leftovers) {
  rmSync(resolve(process.cwd(), relative), { recursive: true, force: true })
}

console.log('Removed leftover Payload files, if any.')
