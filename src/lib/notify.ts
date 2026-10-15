type LeadPayload = {
  subject: string
  replyTo: string
  fields: Record<string, string>
}

function asMessage(fields: Record<string, string>) {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
}

export async function deliverLead({ subject, replyTo, fields }: LeadPayload) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  const webhook = process.env.AMBASSADOR_WEBHOOK_URL
  const message = asMessage(fields)
  let delivered = false

  if (accessKey) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: fields['Full Name'] || 'Bailaimos',
        email: replyTo,
        message,
        botcheck: fields.botcheck || '',
      }),
    })
    const result = (await response.json().catch(() => null)) as { success?: boolean } | null
    delivered = response.ok && result?.success === true
  }

  if (webhook) {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, replyTo, fields, receivedAt: new Date().toISOString() }),
    })
    delivered = delivered || response.ok
  }

  return delivered
}
