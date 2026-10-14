import { useParams, Link } from 'react-router-dom'
import { StatusBadge, EntryBadge } from '../components/Ledger.jsx'

const typeHint = {
  repo: 'The full project files, shared openly.',
  demo: 'Start at the project homepage — the live demo and downloads are linked below.',
  dataset: 'The open data behind the project.'
}

export default function EntryDetail({ entries }) {
  const { id } = useParams()
  const entry = entries.find((e) => String(e.id) === String(id))
  if (!entry) {
    return (
      <div style={{ padding: '40px 0' }}>
        <h2>We could not find that story</h2>
        <p>Stories you share are saved in this browser until they are published — this one may have been shared on another device.</p>
        <Link className="btn btn-ghost" to="/">
          Back to all stories
        </Link>
      </div>
    )
  }
  const isImage = /\.(png|jpe?g|gif|webp|avif)$/i.test(entry.attachmentUrl || '')
  return (
    <article style={{ paddingTop: 28 }}>
      <p className="ledger-meta">
        <StatusBadge status={entry.status} />
        <EntryBadge entry={entry} linked />
      </p>
      <h1 style={{ fontSize: 'clamp(30px, 4vw, 44px)' }}>{entry.title}</h1>

      {entry.humanQuote && (
        <div className="detail-quote-block">
          <blockquote>“{entry.humanQuote}”</blockquote>
          <p style={{ margin: 0, fontWeight: 700 }}>— {entry.humanName}</p>
        </div>
      )}

      <div className="detail-grid">
        <div>
          <div className="prose-block">
            <h3>The problem {entry.humanName.split(',')[0]} faced</h3>
            <p>{entry.problem}</p>
          </div>
          <div className="prose-block">
            <h3>What the project does about it</h3>
            <p>{entry.solution}</p>
          </div>
          <div className="prose-block">
            <h3>Who this helped</h3>
            <p>
              {entry.humanName}
              {entry.humanQuote
                ? ' — in their own words, above.'
                : '.'}
            </p>
          </div>
        </div>
        <aside>
          <div className="side-card highlight">
            <h3>{entry.kind === 'code' ? 'See the code' : 'Try it yourself'}</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
              {entry.kind === 'code'
                ? 'The open code itself — read it, run it, build on it.'
                : (typeHint[entry.artifactType] || 'The working project, shared openly.')}
            </p>
            <dl className="kv">
              <dt>Shared as</dt>
              <dd>{entry.artifactLicense}</dd>
            </dl>
            <a className="btn btn-primary" href={entry.artifactUrl} target="_blank" rel="noreferrer">
              Open the project
            </a>
            <p style={{ fontSize: 13, marginTop: 10, marginBottom: 0 }}>
              <a href={entry.artifactUrl} target="_blank" rel="noreferrer">
                {entry.artifactUrl}
              </a>
            </p>
            {(entry.extraLinks || []).map((l) => (
              <p key={l.url} style={{ fontSize: 14, marginTop: 10, marginBottom: 0 }}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.label} →
                </a>
              </p>
            ))}
          </div>
          {entry.attachmentUrl && (
            <div className="side-card">
              <h3>Photo or video</h3>
              {isImage ? (
                <img className="attachment" src={entry.attachmentUrl} alt="Photo from the project" />
              ) : (
                <a href={entry.attachmentUrl} target="_blank" rel="noreferrer">
                  Open the photo or video
                </a>
              )}
            </div>
          )}
          <Link className="btn btn-ghost" to="/">
            ← Back to all stories
          </Link>
        </aside>
      </div>
    </article>
  )
}
