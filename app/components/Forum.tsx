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
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [viewMode, setViewMode] = useState<'all' | 'my-posts' | 'bookmarks' | 'profile'>('all')
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [editPostTitle, setEditPostTitle] = useState('')
  const [editPostContent, setEditPostContent] = useState('')
  const [editPostCategory, setEditPostCategory] = useState('general')

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
    loadBookmarks()
  }, [])

  useEffect(() => {
    if (user) {
      loadBookmarks()
    }
  }, [user])

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

  const loadBookmarks = () => {
    if (typeof window === 'undefined' || !user) return
    const stored = localStorage.getItem(`forumBookmarks_${user.uid}`)
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading bookmarks:', e)
      }
    }
  }

  const saveBookmarks = (newBookmarks: string[]) => {
    if (typeof window === 'undefined' || !user) return
    localStorage.setItem(`forumBookmarks_${user.uid}`, JSON.stringify(newBookmarks))
    setBookmarks(newBookmarks)
  }

  const toggleBookmark = (postId: string) => {
    if (!user) return
    const newBookmarks = bookmarks.includes(postId)
      ? bookmarks.filter(id => id !== postId)
      : [...bookmarks, postId]
    saveBookmarks(newBookmarks)
  }

  const isBookmarked = (postId: string) => bookmarks.includes(postId)

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setEditPostTitle(post.title)
    setEditPostContent(post.content)
    setEditPostCategory(post.category)
    setSelectedPost(null)
  }

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !editingPost || !editPostTitle.trim() || !editPostContent.trim()) return

    const updatedPost: Post = {
      ...editingPost,
      title: editPostTitle.trim(),
      content: editPostContent.trim(),
      category: editPostCategory
    }

    try {
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default
      const { getDatabase, ref, set } = await import('firebase/database')

      let app
      try {
        app = firebase.getApp()
        const db = getDatabase(app)
        await set(ref(db, `forum/posts/${editingPost.id}`), updatedPost)
      } catch (e) {
        // Firebase not configured, use localStorage
        const updatedPosts = posts.map(p => p.id === editingPost.id ? updatedPost : p)
        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
        setPosts(updatedPosts)
      }
    } catch (error) {
      // Fallback to localStorage
      const updatedPosts = posts.map(p => p.id === editingPost.id ? updatedPost : p)
      localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
      setPosts(updatedPosts)
    }

    setEditingPost(null)
    setEditPostTitle('')
    setEditPostContent('')
    setEditPostCategory('general')
  }

  const handleDeletePost = async (postId: string) => {
    if (!user || !confirm('Are you sure you want to delete this post?')) return

    try {
      const firebaseModule = await import('firebase/app')
      const firebase = firebaseModule.default
      const { getDatabase, ref, remove } = await import('firebase/database')

      let app
      try {
        app = firebase.getApp()
        const db = getDatabase(app)
        await remove(ref(db, `forum/posts/${postId}`))
      } catch (e) {
        // Firebase not configured, use localStorage
        const updatedPosts = posts.filter(p => p.id !== postId)
        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
        setPosts(updatedPosts)
      }
    } catch (error) {
      // Fallback to localStorage
      const updatedPosts = posts.filter(p => p.id !== postId)
      localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
      setPosts(updatedPosts)
    }

    if (selectedPost?.id === postId) {
      setSelectedPost(null)
    }
    setEditingPost(null)
  }

  const getUserStats = () => {
    if (!user) return { posts: 0, replies: 0 }
    const userPosts = posts.filter(p => p.author === user.uid)
    const userReplies = posts.reduce((count, post) => {
      return count + (post.replies?.filter(r => r.author === user.uid).length || 0)
    }, 0)
    return { posts: userPosts.length, replies: userReplies }
  }

  const getMyPosts = () => {
    if (!user) return []
    return posts.filter(p => p.author === user.uid)
  }

  const getBookmarkedPosts = () => {
    return posts.filter(p => bookmarks.includes(p.id))
  }

  let displayPosts = posts
  if (viewMode === 'my-posts') {
    displayPosts = getMyPosts()
  } else if (viewMode === 'bookmarks') {
    displayPosts = getBookmarkedPosts()
  }

  const filteredPosts = selectedCategory === 'all' 
    ? displayPosts 
    : displayPosts.filter(p => p.category === selectedCategory)

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
        title="Open Forum - Login to post and reply"
      >
        <span>💬</span>
        <span>Forum</span>
        {!user && <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>(Login)</span>}
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
                <div className="forum-user-menu-container">
                  <button 
                    className="forum-user-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    👤 {user.displayName || user.email?.split('@')[0] || 'User'}
                  </button>
                  {showUserMenu && (
                    <div className="forum-user-menu">
                      <button onClick={() => { setViewMode('profile'); setShowUserMenu(false); setSelectedPost(null) }}>
                        📊 My Profile
                      </button>
                      <button onClick={() => { setViewMode('my-posts'); setShowUserMenu(false); setSelectedPost(null) }}>
                        📝 My Posts
                      </button>
                      <button onClick={() => { setViewMode('bookmarks'); setShowUserMenu(false); setSelectedPost(null) }}>
                        🔖 Bookmarks
                      </button>
                      <button onClick={() => { setViewMode('all'); setShowUserMenu(false); setSelectedPost(null) }}>
                        📋 All Posts
                      </button>
                      <div className="forum-menu-divider"></div>
                      <button onClick={handleLogout} className="forum-menu-logout">
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setShowAuth(true)} className="forum-login-btn">
                  Login / Register
                </button>
              )}
              <button className="forum-close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>
          </div>

          <div className="forum-content">
            {/* View Mode Indicator */}
            {user && viewMode !== 'all' && (
              <div className="forum-view-mode-indicator">
                <button 
                  className="forum-back-to-all-btn"
                  onClick={() => { setViewMode('all'); setSelectedPost(null) }}
                >
                  ← Back to All Posts
                </button>
                <span className="forum-view-mode-label">
                  {viewMode === 'my-posts' && '📝 My Posts'}
                  {viewMode === 'bookmarks' && '🔖 Bookmarks'}
                  {viewMode === 'profile' && '📊 My Profile'}
                </span>
              </div>
            )}

            {/* Profile View */}
            {user && viewMode === 'profile' && (
              <div className="forum-profile-view">
                <div className="forum-profile-header">
                  <div className="forum-profile-avatar">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <h2>{user.displayName || user.email?.split('@')[0] || 'User'}</h2>
                  <p>{user.email}</p>
                </div>
                <div className="forum-profile-stats">
                  <div className="forum-stat-card">
                    <div className="forum-stat-number">{getUserStats().posts}</div>
                    <div className="forum-stat-label">Posts</div>
                  </div>
                  <div className="forum-stat-card">
                    <div className="forum-stat-number">{getUserStats().replies}</div>
                    <div className="forum-stat-label">Replies</div>
                  </div>
                  <div className="forum-stat-card">
                    <div className="forum-stat-number">{bookmarks.length}</div>
                    <div className="forum-stat-label">Bookmarks</div>
                  </div>
                </div>
                <div className="forum-profile-actions">
                  <button 
                    onClick={() => { setViewMode('my-posts'); setSelectedPost(null) }}
                    className="forum-profile-action-btn"
                  >
                    View My Posts ({getUserStats().posts})
                  </button>
                  <button 
                    onClick={() => { setViewMode('bookmarks'); setSelectedPost(null) }}
                    className="forum-profile-action-btn"
                  >
                    View Bookmarks ({bookmarks.length})
                  </button>
                </div>
              </div>
            )}

            {/* Categories */}
            {viewMode !== 'profile' && (
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
            )}

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

            {/* Edit Post Form */}
            {editingPost && user && editingPost.author === user.uid && (
              <form onSubmit={handleUpdatePost} className="forum-edit-post-form">
                <h3>✏️ Edit Post</h3>
                <input
                  type="text"
                  value={editPostTitle}
                  onChange={(e) => setEditPostTitle(e.target.value)}
                  placeholder="Post title..."
                  required
                  maxLength={100}
                />
                <textarea
                  value={editPostContent}
                  onChange={(e) => setEditPostContent(e.target.value)}
                  placeholder="Write your post..."
                  required
                  rows={6}
                  maxLength={2000}
                />
                <select
                  value={editPostCategory}
                  onChange={(e) => setEditPostCategory(e.target.value)}
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                <div className="forum-edit-actions">
                  <button type="submit" className="forum-submit-btn">Save Changes</button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingPost(null)
                      setEditPostTitle('')
                      setEditPostContent('')
                      setEditPostCategory('general')
                    }}
                    className="forum-cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Posts List */}
            {!selectedPost && !editingPost && (
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
                    >
                      <div 
                        className="post-card-content"
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
                      {user && (
                        <div className="post-actions" onClick={(e) => e.stopPropagation()}>
                          {user.uid === post.author && (
                            <>
                              <button 
                                className="post-action-btn edit-btn"
                                onClick={() => handleEditPost(post)}
                                title="Edit post"
                              >
                                ✏️
                              </button>
                              <button 
                                className="post-action-btn delete-btn"
                                onClick={() => handleDeletePost(post.id)}
                                title="Delete post"
                              >
                                🗑️
                              </button>
                            </>
                          )}
                          <button 
                            className={`post-action-btn bookmark-btn ${isBookmarked(post.id) ? 'bookmarked' : ''}`}
                            onClick={() => toggleBookmark(post.id)}
                            title={isBookmarked(post.id) ? 'Remove bookmark' : 'Bookmark'}
                          >
                            {isBookmarked(post.id) ? '🔖' : '🔖'}
                          </button>
                        </div>
                      )}
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
                <div className="post-detail-title-row">
                  <h2 className="post-detail-title">{selectedPost.title}</h2>
                  {user && (
                    <div className="post-detail-actions">
                      {user.uid === selectedPost.author && (
                        <>
                          <button 
                            className="post-detail-action-btn"
                            onClick={() => handleEditPost(selectedPost)}
                            title="Edit post"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="post-detail-action-btn delete"
                            onClick={() => handleDeletePost(selectedPost.id)}
                            title="Delete post"
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                      <button 
                        className={`post-detail-action-btn ${isBookmarked(selectedPost.id) ? 'bookmarked' : ''}`}
                        onClick={() => toggleBookmark(selectedPost.id)}
                        title={isBookmarked(selectedPost.id) ? 'Remove bookmark' : 'Bookmark'}
                      >
                        {isBookmarked(selectedPost.id) ? '🔖 Bookmarked' : '🔖 Bookmark'}
                      </button>
                    </div>
                  )}
                </div>
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
                          {user && user.uid === reply.author && (
                            <button 
                              className="reply-delete-btn"
                              onClick={async () => {
                                if (!confirm('Delete this reply?')) return
                                try {
                                  const firebaseModule = await import('firebase/app')
                                  const firebase = firebaseModule.default
                                  const { getDatabase, ref, get, set } = await import('firebase/database')
                                  
                                  let app
                                  try {
                                    app = firebase.getApp()
                                    const db = getDatabase(app)
                                    const postRef = ref(db, `forum/posts/${selectedPost.id}`)
                                    const snapshot = await get(postRef)
                                    
                                    if (snapshot.exists()) {
                                      const post = snapshot.val() as Post
                                      const updatedReplies = post.replies?.filter((r: Reply) => r.id !== reply.id) || []
                                      await set(ref(db, `forum/posts/${selectedPost.id}/replies`), updatedReplies)
                                    }
                                  } catch (e) {
                                    const updatedReplies = selectedPost.replies?.filter(r => r.id !== reply.id) || []
                                    const updatedPost = { ...selectedPost, replies: updatedReplies }
                                    setSelectedPost(updatedPost)
                                    const updatedPosts = posts.map(p => p.id === selectedPost.id ? updatedPost : p)
                                    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
                                    setPosts(updatedPosts)
                                  }
                                } catch (error) {
                                  const updatedReplies = selectedPost.replies?.filter(r => r.id !== reply.id) || []
                                  const updatedPost = { ...selectedPost, replies: updatedReplies }
                                  setSelectedPost(updatedPost)
                                  const updatedPosts = posts.map(p => p.id === selectedPost.id ? updatedPost : p)
                                  localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
                                  setPosts(updatedPosts)
                                }
                              }}
                              title="Delete reply"
                            >
                              🗑️
                            </button>
                          )}
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: 2px solid white;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.6), 0 0 0 3px rgba(102, 126, 234, 0.2);
          z-index: 9999;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 140px;
          justify-content: center;
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

        .forum-user-menu-container {
          position: relative;
        }

        .forum-user-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .forum-user-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .forum-user-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          min-width: 180px;
          z-index: 10001;
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }

        .forum-user-menu button {
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: white;
          text-align: left;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .forum-user-menu button:hover {
          background: #f0f0f0;
        }

        .forum-menu-divider {
          height: 1px;
          background: #eee;
          margin: 5px 0;
        }

        .forum-menu-logout {
          color: #e74c3c !important;
        }

        .forum-menu-logout:hover {
          background: #fee !important;
        }

        .forum-view-mode-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .forum-back-to-all-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .forum-back-to-all-btn:hover {
          background: #5568d3;
        }

        .forum-view-mode-label {
          font-weight: 700;
          color: #333;
        }

        .forum-profile-view {
          animation: fadeIn 0.3s ease;
        }

        .forum-profile-header {
          text-align: center;
          padding: 30px 20px;
          background: var(--primary-gradient);
          color: white;
          border-radius: 15px;
          margin-bottom: 20px;
        }

        .forum-profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          margin: 0 auto 15px;
        }

        .forum-profile-header h2 {
          margin: 0 0 5px 0;
          font-size: 1.5rem;
        }

        .forum-profile-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .forum-profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .forum-stat-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }

        .forum-stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 5px;
        }

        .forum-stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .forum-profile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .forum-profile-action-btn {
          padding: 12px;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .forum-profile-action-btn:hover {
          transform: translateY(-2px);
        }

        .forum-edit-post-form {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .forum-edit-post-form h3 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .forum-edit-post-form input,
        .forum-edit-post-form textarea,
        .forum-edit-post-form select {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          margin-bottom: 12px;
          font-family: inherit;
        }

        .forum-edit-actions {
          display: flex;
          gap: 10px;
        }

        .forum-edit-actions .forum-submit-btn {
          flex: 1;
        }

        .forum-cancel-btn {
          flex: 1;
          padding: 12px;
          background: #ddd;
          color: #333;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .forum-cancel-btn:hover {
          background: #ccc;
        }

        .post-card-content {
          cursor: pointer;
        }

        .post-actions {
          display: flex;
          gap: 8px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }

        .post-action-btn {
          background: #f0f0f0;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .post-action-btn:hover {
          background: #e0e0e0;
        }

        .post-action-btn.bookmark-btn.bookmarked {
          background: #fff3cd;
          color: #856404;
        }

        .post-action-btn.delete-btn:hover {
          background: #fee;
          color: #c33;
        }

        .post-detail-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 10px;
        }

        .post-detail-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .post-detail-action-btn {
          padding: 6px 12px;
          background: #f0f0f0;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .post-detail-action-btn:hover {
          background: #e0e0e0;
        }

        .post-detail-action-btn.delete:hover {
          background: #fee;
          color: #c33;
        }

        .post-detail-action-btn.bookmarked {
          background: #fff3cd;
          color: #856404;
        }

        .reply-delete-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .reply-delete-btn:hover {
          opacity: 1;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        :global(.dark) .forum-reply-form textarea,
        :global(.dark) .forum-edit-post-form input,
        :global(.dark) .forum-edit-post-form textarea,
        :global(.dark) .forum-edit-post-form select {
          background: #1a1a1a;
          border-color: #444;
          color: white;
        }

        :global(.dark) .forum-user-menu {
          background: #2a2a2a;
        }

        :global(.dark) .forum-user-menu button {
          background: #2a2a2a;
          color: white;
        }

        :global(.dark) .forum-user-menu button:hover {
          background: #1a1a1a;
        }

        :global(.dark) .forum-view-mode-indicator {
          background: #1a1a1a;
        }

        :global(.dark) .forum-view-mode-label {
          color: white;
        }

        :global(.dark) .forum-stat-card {
          background: #1a1a1a;
        }

        :global(.dark) .forum-stat-label {
          color: #aaa;
        }

        :global(.dark) .forum-edit-post-form {
          background: #1a1a1a;
        }

        :global(.dark) .forum-edit-post-form h3 {
          color: white;
        }

        :global(.dark) .post-actions {
          border-top-color: #444;
        }

        :global(.dark) .post-action-btn,
        :global(.dark) .post-detail-action-btn {
          background: #1a1a1a;
          color: white;
        }

        :global(.dark) .post-action-btn:hover,
        :global(.dark) .post-detail-action-btn:hover {
          background: #2a2a2a;
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

