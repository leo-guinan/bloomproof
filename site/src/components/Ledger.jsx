import { Link } from 'react-router-dom'

export function StatusBadge({ status }) {
  if (status === 'pending') return <span className="badge badge-pending">In review</span>
  return <span className="badge badge-reviewed">Reviewed &amp; published</span>
}

export default function Ledger({ entries }) {
  if (!entries.length) {
    return <p>Nothing matches that search. Try simpler words — or be the first to share this story.</p>
  }
  return (
    <div className="ledger">
      {entries.map((e) => (
        <Link key={e.id} className="ledger-row" to={`/proof/${e.id}`}>
          <span>
            <span className="ledger-title">{e.title}</span>
            <span className="ledger-meta">
              {e.kind === 'app' ? (
                <span className="tag tag-app">Get the app</span>
              ) : (
                <span className="tag tag-live">See it live</span>
              )}
              <span>{e.humanName}</span>
              <StatusBadge status={e.status} />
            </span>
          </span>
          <span className="ledger-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  )
}
