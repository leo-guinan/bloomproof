import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// Production HTML is prerendered: hydrate it. The dev server serves an
// empty root, so fall back to a plain client render there.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
