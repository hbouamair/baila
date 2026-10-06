export function CmsText({ data }: { data: unknown }) {
  if (typeof data === 'string' && data.trim()) {
    return <p>{data}</p>
  }

  return null
}
