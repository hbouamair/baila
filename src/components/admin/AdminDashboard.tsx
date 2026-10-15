'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { downloadAmbassadorsExcel } from '@/lib/ambassador-export'
import type { AmbassadorRow, SiteEventRow } from '@/lib/supabase'

const statuses = ['new', 'reviewing', 'accepted', 'declined'] as const
const PAGE_SIZE = 10

function countBy(rows: string[]) {
  const map = new Map<string, number>()
  for (const key of rows) {
    if (!key) continue
    map.set(key, (map.get(key) || 0) + 1)
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1])
}

function When({ value }: { value: string }) {
  const [text, setText] = useState('')
  useEffect(() => {
    setText(
      new Date(value).toLocaleString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [value])
  return <>{text}</>
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((part) => part[0]?.toUpperCase() || '').join('') || '?'
}

function dayBars(dates: string[], days = 14) {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - (days - 1))
  return Array.from({ length: days }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
    const count = dates.filter((value) => value.slice(0, 10) === key).length
    return { key, count, label: String(day.getDate()) }
  })
}

function pageNumbers(current: number, total: number) {
  const size = 5
  let start = Math.max(1, current - 2)
  const end = Math.min(total, start + size - 1)
  start = Math.max(1, end - size + 1)
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

function peopleCount(value: string) {
  const nums = (value.match(/\d+/g) || []).map(Number)
  if (!nums.length) return 0
  if (nums.length >= 2) return Math.round((nums[0] + nums[1]) / 2)
  return nums[0]
}

function MixList({ items }: { items: [string, number][] }) {
  if (!items.length) return <p className="studio-empty">Nothing here yet.</p>
  return (
    <div>
      {items.map(([label, n]) => (
        <div key={label} className="studio-mix-row">
          <span>{label}</span>
          <strong>{n}</strong>
        </div>
      ))}
    </div>
  )
}

export function AdminDashboard({
  applications,
  events,
  now,
}: {
  applications: AmbassadorRow[]
  events: SiteEventRow[]
  now: number
}) {
  const [rows, setRows] = useState(applications)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [view, setView] = useState<'people' | 'pulse'>('people')
  const [openId, setOpenId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [ready, setReady] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (status !== 'all' && row.status !== status) return false
      if (!q) return true
      return [row.name, row.email, row.city, row.instagram, row.whatsapp, row.community]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [query, rows, status])

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const from = visible.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const to = Math.min(currentPage * PAGE_SIZE, visible.length)
  const paged = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const selected = openId ? rows.find((row) => row.id === openId) || null : null

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [query, status])

  const weekAgo = now - 7 * 24 * 60 * 60 * 1000
  const weekApps = rows.filter((row) => new Date(row.created_at).getTime() >= weekAgo).length

  useEffect(() => {
    if (!selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [selected])

  const statusMix = statuses.map((item) => [item, rows.filter((row) => row.status === item).length] as const)
  const appBars = dayBars(rows.map((row) => row.created_at))
  const maxBar = Math.max(1, ...appBars.map((item) => item.count))

  async function setRowStatus(id: string, next: AmbassadorRow['status']) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status: next } : row)))
    await fetch('/api/admin/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: next }),
    })
  }

  const waiting = rows.filter((row) => row.status === 'new')
  const accepted = rows.filter((row) => row.status === 'accepted').length
  const cities = countBy(rows.map((row) => row.city))
  const reach = rows.reduce((sum, row) => sum + peopleCount(row.people || row.people_value), 0)
  const weekViews = events.filter((row) => new Date(row.created_at).getTime() >= weekAgo).length
  const todayKey = new Date(now).toISOString().slice(0, 10)
  const todayViews = events.filter((row) => row.created_at.slice(0, 10) === todayKey).length
  const viewBars = dayBars(events.map((row) => row.created_at))
  const maxViewBar = Math.max(1, ...viewBars.map((item) => item.count))
  const topPages = countBy(events.map((row) => row.path)).slice(0, 6)
  const visitorLangs = countBy(events.map((row) => row.locale || 'unknown'))
  const communities = countBy(rows.map((row) => row.community || row.community_value)).slice(0, 6)
  const attendance = countBy(rows.map((row) => row.attend || row.attend_value))
  const promote = countBy(rows.flatMap((row) => (row.promote_values?.length ? row.promote_values : [row.promote].filter(Boolean)))).slice(0, 6)

  return (
    <div className="studio studio-app">
      <header className="studio-bar">
        <p className="studio-word">Bailaimos</p>
        <nav>
          <button type="button" className={view === 'people' ? 'is-on' : undefined} onClick={() => setView('people')}>
            Applications
          </button>
          <button type="button" className={view === 'pulse' ? 'is-on' : undefined} onClick={() => setView('pulse')}>
            Pulse
          </button>
        </nav>
        <div className="studio-bar-end">
          {view === 'people' ? (
            <>
              <input
                className="studio-search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                placeholder="Search"
                aria-label="Search name, city, Instagram, WhatsApp"
              />
              <select
                className="studio-select"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value)
                  setPage(1)
                }}
                aria-label="Filter by status"
              >
                <option value="all">Every status</option>
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="studio-btn"
                onClick={() => downloadAmbassadorsExcel(visible, { total: rows.length, query, status })}
              >
                Export Excel
              </button>
            </>
          ) : null}
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="studio-signout">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="studio-shell">
        <p className="studio-kicker">Marrakech · 20-24 May 2027</p>
        <h1>{view === 'people' ? 'Applications' : 'Pulse'}</h1>

        {view === 'pulse' ? (
          <section className="studio-metrics">
            <article>
              <span>Waiting</span>
              <b>{waiting.length}</b>
            </article>
            <article>
              <span>Accepted</span>
              <b>{accepted}</b>
            </article>
            <article>
              <span>Cities</span>
              <b>{cities.length}</b>
            </article>
            <article>
              <span>People they can bring</span>
              <b>{reach}</b>
            </article>
            <article>
              <span>Views this week</span>
              <b suppressHydrationWarning>{weekViews}</b>
            </article>
          </section>
        ) : (
          <>
            <section className="studio-metrics">
              <article>
                <span>Files</span>
                <b>{rows.length}</b>
              </article>
              <article>
                <span>This week</span>
                <b suppressHydrationWarning>{weekApps}</b>
              </article>
              <article>
                <span>In this view</span>
                <b>{visible.length}</b>
              </article>
              <article>
                <span>Page views</span>
                <b>{events.length}</b>
              </article>
            </section>
            <p className="studio-rail">
              {statusMix.map(([label, n]) => (
                <span key={label}>
                  <b>{n}</b> {label}
                </span>
              ))}
            </p>
          </>
        )}

        {view === 'pulse' ? (
          <div className="studio-pulse">
            <section className="studio-pulse-split">
              <article>
                <h2>Need a look</h2>
                <p className="studio-lead">
                  {waiting.length ? `${waiting.length} new files waiting` : 'No new files waiting'}
                </p>
                {waiting.length === 0 ? (
                  <p className="studio-empty">Inbox is clear.</p>
                ) : (
                  <ul className="studio-wait">
                    {waiting.slice(0, 6).map((row) => (
                      <li key={row.id}>
                        <button type="button" onClick={() => setOpenId(row.id)}>
                          <span>
                            <b>{row.name}</b>
                            <small>
                              {row.city} · {row.people}
                            </small>
                          </span>
                          Open
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
              <article>
                <h2>Where they are</h2>
                <p className="studio-lead">Cities on the files</p>
                <MixList items={cities.slice(0, 8)} />
              </article>
            </section>

            <section className="studio-pulse-split">
              <article>
                <h2>Site, 14 days</h2>
                <p className="studio-lead">
                  {todayViews} today · {weekViews} this week · {events.length} in 30 days
                </p>
                <div className="studio-chart" aria-hidden>
                  {viewBars.map((item) => (
                    <span key={item.key}>
                      <i style={{ height: `${Math.max(8, (item.count / maxViewBar) * 100)}%` }} />
                      {item.label}
                    </span>
                  ))}
                </div>
              </article>
              <article>
                <h2>Applications, 14 days</h2>
                <p className="studio-lead">{weekApps} arrived this week</p>
                <div className="studio-chart" aria-hidden>
                  {appBars.map((item) => (
                    <span key={item.key}>
                      <i style={{ height: `${Math.max(8, (item.count / maxBar) * 100)}%` }} />
                      {item.label}
                    </span>
                  ))}
                </div>
              </article>
            </section>

            <section className="studio-pulse-mix">
              <article>
                <h2>Pages</h2>
                <p className="studio-lead">What people open</p>
                <MixList items={topPages} />
              </article>
              <article>
                <h2>Visitor language</h2>
                <p className="studio-lead">Site locale</p>
                <MixList items={visitorLangs} />
              </article>
              <article>
                <h2>Communities</h2>
                <p className="studio-lead">How they describe themselves</p>
                <MixList items={communities} />
              </article>
              <article>
                <h2>Attendance</h2>
                <p className="studio-lead">Can they come</p>
                <MixList items={attendance} />
              </article>
              <article>
                <h2>How they promote</h2>
                <p className="studio-lead">Channels they named</p>
                <MixList items={promote} />
              </article>
              <article>
                <h2>Form language</h2>
                <p className="studio-lead">Application locale</p>
                <MixList items={countBy(rows.map((row) => row.locale))} />
              </article>
            </section>
          </div>
        ) : (
          <div className="studio-people">
            {visible.length === 0 ? (
              <p className="studio-empty">No applications match this search.</p>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Person</th>
                      <th>Contact</th>
                      <th>City</th>
                      <th>People</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((row) => (
                      <tr
                        key={row.id}
                        className={openId === row.id ? 'is-on' : undefined}
                        onClick={() => setOpenId(row.id)}
                      >
                        <td>
                          <span className="studio-who">
                            <span className="studio-avatar">{initials(row.name)}</span>
                            <span>
                              <span className="studio-name">{row.name}</span>
                              <span className="studio-sub">{row.instagram}</span>
                            </span>
                          </span>
                        </td>
                        <td>
                          {row.email}
                          <span className="studio-sub">{row.whatsapp}</span>
                        </td>
                        <td>{row.city}</td>
                        <td>{row.people}</td>
                        <td>
                          <span className={`studio-status ${row.status}`}>
                            <i />
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <When value={row.created_at} />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="studio-view"
                            onClick={(event) => {
                              event.stopPropagation()
                              setOpenId(row.id)
                            }}
                          >
                            Open
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav className="studio-pager" aria-label="Applications pages">
                  <p>
                    {from}-{to} of {visible.length}
                  </p>
                  <div>
                    <button type="button" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
                      Prev
                    </button>
                    {pageNumbers(currentPage, pageCount).map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={n === currentPage ? 'is-on' : undefined}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    <button type="button" disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}>
                      Next
                    </button>
                  </div>
                </nav>
              </>
            )}
          </div>
        )}
      </div>

      {ready && selected
        ? createPortal(
            <div className="studio-folio-root" role="presentation">
              <button
                type="button"
                className="studio-folio-scrim"
                aria-label="Close application"
                onClick={() => setOpenId(null)}
              />
              <div
                className="studio-folio"
                role="dialog"
                aria-modal="true"
                aria-labelledby="studio-app-title"
                key={selected.id}
              >
                <header className="studio-folio-head">
                  <span className={`studio-status ${selected.status}`}>
                    <i />
                    {selected.status}
                  </span>
                  <button
                    ref={closeRef}
                    type="button"
                    className="studio-folio-close"
                    aria-label="Close"
                    onClick={() => setOpenId(null)}
                  >
                    Close
                  </button>
                  <h2 id="studio-app-title">{selected.name}</h2>
                  <p>
                    {selected.city} · <When value={selected.created_at} />
                  </p>
                </header>

                <div className="studio-folio-reach">
                  <a href={`mailto:${selected.email}`}>
                    <small>Email</small>
                    {selected.email}
                  </a>
                  <a href={`https://wa.me/${selected.whatsapp.replace(/\D/g, '')}`}>
                    <small>WhatsApp</small>
                    {selected.whatsapp}
                  </a>
                  <a href={`https://instagram.com/${selected.instagram.replace(/^@/, '')}`}>
                    <small>Instagram</small>
                    {selected.instagram}
                  </a>
                </div>

                <dl className="studio-folio-list">
                  <div>
                    <dt>Community</dt>
                    <dd>{selected.community || '-'}</dd>
                  </div>
                  <div>
                    <dt>People they can bring</dt>
                    <dd>{selected.people || '-'}</dd>
                  </div>
                  <div>
                    <dt>Attendance</dt>
                    <dd>{selected.attend || '-'}</dd>
                  </div>
                  <div>
                    <dt>Form language</dt>
                    <dd>{selected.locale || '-'}</dd>
                  </div>
                  <div className="wide">
                    <dt>How they promote</dt>
                    <dd>{selected.promote || '-'}</dd>
                  </div>
                </dl>

                <section className="studio-folio-why">
                  <h3>Why they applied</h3>
                  <p>{selected.why || 'No note yet.'}</p>
                </section>

                <div className="studio-folio-status">
                  <p>Set status</p>
                  <div>
                    {statuses.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={selected.status === item ? 'is-on' : undefined}
                        onClick={() => void setRowStatus(selected.id, item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
