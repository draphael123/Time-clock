'use client'

import { useState, useEffect } from 'react'
import AuthModal from './AuthModal'

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

interface Post {
  id: string
  title: string
  content: string
  author: string
  authorName: string
  category: string
  timestamp: number
  replies?: Reply[]
}

interface Reply {
  id: string
  content: string
  author: string
  authorName: string
  timestamp: number
}

export default function Forum() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState('general')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newReply, setNewReply] = useState('')

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📋' },
    { id: 'general', name: 'General', icon: '💬' },
    { id: 'support', name: 'Support', icon: '🆘' },
    { id: 'features', name: 'Features', icon: '💡' },
    { id: 'bugs', name: 'Bugs', icon: '🐛' },
    { id: 'tips', name: 'Tips & Tricks', icon: '💡' }
  ]

  useEffect(() => {
    checkAuth()
    loadPosts()
  }, [])

  const checkAuth = async () => {
    if (typeof window === 'undefined') return

    try {
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default
      const { getAuth, onAuthStateChanged } = await import('firebase/auth')

      let app
      try {
        app = firebase.getApp()
      } catch (e) {
        return // Firebase not configured
      }

      const auth = getAuth(app)
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName
          })
        } else {
          setUser(null)
        }
      })
    } catch (error) {
      console.error('Auth check error:', error)
    }
  }

  const loadPosts = async () => {
    if (typeof window === 'undefined') return

    try {
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default
      const { getDatabase, ref, get, onValue } = await import('firebase/database')

      let app
      try {
        app = firebase.getApp()
      } catch (e) {
        // Firebase not configured, use localStorage fallback
        loadPostsFromStorage()
        return
      }

      const db = getDatabase(app)
      const postsRef = ref(db, 'forum/posts')

      // Load initial posts
      const snapshot = await get(postsRef)
      if (snapshot.exists()) {
        const postsData = snapshot.val()
        const postsArray = Object.values(postsData) as Post[]
        setPosts(postsArray.sort((a, b) => b.timestamp - a.timestamp))
      }

      // Listen for new posts
      onValue(postsRef, (snapshot) => {
        if (snapshot.exists()) {
          const postsData = snapshot.val()
          const postsArray = Object.values(postsData) as Post[]
          setPosts(postsArray.sort((a, b) => b.timestamp - a.timestamp))
        }
      })
    } catch (error) {
      console.error('Load posts error:', error)
      loadPostsFromStorage()
    }
  }

  const loadPostsFromStorage = () => {
    const stored = localStorage.getItem('forumPosts')
    if (stored) {
      try {
        setPosts(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading posts from storage:', e)
      }
    }
  }

  const savePostToStorage = (post: Post) => {
    const updated = [...posts, post]
    localStorage.setItem('forumPosts', JSON.stringify(updated))
  }

  const handleAuthSuccess = (userData: User) => {
    setUser(userData)
    setShowAuth(false)
  }

  const handleLogout = async () => {
    try {
      const { getAuth, signOut } = await import('firebase/auth')
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default
      
      let app
      try {
        app = firebase.getApp()
        const auth = getAuth(app)
        await signOut(auth)
      } catch (e) {
        // Firebase not configured
      }
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newPostTitle.trim() || !newPostContent.trim()) return

    const post: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      author: user.uid,
      authorName: user.displayName || user.email || 'Anonymous',
      category: newPostCategory,
      timestamp: Date.now(),
      replies: []
    }

    try {
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default
      const { getDatabase, ref, push } = await import('firebase/database')

      let app
      try {
        app = firebase.getApp()
        const db = getDatabase(app)
        const postsRef = ref(db, 'forum/posts')
        await push(postsRef, post)
      } catch (e) {
        // Firebase not configured, use localStorage
        savePostToStorage(post)
        setPosts(prev => [post, ...prev])
      }
    } catch (error) {
      // Fallback to localStorage
      savePostToStorage(post)
      setPosts(prev => [post, ...prev])
    }

    setNewPostTitle('')
    setNewPostContent('')
    setNewPostCategory('general')
    setShowNewPost(false)
  }

  const handleReply = async (postId: string) => {
    if (!user || !newReply.trim()) return

    const reply: Reply = {
      id: `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: newReply.trim(),
      author: user.uid,
      authorName: user.displayName || user.email || 'Anonymous',
      timestamp: Date.now()
    }

    try {
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default
      const { getDatabase, ref, get, set } = await import('firebase/database')

      let app
      try {
        app = firebase.getApp()
        const db = getDatabase(app)
        const postRef = ref(db, `forum/posts/${postId}`)
        const snapshot = await get(postRef)
        
        if (snapshot.exists()) {
          const post = snapshot.val() as Post
          const updatedReplies = [...(post.replies || []), reply]
          await set(ref(db, `forum/posts/${postId}/replies`), updatedReplies)
        }
      } catch (e) {
        // Firebase not configured, use localStorage
        const updatedPosts = posts.map(p => 
          p.id === postId 
            ? { ...p, replies: [...(p.replies || []), reply] }
            : p
        )
        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
        setPosts(updatedPosts)
      }
    } catch (error) {
      // Fallback to localStorage
      const updatedPosts = posts.map(p => 
        p.id === postId 
          ? { ...p, replies: [...(p.replies || []), reply] }
          : p
      )
      localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
      setPosts(updatedPosts)
    }

    setNewReply('')
    if (selectedPost) {
      setSelectedPost({
        ...selectedPost,
        replies: [...(selectedPost.replies || []), reply]
      })
    }
  }

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory)

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Forum Toggle Button */}
      <button
        className="forum-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle forum"
      >
        💬 Forum
      </button>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Forum Panel */}
      {isOpen && (
        <div className="forum-panel">
          <div className="forum-header">
            <h2>💬 Community Forum</h2>
            <div className="forum-header-actions">
              {user ? (
                <>
                  <span className="forum-user">👤 {user.displayName || user.email}</span>
                  <button onClick={handleLogout} className="forum-logout-btn">Logout</button>
                </>
              ) : (
                <button onClick={() => setShowAuth(true)} className="forum-login-btn">
                  Login / Register
                </button>
              )}
              <button className="forum-close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>
          </div>

          <div className="forum-content">
            {/* Categories */}
            <div className="forum-categories">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`forum-category ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* New Post Button */}
            {user && (
              <button
                className="forum-new-post-btn"
                onClick={() => setShowNewPost(!showNewPost)}
              >
                {showNewPost ? '✕ Cancel' : '➕ New Post'}
              </button>
            )}

            {/* New Post Form */}
            {showNewPost && user && (
              <form onSubmit={handleCreatePost} className="forum-new-post-form">
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Post title..."
                  required
                  maxLength={100}
                />
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write your post..."
                  required
                  rows={6}
                  maxLength={2000}
                />
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                <button type="submit" className="forum-submit-btn">Post</button>
              </form>
            )}

            {/* Posts List */}
            {!selectedPost && (
              <div className="forum-posts">
                {filteredPosts.length === 0 ? (
                  <div className="forum-empty">
                    <p>No posts yet. {user ? 'Be the first to post!' : 'Login to create a post.'}</p>
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <div
                      key={post.id}
                      className="forum-post-card"
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="post-header">
                        <span className="post-category">{categories.find(c => c.id === post.category)?.icon} {categories.find(c => c.id === post.category)?.name}</span>
                        <span className="post-time">{formatTime(post.timestamp)}</span>
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-preview">{post.content.substring(0, 150)}...</p>
                      <div className="post-footer">
                        <span className="post-author">👤 {post.authorName}</span>
                        <span className="post-replies">💬 {post.replies?.length || 0} replies</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Post Detail View */}
            {selectedPost && (
              <div className="forum-post-detail">
                <button
                  className="forum-back-btn"
                  onClick={() => setSelectedPost(null)}
                >
                  ← Back to Posts
                </button>
                <div className="post-detail-header">
                  <span className="post-category">{categories.find(c => c.id === selectedPost.category)?.icon} {categories.find(c => c.id === selectedPost.category)?.name}</span>
                  <span className="post-time">{formatTime(selectedPost.timestamp)}</span>
                </div>
                <h2 className="post-detail-title">{selectedPost.title}</h2>
                <div className="post-detail-author">👤 {selectedPost.authorName}</div>
                <div className="post-detail-content">{selectedPost.content}</div>

                {/* Replies */}
                <div className="post-replies-section">
                  <h3>Replies ({selectedPost.replies?.length || 0})</h3>
                  {selectedPost.replies && selectedPost.replies.length > 0 ? (
                    selectedPost.replies.map(reply => (
                      <div key={reply.id} className="forum-reply">
                        <div className="reply-header">
                          <span className="reply-author">👤 {reply.authorName}</span>
                          <span className="reply-time">{formatTime(reply.timestamp)}</span>
                        </div>
                        <div className="reply-content">{reply.content}</div>
                      </div>
                    ))
                  ) : (
                    <p className="no-replies">No replies yet. Be the first to reply!</p>
                  )}
                </div>

                {/* Reply Form */}
                {user ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleReply(selectedPost.id)
                    }}
                    className="forum-reply-form"
                  >
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Write a reply..."
                      required
                      rows={4}
                      maxLength={1000}
                    />
                    <button type="submit" className="forum-submit-btn">Reply</button>
                  </form>
                ) : (
                  <div className="forum-login-prompt">
                    <p>Please login to reply</p>
                    <button onClick={() => setShowAuth(true)} className="forum-login-btn">
                      Login / Register
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .forum-toggle-btn {
          position: fixed;
          bottom: 90px;
          right: 20px;
          padding: 15px 25px;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          z-index: 9999;
          transition: all 0.3s ease;
        }

        .forum-toggle-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }

        .forum-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 500px;
          height: 100vh;
          background: white;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.3s ease;
        }

        .forum-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          background: var(--primary-gradient);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forum-header h2 {
          margin: 0;
          font-size: 1.3rem;
        }

        .forum-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .forum-user {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .forum-login-btn,
        .forum-logout-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .forum-login-btn:hover,
        .forum-logout-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .forum-close-btn {
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

        .forum-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .forum-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .forum-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .forum-category {
          padding: 8px 12px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .forum-category:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .forum-category.active {
          background: var(--primary-gradient);
          border-color: transparent;
          color: white;
        }

        .forum-new-post-btn {
          width: 100%;
          padding: 12px;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 20px;
          transition: transform 0.2s ease;
        }

        .forum-new-post-btn:hover {
          transform: translateY(-2px);
        }

        .forum-new-post-form {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .forum-new-post-form input,
        .forum-new-post-form textarea,
        .forum-new-post-form select {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          margin-bottom: 12px;
          font-family: inherit;
        }

        .forum-new-post-form textarea {
          resize: vertical;
        }

        .forum-submit-btn {
          width: 100%;
          padding: 12px;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .forum-submit-btn:hover {
          transform: translateY(-2px);
        }

        .forum-posts {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .forum-post-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .forum-post-card:hover {
          border-color: #667eea;
          transform: translateX(5px);
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.85rem;
          color: #666;
        }

        .post-title {
          margin: 0 0 10px 0;
          font-size: 1.2rem;
          color: #333;
        }

        .post-preview {
          color: #666;
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #999;
        }

        .forum-post-detail {
          animation: fadeIn 0.3s ease;
        }

        .forum-back-btn {
          background: #f0f0f0;
          border: none;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 20px;
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .forum-back-btn:hover {
          background: #e0e0e0;
        }

        .post-detail-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          font-size: 0.9rem;
          color: #666;
        }

        .post-detail-title {
          font-size: 1.5rem;
          margin: 0 0 10px 0;
          color: #333;
        }

        .post-detail-author {
          color: #666;
          margin-bottom: 20px;
        }

        .post-detail-content {
          line-height: 1.8;
          color: #333;
          margin-bottom: 30px;
          white-space: pre-wrap;
        }

        .post-replies-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #eee;
        }

        .post-replies-section h3 {
          margin: 0 0 20px 0;
          font-size: 1.2rem;
        }

        .forum-reply {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .reply-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.85rem;
          color: #666;
        }

        .reply-content {
          line-height: 1.6;
          color: #333;
          white-space: pre-wrap;
        }

        .no-replies {
          color: #999;
          font-style: italic;
        }

        .forum-reply-form {
          margin-top: 20px;
        }

        .forum-reply-form textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          margin-bottom: 10px;
          font-family: inherit;
          resize: vertical;
        }

        .forum-login-prompt {
          text-align: center;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 10px;
          margin-top: 20px;
        }

        .forum-empty {
          text-align: center;
          padding: 60px 20px;
          color: #999;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        :global(.dark) .forum-panel {
          background: #2a2a2a;
        }

        :global(.dark) .forum-post-card,
        :global(.dark) .forum-reply,
        :global(.dark) .forum-new-post-form,
        :global(.dark) .forum-login-prompt {
          background: #1a1a1a;
        }

        :global(.dark) .post-title,
        :global(.dark) .post-detail-title,
        :global(.dark) .reply-content,
        :global(.dark) .post-detail-content {
          color: white;
        }

        :global(.dark) .post-preview,
        :global(.dark) .post-detail-author {
          color: #aaa;
        }

        :global(.dark) .forum-category {
          background: #1a1a1a;
          border-color: #444;
          color: #e0e0e0;
        }

        :global(.dark) .forum-new-post-form input,
        :global(.dark) .forum-new-post-form textarea,
        :global(.dark) .forum-new-post-form select,
        :global(.dark) .forum-reply-form textarea {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }

        @media (max-width: 768px) {
          .forum-panel {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}

