import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import EntryDetail from './pages/EntryDetail.jsx'
import Submit from './pages/Submit.jsx'
import About from './pages/About.jsx'
import Developers from './pages/Developers.jsx'
import Donate from './pages/Donate.jsx'
import { loadPublishedSync, loadEntriesSync } from './lib/store.js'

// Router-agnostic site: wrapped in BrowserRouter on the client and in
// StaticRouter by the build-time prerender.
export function Site({ entries, onAdded }) {
  return (
    <Layout count={entries.length}>
      <Routes>
        <Route path="/" element={<Home entries={entries} />} />
        <Route path="/page/:num" element={<Home entries={entries} />} />
        <Route path="/proof/:id" element={<EntryDetail entries={entries} />} />
        <Route path="/submit" element={<Submit onAdded={onAdded} />} />
        <Route path="/about" element={<About />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="*" element={<p style={{ padding: '40px 0' }}>Hmm, that page does not exist. The stories are all back on the home page.</p>} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  // Published entries render synchronously — identical on server and
  // client, so prerendered pages hydrate cleanly with no loading flash.
  const [entries, setEntries] = useState(loadPublishedSync)

  // Pending drafts live only in this browser; merge them after mount so
  // the first render always matches the prerendered HTML. Length check
  // avoids a pointless re-render when there are no drafts.
  useEffect(() => {
    const next = loadEntriesSync()
    setEntries((prev) => (next.length === prev.length ? prev : next))
  }, [])

  function handleAdded(entry) {
    setEntries((prev) => [entry, ...prev])
  }

  return (
    <BrowserRouter>
      <Site entries={entries} onAdded={handleAdded} />
    </BrowserRouter>
  )
}
