import { copyFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

import sharp from 'sharp'

const assets = 'C:/Users/SQMV0257/.cursor/projects/c-Users-SQMV0257-Desktop-project-freelance-bailamos/assets'

const files = {
  logo: 'c__Users_SQMV0257_AppData_Roaming_Cursor_User_workspaceStorage_e39125d7ba9bb9c7760061bb6bcd694e_images_LOGO_NouvelleCharte2027-bf3d9617-8efc-4e25-9a0f-94f9376abf60.png',
  stays: 'c__Users_SQMV0257_AppData_Roaming_Cursor_User_workspaceStorage_e39125d7ba9bb9c7760061bb6bcd694e_images_WhatsApp_Image_2026-10-03_at_21.30.44-407ea9db-6237-4505-804a-a4b2b22f1046.jpg',
  kevin: 'c__Users_SQMV0257_AppData_Roaming_Cursor_User_workspaceStorage_e39125d7ba9bb9c7760061bb6bcd694e_images_WhatsApp_Image_2026-10-03_at_21.15.13-1ba6cc21-862b-4c8b-9322-c5468a4df72b.jpg',
  jordi: 'c__Users_SQMV0257_AppData_Roaming_Cursor_User_workspaceStorage_e39125d7ba9bb9c7760061bb6bcd694e_images_WhatsApp_Image_2026-10-03_at_21.15.14-851852db-cb36-4949-9caa-b82a5ae4ea68.jpg',
}

await mkdir('public/brand', { recursive: true })
await mkdir('public/examples/artists', { recursive: true })
await mkdir('public/examples/stays', { recursive: true })

const logoSrc = `${assets}/${files.logo}`
if (!existsSync(logoSrc)) throw new Error('logo missing')

await sharp(logoSrc)
  .trim({ threshold: 8 })
  .png()
  .toFile('public/brand/bailaimos-logo.png')

const artists = [
  [files.kevin, 'public/examples/artists/kevin-y-lucia.jpg'],
  [files.jordi, 'public/examples/artists/jordi-judith.jpg'],
]

for (const [src, dest] of artists) {
  const image = sharp(`${assets}/${src}`)
  const meta = await image.metadata()
  const width = meta.width ?? 1200
  const height = meta.height ?? 1600
  await image
    .extract({
      left: Math.round(width * 0.12),
      top: Math.round(height * 0.28),
      width: Math.round(width * 0.76),
      height: Math.round(height * 0.48),
    })
    .jpeg({ quality: 90 })
    .toFile(dest)
}

const stay = sharp(`${assets}/${files.stays}`)
const stayMeta = await stay.metadata()
const sw = stayMeta.width ?? 1600
const sh = stayMeta.height ?? 2000
const roomTop = Math.round(sh * 0.27)
const roomHeight = Math.round(sh * 0.16)
const rooms = [
  ['two-bed', 0.08, 0.3],
  ['one-bed', 0.36, 0.28],
  ['double', 0.66, 0.28],
]

for (const [name, left, width] of rooms) {
  await sharp(`${assets}/${files.stays}`)
    .extract({
      left: Math.round(sw * left),
      top: roomTop,
      width: Math.round(sw * width),
      height: roomHeight,
    })
    .jpeg({ quality: 90 })
    .toFile(`public/examples/stays/${name}.jpg`)
}

await copyFile(`${assets}/${files.stays}`, 'public/examples/stays/flyer.jpg')
console.log('brand assets installed')
