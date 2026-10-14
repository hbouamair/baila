import type { MetadataRoute } from 'next'

import { getSitemapEntries } from '@/lib/sitemap-data'

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map((entry) => ({
    url: entry.loc,
    lastModified: entry.lastmod,
    changeFrequency: entry.changefreq,
    priority: Number(entry.priority),
    alternates: {
      languages: Object.fromEntries(entry.alternates.map((item) => [item.lang, item.href])),
    },
  }))
}
