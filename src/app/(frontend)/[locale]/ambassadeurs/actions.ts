'use server'

export type AmbassadorState = {
  status: 'idle' | 'success' | 'error'
}

export async function submitAmbassador(_prev: AmbassadorState, formData: FormData): Promise<AmbassadorState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const city = String(formData.get('city') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !city || !message) {
    return { status: 'error' }
  }

  return { status: 'success' }
}
