import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import QRCode from 'qrcode'
import { BITCOIN_ADDRESS } from './src/lib/donate.js'

// Renders the donation-address QR as a static SVG at build time —
// no external API calls, nothing fetched at runtime.
function bitcoinQr() {
  let cached = null
  async function getSvg() {
    if (!cached) {
      cached = await QRCode.toString(BITCOIN_ADDRESS, {
        type: 'svg',
        margin: 2,
        width: 256,
        color: { dark: '#232b28', light: '#ffffff' }
      })
    }
    return cached
  }
  return {
    name: 'bitcoin-qr',
    async generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'bitcoin-qr.svg', source: await getSvg() })
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/bitcoin-qr.svg') {
          res.setHeader('Content-Type', 'image/svg+xml')
          res.end(await getSvg())
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), bitcoinQr()],
  server: {
    port: 5173,
    host: '127.0.0.1'
  }
})
