// Pagination shared by the Home page and the build-time prerender, so the
// page count can never drift between them.
export const PAGE_SIZE = 10

// Browse order: newest first. Pending community drafts (client-only) come
// first by creation time, then published entries by entry number — numbers
// are assigned chronologically and never reused.
export function compareBrowse(a, b) {
  const pa = a.status === 'pending' ? 0 : 1
  const pb = b.status === 'pending' ? 0 : 1
  if (pa !== pb) return pa - pb
  if (pa === 0) return String(b.createdAt || '').localeCompare(String(a.createdAt || ''))
  return String(b.number).localeCompare(String(a.number), undefined, { numeric: true })
}

export function totalPages(count) {
  return Math.max(1, Math.ceil(count / PAGE_SIZE))
}

export function pageSlice(list, page) {
  const start = (page - 1) * PAGE_SIZE
  return list.slice(start, start + PAGE_SIZE)
}

export function clampPage(num, count) {
  if (!Number.isFinite(num) || num < 1) return 1
  return Math.min(num, totalPages(count))
}
