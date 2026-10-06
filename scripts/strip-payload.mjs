import { rmSync } from 'node:fs'
import { resolve } from 'node:path'

const payloadApp = resolve(process.cwd(), 'src/app/(payload)')

rmSync(payloadApp, { recursive: true, force: true })
console.log('Removed leftover Payload admin routes, if any.')
