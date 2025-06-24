import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const BlogsTab = ({ standalone = false, initialSelected = null }) => {
  const { selectBlog, clearBlogSelection } = useChat();
  const [selectedBlog, setSelectedBlog] = useState(initialSelected);
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const emojiPickerRef = useRef(null);
  const shareMenuRef = useRef(null);
  const commentsEndRef = useRef(null);
  
  // Initialize selected blog from prop if in standalone mode
  useEffect(() => {
    if (standalone && initialSelected) {
      setSelectedBlog(initialSelected);
    }
  }, [standalone, initialSelected]);
  
  // Dummy data for blogs
  const blogs = [
    { 
      id: 1, 
      title: 'New Features Coming Soon', 
      excerpt: "We're excited to announce several new features that will be rolling out in the next update. These improvements are based on your feedback and will enhance your experience.",
      author: 'Admin', 
      authorAvatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', 
      time: 'Today', 
      likes: 24,
      comments: [
        { id: 1, text: 'Looking forward to the dark mode!', author: 'Sarah Johnson', authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg', time: '2 hours ago', likes: 3 },
        { id: 2, text: 'The video call feature sounds awesome!', author: 'David Clark', authorAvatar: 'https://randomuser.me/api/portraits/men/3.jpg', time: '1 hour ago', likes: 1 },
        { id: 3, text: 'Can\'t wait to try these out!', author: 'Emily Wilson', authorAvatar: 'https://randomuser.me/api/portraits/women/2.jpg', time: '30 minutes ago', likes: 2 },
      ],
      content: `<p>We're excited to announce several new features that will be rolling out in the next update. These improvements are based on your feedback and will enhance your experience.</p>
      <h3>What's Coming</h3>
      <ul>
        <li>Dark mode support across all platforms</li>
        <li>Enhanced search functionality</li>
        <li>Group video calls for up to 8 participants</li>
        <li>Custom notification sounds</li>
      </ul>
      <p>We're committed to making our platform the best it can be, and your feedback is invaluable in this process. Stay tuned for more updates!</p>`
    },
    { 
      id: 2, 
      title: 'How to Improve Your Communication', 
      excerpt: 'Effective communication is essential for both personal and professional success. This article explores strategies to enhance your communication skills.',
      author: 'Communication Team', 
      authorAvatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', 
      time: 'Yesterday', 
      likes: 18,
      comments: [
        { id: 1, text: 'Great tips! Active listening has really helped me improve my relationships.', author: 'John Doe', authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg', time: '10 hours ago', likes: 5 },
        { id: 2, text: 'I\'ve been working on being more concise in my communication. It\'s definitely a skill that takes practice!', author: 'Mike Brown', authorAvatar: 'https://randomuser.me/api/portraits/men/2.jpg', time: '8 hours ago', likes: 2 },
      ],
      content: `<p>Effective communication is essential for both personal and professional success. In this article, we'll explore several strategies to enhance your communication skills.</p>
      <h3>Listen Actively</h3>
      <p>Active listening involves fully concentrating on what is being said rather than passively hearing the words. It includes giving feedback to the speaker to confirm what you've heard.</p>
      <h3>Be Clear and Concise</h3>
      <p>When communicating, be clear about your message and try to convey it in as few words as possible. This helps prevent misunderstandings and ensures your main points are received.</p>
      <h3>Pay Attention to Nonverbal Cues</h3>
      <p>Communication isn't just about words. Body language, facial expressions, and tone of voice can significantly impact how your message is received.</p>
      <p>By implementing these strategies, you can become a more effective communicator in all areas of your life.</p>`
    },
    {
      id: 3,
      title: 'Productivity Tips for Remote Work',
      excerpt: 'Working remotely has become increasingly common. Discover practical tips to boost your productivity while working from home.',
      author: 'Productivity Expert',
      authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      image: 'https://images.unsplash.com/photo-1584931423298-c576fda54bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlbW90ZSUyMHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      time: '2 days ago',
      likes: 32,
      comments: [
        { id: 1, text: 'The dedicated workspace tip is so important! I\'ve found it really helps me get into "work mode".', author: 'Jennifer Lee', authorAvatar: 'https://randomuser.me/api/portraits/women/3.jpg', time: '1 day ago', likes: 7 },
        { id: 2, text: 'I love the Pomodoro Technique! It\'s been a game-changer for my productivity.', author: 'David Clark', authorAvatar: 'https://randomuser.me/api/portraits/men/3.jpg', time: '1 day ago', likes: 4 },
        { id: 3, text: 'Regular check-ins with the team have been essential for us. We do a quick 15-minute call every morning.', author: 'Sarah Johnson', authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg', time: '20 hours ago', likes: 3 },
      ],
      content: `<p>Working remotely has become increasingly common. Here are some practical tips to boost your productivity while working from home.</p>
      <h3>Create a Dedicated Workspace</h3>
      <p>Having a specific area designated for work helps your brain associate that space with productivity and can help you maintain a better work-life balance.</p>
      <h3>Establish a Routine</h3>
      <p>Maintaining a consistent schedule helps create structure and can prevent work from bleeding into personal time.</p>
      <h3>Take Regular Breaks</h3>
      <p>The Pomodoro Technique (working for 25 minutes, then taking a 5-minute break) can help maintain focus and prevent burnout.</p>
      <h3>Stay Connected</h3>
      <p>Regular check-ins with colleagues can combat isolation and ensure everyone is aligned on goals and expectations.</p>`
    }
  ];

  // Auto-scroll to bottom of comments when a new comment is added
  useEffect(() => {
    if (selectedBlog) {
      scrollToBottom();
    }
  }, [selectedBlog?.comments?.length]);

  // Close emoji picker or share menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Create new comment
    const newCommentObj = {
      id: selectedBlog.comments.length + 1,
      text: newComment,
      author: 'You',
      authorAvatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      time: 'Just now',
      likes: 0
    };
    
    // Update the selected blog with the new comment
    const updatedBlog = {
      ...selectedBlog,
      comments: [...selectedBlog.comments, newCommentObj]
    };
    
    // Update the blogs array
    const updatedBlogs = blogs.map(blog => 
      blog.id === selectedBlog.id ? updatedBlog : blog
    );
    
    // Set the selected blog to the updated version
    setSelectedBlog(updatedBlog);
    
    // Clear the input
    setNewComment('');
  };

  const handleLike = (blog) => {
    if (likedBlogs.includes(blog.id)) {
      // Unlike
      setLikedBlogs(likedBlogs.filter(id => id !== blog.id));
      blog.likes--;
    } else {
      // Like
      setLikedBlogs([...likedBlogs, blog.id]);
      blog.likes++;
    }
    
    // Force re-render
    setSelectedBlog({...blog});
  };

  const handleLikeComment = (commentId) => {
    const updatedComments = selectedBlog.comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    
    setSelectedBlog({
      ...selectedBlog,
      comments: updatedComments
    });
  };

  const addEmoji = (emoji) => {
    setNewComment(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Handle blog selection in standalone mode
  const handleBlogSelect = (blog) => {
    if (standalone) {
      setSelectedBlog(blog);
    } else {
      selectBlog(blog);
    }
  };

  // Handle back button in standalone mode
  const handleBackButton = () => {
    if (standalone) {
      setSelectedBlog(null);
    } else {
      clearBlogSelection();
    }
  };

  // Simple emoji picker component
  const EmojiPicker = () => {
    const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '😍', '🙏', '👋', '😎', '🤔', '👏', '🌟', '💯', '✨', '⚡', '🚀', '🌈', '🍕', '🎵'];
    
    return (
      <div ref={emojiPickerRef} className="absolute bottom-20 left-2 bg-white rounded-xl shadow-lg p-3 z-20 border border-gray-200">
        <div className="grid grid-cols-5 gap-2">
          {emojis.map((emoji, index) => (
            <button 
              key={index} 
              className="text-xl hover:bg-gray-100 p-2 rounded-lg transition-colors"
              onClick={() => addEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Share menu component
  const ShareMenu = () => {
    const options = [
      { icon: '📱', label: 'WhatsApp' },
      { icon: '📧', label: 'Email' },
      { icon: '🔗', label: 'Copy Link' },
      { icon: '📝', label: 'Notes' },
      { icon: '⭐', label: 'Favorites' },
    ];
    
    return (
      <div ref={shareMenuRef} className="absolute top-12 right-0 bg-white rounded-xl shadow-lg p-2 z-20 border border-gray-200 w-48">
        <div className="space-y-1">
          {options.map((option, index) => (
            <button 
              key={index} 
              className="flex items-center w-full hover:bg-gray-100 p-2 rounded-lg transition-colors text-left"
            >
              <span className="text-xl mr-3">{option.icon}</span>
              <span className="text-sm text-gray-700">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (selectedBlog) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Blog header */}
        <div className="px-6 py-4 border-b border-indigo-100 bg-white flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={handleBackButton} 
              className="mr-3 text-indigo-600 hover:text-indigo-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-indigo-800 truncate">{selectedBlog.title}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors relative"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              
              {showShareMenu && <ShareMenu />}
            </button>
            <button 
              className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors"
              onClick={() => handleLike(selectedBlog)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={likedBlogs.includes(selectedBlog.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={likedBlogs.includes(selectedBlog.id) ? 0 : 1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Blog content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
          <div className="mb-6">
            <img 
              src={selectedBlog.image} 
              alt={selectedBlog.title} 
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            
            <div className="flex items-center mb-3">
              <img 
                src={selectedBlog.authorAvatar} 
                alt={selectedBlog.author} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-800">{selectedBlog.author}</p>
                <p className="text-xs text-gray-500">{selectedBlog.time}</p>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedBlog.title}</h1>
            
            <div 
              className="prose prose-indigo max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
            
            <div className="flex items-center mt-6 text-gray-500 text-sm">
              <button 
                className="flex items-center mr-4 hover:text-indigo-600 transition-colors"
                onClick={() => handleLike(selectedBlog)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={likedBlogs.includes(selectedBlog.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={likedBlogs.includes(selectedBlog.id) ? 0 : 1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span>{selectedBlog.likes} likes</span>
              </button>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span>{selectedBlog.comments.length} comments</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>
            
            <div className="space-y-4 mb-6">
              {selectedBlog.comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3 animate-fadeIn">
                  <div className="flex items-center mb-2">
                    <img 
                      src={comment.authorAvatar} 
                      alt={comment.author} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="ml-2">
                      <p className="font-medium text-sm text-gray-800">{comment.author}</p>
                      <p className="text-xs text-gray-500">{comment.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.text}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <button 
                      className="flex items-center hover:text-indigo-600 transition-colors"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                    <button className="ml-3 hover:text-indigo-600 transition-colors">Reply</button>
                  </div>
                </div>
              ))}
              
              <div ref={commentsEndRef} />
            </div>
            
            <form onSubmit={handleAddComment} className="relative">
              <div className="flex items-center bg-gray-50 rounded-lg p-2">
                <button 
                  type="button"
                  className="p-2 text-gray-500 hover:text-indigo-600 rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 border-0 bg-transparent py-2 px-3 focus:outline-none focus:ring-0"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className={`ml-2 ${newComment.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300'} text-white rounded-full p-2 transition duration-150`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
              
              {/* Emoji Picker */}
              {showEmojiPicker && <EmojiPicker />}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="bg-indigo-50 rounded-xl p-4 mb-4">
        <h3 className="text-lg font-semibold text-indigo-800 mb-1">Chat Blog</h3>
        <p className="text-sm text-indigo-600">Discover the latest news, tips, and updates</p>
      </div>
      
      {blogs.map(blog => (
        <div 
          key={blog.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
          onClick={() => handleBlogSelect(blog)}
        >
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{blog.title}</h3>
              <span className="text-xs text-gray-500">{blog.time}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={blog.authorAvatar} 
                  alt={blog.author} 
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-500 ml-2">{blog.author}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {blog.likes}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                  {blog.comments.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsTab; 