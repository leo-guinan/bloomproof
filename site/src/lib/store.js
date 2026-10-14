import { seedEntries } from '../data/seedEntries.js'

const LOCAL_KEY = 'bloom-proof-submissions-v1'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  } catch {
    return []
  }
}

function writeLocal(rows) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(rows))
}

function toEntry(row) {
  return {
    id: row.id,
    number: row.number || '—',
    title: row.title,
    problem: row.problem,
    solution: row.solution,
    artifactType: row.artifactType || 'demo',
    artifactUrl: row.artifactUrl || '',
    artifactLicense: row.artifactLicense || '',
    humanName: row.humanName || '',
    humanQuote: row.humanQuote || '',
    attachmentUrl: row.attachmentUrl || '',
    extraLinks: row.extraLinks || [],
    origin: row.origin || 'community',
    kind: row.kind || 'live',
    status: row.status || 'published',
    createdAt: row.createdAt || new Date().toISOString()
  }
}

export async function loadEntries() {
  const local = readLocal().map(toEntry)
  return [...local].reverse().concat(seedEntries)
}

export async function submitEntry(values) {
  const rows = readLocal()
  const entry = toEntry({
    id: `local-${Date.now()}`,
    number: `L-${String(rows.length + 1).padStart(2, '0')}`,
    title: values.title.trim(),
    problem: values.problem.trim(),
    solution: values.solution.trim(),
    artifactUrl: values.artifactUrl.trim(),
    artifactType: values.artifactType,
    artifactLicense: values.artifactLicense.trim(),
    humanName: values.humanName.trim(),
    humanQuote: values.humanQuote.trim(),
    attachmentUrl: values.attachmentUrl || '',
    extraLinks: values.extraLinks || [],
    kind: values.kind || 'live',
    origin: 'community',
    status: 'pending',
    createdAt: new Date().toISOString()
  })
  rows.push(entry)
  writeLocal(rows)
  return entry
}
