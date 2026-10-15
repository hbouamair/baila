'use client'

import { useState, type FormEvent } from 'react'

export default function AdminLoginPage() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const password = String(new FormData(event.currentTarget).get('password') || '')
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (response.ok) {
      window.location.href = '/admin'
      return
    }
    setPending(false)
    if (response.status === 503) {
      setError('Studio is not configured on this host. Add ADMIN_PASSWORD in Vercel, then Redeploy.')
      return
    }
    setError('Wrong password.')
  }

  return (
    <main className="studio studio-login">
      <form onSubmit={onSubmit}>
        <p className="studio-word">Bailaimos</p>
        <h1>Studio</h1>
        <p className="studio-kicker">Marrakech · 20-24 May 2027</p>
        <label>
          Password
          <input required type="password" name="password" autoComplete="current-password" />
        </label>
        <button type="submit" disabled={pending} className="studio-btn">
          {pending ? 'Entering' : 'Enter'}
        </button>
        {error ? <p className="studio-error">{error}</p> : null}
      </form>
    </main>
  )
}
