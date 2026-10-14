import { Link } from 'react-router-dom'

const REPO = 'https://github.com/ttyyjjkkoott/bloomproof'

export default function Developers() {
  return (
    <>
      <div style={{ paddingTop: 28 }}>
        <span className="friendly-kicker">For developers</span>
        <h1 style={{ fontSize: 'clamp(30px, 4vw, 44px)' }}>How the record is built</h1>
        <p className="lede">
          Everything lives in one public repo. No servers, no database — just files,
          pull requests, and two gates: automated checks confirm the format (all five
          sections present, links alive), and a human confirms it&apos;s real before
          anything publishes.
        </p>
        <p>
          <a className="btn btn-ghost" href={REPO} target="_blank" rel="noreferrer">
            Open the repo
          </a>
        </p>
      </div>

      <div className="section-head">
        <h2>Add a story, the developer way</h2>
      </div>
      <ol className="steps">
        <li>
          <span className="step-num" aria-hidden="true">1</span>
          <div>
            <b>Copy the template</b>
            <p>Copy entries/template.md to entries/NNN-your-story-name.md using the next number.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">2</span>
          <div>
            <b>Fill in all five sections</b>
            <p>Problem, Solution, Artifact, Human, License. The Artifact section must link the working thing.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">3</span>
          <div>
            <b>Open a pull request</b>
            <p>The PR template carries the checklist. An automated check verifies your sections and link health.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">4</span>
          <div>
            <b>Merge publishes</b>
            <p>A maintainer reviews, merges, and the site rebuilds automatically.</p>
          </div>
        </li>
      </ol>

      <div className="section-head">
        <h2>Automated checks</h2>
      </div>
      <div className="faq">
        <details open>
          <summary>What does the entry check do?</summary>
          <p>
            On every pull request that touches entries/*.md, it confirms all five required
            sections exist and requests every link in the Artifact section. Anything missing
            or dead fails the check, and the results are posted on the PR.
          </p>
        </details>
        <details>
          <summary>How does the site deploy?</summary>
          <p>
            Every push to main builds the React + Vite site and deploys the static output to
            GitHub Pages at bloomproof.org. The custom domain is pinned by a CNAME file.
          </p>
        </details>
        <details>
          <summary>Can I run my own copy?</summary>
          <p>
            Yes — fork the repo and host it anywhere static files go. That is the point: the
            record belongs to everyone, so it belongs to no one.
          </p>
        </details>
      </div>

      <div className="section-head">
        <h2>Run your own mirror</h2>
        <p>Every independent copy makes the record harder to shut down. Three steps:</p>
      </div>
      <ol className="steps">
        <li>
          <span className="step-num" aria-hidden="true">1</span>
          <div>
            <b>Fork the repo</b>
            <p>One click gives you your own full copy of every story and the site.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">2</span>
          <div>
            <b>Enable GitHub Pages</b>
            <p>Settings → Pages → deploy with GitHub Actions. Your mirror is live in about a minute.</p>
          </div>
        </li>
        <li>
          <span className="step-num" aria-hidden="true">3</span>
          <div>
            <b>Done</b>
            <p>Pull from upstream whenever you like to stay current. Tell people your mirror exists.</p>
          </div>
        </li>
      </ol>

      <p style={{ marginBottom: 48 }}>
        <Link className="section-link" to="/about">
          ← Back to the plain-words version
        </Link>
      </p>
    </>
  )
}
