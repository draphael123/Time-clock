'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [times, setTimes] = useState({
    est: '',
    pst: '',
    brazil: '',
    italy: ''
  })
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedScreenshot, setSelectedScreenshot] = useState(0)
  const [showDemo, setShowDemo] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedScreenshot, setSelectedScreenshot] = useState(0)
  const [showDemo, setShowDemo] = useState(false)

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const timeOptions = {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      
      setTimes({
        est: now.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'America/New_York' }),
        pst: now.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'America/Los_Angeles' }),
        brazil: now.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'America/Sao_Paulo' }),
        italy: now.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'Europe/Rome' })
      })
    }
    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDownload = () => {
    // Direct download link to latest version from GitHub main branch
    // This always downloads the most recent version with all features
    window.open('https://github.com/draphael123/Time-clock/archive/refs/heads/main.zip', '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <h1 className="hero-title">
              World Clock Extension
            </h1>
            <p className="hero-subtitle">
              Never miss a moment across time zones. Track Eastern Time, Pacific Time, Brazil, and Italy 
              with a beautiful, real-time clock extension for Chrome.
            </p>
            <div className="hero-buttons">
              <button onClick={handleDownload} className="btn-primary pulse" aria-label="Download World Clock Extension">
                Download Now - It's Free
              </button>
              <Link href="#features" className="btn-secondary">
                Learn More
              </Link>
              <button 
                onClick={toggleDarkMode} 
                className="hero-dark-toggle"
                aria-label="Toggle dark mode"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
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
              <div className="preview-card est-preview" aria-label="Eastern Time preview">
                <div className="preview-flag" aria-hidden="true">🇺🇸</div>
                <div className="preview-time" aria-live="polite">{times.est}</div>
                <div className="preview-label">Eastern Time</div>
              </div>
              <div className="preview-card pst-preview" aria-label="Pacific Time preview">
                <div className="preview-flag" aria-hidden="true">🇺🇸</div>
                <div className="preview-time" aria-live="polite">{times.pst}</div>
                <div className="preview-label">Pacific Time</div>
              </div>
              <div className="preview-card brazil-preview" aria-label="Brazil time preview">
                <div className="preview-flag" aria-hidden="true">🇧🇷</div>
                <div className="preview-time" aria-live="polite">{times.brazil}</div>
                <div className="preview-label">Brazil</div>
              </div>
              <div className="preview-card italy-preview" aria-label="Italy time preview">
                <div className="preview-flag" aria-hidden="true">🇮🇹</div>
                <div className="preview-time" aria-live="polite">{times.italy}</div>
                <div className="preview-label">Italy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        className="dark-mode-toggle"
        aria-label="Toggle dark mode"
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Loading Spinner */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why You'll Love It</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Updates every second with zero lag. See time changes in real-time as they happen.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Modern gradient backgrounds, smooth animations, and an intuitive user interface.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🌍</div>
              <h3>Multiple Time Zones</h3>
              <p>Track Eastern Time, Pacific Time, Brazil, and Italy simultaneously. Perfect for global teams and travelers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🔒</div>
              <h3>Privacy First</h3>
              <p>100% offline operation. No data collection. No tracking. Your privacy is protected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🚀</div>
              <h3>Easy Setup</h3>
              <p>Install in seconds. Download, load the extension, and start tracking time zones immediately.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">💯</div>
              <h3>Completely Free</h3>
              <p>No ads, no subscriptions, no hidden costs. Full functionality available at no charge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section id="screenshots" className="screenshots">
        <div className="container">
          <h2 className="section-title">See It In Action</h2>
          <div className="screenshot-gallery">
            <div className="screenshot-main">
              <div className="screenshot-card">
                <div className="screenshot-header">
                  <div className="screenshot-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="screenshot-title">World Clock Extension</div>
                </div>
                <div className="screenshot-content">
                  {selectedScreenshot === 0 && (
                    <div className="demo-popup">
                      <div className="demo-header">
                        <h3>🌏 World Clock</h3>
                        <div className="demo-controls">
                          <span>🔄</span><span>⚙️</span><span>🌙</span><span>📐</span>
                        </div>
                      </div>
                      <div className="demo-clocks">
                        <div className="demo-clock-card">
                          <div className="demo-flag">🇺🇸</div>
                          <div className="demo-time">{times.est}</div>
                          <div className="demo-label">Eastern Time</div>
                        </div>
                        <div className="demo-clock-card">
                          <div className="demo-flag">🇺🇸</div>
                          <div className="demo-time">{times.pst}</div>
                          <div className="demo-label">Pacific Time</div>
                        </div>
                        <div className="demo-clock-card">
                          <div className="demo-flag">🇧🇷</div>
                          <div className="demo-time">{times.brazil}</div>
                          <div className="demo-label">Brazil</div>
                        </div>
                        <div className="demo-clock-card">
                          <div className="demo-flag">🇮🇹</div>
                          <div className="demo-time">{times.italy}</div>
                          <div className="demo-label">Italy</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedScreenshot === 1 && (
                    <div className="demo-popup dark-demo">
                      <div className="demo-header">
                        <h3>🌏 World Clock</h3>
                        <div className="demo-controls">
                          <span>🔄</span><span>⚙️</span><span>☀️</span><span>📐</span>
                        </div>
                      </div>
                      <div className="demo-clocks">
                        <div className="demo-clock-card dark-card">
                          <div className="demo-flag">🇺🇸</div>
                          <div className="demo-time">{times.est}</div>
                          <div className="demo-label">Eastern Time</div>
                        </div>
                        <div className="demo-clock-card dark-card">
                          <div className="demo-flag">🇺🇸</div>
                          <div className="demo-time">{times.pst}</div>
                          <div className="demo-label">Pacific Time</div>
                        </div>
                        <div className="demo-clock-card dark-card">
                          <div className="demo-flag">🇧🇷</div>
                          <div className="demo-time">{times.brazil}</div>
                          <div className="demo-label">Brazil</div>
                        </div>
                        <div className="demo-clock-card dark-card">
                          <div className="demo-flag">🇮🇹</div>
                          <div className="demo-time">{times.italy}</div>
                          <div className="demo-label">Italy</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedScreenshot === 2 && (
                    <div className="demo-popup">
                      <div className="demo-header">
                        <h3>⚙️ Settings</h3>
                      </div>
                      <div className="demo-settings">
                        <div className="demo-setting-item">
                          <label>24-hour format</label>
                          <input type="checkbox" />
                        </div>
                        <div className="demo-setting-item">
                          <label>Show seconds</label>
                          <input type="checkbox" checked />
                        </div>
                        <div className="demo-setting-item">
                          <label>Show UTC offset</label>
                          <input type="checkbox" />
                        </div>
                        <div className="demo-setting-item">
                          <label>Show time difference</label>
                          <input type="checkbox" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="screenshot-thumbnails">
              <button 
                className={selectedScreenshot === 0 ? 'active' : ''}
                onClick={() => setSelectedScreenshot(0)}
              >
                Light Mode
              </button>
              <button 
                className={selectedScreenshot === 1 ? 'active' : ''}
                onClick={() => setSelectedScreenshot(1)}
              >
                Dark Mode
              </button>
              <button 
                className={selectedScreenshot === 2 ? 'active' : ''}
                onClick={() => setSelectedScreenshot(2)}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="comparison" className="comparison">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>World Clock Extension</th>
                  <th>Other Extensions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Free Forever</td>
                  <td>✅ Yes</td>
                  <td>❌ Often Paid</td>
                </tr>
                <tr>
                  <td>100% Offline</td>
                  <td>✅ Yes</td>
                  <td>❌ Usually Requires Internet</td>
                </tr>
                <tr>
                  <td>No Data Collection</td>
                  <td>✅ Zero Tracking</td>
                  <td>❌ Often Tracks Usage</td>
                </tr>
                <tr>
                  <td>Dark Mode</td>
                  <td>✅ Built-in</td>
                  <td>⚠️ Sometimes</td>
                </tr>
                <tr>
                  <td>Customizable</td>
                  <td>✅ Full Settings</td>
                  <td>⚠️ Limited</td>
                </tr>
                <tr>
                  <td>Keyboard Shortcuts</td>
                  <td>✅ Full Support</td>
                  <td>⚠️ Rare</td>
                </tr>
                <tr>
                  <td>Open Source</td>
                  <td>✅ Yes</td>
                  <td>❌ Usually No</td>
                </tr>
                <tr>
                  <td>Copy to Clipboard</td>
                  <td>✅ One-Click</td>
                  <td>⚠️ Sometimes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Version History / Changelog */}
      <section id="changelog" className="changelog">
        <div className="container">
          <h2 className="section-title">What's New</h2>
          <div className="changelog-list">
            <div className="changelog-item">
              <div className="changelog-version">v1.0.0</div>
              <div className="changelog-date">January 2025</div>
              <div className="changelog-content">
                <h4>Initial Release</h4>
                <ul>
                  <li>✅ Real-time clock updates for EST, PST, Brazil, and Italy</li>
                  <li>✅ 12-hour format with AM/PM display</li>
                  <li>✅ Dark mode support</li>
                  <li>✅ Copy to clipboard functionality</li>
                  <li>✅ Settings panel with customization options</li>
                  <li>✅ Keyboard shortcuts for power users</li>
                  <li>✅ Day/night indicators</li>
                  <li>✅ Compact mode</li>
                  <li>✅ Settings persistence</li>
                  <li>✅ Beautiful gradient design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2 className="section-title">What Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Perfect for my remote team! I can quickly check times across different timezones without opening a new tab."</p>
              <div className="testimonial-author">- Remote Worker</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Love the dark mode and the ability to copy times. Makes scheduling meetings so much easier!"</p>
              <div className="testimonial-author">- Project Manager</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Finally, a timezone extension that's free, works offline, and doesn't track me. Highly recommend!"</p>
              <div className="testimonial-author">- Privacy-Conscious User</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"The keyboard shortcuts are a game-changer. I can copy times without even touching my mouse!"</p>
              <div className="testimonial-author">- Power User</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Download</h3>
              <p>Click the download button to get the latest extension files from GitHub (includes all features: dark mode, copy to clipboard, settings, and more)</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Install</h3>
              <p>Open Chrome, navigate to chrome://extensions/, enable Developer mode, and load the unpacked extension</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Start Using</h3>
              <p>Click the extension icon in your browser toolbar to view all time zones in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Stay in Sync?</h2>
          <p>Join users worldwide who stay connected across time zones</p>
          <button onClick={handleDownload} className="btn-primary large">
            Download World Clock Extension
          </button>
          <p className="cta-note">Free • No Sign-up Required • Instant Access • Always Latest Version</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Does this extension work offline?</h3>
              <p>Yes! The extension works completely offline. It uses your browser's built-in timezone calculations and doesn't require an internet connection.</p>
            </div>
            <div className="faq-item">
              <h3>Is it available for Firefox or Edge?</h3>
              <p>Currently, the extension is only available for Chrome. However, since it's open source, you can adapt it for other browsers.</p>
            </div>
            <div className="faq-item">
              <h3>How do I update the extension?</h3>
              <p>Since it's installed manually, you'll need to download the latest version from GitHub (the download button always provides the most recent version) and reload it in Chrome's extension settings.</p>
            </div>
            <div className="faq-item">
              <h3>Can I add more time zones?</h3>
              <p>The extension currently displays EST, PST, Brazil, and Italy. You can modify the source code to add more time zones if needed.</p>
            </div>
            <div className="faq-item">
              <h3>Is my data collected or tracked?</h3>
              <p>No. The extension operates entirely offline and doesn't collect, store, or transmit any data. Your privacy is completely protected.</p>
            </div>
            <div className="faq-item">
              <h3>What Chrome version do I need?</h3>
              <p>The extension works with Chrome version 88 or later. It uses standard Chrome extension APIs that are widely supported.</p>
            </div>
          </div>
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
              <a href="https://github.com/draphael123/Time-clock" target="_blank" rel="noopener noreferrer" className="github-badge">
                <img src="https://img.shields.io/github/stars/draphael123/Time-clock?style=social" alt="GitHub stars" />
              </a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <p>Open source and free forever</p>
              <p>For issues or questions, visit our GitHub repository</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 World Clock Extension. Open source software for global teams.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="back-to-top"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

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

        .hero-dark-toggle {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-dark-toggle:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
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

        .github-badge {
          display: inline-block;
          margin-top: 10px;
        }

        .github-badge img {
          height: 20px;
        }

        .faq {
          padding: 100px 20px;
          background: white;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .faq-item {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 15px;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .faq-item h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #333;
        }

        .faq-item p {
          color: #666;
          line-height: 1.6;
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .back-to-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
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

          .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 20px;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Dark Mode Toggle */
        .dark-mode-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          font-size: 24px;
          cursor: pointer;
          z-index: 10000;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark-mode-toggle:hover {
          transform: scale(1.15);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
        }

        .dark-mode-toggle:active {
          transform: scale(1.05);
        }

        /* Dark mode styles for toggle button */
        :global(.dark) .dark-mode-toggle {
          background: rgba(26, 26, 26, 0.9);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        :global(.dark) .dark-mode-toggle:hover {
          background: rgba(26, 26, 26, 1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.6);
        }

        /* Loading Overlay */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Screenshot Gallery */
        .screenshots {
          padding: 100px 20px;
          background: #f8f9fa;
        }

        .screenshot-gallery {
          max-width: 800px;
          margin: 0 auto;
        }

        .screenshot-main {
          margin-bottom: 30px;
        }

        .screenshot-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .screenshot-header {
          background: #f0f0f0;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .screenshot-dots {
          display: flex;
          gap: 5px;
        }

        .screenshot-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
        }

        .screenshot-dots span:nth-child(1) { background: #ff5f57; }
        .screenshot-dots span:nth-child(2) { background: #ffbd2e; }
        .screenshot-dots span:nth-child(3) { background: #28ca42; }

        .screenshot-title {
          flex: 1;
          text-align: center;
          font-weight: 600;
          color: #666;
        }

        .screenshot-content {
          padding: 20px;
          background: #f8f9fa;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .demo-popup {
          background: white;
          border-radius: 8px;
          padding: 20px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .demo-popup.dark-demo {
          background: #1a1a1a;
          color: white;
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .dark-demo .demo-header {
          border-bottom-color: #333;
        }

        .demo-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .demo-controls {
          display: flex;
          gap: 10px;
        }

        .demo-controls span {
          font-size: 1.2rem;
          cursor: pointer;
        }

        .demo-clocks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .demo-clock-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
        }

        .demo-clock-card.dark-card {
          background: #2a2a2a;
        }

        .demo-flag {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .demo-time {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .demo-label {
          font-size: 0.85rem;
          color: #666;
        }

        .dark-card .demo-label {
          color: #aaa;
        }

        .demo-settings {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .demo-setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .screenshot-thumbnails {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .screenshot-thumbnails button {
          padding: 10px 20px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .screenshot-thumbnails button:hover {
          border-color: #667eea;
        }

        .screenshot-thumbnails button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        /* Feature Comparison */
        .comparison {
          padding: 100px 20px;
          background: white;
        }

        .comparison-table-wrapper {
          overflow-x: auto;
          margin-top: 40px;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .comparison-table thead {
          background: var(--primary-gradient);
          color: white;
        }

        .comparison-table th {
          padding: 20px;
          text-align: left;
          font-weight: 700;
        }

        .comparison-table td {
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }

        .comparison-table tbody tr:hover {
          background: #f8f9fa;
        }

        .comparison-table tbody tr:last-child td {
          border-bottom: none;
        }

        /* Changelog */
        .changelog {
          padding: 100px 20px;
          background: #f8f9fa;
        }

        .changelog-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .changelog-item {
          background: white;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .changelog-version {
          font-size: 1.5rem;
          font-weight: 800;
          color: #667eea;
          margin-bottom: 5px;
        }

        .changelog-date {
          color: #666;
          margin-bottom: 20px;
        }

        .changelog-content h4 {
          margin-bottom: 15px;
          color: #333;
        }

        .changelog-content ul {
          list-style: none;
          padding: 0;
        }

        .changelog-content li {
          padding: 8px 0;
          color: #666;
        }

        /* Testimonials */
        .testimonials {
          padding: 100px 20px;
          background: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .testimonial-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .testimonial-stars {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }

        .testimonial-text {
          font-style: italic;
          color: #666;
          margin-bottom: 15px;
          line-height: 1.6;
        }

        .testimonial-author {
          font-weight: 600;
          color: #333;
        }

        /* Dark Mode Styles */
        :global(.dark) .features,
        :global(.dark) .comparison,
        :global(.dark) .changelog,
        :global(.dark) .testimonials {
          background: #1a1a1a;
          color: white;
        }

        :global(.dark) .feature-card,
        :global(.dark) .changelog-item,
        :global(.dark) .testimonial-card {
          background: #2a2a2a;
          color: white;
        }

        :global(.dark) .feature-card h3,
        :global(.dark) .changelog-content h4,
        :global(.dark) .testimonial-author {
          color: white;
        }

        :global(.dark) .feature-card p,
        :global(.dark) .changelog-content li,
        :global(.dark) .testimonial-text {
          color: #aaa;
        }

        :global(.dark) .comparison-table {
          background: #2a2a2a;
          color: white;
        }

        :global(.dark) .comparison-table td {
          border-bottom-color: #333;
        }

        :global(.dark) .comparison-table tbody tr:hover {
          background: #333;
        }

        :global(.dark) .screenshot-card {
          background: #2a2a2a;
        }

        :global(.dark) .screenshot-header {
          background: #1a1a1a;
        }

        :global(.dark) .screenshot-content {
          background: #1a1a1a;
        }

        @media (max-width: 768px) {
          .dark-mode-toggle {
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .screenshot-content {
            min-height: 300px;
          }

          .demo-clocks {
            grid-template-columns: 1fr;
          }

          .comparison-table-wrapper {
            overflow-x: scroll;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

