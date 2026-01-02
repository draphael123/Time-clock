'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  text: string
  user: string
  timestamp: number
  userId: string
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize Firebase (will be set up with environment variables)
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Generate a unique user ID if not set
    if (!userId) {
      const storedUserId = localStorage.getItem('chatUserId')
      if (storedUserId) {
        setUserId(storedUserId)
      } else {
        const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        setUserId(newUserId)
        localStorage.setItem('chatUserId', newUserId)
      }
    }

    // Get username from localStorage
    const storedUsername = localStorage.getItem('chatUsername')
    if (storedUsername) {
      setUsername(storedUsername)
      setShowUsernameModal(false)
    }

    // Initialize Firebase connection (with delay to ensure DOM is ready)
    const timer = setTimeout(() => {
      initializeFirebase()
    }, 100)

    return () => clearTimeout(timer)
  }, [userId])

  const initializeFirebase = async () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsConnected(false)
      return
    }

    try {
      // Check if Firebase config is available
      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

      if (!apiKey || !databaseURL || apiKey === 'demo-key') {
        console.log('Firebase not configured, using offline mode')
        setIsConnected(false)
        loadMessagesFromStorage()
        return
      }

      // Dynamic import of Firebase - only on client side
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default

      // Firebase config from environment variables
      const firebaseConfig = {
        apiKey: apiKey,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
        databaseURL: databaseURL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
      }

      // Initialize Firebase if not already initialized
      let app
      try {
        app = firebase.getApp()
      } catch (e) {
        app = firebase.initializeApp(firebaseConfig)
      }

      const { getDatabase, ref, get, onChildAdded } = await import('firebase/database')
      const db = getDatabase(app)

      // Load existing messages
      const messagesRef = ref(db, 'messages')
      const snapshot = await get(messagesRef)
      if (snapshot.exists()) {
        const messagesData = snapshot.val()
        const messagesArray = Object.values(messagesData) as Message[]
        setMessages(messagesArray.sort((a, b) => a.timestamp - b.timestamp))
        scrollToBottom()
      }

      // Listen for new messages
      onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val()
        setMessages((prev) => {
          // Avoid duplicates
          if (prev.find((m) => m.id === message.id)) return prev
          return [...prev, message].sort((a, b) => a.timestamp - b.timestamp)
        })
        scrollToBottom()
      })

      setIsConnected(true)
    } catch (error) {
      console.error('Firebase initialization error:', error)
      // Fallback: Use localStorage for demo (single-user, no real-time)
      setIsConnected(false)
      loadMessagesFromStorage()
    }
  }

  const loadMessagesFromStorage = () => {
    const stored = localStorage.getItem('chatMessages')
    if (stored) {
      try {
        setMessages(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading messages from storage:', e)
      }
    }
  }

  const saveMessageToStorage = (message: Message) => {
    const updated = [...messages, message]
    localStorage.setItem('chatMessages', JSON.stringify(updated))
  }

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem('chatUsername', username)
      setShowUsernameModal(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !username.trim()) return

    const message: Message = {
      id: `${userId}_${Date.now()}`,
      text: newMessage.trim(),
      user: username,
      timestamp: Date.now(),
      userId: userId
    }

    try {
      if (isConnected && typeof window !== 'undefined') {
        // Send to Firebase
        const firebaseModule = await import('firebase/app')
        const firebase = firebaseModule.default
        const { getDatabase, ref, push } = await import('firebase/database')
        let app
        try {
          app = firebase.getApp()
        } catch (e) {
          // App not initialized, use fallback
          throw new Error('Firebase not initialized')
        }
        const db = getDatabase(app)
        const messagesRef = ref(db, 'messages')
        await push(messagesRef, message)
      } else {
        // Fallback: Save to localStorage and state
        saveMessageToStorage(message)
        setMessages((prev) => [...prev, message])
      }

      setNewMessage('')
      scrollToBottom()
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback to localStorage
      saveMessageToStorage(message)
      setMessages((prev) => [...prev, message])
      setNewMessage('')
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, messages])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Username Modal */}
      {showUsernameModal && (
        <div className="username-modal-overlay">
          <div className="username-modal">
            <h3>Enter Your Name</h3>
            <p>Choose a name to join the chat</p>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                maxLength={20}
                autoFocus
                required
                className="username-input"
              />
              <button type="submit" className="username-submit-btn">
                Join Chat
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
        {/* Chat Button */}
        <button
          className="chat-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle chat"
        >
          {isOpen ? '✕' : '💬'}
          {!isOpen && messages.length > 0 && (
            <span className="chat-badge">{messages.length}</span>
          )}
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div className="chat-window" ref={chatContainerRef}>
            <div className="chat-header">
              <div className="chat-header-content">
                <span className="chat-icon">💬</span>
                <div>
                  <h3>Live Chat</h3>
                  <p className="chat-status">
                    {isConnected ? (
                      <span className="status-online">🟢 Online</span>
                    ) : (
                      <span className="status-offline">⚫ Offline Mode</span>
                    )}
                  </p>
                </div>
              </div>
              <button
                className="chat-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-empty">
                  <p>No messages yet. Start the conversation! 👋</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-message ${msg.userId === userId ? 'own-message' : ''}`}
                  >
                    <div className="message-header">
                      <span className="message-user">{msg.user}</span>
                      <span className="message-time">{formatTime(msg.timestamp)}</span>
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={sendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                maxLength={500}
                className="chat-input"
                disabled={!username}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!newMessage.trim() || !username}
                aria-label="Send message"
              >
                ➤
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Username Modal */
        .username-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          animation: fadeIn 0.3s ease;
        }

        .username-modal {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 90%;
          animation: slideUp 0.3s ease;
        }

        .username-modal h3 {
          margin: 0 0 10px 0;
          font-size: 1.5rem;
          color: #333;
        }

        .username-modal p {
          margin: 0 0 20px 0;
          color: #666;
        }

        .username-input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          margin-bottom: 15px;
          transition: border-color 0.3s ease;
        }

        .username-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .username-submit-btn {
          width: 100%;
          padding: 12px;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .username-submit-btn:hover {
          transform: translateY(-2px);
        }

        /* Chat Widget */
        .chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 10000;
        }

        .chat-toggle-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary-gradient);
          color: white;
          border: none;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-toggle-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }

        .chat-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #f5576c;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        /* Chat Window */
        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 600px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        .chat-header {
          background: var(--primary-gradient);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-icon {
          font-size: 24px;
        }

        .chat-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .chat-status {
          margin: 5px 0 0 0;
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .status-online {
          color: #4ade80;
        }

        .status-offline {
          color: #94a3b8;
        }

        .chat-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.2s ease;
        }

        .chat-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: #f8f9fa;
        }

        .chat-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #999;
          text-align: center;
        }

        .chat-message {
          margin-bottom: 15px;
          animation: fadeInUp 0.3s ease;
        }

        .chat-message.own-message {
          text-align: right;
        }

        .message-header {
          display: flex;
          gap: 10px;
          margin-bottom: 5px;
          font-size: 0.85rem;
        }

        .chat-message.own-message .message-header {
          justify-content: flex-end;
        }

        .message-user {
          font-weight: 700;
          color: #667eea;
        }

        .chat-message.own-message .message-user {
          color: #764ba2;
        }

        .message-time {
          color: #999;
        }

        .message-text {
          background: white;
          padding: 10px 15px;
          border-radius: 15px;
          display: inline-block;
          max-width: 80%;
          word-wrap: break-word;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .chat-message.own-message .message-text {
          background: var(--primary-gradient);
          color: white;
        }

        .chat-input-form {
          display: flex;
          padding: 15px;
          background: white;
          border-top: 1px solid #eee;
          gap: 10px;
        }

        .chat-input {
          flex: 1;
          padding: 12px 15px;
          border: 2px solid #eee;
          border-radius: 25px;
          font-size: 0.95rem;
          transition: border-color 0.3s ease;
        }

        .chat-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .chat-input:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .chat-send-btn {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: var(--primary-gradient);
          color: white;
          border: none;
          font-size: 20px;
          cursor: pointer;
          transition: transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
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

        @keyframes fadeInUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Dark Mode */
        :global(.dark) .username-modal {
          background: #2a2a2a;
          color: white;
        }

        :global(.dark) .username-modal h3 {
          color: white;
        }

        :global(.dark) .username-input {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }

        :global(.dark) .chat-window {
          background: #2a2a2a;
        }

        :global(.dark) .chat-messages {
          background: #1a1a1a;
        }

        :global(.dark) .message-text {
          background: #333;
          color: white;
        }

        :global(.dark) .chat-message.own-message .message-text {
          background: var(--primary-gradient);
        }

        :global(.dark) .chat-input-form {
          background: #2a2a2a;
          border-top-color: #444;
        }

        :global(.dark) .chat-input {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .chat-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 100px);
            bottom: 80px;
            right: 20px;
            left: 20px;
          }

          .username-modal {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  )
}

