import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitEntry } from '../lib/store.js'

// Single place to change where emailed submissions go.
const OWNER_EMAIL = 'hello@bloomproof.org'

const ISSUE_BASE = 'https://github.com/ttyyjjkkoott/bloomproof/issues/new'
const ISSUES_URL = 'https://github.com/ttyyjjkkoott/bloomproof/issues'

const OPEN_LICENSES = ['MIT', 'Apache-2.0', 'CC BY-SA 4.0', 'CC0', 'GPL-3.0', 'Other open license']

const empty = {
  title: '',
  problem: '',
  solution: '',
  liveSiteUrl: '',
  codeUrl: '',
  artifactType: 'demo',
  artifactLicense: 'MIT',
  humanName: '',
  humanQuote: '',
  mediaUrl: ''
}

function validate(v) {
  const errors = {}
  if (v.title.trim().length < 8) errors.title = 'Give it a clear name (at least 8 characters).'
  if (v.problem.trim().length < 30) errors.problem = 'Tell us a bit more — a sentence or two about the problem.'
  if (v.solution.trim().length < 30) errors.solution = 'Tell us a bit more — a sentence or two about what the project does.'
  if (v.liveSiteUrl.trim() && !/^https?:\/\/.+\..+/.test(v.liveSiteUrl.trim())) errors.liveSiteUrl = 'That does not look like a link — it should start with http(s).'
  if (!/^https?:\/\/.+\..+/.test(v.codeUrl.trim())) errors.codeUrl = 'We need a link to the open code or dataset, starting with http(s).'
  if (!v.artifactLicense.trim()) errors.artifactLicense = 'Please pick the open license your project uses.'
  if (v.humanName.trim().length < 2) errors.humanName = 'Who did this help? A first name and what they do is perfect.'
  if (v.mediaUrl.trim() && !/^https?:\/\/.+\..+/.test(v.mediaUrl.trim())) errors.mediaUrl = 'That does not look like a link — it should start with http(s).'
  return errors
}

function buildMarkdown(v) {
  const lines = [
    `# ${v.title.trim()}`,
    '',
    '## Problem',
    '',
    v.problem.trim(),
    '',
    '## Solution',
    '',
    v.solution.trim(),
    '',
    '## Artifact',
    '',
    `- Type: ${v.artifactType}`,
    `- Code: ${v.codeUrl.trim()}`,
    `- Open license: ${v.artifactLicense.trim()}`
  ]
  if (v.liveSiteUrl.trim()) lines.push(`- Live site / App: ${v.liveSiteUrl.trim()}`)
  if (v.mediaUrl.trim()) lines.push(`- Media: ${v.mediaUrl.trim()}`)
  lines.push('', '## Human', '', v.humanName.trim())
  if (v.humanQuote.trim()) lines.push('', `> ${v.humanQuote.trim()}`)
  lines.push('', '## License', '', v.artifactLicense.trim(), '')
  return lines.join('\n')
}

function issueUrl(v) {
  const title = `New submission: ${v.title.trim()}`
  return `${ISSUE_BASE}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(buildMarkdown(v))}`
}

