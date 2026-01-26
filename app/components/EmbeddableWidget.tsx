'use client'

import { useState, useEffect } from 'react'

export default function EmbeddableWidget() {
  const [showCode, setShowCode] = useState(false)
  const [times, setTimes] = useState({
    newYork: '',
    london: '',
    tokyo: ''
  })

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      }
      
      setTimes({
        newYork: now.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'America/New_York' }),
        london: now.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'Europe/London' }),
        tokyo: now.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'Asia/Tokyo' })
      })
    }
    
    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  const embedCode = `<iframe 
  src="https://worldclock.example.com/widget" 
  width="300" 
  height="200" 
  frameborder="0"
  style="border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
></iframe>`

  return (
    <section className="embeddable-widget">
      <div className="container">
        <h2 className="section-title">Embed <em>anywhere</em></h2>
        <p className="section-subtitle">Add a world clock widget to your website</p>
        
        <div className="widget-demo">
          <div className="widget-preview">
            <div className="mini-widget">
              <div className="widget-header">🌏 World Clock</div>
              <div className="widget-times">
                <div className="widget-time-row">
                  <span className="city">🇺🇸 New York</span>
                  <span className="time">{times.newYork}</span>
                </div>
                <div className="widget-time-row">
                  <span className="city">🇬🇧 London</span>
                  <span className="time">{times.london}</span>
                </div>
                <div className="widget-time-row">
                  <span className="city">🇯🇵 Tokyo</span>
                  <span className="time">{times.tokyo}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="widget-info">
            <h3>Free Widget for Your Website</h3>
            <ul>
              <li>✅ Live updating times</li>
              <li>✅ Customizable timezones</li>
              <li>✅ Light & dark themes</li>
              <li>✅ Mobile responsive</li>
            </ul>
            <button onClick={() => setShowCode(!showCode)} className="get-code-btn">
              {showCode ? 'Hide Code' : 'Get Embed Code'}
            </button>
            
            {showCode && (
              <div className="code-block">
                <pre>{embedCode}</pre>
                <button 
                  onClick={() => navigator.clipboard.writeText(embedCode)}
                  className="copy-btn"
                >
                  📋 Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .embeddable-widget {
          padding: 100px 20px;
          background: white;
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
        .widget-demo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }
        .widget-preview {
          display: flex;
          justify-content: center;
        }
        .mini-widget {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          padding: 20px;
          width: 280px;
          color: white;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .widget-header {
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 15px;
          text-align: center;
        }
        .widget-times {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .widget-time-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        .city {
          font-size: 14px;
        }
        .time {
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        .widget-info h3 {
          margin-bottom: 20px;
          color: #333;
        }
        .widget-info ul {
          list-style: none;
          padding: 0;
          margin-bottom: 25px;
        }
        .widget-info li {
          padding: 8px 0;
          color: #666;
        }
        .get-code-btn {
          padding: 15px 30px;
          background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .get-code-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .code-block {
          margin-top: 20px;
          background: #1a1a1a;
          border-radius: 10px;
          padding: 20px;
          position: relative;
        }
        .code-block pre {
          color: #e0e0e0;
          font-size: 12px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .copy-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          background: #333;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          font-size: 12px;
        }
        .copy-btn:hover {
          background: #444;
        }
        :global(.dark) .embeddable-widget {
          background: #1a1a1a;
        }
        :global(.dark) .widget-info h3 {
          color: #e0e0e0;
        }
        :global(.dark) .widget-info li {
          color: #aaa;
        }
        @media (max-width: 768px) {
          .widget-demo {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

