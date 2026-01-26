'use client'

import { useState } from 'react'

interface ContactFormProps {
  title?: string
  subtitle?: string
}

export default function ContactForm({ title = "Contact Us", subtitle }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="contact-form-wrapper">
      <h3>{title}</h3>
      {subtitle && <p className="contact-subtitle">{subtitle}</p>}
      
      {submitted ? (
        <div className="success-message">
          <div className="success-icon">✅</div>
          <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      )}
      
      <style jsx>{`
        .contact-form-wrapper {
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        h3 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
        }
        .contact-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .form-group label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }
        .form-group input,
        .form-group textarea {
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }
        .submit-btn {
          padding: 15px 30px;
          background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .success-message {
          text-align: center;
          padding: 40px;
        }
        .success-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        :global(.dark) .contact-form-wrapper {
          background: #2a2a2a;
        }
        :global(.dark) h3,
        :global(.dark) .form-group label {
          color: #e0e0e0;
        }
        :global(.dark) .contact-subtitle {
          color: #aaa;
        }
        :global(.dark) .form-group input,
        :global(.dark) .form-group textarea {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

