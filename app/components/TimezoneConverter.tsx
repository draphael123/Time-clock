'use client'

import { useState, useEffect } from 'react'

const timezones = [
  { id: 'local', name: 'Your Local Time', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { id: 'est', name: 'Eastern Time (US)', timezone: 'America/New_York' },
  { id: 'pst', name: 'Pacific Time (US)', timezone: 'America/Los_Angeles' },
  { id: 'cst', name: 'Central Time (US)', timezone: 'America/Chicago' },
  { id: 'mst', name: 'Mountain Time (US)', timezone: 'America/Denver' },
  { id: 'gmt', name: 'GMT / UTC', timezone: 'UTC' },
  { id: 'london', name: 'London, UK', timezone: 'Europe/London' },
  { id: 'paris', name: 'Paris, France', timezone: 'Europe/Paris' },
  { id: 'berlin', name: 'Berlin, Germany', timezone: 'Europe/Berlin' },
  { id: 'rome', name: 'Rome, Italy', timezone: 'Europe/Rome' },
  { id: 'moscow', name: 'Moscow, Russia', timezone: 'Europe/Moscow' },
  { id: 'dubai', name: 'Dubai, UAE', timezone: 'Asia/Dubai' },
  { id: 'mumbai', name: 'Mumbai, India', timezone: 'Asia/Kolkata' },
  { id: 'singapore', name: 'Singapore', timezone: 'Asia/Singapore' },
  { id: 'hongkong', name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
  { id: 'tokyo', name: 'Tokyo, Japan', timezone: 'Asia/Tokyo' },
  { id: 'sydney', name: 'Sydney, Australia', timezone: 'Australia/Sydney' },
  { id: 'auckland', name: 'Auckland, NZ', timezone: 'Pacific/Auckland' },
  { id: 'saopaulo', name: 'São Paulo, Brazil', timezone: 'America/Sao_Paulo' },
  { id: 'buenosaires', name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' }
]

interface ConversionResult {
  id: string
  name: string
  timezone: string
  time: string
  date: string
  isDay: boolean
  offset: string
}

export default function TimezoneConverter() {
  const [inputTime, setInputTime] = useState('')
  const [inputDate, setInputDate] = useState('')
  const [fromTimezone, setFromTimezone] = useState('local')
  const [selectedTimezones, setSelectedTimezones] = useState(['est', 'pst', 'london', 'tokyo'])
  const [results, setResults] = useState<ConversionResult[]>([])
  const [showAllTimezones, setShowAllTimezones] = useState(false)

  useEffect(() => {
    // Set default time to now
    const now = new Date()
    setInputTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
    setInputDate(now.toISOString().split('T')[0])
  }, [])

  const convertTime = () => {
    if (!inputTime || !inputDate) return

    const fromTz = timezones.find(tz => tz.id === fromTimezone)
    if (!fromTz) return

    const [hours, minutes] = inputTime.split(':').map(Number)
    const [year, month, day] = inputDate.split('-').map(Number)
    
    // Create date in the source timezone
    const sourceDate = new Date(year, month - 1, day, hours, minutes)
    
    const conversions: ConversionResult[] = []
    
    timezones
      .filter(tz => showAllTimezones || selectedTimezones.includes(tz.id))
      .forEach(tz => {
        try {
          const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: tz.timezone
          }
          const dateOptions: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: tz.timezone
          }
          
          const hour = parseInt(sourceDate.toLocaleString('en-US', { 
            hour: '2-digit', 
            hour12: false, 
            timeZone: tz.timezone 
          }))
          
          // Calculate offset
          const utcDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: 'UTC' }))
          const tzDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: tz.timezone }))
          const offsetHours = Math.round((tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60))
          
          conversions.push({
            id: tz.id,
            name: tz.name,
            timezone: tz.timezone,
            time: sourceDate.toLocaleTimeString('en-US', timeOptions),
            date: sourceDate.toLocaleDateString('en-US', dateOptions),
            isDay: hour >= 6 && hour < 20,
            offset: `UTC${offsetHours >= 0 ? '+' : ''}${offsetHours}`
          })
        } catch (e) {
          console.error('Error converting', tz.timezone, e)
        }
      })
    
    setResults(conversions)
  }

  const toggleTimezone = (id: string) => {
    if (selectedTimezones.includes(id)) {
      setSelectedTimezones(selectedTimezones.filter(t => t !== id))
    } else {
      setSelectedTimezones([...selectedTimezones, id])
    }
  }

  const copyAllResults = () => {
    const text = results.map(r => `${r.name}: ${r.time} ${r.date}`).join('\n')
    navigator.clipboard.writeText(text)
  }

  const shareResults = () => {
    const params = new URLSearchParams({
      time: inputTime,
      date: inputDate,
      from: fromTimezone,
      to: selectedTimezones.join(',')
    })
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}#converter`
    navigator.clipboard.writeText(url)
    alert('Shareable link copied to clipboard!')
  }

  return (
    <section className="converter-section" id="converter">
      <div className="container">
        <h2 className="section-title">⏰ Time Zone Converter</h2>
        <p className="section-subtitle">
          Convert times between any time zones instantly. No account required!
        </p>

        <div className="converter-container">
          {/* Input Section */}
          <div className="converter-input-section">
            <h3>Convert From</h3>
            
            <div className="converter-input-group">
              <label>Time</label>
              <input
                type="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                className="converter-time-input"
              />
            </div>

            <div className="converter-input-group">
              <label>Date</label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="converter-date-input"
              />
            </div>

            <div className="converter-input-group">
              <label>From Timezone</label>
              <select
                value={fromTimezone}
                onChange={(e) => setFromTimezone(e.target.value)}
                className="converter-select"
              >
                {timezones.map(tz => (
                  <option key={tz.id} value={tz.id}>{tz.name}</option>
                ))}
              </select>
            </div>

            <button onClick={convertTime} className="converter-btn primary">
              🔄 Convert Time
            </button>
          </div>

          {/* Timezone Selection */}
          <div className="converter-timezone-selection">
            <h3>Convert To</h3>
            <label className="converter-show-all">
              <input
                type="checkbox"
                checked={showAllTimezones}
                onChange={(e) => setShowAllTimezones(e.target.checked)}
              />
              <span>Show all timezones</span>
            </label>
            
            {!showAllTimezones && (
              <div className="converter-tz-chips">
                {timezones.filter(tz => tz.id !== 'local').map(tz => (
                  <button
                    key={tz.id}
                    className={`converter-tz-chip ${selectedTimezones.includes(tz.id) ? 'active' : ''}`}
                    onClick={() => toggleTimezone(tz.id)}
                  >
                    {tz.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="converter-results">
              <div className="converter-results-header">
                <h3>Results</h3>
                <div className="converter-results-actions">
                  <button onClick={copyAllResults} className="converter-btn secondary">
                    📋 Copy All
                  </button>
                  <button onClick={shareResults} className="converter-btn secondary">
                    🔗 Share
                  </button>
                </div>
              </div>
              
              <div className="converter-results-grid">
                {results.map(result => (
                  <div key={result.id} className="converter-result-card">
                    <div className="converter-result-header">
                      <span className="converter-result-day">
                        {result.isDay ? '☀️' : '🌙'}
                      </span>
                      <span className="converter-result-name">{result.name}</span>
                      <span className="converter-result-offset">{result.offset}</span>
                    </div>
                    <div className="converter-result-time">{result.time}</div>
                    <div className="converter-result-date">{result.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}





