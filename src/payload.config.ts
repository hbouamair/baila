import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Artists } from './collections/Artists'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Faqs } from './collections/Faqs'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Passes } from './collections/Passes'
import { Programme } from './collections/Programme'
import { Users } from './collections/Users'
import { Home } from './globals/Home'
import { PracticalInfo } from './globals/PracticalInfo'
import { SiteSettings } from './globals/SiteSettings'
import { getDatabasePool } from './lib/database'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Bailamos',
    },
  },
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { fr },
  },
  localization: {
    defaultLocale: 'fr',
    fallback: true,
    locales: [
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
    ],
  },
  collections: [Users, Media, Passes, Artists, Programme, Faqs, Pages, ContactSubmissions],
  globals: [SiteSettings, Home, PracticalInfo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: getDatabasePool(),
    push: process.env.PAYLOAD_PUSH === 'true',
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || 'media',
      acl: 'public-read',
      config: {
        forcePathStyle: true,
        region: process.env.S3_REGION || 'eu-west-1',
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
