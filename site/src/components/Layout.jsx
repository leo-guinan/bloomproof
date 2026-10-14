import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

export default function Layout({ count, children }) {
  const location = useLocation()
  const navigate = useNavigate()

  // The logo goes home without leaving a /#/ in the address bar. HashRouter
  // routes on the hash, but the home route also renders with an empty hash,
  // so navigate first and strip the hash from the fresh entry right after.
  function goHome(e) {
    e.preventDefault()
    if (location.pathname === '/') {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
      return
    }
    navigate('/')
    window.history.replaceState(null, '', window.location.pathname)
  }

  return (
    <>
      <header className="site-head">
        <div className="wrap head-row">
          <a className="brand" href="/" onClick={goHome}>
            <img className="brand-logo" src="/site-logo.png" alt="Bloom Proof" />
            <span className="brand-mark">
              Bloom <em>Proof</em>
            </span>
            <span className="brand-sub">real AI projects, from real people</span>
          </a>
          <nav className="main-nav">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Stories
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/submit" className="nav-cta">
              Share your project
            </NavLink>
            <span className="count-pill">{count} stories</span>
          </nav>
        </div>
      </header>
      <main className="wrap">{children}</main>
      <footer className="site-foot">
        <div className="wrap">
          <span>Bloom Proof — proof that AI is helping real people, kept in the open.</span>
          <span>Stories: CC BY-SA 4.0 · Code: MIT</span>
          <Link to="/developers">For developers</Link>
          <Link to="/donate">Donate</Link>
          <a href="mailto:hello@bloomproof.org">Contact</a>
          <span className="backend-badge">Open · community-reviewed</span>
        </div>
      </footer>
    </>
  )
}