function mailtoUrl(v) {
  const subject = `New submission: ${v.title.trim()}`
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMarkdown(v))}`
}

export default function Submit({ onAdded }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [failure, setFailure] = useState('')
  const [saved, setSaved] = useState(null)

  function set(key, val) {
    setValues((v) => ({ ...v, [key]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFailure('')
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) return
    try {
      const liveSite = values.liveSiteUrl.trim()
      const entry = await submitEntry({
        ...values,
        attachmentUrl: values.mediaUrl.trim(),
        artifactUrl: liveSite || values.codeUrl.trim(),
        extraLinks: liveSite ? [{ label: 'Code', url: values.codeUrl.trim() }] : [],
        kind: liveSite ? 'live' : 'code'
      })
      onAdded(entry)
      setSaved(entry)
      window.open(issueUrl(values), '_blank', 'noopener')
    } catch (err) {
      setFailure(err.message || 'Something went wrong sending your story. Please try again.')
    }
  }

  if (saved) {
    return (
      <div className="form-shell">
        <div className="success-box">
          <h2>One last step — press Send in the new tab</h2>
          <p>
            <strong>What just happened:</strong> your story “{saved.title}” opened as a
            draft on GitHub in a new tab, all filled in. Press the Submit button on that
            page and it is on its way. (Nothing sent yet — the draft is waiting for you.)
          </p>
          <p style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={issueUrl(values)} target="_blank" rel="noreferrer">
              Open my draft
            </a>
            <a className="btn btn-ghost" href={mailtoUrl(values)}>
              or email it instead
            </a>
          </p>
          <p>
            Prefer email? Send your story to{' '}
            <a href={mailtoUrl(values)}>hello@bloomproof.org</a> — same thing, no account needed.
          </p>
          <p>
            Want to check it landed?{' '}
            <a href={ISSUES_URL} target="_blank" rel="noreferrer">
              See all submissions here
            </a>
            .
          </p>
          <div className="review-promise">
            <strong>What happens next:</strong> a real person reads it, checks your link,
            and publishes it — usually within a few days.
          </div>
          <p>
            <Link className="section-link" to="/">
              Back to all stories →
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-shell">
      <div style={{ paddingTop: 28 }}>
        <h1 style={{ fontSize: 'clamp(30px, 4vw, 42px)' }}>Share your project</h1>
        <p className="lede">
          Built something with AI that helped a real person? Tell us in plain words — about
          10 minutes. A real human reads every submission.
        </p>
        <p><span className="backend-badge">Reviewed by a human before publishing</span></p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <h3>1. The person and the problem</h3>
          <p>Start with the human. Who were they, and what was getting in their way?</p>
          <div className="field">
            <label htmlFor="title">What should we call this story?</label>
            <input id="title" value={values.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. A plant doctor in every farmer's pocket" />
            {errors.title && <div className="field-error">{errors.title}</div>}
          </div>
          <div className="field">
            <label htmlFor="problem">What problem did they have?</label>
            <textarea id="problem" value={values.problem} onChange={(e) => set('problem', e.target.value)} placeholder="A sentence or two, in everyday words…" />
            {errors.problem && <div className="field-error">{errors.problem}</div>}
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="humanName">Who did it help?</label>
              <input id="humanName" value={values.humanName} onChange={(e) => set('humanName', e.target.value)} placeholder="First name, what they do" />
              {errors.humanName && <div className="field-error">{errors.humanName}</div>}
            </div>
            <div className="field">
              <label htmlFor="humanQuote">What did they say about it? <span className="hint">— optional, and it is the best part</span></label>
              <input id="humanQuote" value={values.humanQuote} onChange={(e) => set('humanQuote', e.target.value)} placeholder="Their own words, if you have them" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <h3>2. The project itself</h3>
          <p>This is the proof: the open code, plus a live site or app link if there is one.</p>
          <div className="field">
            <label htmlFor="solution">What does your project do?</label>
            <textarea id="solution" value={values.solution} onChange={(e) => set('solution', e.target.value)} placeholder="Explain it like you would to a neighbor…" />
            {errors.solution && <div className="field-error">{errors.solution}</div>}
          </div>
          <div className="field">
            <label htmlFor="liveSiteUrl">Link to the live site or app, if there is one — where can anyone see it working right now? (Leave blank if it's code only.)</label>
            <input id="liveSiteUrl" inputMode="url" value={values.liveSiteUrl} onChange={(e) => set('liveSiteUrl', e.target.value)} placeholder="https://…" />
            {errors.liveSiteUrl && <div className="field-error">{errors.liveSiteUrl}</div>}
          </div>
          <div className="field">
            <label htmlFor="codeUrl">Link to the code — the open-source repo (or open dataset).</label>
            <input id="codeUrl" inputMode="url" value={values.codeUrl} onChange={(e) => set('codeUrl', e.target.value)} placeholder="https://…" />
            {errors.codeUrl && <div className="field-error">{errors.codeUrl}</div>}
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="artifactType">What is at that link?</label>
              <select id="artifactType" value={values.artifactType} onChange={(e) => set('artifactType', e.target.value)}>
                <option value="demo">A page I can open and try</option>
                <option value="repo">Project files to download</option>
                <option value="dataset">Open data</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="artifactLicense">How is it shared?</label>
              <select id="artifactLicense" value={values.artifactLicense} onChange={(e) => set('artifactLicense', e.target.value)}>
                {OPEN_LICENSES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              {errors.artifactLicense && <div className="field-error">{errors.artifactLicense}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <h3>3. Anything to show? <span className="hint" style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 400 }}>— optional</span></h3>
          <p>A photo or video helps people believe — and understand — your story.</p>
          <div className="field">
            <label htmlFor="mediaUrl">Link to a photo or video (optional)</label>
            <input id="mediaUrl" inputMode="url" value={values.mediaUrl} onChange={(e) => set('mediaUrl', e.target.value)} placeholder="https://…" />
            {errors.mediaUrl && <div className="field-error">{errors.mediaUrl}</div>}
          </div>
        </div>

        <div className="review-promise">
          <strong>What happens next:</strong> A real person reads it, checks your link, and
          publishes it — usually within a few days.
        </div>

        {failure && <div className="field-error" style={{ marginBottom: 12 }}>{failure}</div>}
        <button className="btn btn-primary" type="submit">
          Send for review
        </button>
      </form>
    </div>
  )
}
