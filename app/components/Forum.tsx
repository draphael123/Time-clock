'use client'

import { useState } from 'react'

interface ForumPost {
  id: number
  title: string
  author: string
  replies: number
  date: string
}

export default function Forum() {
  const [isOpen, setIsOpen] = useState(false)
  
  const samplePosts: ForumPost[] = [
    { id: 1, title: "How to add custom timezones?", author: "TimeTracker", replies: 5, date: "2 hours ago" },
    { id: 2, title: "Feature request: Calendar integration", author: "GlobalWorker", replies: 12, date: "1 day ago" },
    { id: 3, title: "Dark mode not saving", author: "NightOwl", replies: 3, date: "3 days ago" },
  ]

  if (!isOpen) return null

  return (
    <div className="forum-overlay">
      <div className="forum-container">
        <div className="forum-header">
          <h2>💬 Community Forum</h2>
          <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
        </div>
        <div className="forum-content">
          <p className="forum-notice">
            Join the discussion on GitHub Discussions for questions, feature requests, and community support.
          </p>
          <div className="forum-posts">
            {samplePosts.map(post => (
              <div key={post.id} className="forum-post">
                <div className="post-title">{post.title}</div>
                <div className="post-meta">
                  <span>by {post.author}</span>
                  <span>{post.replies} replies</span>
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
          <a 
            href="https://github.com/draphael123/Time-clock/discussions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="forum-link"
          >
            Visit GitHub Discussions →
          </a>
        </div>
      </div>
      <style jsx>{`
        .forum-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .forum-container {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow: hidden;
        }
        .forum-header {
          background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forum-header h2 {
          margin: 0;
        }
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
        }
        .forum-content {
          padding: 20px;
          overflow-y: auto;
          max-height: 60vh;
        }
        .forum-notice {
          background: #f0f7ff;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          color: #333;
        }
        .forum-posts {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .forum-post {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #667eea;
        }
        .post-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        .post-meta {
          display: flex;
          gap: 15px;
          font-size: 12px;
          color: #666;
        }
        .forum-link {
          display: block;
          text-align: center;
          margin-top: 20px;
          padding: 15px;
          background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
        }
        :global(.dark) .forum-container {
          background: #1a1a1a;
        }
        :global(.dark) .forum-notice {
          background: #2a2a2a;
          color: #e0e0e0;
        }
        :global(.dark) .forum-post {
          background: #2a2a2a;
        }
        :global(.dark) .post-title {
          color: #e0e0e0;
        }
      `}</style>
    </div>
  )
}

