'use server'

import { getPayloadClient } from '@/lib/payload'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const locale = String(formData.get('locale') || 'fr')

  if (!name || !email || !message) {
    return { status: 'error' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, message, locale },
    })
    return { status: 'success' }
  } catch {
    return { status: 'error' }
  }
}
