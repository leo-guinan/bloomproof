import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import EntryDetail from './pages/EntryDetail.jsx'
import Submit from './pages/Submit.jsx'
import About from './pages/About.jsx'
import Developers from './pages/Developers.jsx'
import Donate from './pages/Donate.jsx'
import { loadEntries } from './lib/store.js'

export default function App() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEntries()
      .then(setEntries)
      .finally(() => setLoading(false))
  }, [])

  function handleAdded(entry) {
    setEntries((prev) => [entry, ...prev])
  }

  return (
    <HashRouter>
      <Layout count={loading ? '…' : entries.length}>
        {loading ? (
          <p style={{ padding: '40px 0' }}>Gathering real stories…</p>
        ) : (
          <Routes>
            <Route path="/" element={<Home entries={entries} />} />
            <Route path="/proof/:id" element={<EntryDetail entries={entries} />} />
            <Route path="/submit" element={<Submit onAdded={handleAdded} />} />
            <Route path="/about" element={<About />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="*" element={<p style={{ padding: '40px 0' }}>Hmm, that page does not exist. The stories are all back on the home page.</p>} />
          </Routes>
        )}
      </Layout>
    </HashRouter>
  )
}
