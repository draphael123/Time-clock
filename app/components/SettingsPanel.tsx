'use client'

import { useState, useEffect } from 'react'

interface Settings {
  darkMode: boolean
  animations: boolean
  fontSize: 'small' | 'medium' | 'large'
  reduceMotion: boolean
  compactMode: boolean
}

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
  onDarkModeChange: (value: boolean) => void
}

export default function SettingsPanel({ isOpen, onClose, darkMode, onDarkModeChange }: SettingsPanelProps) {
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    animations: true,
    fontSize: 'medium',
    reduceMotion: false,
    compactMode: false
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('websiteSettings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        console.error('Error loading settings:', e)
      }
    }
  }, [])

  useEffect(() => {
    // Sync darkMode with parent
    setSettings(prev => ({ ...prev, darkMode }))
  }, [darkMode])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem('websiteSettings', JSON.stringify(newSettings))
    
    // Apply settings immediately
    applySettings(newSettings)
    
    // Handle dark mode separately
    if (key === 'darkMode') {
      onDarkModeChange(value as boolean)
    }
  }

  const applySettings = (newSettings: Settings) => {
    // Apply font size
    document.documentElement.setAttribute('data-font-size', newSettings.fontSize)
    
    // Apply animations
    if (!newSettings.animations || newSettings.reduceMotion) {
      document.documentElement.classList.add('no-animations')
    } else {
      document.documentElement.classList.remove('no-animations')
    }
    
    // Apply compact mode
    if (newSettings.compactMode) {
      document.documentElement.classList.add('compact-mode')
    } else {
      document.documentElement.classList.remove('compact-mode')
    }
  }

  useEffect(() => {
    // Apply settings on mount
    applySettings(settings)
  }, [])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="settings-overlay" onClick={onClose}></div>

      {/* Settings Panel */}
      <div className="settings-panel">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="settings-close-btn" onClick={onClose} aria-label="Close settings">
            ✕
          </button>
        </div>

        <div className="settings-content">
          {/* Appearance Section */}
          <div className="settings-section">
            <h3>Appearance</h3>
            
            <div className="setting-item">
              <div className="setting-label">
                <span>🌙 Dark Mode</span>
                <span className="setting-description">Switch between light and dark themes</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => updateSetting('darkMode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <span>📐 Compact Mode</span>
                <span className="setting-description">Reduce spacing for a more compact layout</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={(e) => updateSetting('compactMode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <span>🔤 Font Size</span>
                <span className="setting-description">Adjust text size for better readability</span>
              </div>
              <div className="font-size-selector">
                <button
                  className={settings.fontSize === 'small' ? 'active' : ''}
                  onClick={() => updateSetting('fontSize', 'small')}
                >
                  Small
                </button>
                <button
                  className={settings.fontSize === 'medium' ? 'active' : ''}
                  onClick={() => updateSetting('fontSize', 'medium')}
                >
                  Medium
                </button>
                <button
                  className={settings.fontSize === 'large' ? 'active' : ''}
                  onClick={() => updateSetting('fontSize', 'large')}
                >
                  Large
                </button>
              </div>
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="settings-section">
            <h3>Accessibility</h3>
            
            <div className="setting-item">
              <div className="setting-label">
                <span>🎬 Animations</span>
                <span className="setting-description">Enable or disable page animations</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.animations}
                  onChange={(e) => updateSetting('animations', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <span>♿ Reduce Motion</span>
                <span className="setting-description">Respect system preference for reduced motion</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.reduceMotion}
                  onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* Actions Section */}
          <div className="settings-section">
            <h3>Actions</h3>
            
            <button
              className="settings-action-btn"
              onClick={() => {
                if (confirm('Reset all settings to default values?')) {
                  const defaultSettings: Settings = {
                    darkMode: false,
                    animations: true,
                    fontSize: 'medium',
                    reduceMotion: false,
                    compactMode: false
                  }
                  setSettings(defaultSettings)
                  localStorage.setItem('websiteSettings', JSON.stringify(defaultSettings))
                  applySettings(defaultSettings)
                  onDarkModeChange(false)
                }
              }}
            >
              🔄 Reset to Defaults
            </button>

            <button
              className="settings-action-btn"
              onClick={() => {
                const settingsJson = JSON.stringify(settings, null, 2)
                navigator.clipboard.writeText(settingsJson)
                alert('Settings copied to clipboard!')
              }}
            >
              📋 Export Settings
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .settings-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 9998;
          animation: fadeIn 0.3s ease;
        }

        .settings-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          height: 100vh;
          background: white;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.3s ease;
          overflow-y: auto;
        }

        .settings-header {
          padding: 25px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--primary-gradient);
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .settings-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .settings-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .settings-content {
          flex: 1;
          padding: 20px;
        }

        .settings-section {
          margin-bottom: 30px;
        }

        .settings-section h3 {
          margin: 0 0 15px 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
          padding-bottom: 10px;
          border-bottom: 2px solid #eee;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-label {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .setting-label > span:first-child {
          font-weight: 600;
          color: #333;
          font-size: 1rem;
        }

        .setting-description {
          font-size: 0.85rem;
          color: #666;
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.3s;
          border-radius: 26px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        .toggle-switch input:checked + .toggle-slider {
          background: var(--primary-gradient);
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }

        /* Font Size Selector */
        .font-size-selector {
          display: flex;
          gap: 8px;
        }

        .font-size-selector button {
          padding: 8px 16px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
          color: #666;
        }

        .font-size-selector button:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .font-size-selector button.active {
          background: var(--primary-gradient);
          border-color: transparent;
          color: white;
        }

        /* Action Buttons */
        .settings-action-btn {
          width: 100%;
          padding: 12px;
          margin-bottom: 10px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s ease;
          color: #333;
        }

        .settings-action-btn:hover {
          border-color: #667eea;
          background: #f8f9ff;
          color: #667eea;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Dark Mode Styles */
        :global(.dark) .settings-panel {
          background: #2a2a2a;
        }

        :global(.dark) .settings-header {
          background: var(--primary-gradient);
        }

        :global(.dark) .settings-section h3 {
          color: white;
          border-bottom-color: #444;
        }

        :global(.dark) .setting-item {
          border-bottom-color: #444;
        }

        :global(.dark) .setting-label > span:first-child {
          color: white;
        }

        :global(.dark) .setting-description {
          color: #aaa;
        }

        :global(.dark) .font-size-selector button {
          background: #1a1a1a;
          border-color: #444;
          color: #e0e0e0;
        }

        :global(.dark) .font-size-selector button:hover {
          border-color: #667eea;
          color: #667eea;
        }

        :global(.dark) .settings-action-btn {
          background: #1a1a1a;
          border-color: #444;
          color: #e0e0e0;
        }

        :global(.dark) .settings-action-btn:hover {
          background: #333;
          border-color: #667eea;
        }

        /* Font Size Variables */
        :global([data-font-size="small"]) {
          font-size: 14px;
        }

        :global([data-font-size="medium"]) {
          font-size: 16px;
        }

        :global([data-font-size="large"]) {
          font-size: 18px;
        }

        /* No Animations */
        :global(.no-animations) *,
        :global(.no-animations) *::before,
        :global(.no-animations) *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        /* Compact Mode */
        :global(.compact-mode) .container {
          max-width: 1000px;
        }

        :global(.compact-mode) .section-title {
          font-size: 2rem;
          margin-bottom: 40px;
        }

        :global(.compact-mode) .feature-card,
        :global(.compact-mode) .use-case-card {
          padding: 25px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .settings-panel {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}


