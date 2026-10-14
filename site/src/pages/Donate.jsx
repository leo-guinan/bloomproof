import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BITCOIN_ADDRESS } from '../lib/donate.js'

export default function Donate() {
  const [copied, setCopied] = useState(false)

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(BITCOIN_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      document.getElementById('btc-address')?.select()
    }
  }

  return (
    <>
      <section className="hero">
        <span className="friendly-kicker">Donate</span>
        <h1>Keep the record independent.</h1>
        <p className="lede">
          Bloom Proof is free forever. Donations keep the record independent. They
          don&apos;t buy a say — no equity, no tokens, no influence for sale.
        </p>
      </section>

      <div className="section-head">
        <h2>Give with Bitcoin</h2>
        <p>Scan the code, or copy the address into your wallet.</p>
      </div>
      <div className="qr-layout">
        <img className="qr-img" src="/bitcoin-qr.svg" alt="QR code for the Bloom Proof Bitcoin donation address" />
        <div className="qr-side">
          <div className="field">
            <label htmlFor="btc-address">Donation address</label>
            <div className="address-row">
              <input id="btc-address" readOnly value={BITCOIN_ADDRESS} onFocus={(e) => e.target.select()} />
              <button type="button" className="btn btn-ghost address-copy" onClick={copyAddress}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <p>Send any amount. No accounts, no sign-ups, no fees taken by us — it goes straight to the project.</p>
          <p><strong>Please note:</strong> Bloom Proof isn&apos;t a registered nonprofit, so donations aren&apos;t tax-deductible.</p>
        </div>
      </div>

      <p style={{ margin: '24px 0 48px' }}>
        <Link className="section-link" to="/about">
          ← Why this exists
        </Link>
      </p>
    </>
  )
}
