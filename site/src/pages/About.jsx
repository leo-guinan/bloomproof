import { Link } from 'react-router-dom'

const FIVE_PARTS = [
  { term: 'Problem', gloss: 'A real human problem, stated plainly — not a hypothetical.' },
  { term: 'Solution', gloss: 'Working AI that does something about it — not a pitch deck.' },
  { term: 'Artifact', gloss: 'A link to the working thing: project files, a live demo, open data, or model weights.' },
  { term: 'Human', gloss: 'The person it helped — named, in their own words when possible.' },
  { term: 'License', gloss: 'Open, so anyone can check it, learn from it, and build on it.' }
]

const AUDIENCES = [
  { who: 'Visitors', why: 'Find tools that actually work, win arguments with skeptics, get ideas for your own builds.' },
  { who: 'Contributors', why: 'Share a story through the share form — or help make this site better.' },
  { who: 'Builders in the record', why: 'Recognition and distribution for work that genuinely matters.' },
  { who: 'Journalists & researchers', why: 'A citable public record where every claim links checkable evidence.' },
  { who: 'Funders', why: 'A map of what is actually working, so money can follow results.' }
]

const TERMS = [
  { term: 'AI', def: 'The word the world uses and searches for — so it is the word this project uses.' },
  { term: 'SI — Super Intelligence', def: 'Since September 2026, the US executive branch uses this in place of AI (Executive Order 14434). Same systems, new name.' },
  { term: 'SI — Synthetic Intelligence', def: 'Used by some builders who feel “artificial” sounds fake. Same technology, different framing.' },
  { term: 'AGI — Artificial General Intelligence', def: 'Human-level ability across domains. A goal, not a product.' },
  { term: 'ASI — Artificial Superintelligence', def: 'Systems smarter than humans at everything. Hypothetical — not what exists today.' }
]

export default function About() {
  return (
    <>
      <section className="hero">
        <span className="friendly-kicker">About Bloom Proof</span>
        <h1>Why this exists.</h1>
        <p className="lede">
          Hype is cheap and proof is rare. Bloom Proof exists to collect the proof: real
          projects, made by real people, that actually helped someone — each one checked
          by a human before it appears here.
        </p>
      </section>

      <div className="section-head">
        <h2>What makes it proof?</h2>
        <p>
          Every story tells what happened. But a story alone could be invented. The link is
          the evidence. You click it and check it yourself. That is the whole idea. Each
          story has five parts:
        </p>
      </div>
      <div className="guide-grid">
        {FIVE_PARTS.map((p) => (
          <article key={p.term} className="guide-card">
            <div className="guide-level">{p.term}</div>
            <p style={{ margin: 0, fontSize: 15 }}>{p.gloss}</p>
          </article>
        ))}
      </div>

      <div className="section-head">
        <h2>How it works</h2>
        <p>No working link, no story. Claims alone don&apos;t ship.</p>
      </div>
      <ol className="steps">
        <li>
          <span className="step-num" aria-hidden="true">1</span>
          <div>
            <b>Someone shares a story in plain words</b>
            <p>Who was helped, what the project does, and a link to try it.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">2</span>
          <div>
            <b>The checklist is the bar</b>
            <p>Real problem, working link, openly shared, human helped.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">3</span>
          <div>
            <b>A real person checks the link</b>
            <p>They open it, try it, and confirm it is shared openly. Then they publish it.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">4</span>
          <div>
            <b>Published stories appear on the site</b>
            <p>Each one joins the collection as proof. The record grows.</p>
          </div>
        </li>
      </ol>
      <div className="form-note" style={{ marginTop: 16 }}>
        Anyone can copy the whole collection and host their own version, free. No
        permission needed. The more copies exist, the less any single shutdown matters.
      </div>

      <div className="section-head">
        <h2>Who it is for</h2>
      </div>
      <ul className="audience-list">
        {AUDIENCES.map((a) => (
          <li key={a.who}>
            <b>{a.who}</b>
            <span>{a.why}</span>
          </li>
        ))}
      </ul>

      <div className="section-head">
        <h2>Money and capture</h2>
        <p>
          There is nothing to buy. The code is MIT, the content is CC BY-SA 4.0 — no
          equity, no tokens, no board seats, no control for sale.
        </p>
      </div>
      <div className="review-promise">
        Funding is welcome as grants, no-strings sponsorships — or better yet, direct
        support to the projects <em>in</em> the record rather than the record itself. The
        record stays un-capturable. That is a founding principle, not a negotiating position.
      </div>

      <div className="section-head">
        <h2>A note on words: AI, SI, AGI, ASI</h2>
        <p>You will meet different terms in different places. Here is how they relate:</p>
      </div>
      <dl className="terms">
        {TERMS.map((t) => (
          <div key={t.term}>
            <dt>{t.term}</dt>
            <dd>{t.def}</dd>
          </div>
        ))}
      </dl>
      <p>The work is the same whatever you call it.</p>

      <div className="section-head">
        <h2>Where this is going</h2>
        <p>Destinations, not promises. Each phase begins only when the one before it earns it.</p>
      </div>
      <ol className="steps">
        <li className="phase-active">
          <span className="step-num" aria-hidden="true">1</span>
          <div>
            <p className="phase-label">Phase 1 · Now <span className="phase-now">You are here</span></p>
            <b>The record</b>
            <p>Collect stories. Grow the proof.</p>
            <p className="phase-trigger">Active now — every published story moves it forward.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">2</span>
          <div>
            <p className="phase-label">Phase 2 · Next</p>
            <b>The standard</b>
            <p>“Bloom Proof verified” becomes a mark projects want, quoted by press and researchers.</p>
            <p className="phase-trigger">Begins when the collection is big enough that projects ask for the badge.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">3</span>
          <div>
            <p className="phase-label">Phase 3 · Later</p>
            <b>The map</b>
            <p>Funders and builders work from it. Support flows to what works.</p>
            <p className="phase-trigger">Begins when funders start working from the record.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">4</span>
          <div>
            <p className="phase-label">Phase 4 · The long game</p>
            <b>The permanent layer</b>
            <p>Copies everywhere. Nothing to shut down.</p>
            <p className="phase-trigger">Arrives when independent mirrors and decentralized copies actually exist.</p>
          </div>
        </li>
      </ol>

      <div className="closing">
        <p>
          In ten years, when someone asks “is AI good for the world?”, the answer
          isn&apos;t an essay. It&apos;s bloomproof.org.
        </p>
        <p style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to="/submit">
            Add your proof
          </Link>
          <Link className="btn btn-ghost" to="/">
            Read the stories
          </Link>
        </p>
      </div>
    </>
  )
}
