'use server'

import { deliverLead } from '@/lib/notify'

export type AmbassadorState = {
  status: 'idle' | 'success' | 'error'
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim()
}

export async function submitAmbassador(_prev: AmbassadorState, formData: FormData): Promise<AmbassadorState> {
  if (text(formData, 'company')) {
    return { status: 'success' }
  }

  const name = text(formData, 'name')
  const email = text(formData, 'email')
  const whatsapp = text(formData, 'whatsapp')
  const city = text(formData, 'city')
  const instagram = text(formData, 'instagram')
  const community = text(formData, 'community')
  const communityOther = text(formData, 'communityOther')
  const people = text(formData, 'people')
  const promote = formData
    .getAll('promote')
    .map((item) => String(item))
    .filter(Boolean)
  const promoteOther = text(formData, 'promoteOther')
  const why = text(formData, 'why')
  const attend = text(formData, 'attend')
  const locale = text(formData, 'locale')

  if (!name || !email || !whatsapp || !city || !instagram || !people) {
    return { status: 'error' }
  }

  const communityLabel =
    community === 'other' && communityOther ? `Other: ${communityOther}` : community
  const promoteLabel = [
    ...promote.filter((item) => item !== 'other'),
    promote.includes('other') && promoteOther ? `Other: ${promoteOther}` : promote.includes('other') ? 'Other' : '',
  ]
    .filter(Boolean)
    .join(', ')

  const sent = await deliverLead({
    subject: `Bailaimos ambassador: ${name}`,
    replyTo: email,
    fields: {
      'Full Name': name,
      Email: email,
      WhatsApp: whatsapp,
      'City / Country': city,
      Instagram: instagram,
      Community: communityLabel,
      'People they can bring': people,
      Promotion: promoteLabel,
      Why: why,
      Attendance: attend,
      Locale: locale,
    },
  })

  return { status: sent ? 'success' : 'error' }
}
