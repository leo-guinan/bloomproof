import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Ledger from '../components/Ledger.jsx'

function initials(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const avatarTones = ['', 'clay', 'gold']

// Plain #anchor links would be hijacked as routes by HashRouter,
// so section jumps scroll without touching the URL hash.
function scrollToSection(id) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

export default function Home({ entries }) {
  const [query, setQuery] = useState('')
  const featured = [...entries]
    .filter((e) => e.status !== 'pending')
    .sort(
      (a, b) =>
        (b.createdAt || '').localeCompare(a.createdAt || '') ||
        String(b.number).localeCompare(String(a.number))
    )
    .slice(0, 3)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter((e) =>
      [e.title, e.problem, e.solution, e.humanName].join(' ').toLowerCase().includes(q)
    )
  }, [entries, query])

  return (
    <>
      <section className="hero">
        <span className="friendly-kicker">Real people · Real projects · Real proof</span>
        <h1>
          Is AI actually helping anyone? <span className="answer">Yes — meet them.</span>
        </h1>
        <p className="lede">
          The internet is full of AI hype, and it is hard to tell what is real. So this site
          keeps one simple promise: every story here links to a real project you can click,
          try, and learn from — checked by a human before it appears.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="#stories"
            onClick={(e) => { e.preventDefault(); scrollToSection('stories') }}
          >
            See real stories
          </a>
          <Link className="btn btn-ghost" to="/submit">
            Share your project
          </Link>
        </div>
        <p className="micro-trust">Free forever · No ads · No hype · Reviewed by real people</p>
        <div className="trust-strip">
          <div>
            <b>{entries.length}</b>
            <span>real stories published</span>
          </div>
          <div>
            <b>100%</b>
            <span>checked by a human first</span>
          </div>
        </div>
      </section>

      <div className="section-head" id="stories">
        <h2>People AI actually helped</h2>
        <p>Not promises. Not demos of demos. Each of these is a person, a problem, and a project that works.</p>
      </div>
      <div className="story-grid">
        {featured.map((e, i) => (
          <Link key={e.id} className="story-card" to={`/proof/${e.id}`}>
            {e.humanQuote ? (
              <p className="story-quote">{e.humanQuote}</p>
            ) : (
              <p className="story-quote">{e.title}</p>
            )}
            <div className="story-person">
              <span className={`avatar ${avatarTones[i % avatarTones.length]}`} aria-hidden="true">
                {initials(e.humanName)}
              </span>
              <div>
                <b>{e.humanName}</b>
                <span>{e.status === 'pending' ? 'Story in review' : 'Verified story'}</span>
              </div>
            </div>
            <p className="story-title">
              <strong>{e.title}</strong> — read the story →
            </p>
          </Link>
        ))}
        <a
          className="story-card see-all"
          href="#browse"
          onClick={(e) => { e.preventDefault(); scrollToSection('browse') }}
        >
          <span className="see-all-text">See all {entries.length} stories →</span>
        </a>
      </div>

      <div className="section-head">
        <h2>Got a project of your own? Here is what happens</h2>
        <p>Sharing takes about 10 minutes. You write in plain words — no pitch, no jargon.</p>
      </div>
      <ol className="steps">
        <li>
          <span className="step-num" aria-hidden="true">1</span>
          <div>
            <b>You tell us about it</b>
            <p>Who you helped, what the project does, and a link where anyone can try it.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">2</span>
          <div>
            <b>A real person reviews it</b>
            <p>We click your link, check it works, and make sure it is openly shared.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">3</span>
          <div>
            <b>We publish your story</b>
            <p>It joins the collection as proof — with your name on it, free for all.</p>
          </div>
        </li>
      </ol>
      <p style={{ marginTop: 16 }}>
        <Link className="btn btn-primary" to="/submit">
          Start sharing — it takes 10 minutes
        </Link>
      </p>

      <div className="section-head" id="browse">
        <h2>Browse every story</h2>
        <p>Search by person, problem, or place. Everything below was — or is being — checked by a human.</p>
      </div>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Try “rainforest”, “cassava”, “rangers”…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search stories"
        />
      </div>
      <Ledger entries={filtered} />

      <div className="section-head">
        <h2>Fair questions</h2>
      </div>
      <div className="faq">
        <details open>
          <summary>Is this just more AI hype?</summary>
          <p>
            That is exactly the problem we are solving. We publish nothing without a working
            project behind it — something you can click and try. If the link does not work,
            the story does not ship.
          </p>
        </details>
        <details>
          <summary>What counts as proof?</summary>
          <p>
            Three things: a real person with a real problem, an AI project that helped them,
            and a link to the working thing, shared openly so anyone can learn from it.
          </p>
        </details>
        <details>
          <summary>Who decides what gets published?</summary>
          <p>
            Human reviewers, out in the open. They click every link and check every story
            before it appears. Nothing here is auto-published by an algorithm.
          </p>
        </details>
        <details>
          <summary>Does it cost anything to share or read?</summary>
          <p>
            No. Reading is free, sharing is free, and the whole collection is open for
            anyone to copy. Every independent copy makes it harder to shut down.
          </p>
        </details>
      </div>
    </>
  )
}
