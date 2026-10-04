import { mkdir, unlink } from 'node:fs/promises'
import { basename } from 'node:path'

import sharp from 'sharp'

const outDir = 'public/cinematic/plates'

const plates = [
  { src: 'public/cinematic/plates/night.jpg', dest: 'public/cinematic/plates/night.webp' },
  { src: 'public/cinematic/plates/souk-hi.jpg', dest: 'public/cinematic/plates/souk.webp' },
  { src: 'public/cinematic/plates/arches-hi.jpg', dest: 'public/cinematic/plates/arches.webp' },
  { src: 'public/cinematic/plates/square-hi.jpg', dest: 'public/cinematic/plates/square.webp' },
  { src: 'public/cinematic/plates/tower-hi.jpg', dest: 'public/cinematic/plates/tower.webp' },
  { src: 'public/cinematic/plates/falls.jpg', dest: 'public/cinematic/plates/falls.webp' },
]

await mkdir(outDir, { recursive: true })

for (const plate of plates) {
  const info = await sharp(plate.src)
    .rotate()
    .resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(plate.dest)
  console.log(basename(plate.dest), `${info.width}x${info.height}`)
}

for (const leftover of [
  'public/cinematic/plates/souk-hi.jpg',
  'public/cinematic/plates/arches-hi.jpg',
  'public/cinematic/plates/square-hi.jpg',
  'public/cinematic/plates/tower-hi.jpg',
]) {
  await unlink(leftover).catch(() => {})
}
