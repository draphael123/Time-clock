'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleDownload = () => {
    window.open('https://github.com/draphael123/Time-clock/archive/refs/heads/main.zip', '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <h1 className="hero-title">
              🌏 World Clock Extension
            </h1>
            <p className="hero-subtitle">
              Never miss a moment across time zones! Track EST, PST, Brazil, and Italy time 
              with a stunning, real-time clock right in your browser.
            </p>
            <div className="hero-buttons">
              <button onClick={handleDownload} className="btn-primary pulse">
                ⬇️ Download Now - It's Free!
              </button>
              <Link href="#features" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">4</div>
                <div className="stat-label">Time Zones</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Real-Time</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free</div>
              </div>
            </div>
          </div>
          <div className="hero-visual float">
            <div className="clock-preview">
              <div className="preview-card est-preview">
                <div className="preview-flag">🇺🇸</div>
                <div className="preview-time">{currentTime}</div>
                <div className="preview-label">Eastern Time</div>
              </div>
              <div className="preview-card pst-preview">
                <div className="preview-flag">🇺🇸</div>
                <div className="preview-time">{currentTime}</div>
                <div className="preview-label">Pacific Time</div>
              </div>
              <div className="preview-card brazil-preview">
                <div className="preview-flag">🇧🇷</div>
                <div className="preview-time">{currentTime}</div>
                <div className="preview-label">Brazil</div>
              </div>
              <div className="preview-card italy-preview">
                <div className="preview-flag">🇮🇹</div>
                <div className="preview-time">{currentTime}</div>
                <div className="preview-label">Italy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why You'll Love It ✨</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Updates every second with zero lag. See time changes in real-time as they happen!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Stunning gradient backgrounds, smooth animations, and a modern UI that's a joy to use.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Multiple Timezones</h3>
              <p>Track EST, PST, Brazil, and Italy simultaneously. Perfect for global teams and travelers!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>100% offline. No data collection. No tracking. Your time is yours alone.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Easy Setup</h3>
              <p>Install in seconds. Just download, load, and start tracking time zones instantly!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>Completely Free</h3>
              <p>No ads, no subscriptions, no hidden costs. Just pure functionality, forever free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works 🎯</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Download</h3>
              <p>Click the download button above to get the extension files</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Install</h3>
              <p>Open Chrome, go to chrome://extensions/, enable Developer mode, and load the extension</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Enjoy!</h3>
              <p>Click the Filipino flag icon in your toolbar to see all time zones in beautiful real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Stay in Sync? 🚀</h2>
          <p>Join users worldwide who never miss a beat across time zones</p>
          <button onClick={handleDownload} className="btn-primary large">
            Download World Clock Extension
          </button>
          <p className="cta-note">Free • No Sign-up Required • Instant Access</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>World Clock Extension</h4>
              <p>Track time zones beautifully</p>
            </div>
            <div className="footer-section">
              <h4>Links</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <a href="https://github.com/draphael123/Time-clock" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <p>Open source and free forever</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 World Clock Extension. Made with ❤️ for global teams.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .hero {
          background: var(--primary-gradient);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 60px 20px;
          color: white;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 40px;
          opacity: 0.95;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: white;
          color: #667eea;
          padding: 18px 36px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .btn-primary.large {
          padding: 22px 48px;
          font-size: 1.3rem;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 18px 36px;
          border: 2px solid white;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .clock-preview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .preview-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          color: #333;
        }

        .preview-flag {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .preview-time {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 5px;
          font-variant-numeric: tabular-nums;
        }

        .preview-label {
          font-size: 0.85rem;
          color: #666;
          font-weight: 600;
        }

        .features {
          padding: 100px 20px;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 60px;
          font-weight: 800;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          transition: all 0.3s ease;
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--card-hover-shadow);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #333;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        .how-it-works {
          padding: 100px 20px;
          background: #f8f9fa;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .step {
          text-align: center;
        }

        .step-number {
          width: 80px;
          height: 80px;
          background: var(--primary-gradient);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          margin: 0 auto 20px;
        }

        .step h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #333;
        }

        .step p {
          color: #666;
          line-height: 1.6;
        }

        .cta {
          padding: 100px 20px;
          background: var(--secondary-gradient);
          color: white;
          text-align: center;
        }

        .cta h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .cta p {
          font-size: 1.3rem;
          margin-bottom: 40px;
          opacity: 0.95;
        }

        .cta-note {
          margin-top: 20px;
          font-size: 1rem;
          opacity: 0.9;
        }

        .footer {
          background: #1a1a1a;
          color: white;
          padding: 60px 20px 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section h4 {
          margin-bottom: 15px;
          font-size: 1.2rem;
        }

        .footer-section a {
          color: #aaa;
          text-decoration: none;
          display: block;
          margin-bottom: 10px;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #333;
          color: #aaa;
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .cta h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  )
}

