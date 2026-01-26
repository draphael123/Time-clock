'use client'

import { useState, useEffect } from 'react'

interface TimeSlot {
  hour: number
  available: boolean[]
}

export default function MeetingScheduler() {
  const [selectedTimezones, setSelectedTimezones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo'])
  const [meetingLength, setMeetingLength] = useState(60)
  const [businessHoursOnly, setBusinessHoursOnly] = useState(true)
  const [bestTimes, setBestTimes] = useState<string[]>([])

  const timezoneOptions = [
    { value: 'America/New_York', label: 'New York (EST)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
    { value: 'America/Chicago', label: 'Chicago (CST)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  ]

  const findBestTimes = () => {
    const times: string[] = []
    const now = new Date()
    
    for (let hour = 0; hour < 24; hour++) {
      const testDate = new Date(now)
      testDate.setHours(hour, 0, 0, 0)
      
      let allAvailable = true
      
      for (const tz of selectedTimezones) {
        const localHour = parseInt(testDate.toLocaleString('en-US', { 
          timeZone: tz, 
          hour: 'numeric', 
          hour12: false 
        }))
        
        if (businessHoursOnly && (localHour < 9 || localHour >= 17)) {
          allAvailable = false
          break
        }
      }
      
      if (allAvailable) {
        times.push(testDate.toLocaleString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true,
          timeZoneName: 'short'
        }))
      }
    }
    
    setBestTimes(times.slice(0, 5))
  }

  useEffect(() => {
    findBestTimes()
  }, [selectedTimezones, businessHoursOnly])

  return (
    <section className="meeting-scheduler">
      <div className="container">
        <h2 className="section-title">Find the <em>best time</em></h2>
        <p className="section-subtitle">Schedule meetings across multiple time zones</p>
        
        <div className="scheduler-grid">
          <div className="scheduler-config">
            <div className="config-group">
              <label>Select Timezones</label>
              <div className="timezone-checkboxes">
                {timezoneOptions.map(tz => (
                  <label key={tz.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedTimezones.includes(tz.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTimezones([...selectedTimezones, tz.value])
                        } else {
                          setSelectedTimezones(selectedTimezones.filter(t => t !== tz.value))
                        }
                      }}
                    />
                    {tz.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="config-group">
              <label>Meeting Length</label>
              <select value={meetingLength} onChange={(e) => setMeetingLength(Number(e.target.value))}>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            
            <div className="config-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={businessHoursOnly}
                  onChange={(e) => setBusinessHoursOnly(e.target.checked)}
                />
                Business hours only (9 AM - 5 PM)
              </label>
            </div>
          </div>
          
          <div className="scheduler-results">
            <h3>Best Meeting Times</h3>
            {bestTimes.length > 0 ? (
              <div className="time-slots">
                {bestTimes.map((time, i) => (
                  <div key={i} className="time-slot">
                    <span className="slot-icon">✅</span>
                    <span className="slot-time">{time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-times">No overlapping business hours found. Try unchecking "Business hours only".</p>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .meeting-scheduler {
          padding: 100px 20px;
          background: #f8f9fa;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .section-title {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 15px;
          font-weight: 800;
        }
        .section-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 50px;
        }
        .scheduler-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .scheduler-config {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        .config-group {
          margin-bottom: 25px;
        }
        .config-group > label {
          display: block;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }
        .timezone-checkboxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          max-height: 250px;
          overflow-y: auto;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #333;
        }
        .checkbox-label input {
          accent-color: #667eea;
        }
        select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
        }
        .scheduler-results {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        .scheduler-results h3 {
          margin-bottom: 20px;
          color: #333;
        }
        .time-slots {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .time-slot {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: #f0fdf4;
          border-radius: 10px;
          border-left: 4px solid #22c55e;
        }
        .slot-icon {
          font-size: 20px;
        }
        .slot-time {
          font-weight: 600;
          color: #333;
        }
        .no-times {
          color: #666;
          font-style: italic;
        }
        :global(.dark) .meeting-scheduler {
          background: #1a1a1a;
        }
        :global(.dark) .scheduler-config,
        :global(.dark) .scheduler-results {
          background: #2a2a2a;
        }
        :global(.dark) .config-group > label,
        :global(.dark) .scheduler-results h3,
        :global(.dark) .checkbox-label,
        :global(.dark) .slot-time {
          color: #e0e0e0;
        }
        :global(.dark) .timezone-checkboxes {
          background: #1a1a1a;
        }
        :global(.dark) select {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }
        :global(.dark) .time-slot {
          background: rgba(34, 197, 94, 0.1);
        }
        @media (max-width: 768px) {
          .scheduler-grid {
            grid-template-columns: 1fr;
          }
          .timezone-checkboxes {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

