import type { ExtraGlyph as GlyphName } from '@/lib/extras'

const paths: Record<GlyphName, string> = {
  wave: 'M3 12c2.2-2.4 4.4-2.4 6.6 0s4.4 2.4 6.6 0 4.4-2.4 6.6 0',
  fish: 'M4 12s3-5 8-5c5.5 0 9 5 9 5s-3.5 5-9 5c-5 0-8-5-8-5Zm8 0h.01M19 12l3-2M19 12l3 2',
  fort: 'M5 20V8l3-3 3 3 3-3 3 3v12H5Zm0 0h14M8 20v-5h3v5',
  landmark: 'M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6',
  bag: 'M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2',
  palm: 'M12 21V10M12 11c-4-1-7 1-8 4M12 9c4-1 7 1 8 4M12 7C9 4 6 4 4 6M12 7c3-3 6-3 8-1',
  dunes: 'M3 18c3-4 6-4 9 0 3-5 6-5 9 0M3 21h18',
  quad: 'M5 16a3 3 0 1 0 0.01 0M19 16a3 3 0 1 0 0.01 0M8 16h8M7 10h7l3 6M10 10V7h4',
  tent: 'M4 19h16M6 19l6-14 6 14M12 5v14',
}

export function ExtraGlyph({ name }: { name: GlyphName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 stroke-current" fill="none">
      <path d={paths[name]} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
