'use client'

import { useState, useEffect } from 'react'

interface TimezoneData {
  id: string
  name: string
  timezone: string
  flag: string
  time: string
  date: string
  isDay: boolean
}

const defaultTimezones = [
  { id: 'est', name: 'Eastern Time', timezone: 'America/New_York', flag: '🇺🇸' },
  { id: 'pst', name: 'Pacific Time', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { id: 'brazil', name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { id: 'italy', name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' }
]

const additionalTimezones = [
  { id: 'london', name: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
  { id: 'tokyo', name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'sydney', name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { id: 'dubai', name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { id: 'paris', name: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { id: 'singapore', name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' }
]

export default function InteractiveDemo() {
  const [activeTimezones, setActiveTimezones] = useState(defaultTimezones)
  const [timezoneData, setTimezoneData] = useState<TimezoneData[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [compactMode, setCompactMode] = useState(false)
  const [hour24, setHour24] = useState(false)
  const [showSeconds, setShowSeconds] = useState(true)
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const data = activeTimezones.map(tz => {
        const timeOptions: Intl.DateTimeFormatOptions = {
          hour12: !hour24,
          hour: '2-digit',
          minute: '2-digit',
          second: showSeconds ? '2-digit' : undefined,
          timeZone: tz.timezone
        }
        const dateOptions: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          timeZone: tz.timezone
        }
        
        const hour = parseInt(now.toLocaleString('en-US', { 
          hour: '2-digit', 
          hour12: false, 
          timeZone: tz.timezone 
        }))
        
        return {
          ...tz,
          time: now.toLocaleTimeString('en-US', timeOptions),
          date: now.toLocaleDateString('en-US', dateOptions),
          isDay: hour >= 6 && hour < 20
        }
      })
      setTimezoneData(data)
    }
    
    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [activeTimezones, hour24, showSeconds])

  const addTimezone = (tz: typeof additionalTimezones[0]) => {
    if (activeTimezones.find(t => t.id === tz.id)) return
    setActiveTimezones([...activeTimezones, tz])
    setShowAddPanel(false)
  }

  const removeTimezone = (id: string) => {
    setActiveTimezones(activeTimezones.filter(t => t.id !== id))
  }

  const copyTime = (tz: TimezoneData) => {
    navigator.clipboard.writeText(`${tz.name}: ${tz.time} ${tz.date}`)
    setCopiedId(tz.id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <section className="interactive-demo-section" id="demo">
      <div className="container">
        <h2 className="section-title">Try It Live</h2>
        <p className="section-subtitle">
          Experience the extension right here - no installation needed!
        </p>
        
        <div className={`demo-container ${darkMode ? 'dark' : ''} ${compactMode ? 'compact' : ''}`}>
          {/* Demo Header */}
          <div className="demo-header">
            <div className="demo-title">
              <span>🌏</span>
              <span>World Clock</span>
            </div>
            <div className="demo-controls">
              <button 
                className="demo-btn" 
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button 
                className="demo-btn"
                onClick={() => setCompactMode(!compactMode)}
                title="Toggle compact mode"
              >
                📐
              </button>
              <button 
                className="demo-btn"
                onClick={() => setShowAddPanel(true)}
                title="Add timezone"
              >
                ➕
              </button>
            </div>
          </div>

          {/* Settings Bar */}
          <div className="demo-settings">
            <label className="demo-checkbox">
              <input 
                type="checkbox" 
                checked={hour24} 
                onChange={(e) => setHour24(e.target.checked)} 
              />
              <span>24-hour</span>
            </label>
            <label className="demo-checkbox">
              <input 
                type="checkbox" 
                checked={showSeconds} 
                onChange={(e) => setShowSeconds(e.target.checked)} 
              />
              <span>Seconds</span>
            </label>
          </div>

          {/* Clock Grid */}
          <div className={`demo-clock-grid ${compactMode ? 'compact' : ''}`}>
            {timezoneData.map(tz => (
              <div 
                key={tz.id}
                className={`demo-clock-card ${copiedId === tz.id ? 'copied' : ''}`}
                onClick={() => copyTime(tz)}
              >
                <button 
                  className="demo-remove-btn"
                  onClick={(e) => { e.stopPropagation(); removeTimezone(tz.id) }}
                  title="Remove"
                >
                  ×
                </button>
                <div className="demo-day-indicator">
                  {tz.isDay ? '☀️' : '🌙'}
                </div>
                <div className="demo-flag">{tz.flag}</div>
                <div className="demo-tz-name">{tz.name}</div>
                <div className="demo-time">{tz.time}</div>
                {!compactMode && <div className="demo-date">{tz.date}</div>}
              </div>
            ))}
          </div>

          {/* Add Timezone Panel */}
          {showAddPanel && (
            <div className="demo-add-panel">
              <div className="demo-add-content">
                <h4>Add Timezone</h4>
                <div className="demo-tz-list">
                  {additionalTimezones
                    .filter(tz => !activeTimezones.find(t => t.id === tz.id))
                    .map(tz => (
                      <button 
                        key={tz.id}
                        className="demo-tz-option"
                        onClick={() => addTimezone(tz)}
                      >
                        <span>{tz.flag}</span>
                        <span>{tz.name}</span>
                      </button>
                    ))
                  }
                </div>
                <button 
                  className="demo-close-btn"
                  onClick={() => setShowAddPanel(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Toast */}
          {copiedId && (
            <div className="demo-toast">
              ✓ Copied to clipboard!
            </div>
          )}
        </div>

        <p className="demo-note">
          Click any clock to copy the time. This is a live preview of the actual extension!
        </p>
      </div>
    </section>
  )
}





