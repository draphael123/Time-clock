'use client'

import { useState } from 'react'

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages(prev => [...prev, { text: input, isUser: true }])
    setInput('')
    
    // Auto-reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! We'll get back to you soon. For immediate help, check our FAQ section.", 
        isUser: false 
      }])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="live-chat-toggle"
        aria-label="Open live chat"
      >
        💬
        <style jsx>{`
          .live-chat-toggle {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
            border: none;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            z-index: 1000;
          }
          .live-chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
          }
        `}</style>
      </button>
    )
  }

  return (
    <div className="live-chat-container">
      <div className="live-chat-header">
        <span>💬 Chat Support</span>
        <button onClick={() => setIsOpen(false)}>×</button>
      </div>
      <div className="live-chat-messages">
        {messages.length === 0 && (
          <p className="chat-welcome">Hi! How can we help you today?</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.isUser ? 'user' : 'support'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="live-chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <style jsx>{`
        .live-chat-container {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 350px;
          height: 450px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
        }
        .live-chat-header {
          background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
          color: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
        }
        .live-chat-header button {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        .live-chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
        }
        .chat-welcome {
          color: #666;
          text-align: center;
          margin-top: 20px;
        }
        .chat-message {
          padding: 10px 15px;
          border-radius: 15px;
          margin-bottom: 10px;
          max-width: 80%;
        }
        .chat-message.user {
          background: #667eea;
          color: white;
          margin-left: auto;
        }
        .chat-message.support {
          background: #f0f0f0;
          color: #333;
        }
        .live-chat-input {
          display: flex;
          gap: 10px;
          padding: 15px;
          border-top: 1px solid #eee;
        }
        .live-chat-input input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 20px;
          outline: none;
        }
        .live-chat-input button {
          padding: 10px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
        }
        :global(.dark) .live-chat-container {
          background: #1a1a1a;
        }
        :global(.dark) .chat-message.support {
          background: #333;
          color: #e0e0e0;
        }
        :global(.dark) .live-chat-input {
          border-top-color: #333;
        }
        :global(.dark) .live-chat-input input {
          background: #333;
          border-color: #444;
          color: white;
        }
        @media (max-width: 768px) {
          .live-chat-container {
            width: calc(100% - 40px);
            right: 20px;
            bottom: 80px;
          }
        }
      `}</style>
    </div>
  )
}

