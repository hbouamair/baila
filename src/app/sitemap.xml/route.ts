import { getSitemapEntries, renderSitemapXml } from '@/lib/sitemap-data'

export const dynamic = 'force-static'
export const revalidate = 3600

export function GET() {
  const xml = renderSitemapXml(getSitemapEntries())
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
