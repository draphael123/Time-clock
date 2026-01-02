'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import LiveChat from './components/LiveChat'
import SettingsPanel from './components/SettingsPanel'
import Forum from './components/Forum'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [stats] = useState({
    timezones: 24,
    users: '1000+',
    downloads: '5000+',
    uptime: '99.9%'
  })
  const [animatedStats, setAnimatedStats] = useState({
    timezones: 0
  })

  useEffect(() => {
    // Animate statistics counter
    const animateCounter = () => {
      let current = 0
      const target = stats.timezones
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setAnimatedStats({ timezones: target })
          clearInterval(timer)
        } else {
          setAnimatedStats({ timezones: Math.floor(current) })
        }
      }, 30)
    }
    animateCounter()
  }, [])

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
      const timeOptions: Intl.DateTimeFormatOptions = {
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
      
      // Update active section for navigation
      const sections = ['features', 'screenshots', 'comparison', 'changelog', 'testimonials', 'use-cases', 'installation', 'faq']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, this would send to an email service
    setNewsletterSubmitted(true)
    setTimeout(() => {
      setNewsletterSubmitted(false)
      setNewsletterEmail('')
    }, 3000)
  }

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
      {/* Animated Background Particles */}
      <div className="animated-background">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      {/* Skip to Content Link (Accessibility) */}
      <a href="#features" className="skip-to-content">
        Skip to main content
      </a>

      {/* Sticky Navigation Header */}
      <nav className="sticky-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span>🌏</span>
            <span>World Clock</span>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#features" className={activeSection === 'features' ? 'active' : ''}>Features</a>
            <a href="#screenshots" className={activeSection === 'screenshots' ? 'active' : ''}>Screenshots</a>
            <a href="#use-cases" className={activeSection === 'use-cases' ? 'active' : ''}>Use Cases</a>
            <a href="#installation" className={activeSection === 'installation' ? 'active' : ''}>Install</a>
            <a href="#faq" className={activeSection === 'faq' ? 'active' : ''}>FAQ</a>
            <button onClick={handleDownload} className="nav-download-btn">
              Download
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>560+ Timezones Available</span>
            </div>
            <h1 className="hero-title">
              <span className="title-gradient">Never Miss a Moment</span>
              <br />
              <span className="title-accent">Across Time Zones</span>
            </h1>
            <p className="hero-subtitle">
              The most beautiful, privacy-focused world clock extension for Chrome. Track multiple time zones in real-time, 
              customize your view, and stay connected with your global team—all completely free and offline.
            </p>
            <div className="hero-buttons">
              <button onClick={handleDownload} className="btn-primary pulse glow-button" aria-label="Download World Clock Extension">
                <span className="btn-content">
                  <span className="btn-icon">⬇️</span>
                  <span>Download Now - It's Free</span>
                  <span className="btn-shine"></span>
                </span>
              </button>
              <Link href="#features" className="btn-secondary hover-lift">
                <span>Learn More</span>
                <span className="btn-arrow">→</span>
              </Link>
              <button 
                onClick={toggleDarkMode} 
                className="hero-dark-toggle bounce-on-hover"
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

      {/* Settings Button */}
      <button 
        onClick={() => setShowSettings(true)} 
        className="settings-toggle-btn"
        aria-label="Open settings"
        title="Open settings"
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        darkMode={darkMode}
        onDarkModeChange={toggleDarkMode}
      />

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
            <div className="feature-card card-hover-effect">
              <div className="feature-icon rotating-icon" aria-hidden="true">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Updates every second with zero lag. See time changes in real-time as they happen.</p>
              <div className="card-glow"></div>
            </div>
            <div className="feature-card card-hover-effect">
              <div className="feature-icon pulsing-icon" aria-hidden="true">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Modern gradient backgrounds, smooth animations, and an intuitive user interface.</p>
              <div className="card-glow"></div>
            </div>
            <div className="feature-card card-hover-effect">
              <div className="feature-icon floating-icon" aria-hidden="true">🌍</div>
              <h3>Multiple Time Zones</h3>
              <p>Track Eastern Time, Pacific Time, Brazil, and Italy simultaneously. Perfect for global teams and travelers.</p>
              <div className="card-glow"></div>
            </div>
            <div className="feature-card card-hover-effect">
              <div className="feature-icon rotating-icon" aria-hidden="true">🔒</div>
              <h3>Privacy First</h3>
              <p>100% offline operation. No data collection. No tracking. Your privacy is protected.</p>
              <div className="card-glow"></div>
            </div>
            <div className="feature-card card-hover-effect">
              <div className="feature-icon pulsing-icon" aria-hidden="true">🚀</div>
              <h3>Easy Setup</h3>
              <p>Install in seconds. Download, load the extension, and start tracking time zones immediately.</p>
              <div className="card-glow"></div>
            </div>
            <div className="feature-card card-hover-effect">
              <div className="feature-icon floating-icon" aria-hidden="true">💯</div>
              <h3>Completely Free</h3>
              <p>No ads, no subscriptions, no hidden costs. Full functionality available at no charge.</p>
              <div className="card-glow"></div>
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

      {/* Statistics/Metrics Section */}
      <section id="stats" className="stats-section">
        <div className="container">
          <h2 className="section-title">By The Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-value">{animatedStats.timezones}+</div>
              <div className="stat-label">Timezones Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value-text">{stats.users}</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⬇️</div>
              <div className="stat-value-text">{stats.downloads}</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-value-text">{stats.uptime}</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔒</div>
              <div className="stat-value-text">0</div>
              <div className="stat-label">Data Collected</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-value-text">100%</div>
              <div className="stat-label">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="use-cases">
        <div className="container">
          <h2 className="section-title">Perfect For</h2>
          <div className="use-cases-grid">
            <div className="use-case-card">
              <div className="use-case-icon">💼</div>
              <h3>Remote Workers</h3>
              <p>Coordinate with team members across different time zones. Never schedule a meeting at the wrong time again.</p>
            </div>
            <div className="use-case-card">
              <div className="use-case-icon">🌐</div>
              <h3>Global Teams</h3>
              <p>Keep track of when your international colleagues are available. Perfect for distributed companies.</p>
            </div>
            <div className="use-case-card">
              <div className="use-case-icon">✈️</div>
              <h3>Travelers</h3>
              <p>Stay connected with home time while traveling. Know when to call family and friends.</p>
            </div>
            <div className="use-case-card">
              <div className="use-case-icon">📅</div>
              <h3>Event Planners</h3>
              <p>Schedule events that work for participants worldwide. Convert times instantly.</p>
            </div>
            <div className="use-case-card">
              <div className="use-case-icon">🎓</div>
              <h3>International Students</h3>
              <p>Keep track of class times, deadlines, and when to contact professors in different time zones.</p>
            </div>
            <div className="use-case-card">
              <div className="use-case-icon">👨‍💻</div>
              <h3>Developers</h3>
              <p>Coordinate releases, stand-ups, and code reviews across global development teams.</p>
            </div>
          </div>
          <div className="use-cases-cta">
            <button onClick={handleDownload} className="btn-primary">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Visual Installation Guide */}
      <section id="installation" className="installation-guide">
        <div className="container">
          <h2 className="section-title">Installation Guide</h2>
          <p className="section-subtitle">Get started in less than 2 minutes</p>
          <div className="installation-steps">
            <div className="installation-step">
              <div className="step-visual">
                <div className="step-number-large">1</div>
                <div className="step-icon">⬇️</div>
              </div>
              <div className="step-content">
                <h3>Download the Extension</h3>
                <p>Click the download button to get the latest version from GitHub. The ZIP file contains all extension files.</p>
                <button onClick={handleDownload} className="step-action-btn">
                  Download Now
                </button>
              </div>
            </div>
            <div className="installation-step">
              <div className="step-visual">
                <div className="step-number-large">2</div>
                <div className="step-icon">📦</div>
              </div>
              <div className="step-content">
                <h3>Extract the Files</h3>
                <p>Extract the downloaded ZIP file to a folder on your computer. Remember where you saved it!</p>
                <div className="code-block">
                  <code>Right-click ZIP → Extract All → Choose location</code>
                </div>
              </div>
            </div>
            <div className="installation-step">
              <div className="step-visual">
                <div className="step-number-large">3</div>
                <div className="step-icon">🌐</div>
              </div>
              <div className="step-content">
                <h3>Open Chrome Extensions</h3>
                <p>Open Chrome and navigate to the extensions page. You can do this by:</p>
                <ul>
                  <li>Type <code>chrome://extensions/</code> in the address bar, or</li>
                  <li>Menu (⋮) → More tools → Extensions</li>
                </ul>
              </div>
            </div>
            <div className="installation-step">
              <div className="step-visual">
                <div className="step-number-large">4</div>
                <div className="step-icon">🔧</div>
              </div>
              <div className="step-content">
                <h3>Enable Developer Mode</h3>
                <p>Toggle the "Developer mode" switch in the top-right corner of the extensions page.</p>
                <div className="highlight-box">
                  <strong>💡 Tip:</strong> Developer mode allows you to load unpacked extensions.
                </div>
              </div>
            </div>
            <div className="installation-step">
              <div className="step-visual">
                <div className="step-number-large">5</div>
                <div className="step-icon">📂</div>
              </div>
              <div className="step-content">
                <h3>Load the Extension</h3>
                <p>Click "Load unpacked" button, then select the folder where you extracted the extension files.</p>
                <div className="highlight-box">
                  <strong>✅ Done!</strong> The extension icon will appear in your Chrome toolbar.
                </div>
              </div>
            </div>
            <div className="installation-step">
              <div className="step-visual">
                <div className="step-number-large">6</div>
                <div className="step-icon">🎉</div>
              </div>
              <div className="step-content">
                <h3>Start Using</h3>
                <p>Click the extension icon in your toolbar to view all time zones. Pin it for easy access!</p>
                <button onClick={handleDownload} className="step-action-btn">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="video-demo" className="video-demo">
        <div className="container">
          <h2 className="section-title">See It In Action</h2>
          <div className="video-container">
            <div className="video-placeholder">
              <div className="play-button">▶️</div>
              <p>Video Demo Coming Soon</p>
              <p className="video-note">Watch a quick walkthrough of all features</p>
            </div>
            {/* When you have a video, replace with:
            <iframe 
              src="YOUR_VIDEO_URL" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            */}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges">
        <div className="container">
          <div className="badges-grid">
            <div className="trust-badge">
              <div className="badge-icon">🔓</div>
              <div className="badge-text">Open Source</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🔒</div>
              <div className="badge-text">Privacy First</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🚫</div>
              <div className="badge-text">No Tracking</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">💯</div>
              <div className="badge-text">Free Forever</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">⚡</div>
              <div className="badge-text">Lightning Fast</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🌐</div>
              <div className="badge-text">100% Offline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="performance-metrics">
        <div className="container">
          <h2 className="section-title">Performance & Privacy</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">0ms</div>
              <div className="metric-label">Network Requests</div>
              <div className="metric-desc">Works completely offline</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">&lt;1MB</div>
              <div className="metric-label">Extension Size</div>
              <div className="metric-desc">Lightweight and fast</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">0</div>
              <div className="metric-label">Data Collected</div>
              <div className="metric-desc">Your privacy is protected</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">Instant</div>
              <div className="metric-label">Load Time</div>
              <div className="metric-desc">Opens immediately</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="integrations">
        <div className="container">
          <h2 className="section-title">Works Great With</h2>
          <div className="integrations-grid">
            <div className="integration-card">
              <div className="integration-icon">📅</div>
              <h3>Google Calendar</h3>
              <p>Check time zones before scheduling meetings in Google Calendar</p>
            </div>
            <div className="integration-card">
              <div className="integration-icon">💬</div>
              <h3>Slack Teams</h3>
              <p>Know when your team members are available for Slack messages</p>
            </div>
            <div className="integration-card">
              <div className="integration-icon">📝</div>
              <h3>Notion</h3>
              <p>Coordinate deadlines and meetings across global Notion workspaces</p>
            </div>
            <div className="integration-card">
              <div className="integration-icon">📧</div>
              <h3>Email</h3>
              <p>Quickly copy times to include in emails to international contacts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter">
        <div className="container">
          <h2 className="section-title">Stay Updated</h2>
          <p className="newsletter-subtitle">Get notified about new features and updates</p>
          {!newsletterSubmitted ? (
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="newsletter-success">
              <div className="success-icon">✅</div>
              <p>Thanks for subscribing! We'll keep you updated.</p>
            </div>
          )}
          <p className="newsletter-privacy">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* Contact/Support Section */}
      <section id="contact" className="contact-support">
        <div className="container">
          <h2 className="section-title">Need Help?</h2>
          <div className="support-grid">
            <div className="support-card">
              <div className="support-icon">📚</div>
              <h3>Documentation</h3>
              <p>Check our comprehensive guides and FAQs</p>
              <a href="#faq" className="support-link">View FAQ →</a>
            </div>
            <div className="support-card">
              <div className="support-icon">🐛</div>
              <h3>Report Issues</h3>
              <p>Found a bug? Let us know on GitHub</p>
              <a href="https://github.com/draphael123/Time-clock/issues" target="_blank" rel="noopener noreferrer" className="support-link">
                Open Issue →</a>
            </div>
            <div className="support-card">
              <div className="support-icon">💡</div>
              <h3>Feature Requests</h3>
              <p>Have an idea? We'd love to hear it</p>
              <a href="https://github.com/draphael123/Time-clock/discussions" target="_blank" rel="noopener noreferrer" className="support-link">
                Suggest Feature →</a>
            </div>
            <div className="support-card">
              <div className="support-icon">⭐</div>
              <h3>Contribute</h3>
              <p>Help make the extension even better</p>
              <a href="https://github.com/draphael123/Time-clock" target="_blank" rel="noopener noreferrer" className="support-link">
                View on GitHub →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools/Resources */}
      <section className="related-tools">
        <div className="container">
          <h2 className="section-title">Helpful Resources</h2>
          <div className="tools-grid">
            <div className="tool-card">
              <h3>Timezone Converter</h3>
              <p>Convert times between any timezones</p>
              <a href="https://www.timeanddate.com/worldclock/converter.html" target="_blank" rel="noopener noreferrer" className="tool-link">
                Visit Tool →
              </a>
            </div>
            <div className="tool-card">
              <h3>Meeting Planner</h3>
              <p>Find the best time for global meetings</p>
              <a href="https://www.timeanddate.com/worldclock/meeting.html" target="_blank" rel="noopener noreferrer" className="tool-link">
                Visit Tool →
              </a>
            </div>
            <div className="tool-card">
              <h3>DST Calculator</h3>
              <p>Check daylight saving time changes</p>
              <a href="https://www.timeanddate.com/time/dst/" target="_blank" rel="noopener noreferrer" className="tool-link">
                Visit Tool →
              </a>
            </div>
          </div>
          <div className="comparison-cta">
            <button onClick={handleDownload} className="btn-primary large">
              Download Free Extension
            </button>
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
          <div className="testimonials-cta">
            <button onClick={handleDownload} className="btn-primary">
              Join Happy Users
            </button>
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

      {/* Floating CTA Button */}
      <div className="floating-cta">
        <button onClick={handleDownload} className="floating-cta-btn" aria-label="Download extension">
          ⬇️ Download Free
        </button>
      </div>

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

      {/* Live Chat Widget */}
      <LiveChat />

      {/* Forum */}
      <Forum />

      <style jsx>{`
        /* Animated Background */
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(102, 126, 234, 0.5);
          border-radius: 50%;
          animation: float-particle 20s infinite ease-in-out;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 15s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 2s; animation-duration: 18s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 4s; animation-duration: 20s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 1s; animation-duration: 16s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 3s; animation-duration: 19s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 5s; animation-duration: 17s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 2.5s; animation-duration: 21s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 4.5s; animation-duration: 14s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 1.5s; animation-duration: 22s; }
        .particle:nth-child(10) { left: 95%; animation-delay: 3.5s; animation-duration: 18s; }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(100px) scale(1.5);
            opacity: 0;
          }
        }

        /* Gradient Orbs */
        .gradient-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          z-index: -1;
          pointer-events: none;
          animation: orb-float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: var(--primary-vibrant);
          top: -250px;
          left: -250px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: var(--tropical-gradient);
          bottom: -200px;
          right: -200px;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: var(--accent-gradient);
          top: 50%;
          right: 10%;
          animation-delay: 10s;
        }

        @keyframes orb-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
        }

        /* Hero Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 50px;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: badge-pulse 2s ease-in-out infinite;
        }

        .badge-icon {
          font-size: 1.2rem;
          animation: rotate 3s linear infinite;
        }

        @keyframes badge-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Title Gradient */
        .title-gradient {
          background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .title-accent {
          background: var(--sunset-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        /* Glow Button */
        .glow-button {
          position: relative;
          overflow: hidden;
        }

        .btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-icon {
          font-size: 1.2rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .glow-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .glow-button:hover::before {
          width: 300px;
          height: 300px;
        }

        /* Hover Lift Effect */
        .hover-lift {
          position: relative;
          overflow: hidden;
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .hover-lift:hover .btn-arrow {
          transform: translateX(5px);
        }

        /* Bounce on Hover */
        .bounce-on-hover:hover {
          animation: bounce-button 0.5s ease;
        }

        @keyframes bounce-button {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* Card Hover Effects */
        .card-hover-effect {
          position: relative;
          overflow: hidden;
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .card-hover-effect:hover .card-glow {
          opacity: 1;
        }

        /* Animated Icons */
        .rotating-icon {
          animation: rotate-slow 4s linear infinite;
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .pulsing-icon {
          animation: pulse-icon 2s ease-in-out infinite;
        }

        @keyframes pulse-icon {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .floating-icon {
          animation: float-icon 3s ease-in-out infinite;
        }

        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .hero {
          background: var(--primary-gradient);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 60px 20px;
          color: white;
          position: relative;
          overflow: hidden;
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
          background: var(--primary-vibrant);
          color: white;
          padding: 18px 36px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
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
          background: var(--aurora-gradient);
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
          position: relative;
          animation: fadeInUp 0.6s ease-out;
          border-top: 4px solid transparent;
          background-image: linear-gradient(white, white), var(--primary-vibrant);
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }

        .feature-card:nth-child(1) { border-top-color: #4facfe; }
        .feature-card:nth-child(2) { border-top-color: #f093fb; }
        .feature-card:nth-child(3) { border-top-color: #43e97b; }
        .feature-card:nth-child(4) { border-top-color: #fa709a; }
        .feature-card:nth-child(5) { border-top-color: #00f2fe; }
        .feature-card:nth-child(6) { border-top-color: #ff6b6b; }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(79, 172, 254, 0.4);
          border-top-width: 6px;
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
          background: var(--primary-vibrant);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          margin: 0 auto 20px;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
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
          border-left: 4px solid var(--primary-bright);
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

        /* Settings Toggle Button */
        .settings-toggle-btn {
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

        .settings-toggle-btn:hover {
          transform: scale(1.15) rotate(90deg);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
        }

        .settings-toggle-btn:active {
          transform: scale(1.05) rotate(90deg);
        }

        /* Dark mode styles for settings button */
        :global(.dark) .settings-toggle-btn {
          background: rgba(26, 26, 26, 0.9);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        :global(.dark) .settings-toggle-btn:hover {
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
          border-top: 4px solid var(--primary-bright);
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
          border-color: var(--primary-bright);
        }

        .screenshot-thumbnails button.active {
          background: var(--primary-bright);
          color: white;
          border-color: var(--primary-bright);
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

        .comparison-cta {
          text-align: center;
          margin-top: 50px;
        }

        .testimonials-cta {
          text-align: center;
          margin-top: 50px;
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
          color: var(--primary-bright);
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
          border-left: 4px solid var(--primary-bright);
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

        /* Sticky Navigation */
        .sticky-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        :global(.dark) .sticky-nav {
          background: rgba(26, 26, 26, 0.95);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--primary-bright);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        :global(.dark) .nav-links a {
          color: #e0e0e0;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: var(--primary-bright);
        }

        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary-bright);
        }

        .nav-download-btn {
          background: var(--primary-gradient);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .mobile-menu-toggle span {
          width: 25px;
          height: 3px;
          background: #333;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        :global(.dark) .mobile-menu-toggle span {
          background: #e0e0e0;
        }

        /* Statistics Section */
        .stats-section {
          padding: 100px 20px;
          background: var(--primary-gradient);
          color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .stat-value,
        .stat-value-text {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        /* Use Cases Section */
        .use-cases {
          padding: 100px 20px;
          background: white;
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .use-case-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          transition: all 0.3s ease;
          text-align: center;
          border: 2px solid transparent;
        }

        .use-case-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--card-hover-shadow);
          border-color: var(--primary-bright);
        }

        .use-case-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }

        .use-case-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #333;
        }

        .use-case-card p {
          color: #666;
          line-height: 1.6;
        }

        .use-cases-cta {
          text-align: center;
          margin-top: 50px;
        }

        /* Installation Guide */
        .installation-guide {
          padding: 100px 20px;
          background: #f8f9fa;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 60px;
        }

        .installation-steps {
          max-width: 900px;
          margin: 0 auto;
        }

        .installation-step {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 40px;
          margin-bottom: 60px;
          align-items: start;
        }

        .step-visual {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-number-large {
          width: 100px;
          height: 100px;
          background: var(--primary-gradient);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .step-icon {
          font-size: 2.5rem;
        }

        .step-content h3 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: #333;
        }

        .step-content p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .step-content ul {
          list-style: none;
          padding: 0;
          margin: 15px 0;
        }

        .step-content li {
          padding: 8px 0;
          color: #666;
        }

        .step-content code {
          background: #f0f0f0;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9rem;
        }

        .code-block {
          background: #2a2a2a;
          color: #fff;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
          font-family: monospace;
        }

        .code-block code {
          background: none;
          color: #fff;
          padding: 0;
        }

        .highlight-box {
          background: #e3f2fd;
          border-left: 4px solid var(--primary-bright);
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
        }

        .step-action-btn {
          background: var(--primary-gradient);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 15px;
        }

        .step-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        /* Video Demo */
        .video-demo {
          padding: 100px 20px;
          background: white;
        }

        .video-container {
          max-width: 900px;
          margin: 0 auto;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .video-placeholder {
          background: var(--primary-vibrant);
          aspect-ratio: 16/9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
        }

        .play-button {
          font-size: 4rem;
          margin-bottom: 20px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .play-button:hover {
          transform: scale(1.1);
        }

        .video-note {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Trust Badges */
        .trust-badges {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .trust-badge {
          background: white;
          padding: 30px 20px;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--card-shadow);
          transition: all 0.3s ease;
        }

        .trust-badge:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-hover-shadow);
        }

        .badge-icon {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .badge-text {
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        /* Performance Metrics */
        .performance-metrics {
          padding: 100px 20px;
          background: white;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .metric-card {
          background: #f8f9fa;
          padding: 40px;
          border-radius: 15px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-shadow);
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-bright);
          margin-bottom: 10px;
        }

        .metric-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .metric-desc {
          font-size: 0.9rem;
          color: #666;
        }

        /* Integrations */
        .integrations {
          padding: 100px 20px;
          background: #f8f9fa;
        }

        .integrations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .integration-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: var(--card-shadow);
          transition: all 0.3s ease;
          text-align: center;
        }

        .integration-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-hover-shadow);
        }

        .integration-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .integration-card h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #333;
        }

        .integration-card p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .tool-link {
          color: var(--primary-bright);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .tool-link:hover {
          color: #5568d3;
        }

        /* Newsletter */
        .newsletter {
          padding: 100px 20px;
          background: var(--secondary-gradient);
          color: white;
          text-align: center;
        }

        .newsletter-subtitle {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.95;
        }

        .newsletter-form {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          gap: 10px;
        }

        .newsletter-input {
          flex: 1;
          padding: 15px 20px;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
        }

        .newsletter-btn {
          padding: 15px 30px;
          background: white;
          color: var(--primary-bright);
          border: none;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .newsletter-success {
          max-width: 500px;
          margin: 0 auto;
          padding: 30px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
        }

        .success-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .newsletter-privacy {
          margin-top: 20px;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Contact/Support */
        .contact-support {
          padding: 100px 20px;
          background: white;
        }

        .support-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .support-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .support-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-shadow);
        }

        .support-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .support-card h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #333;
        }

        .support-card p {
          color: #666;
          margin-bottom: 15px;
        }

        .support-link {
          color: var(--primary-bright);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .support-link:hover {
          color: #5568d3;
        }

        /* Related Tools */
        .related-tools {
          padding: 100px 20px;
          background: #f8f9fa;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .tool-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: var(--card-shadow);
          transition: all 0.3s ease;
        }

        .tool-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-hover-shadow);
        }

        .tool-card h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #333;
        }

        .tool-card p {
          color: #666;
          margin-bottom: 15px;
        }

        /* Skip to Content */
        .skip-to-content {
          position: absolute;
          top: -100px;
          left: 0;
          background: var(--primary-bright);
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          z-index: 10000;
          border-radius: 0 0 8px 0;
        }

        .skip-to-content:focus {
          top: 0;
        }

        /* Floating CTA */
        .floating-cta {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
        }

        .floating-cta-btn {
          background: var(--primary-gradient);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .floating-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }

        /* Dark Mode Styles for New Sections */
        :global(.dark) .use-cases,
        :global(.dark) .installation-guide,
        :global(.dark) .video-demo,
        :global(.dark) .performance-metrics,
        :global(.dark) .contact-support {
          background: #1a1a1a;
          color: white;
        }

        :global(.dark) .use-case-card,
        :global(.dark) .trust-badge,
        :global(.dark) .metric-card,
        :global(.dark) .integration-card,
        :global(.dark) .support-card,
        :global(.dark) .tool-card {
          background: #2a2a2a;
          color: white;
        }

        :global(.dark) .use-case-card h3,
        :global(.dark) .integration-card h3,
        :global(.dark) .support-card h3,
        :global(.dark) .tool-card h3,
        :global(.dark) .step-content h3 {
          color: white;
        }

        :global(.dark) .use-case-card p,
        :global(.dark) .integration-card p,
        :global(.dark) .support-card p,
        :global(.dark) .tool-card p,
        :global(.dark) .step-content p,
        :global(.dark) .step-content li {
          color: #aaa;
        }

        :global(.dark) .code-block {
          background: #1a1a1a;
        }

        :global(.dark) .highlight-box {
          background: #2a2a2a;
          border-left-color: #667eea;
        }

        @media (max-width: 768px) {
          .sticky-nav {
            padding: 10px;
          }

          .nav-links {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            gap: 20px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          :global(.dark) .nav-links {
            background: rgba(26, 26, 26, 0.98);
          }

          .nav-links.active {
            transform: translateX(0);
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .settings-toggle-btn {
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

          .installation-step {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .step-visual {
            margin-bottom: 20px;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .floating-cta {
            bottom: 20px;
            left: 20px;
            right: 20px;
            transform: none;
          }

          .floating-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

