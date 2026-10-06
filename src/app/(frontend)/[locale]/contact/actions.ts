'use server'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    return { status: 'error' }
  }

  return { status: 'success' }
}
