import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { getMediaAlt, resolveArtistPhoto } from '@/lib/utils'
import type { Artist } from '@/payload-types'

export type ArtistCardArtist = Pick<Artist, 'name' | 'slug' | 'role'> & {
  id: string | number
  photo?: Artist['photo'] | string | null
  country?: string | null
}

type ArtistCardProps = {
  artist: ArtistCardArtist
  locale: AppLocale
}

function splitCouple(name: string) {
  const parts = name.split(/\s+(y|&)\s+/i)
  if (parts.length === 3) {
    return { lead: parts[0], join: parts[1], tail: parts[2] }
  }
  return null
}

export async function ArtistCard({ artist, locale }: ArtistCardProps) {
  const t = await getTranslations({ locale, namespace: 'Artists' })
  const photo = resolveArtistPhoto(artist)
  const alt = getMediaAlt(artist.photo) || artist.name
  const couple = splitCouple(artist.name)

  return (
    <Link href={{ pathname: '/artistes/[slug]', params: { slug: artist.slug } }} className="artist-tile group">
      <img src={photo} alt={alt} />
      <div className="artist-tile-shade" />
      <div className="artist-tile-copy">
        <p className="artist-tile-kicker">{t(`cardKicker_${artist.role}` as 'cardKicker_dancer')}</p>
        {artist.role === 'dj' ? null : <span className="artist-tile-pill">{t('styleBachata')}</span>}
        {couple ? (
          <h3 className="artist-tile-name">
            <span className="artist-tile-lead">{couple.lead}</span>
            <span className="font-script artist-tile-join">
              {couple.join} {couple.tail}
            </span>
          </h3>
        ) : (
          <h3 className="artist-tile-name">
            <span className="artist-tile-lead">{artist.name}</span>
          </h3>
        )}
        {artist.country ? <p className="artist-tile-place">{artist.country}</p> : null}
      </div>
    </Link>
  )
}
