'use client'

import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (user: { uid: string; email: string | null; displayName: string | null }) => void
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (typeof window === 'undefined') return

      if (isLogin) {
        // Login
        const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
        const firebaseModule = await import('firebase/app')
        const firebase = firebaseModule.default
        
        let app
        try {
          app = firebase.getApp()
        } catch (e) {
          setError('Firebase not initialized. Please configure Firebase first.')
          setLoading(false)
          return
        }

        const auth = getAuth(app)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        onAuthSuccess({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName
        })
        onClose()
      } else {
        // Register
        const { getAuth, createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
        const firebaseModule = await import('firebase/app')
        const firebase = firebaseModule.default
        
        let app
        try {
          app = firebase.getApp()
        } catch (e) {
          setError('Firebase not initialized. Please configure Firebase first.')
          setLoading(false)
          return
        }

        const auth = getAuth(app)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        if (displayName.trim()) {
          await updateProfile(userCredential.user, { displayName: displayName.trim() })
        }

        onAuthSuccess({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: displayName.trim() || userCredential.user.displayName
        })
        onClose()
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="auth-overlay" onClick={onClose}></div>
      <div className="auth-modal">
        <div className="auth-header">
          <h2>{isLogin ? '🔐 Login' : '📝 Register'}</h2>
          <button className="auth-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name (optional)"
                maxLength={30}
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? '⏳ Processing...' : isLogin ? 'Login' : 'Register'}
          </button>

          <div className="auth-switch">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="auth-switch-btn"
            >
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .auth-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          z-index: 10001;
          animation: fadeIn 0.3s ease;
        }

        .auth-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 450px;
          width: 90%;
          z-index: 10002;
          animation: slideUp 0.3s ease;
        }

        .auth-header {
          padding: 25px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--primary-gradient);
          color: white;
          border-radius: 20px 20px 0 0;
        }

        .auth-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .auth-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          transition: background 0.2s ease;
        }

        .auth-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .auth-form {
          padding: 30px;
        }

        .auth-field {
          margin-bottom: 20px;
        }

        .auth-field label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .auth-field input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .auth-field input:focus {
          outline: none;
          border-color: #667eea;
        }

        .auth-error {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }

        .auth-submit-btn {
          width: 100%;
          padding: 14px;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
          margin-bottom: 15px;
        }

        .auth-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .auth-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-switch {
          text-align: center;
        }

        .auth-switch-btn {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          font-size: 0.9rem;
          text-decoration: underline;
          padding: 5px;
        }

        .auth-switch-btn:hover {
          color: #5568d3;
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, -40%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        :global(.dark) .auth-modal {
          background: #2a2a2a;
        }

        :global(.dark) .auth-field label {
          color: white;
        }

        :global(.dark) .auth-field input {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }

        :global(.dark) .auth-header {
          background: var(--primary-gradient);
        }

        @media (max-width: 768px) {
          .auth-modal {
            width: 95%;
          }
        }
      `}</style>
    </>
  )
}

