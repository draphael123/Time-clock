'use client'

import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="container">
        <Link href="/" className="back-link">← Back to Home</Link>
        
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 2026</p>

        <section>
          <h2>Introduction</h2>
          <p>
            World Clock Extension ("we", "our", or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how our Chrome extension handles information when you use it.
          </p>
        </section>

        <section>
          <h2>Data Collection</h2>
          <p>
            <strong>We do not collect, store, or transmit any personal data.</strong> Our extension operates 
            entirely offline and locally on your device. Specifically:
          </p>
          <ul>
            <li>No personal information is collected</li>
            <li>No browsing history is accessed</li>
            <li>No location data is collected</li>
            <li>No analytics or tracking is performed</li>
            <li>No data is sent to external servers</li>
            <li>No cookies are used</li>
          </ul>
        </section>

        <section>
          <h2>How the Extension Works</h2>
          <p>
            The World Clock Extension displays time zones using your device's local time and timezone 
            information. All calculations are performed locally in your browser. The extension:
          </p>
          <ul>
            <li>Uses JavaScript's built-in Date API to calculate time zones</li>
            <li>Operates entirely within your browser</li>
            <li>Does not require internet connectivity to function</li>
            <li>Does not communicate with any external services</li>
          </ul>
        </section>

        <section>
          <h2>Permissions</h2>
          <p>
            Our extension requests only the permissions necessary for its features:
          </p>
          <ul>
            <li><strong>Storage</strong> - To save your preferences (timezone selections, display settings) locally and sync across devices</li>
            <li><strong>Notifications</strong> - To alert you when alarms go off</li>
            <li><strong>Alarms</strong> - To schedule alarm functionality</li>
            <li><strong>Context Menus</strong> - To provide quick time-copying via right-click menu</li>
            <li><strong>Active Tab</strong> - Only used to copy time to clipboard when you request it</li>
          </ul>
          <p>We do NOT access your browsing history, personal files, camera, or microphone.</p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            The extension optionally fetches weather data from Open-Meteo, a free, open-source weather API 
            that does not require authentication and does not track users. You can disable this feature in settings.
          </p>
          <p>
            No analytics, advertising, or tracking services are used.
          </p>
        </section>

        <section>
          <h2>Data Storage</h2>
          <p>
            Your preferences (selected timezones, display settings, profiles) are stored using Chrome's 
            built-in sync storage, which means they can sync across your signed-in Chrome browsers. 
            This data never leaves Google's infrastructure and is protected by your Google account security.
          </p>
          <p>
            Device-specific data (like alarm times) is stored locally and does not sync.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our extension does not collect any information from anyone, including children. 
            Since we do not collect data, we are compliant with all children's privacy regulations.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page 
            with an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2>Open Source</h2>
          <p>
            This extension is open source and available on GitHub. You can review the source code at any time 
            to verify our privacy claims. The codebase is transparent and auditable.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our 
            <a href="https://github.com/draphael123/Time-clock" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
          </p>
        </section>

        <section>
          <h2>Your Consent</h2>
          <p>
            By using the World Clock Extension, you consent to this Privacy Policy. Since we do not collect 
            any data, your use of the extension is completely private and secure.
          </p>
        </section>
      </div>

      <style jsx>{`
        .privacy-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 40px 20px;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 60px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .back-link {
          display: inline-block;
          margin-bottom: 30px;
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #764ba2;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .last-updated {
          color: #666;
          margin-bottom: 40px;
          font-style: italic;
        }

        section {
          margin-bottom: 40px;
        }

        h2 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: #333;
          margin-top: 30px;
        }

        p {
          line-height: 1.8;
          color: #555;
          margin-bottom: 15px;
        }

        ul {
          margin-left: 30px;
          margin-bottom: 20px;
        }

        li {
          line-height: 1.8;
          color: #555;
          margin-bottom: 10px;
        }

        strong {
          color: #333;
        }

        a {
          color: #667eea;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        a:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .container {
            padding: 30px 20px;
          }

          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

