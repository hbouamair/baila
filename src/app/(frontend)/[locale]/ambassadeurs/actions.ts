'use server'

import { getPayloadClient } from '@/lib/payload'

export type AmbassadorState = {
  status: 'idle' | 'success' | 'error'
}

export async function submitAmbassador(_prev: AmbassadorState, formData: FormData): Promise<AmbassadorState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const city = String(formData.get('city') || '').trim()
  const instagram = String(formData.get('instagram') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const locale = String(formData.get('locale') || 'fr')

  if (!name || !email || !city || !message) {
    return { status: 'error' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        locale,
        message: ['[Ambassador]', `City: ${city}`, instagram ? `Instagram: ${instagram}` : null, '', message]
          .filter(Boolean)
          .join('\n'),
      },
    })
    return { status: 'success' }
  } catch {
    return { status: 'error' }
  }
}
