import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { getMediaAlt, resolveArtistPhoto } from '@/lib/utils'
import type { Artist } from '@/payload-types'

type ArtistCardProps = {
  artist: Artist
  locale: AppLocale
}

export async function ArtistCard({ artist, locale }: ArtistCardProps) {
  const t = await getTranslations({ locale, namespace: 'Artists' })
  const photo = resolveArtistPhoto(artist)
  const alt = getMediaAlt(artist.photo) || artist.name

  return (
    <Link href={{ pathname: '/artistes/[slug]', params: { slug: artist.slug } }} className="film-portrait film-frame group block">
      <div className="film-frame-core relative aspect-[3/4]">
        <img src={photo} alt={alt} className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-poster text-[1.5rem] leading-none text-paper sm:text-[1.8rem]">{artist.name}</h3>
          <p className="mt-2 text-sm text-paper/70">
            {t(`role_${artist.role}` as 'role_dancer')}
            {artist.country ? ` · ${artist.country}` : ''}
          </p>
        </div>
      </div>
    </Link>
  )
}
