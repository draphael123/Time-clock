'use client'

import { useState } from 'react'

interface ContactFormProps {
  title?: string
  subtitle?: string
  showName?: boolean
  showEmail?: boolean
  showSubject?: boolean
  showMessage?: boolean
  submitText?: string
  onSubmit?: (data: any) => void
}

export default function ContactForm({
  title = 'Get In Touch',
  subtitle = 'Fill out the form below and we\'ll get back to you as soon as possible.',
  showName = true,
  showEmail = true,
  showSubject = true,
  showMessage = true,
  submitText = 'Send Message',
  onSubmit
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // Validate required fields
      if (showName && !formData.name.trim()) {
        setError('Please enter your name')
        setLoading(false)
        return
      }

      if (showEmail && !formData.email.trim()) {
        setError('Please enter your email')
        setLoading(false)
        return
      }

      if (showEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address')
        setLoading(false)
        return
      }

      if (showSubject && !formData.subject.trim()) {
        setError('Please enter a subject')
        setLoading(false)
        return
      }

      if (showMessage && !formData.message.trim()) {
        setError('Please enter a message')
        setLoading(false)
        return
      }

      // If custom onSubmit handler is provided, use it
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default: simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Store form submission (in a real app, this would be sent to a backend)
        const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]')
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString()
        })
        localStorage.setItem('formSubmissions', JSON.stringify(submissions))
      }

      setSuccess('Message sent successfully! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        {showName && (
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              disabled={loading}
            />
          </div>
        )}

        {showEmail && (
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>
        )}

        {showSubject && (
          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              required
              disabled={loading}
            />
          </div>
        )}

        {showMessage && (
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={6}
              required
              disabled={loading}
            />
          </div>
        )}

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? '⏳ Sending...' : submitText}
        </button>
      </form>

      <style jsx>{`
        .contact-form-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .form-header h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-header p {
          color: #666;
          font-size: 1rem;
        }

        .contact-form {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input:disabled,
        .form-group textarea:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .form-error {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }

        .form-success {
          background: #efe;
          color: #3c3;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        :global(.dark) .contact-form {
          background: #2a2a2a;
        }

        :global(.dark) .form-group label {
          color: white;
        }

        :global(.dark) .form-group input,
        :global(.dark) .form-group textarea {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }

        :global(.dark) .form-header p {
          color: #aaa;
        }

        @media (max-width: 768px) {
          .contact-form {
            padding: 30px 20px;
          }

          .form-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}


