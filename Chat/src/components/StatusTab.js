import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const StatusTab = ({ standalone = false, initialSelected = null }) => {
  const { selectStatus, clearStatusSelection } = useChat();
  const [selectedStatus, setSelectedStatus] = useState(initialSelected);
  const [selectedContentIndex, setSelectedContentIndex] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [statusReply, setStatusReply] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState('photo');
  const [textBgColor, setTextBgColor] = useState('#6366f1');
  const emojiPickerRef = useRef(null);
  const progressRef = useRef(null);
  const statusIntervalRef = useRef(null);
  
  // Initialize selected status from prop if in standalone mode
  useEffect(() => {
    if (standalone && initialSelected) {
      setSelectedStatus(initialSelected);
    }
  }, [standalone, initialSelected]);
  
  // Dummy data for status updates
  const statusUpdates = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg', 
      time: '5 min ago', 
      viewed: false,
      content: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', caption: 'Working on new designs' },
        { type: 'text', text: 'Excited to share our new project soon!', backgroundColor: '#6366f1' }
      ],
      replies: [
        { id: 1, text: 'Looks great! Can\'t wait to see the final product', sender: 'John Doe', time: '3 min ago' },
        { id: 2, text: '👍', sender: 'Emily Wilson', time: '1 min ago' }
      ]
    },
    { 
      id: 2, 
      name: 'David Clark', 
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg', 
      time: '2 hours ago', 
      viewed: true,
      content: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', caption: 'City views' }
      ],
      replies: []
    },
    { 
      id: 3, 
      name: 'Emily Wilson', 
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
      time: '8 hours ago', 
      viewed: false,
      content: [
        { type: 'text', text: 'Just completed the quarterly report! 🎉', backgroundColor: '#ec4899' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', caption: 'Team celebration' }
      ],
      replies: [
        { id: 1, text: 'Great job! 🎉', sender: 'John Doe', time: '7 hours ago' },
        { id: 2, text: 'Congratulations! Well done 👏', sender: 'David Clark', time: '6 hours ago' },
        { id: 3, text: 'Thanks everyone! It was a team effort', sender: 'Emily Wilson', time: '5 hours ago' }
      ]
    },
  ];

  // Effect for status progress bar
  useEffect(() => {
    if (selectedStatus && progressRef.current) {
      // Clear any existing interval
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
      }
      
      // Reset progress
      progressRef.current.style.width = '0%';
      
      // Set timeout to progress the bar over 5 seconds
      let progress = 0;
      statusIntervalRef.current = setInterval(() => {
        progress += 1;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        
        // When progress reaches 100%, move to next content item or close
        if (progress >= 100) {
          clearInterval(statusIntervalRef.current);
          
          // If there are more content items, move to the next one
          if (selectedContentIndex < selectedStatus.content.length - 1) {
            setSelectedContentIndex(prev => prev + 1);
          } else {
            // If this is the last content item, close the status view after a brief delay
            setTimeout(() => {
              handleStatusClose();
            }, 500);
          }
        }
      }, 50); // 50ms * 100 = 5 seconds total
      
      return () => {
        if (statusIntervalRef.current) {
          clearInterval(statusIntervalRef.current);
        }
      };
    }
  }, [selectedStatus, selectedContentIndex]);

  // Close emoji picker when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendReply = () => {
    if (!statusReply.trim()) return;
    
    // Create new reply
    const newReply = {
      id: (selectedStatus.replies.length + 1),
      text: statusReply,
      sender: 'You',
      time: 'Just now'
    };
    
    // Add to replies
    const updatedStatus = {
      ...selectedStatus,
      replies: [...selectedStatus.replies, newReply]
    };
    
    // Update status
    setSelectedStatus(updatedStatus);
    
    // Clear input
    setStatusReply('');
  };

  const addEmoji = (emoji) => {
    setStatusReply(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handlePrev = () => {
    if (selectedContentIndex > 0) {
      setSelectedContentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (selectedContentIndex < selectedStatus.content.length - 1) {
      setSelectedContentIndex(prev => prev + 1);
    } else {
      handleStatusClose();
    }
  };

  // Handle status selection
  const handleStatusSelect = (status) => {
    if (standalone) {
      setSelectedStatus(status);
      setSelectedContentIndex(0);
    } else {
      selectStatus(status);
    }
  };

  // Handle status close
  const handleStatusClose = () => {
    if (standalone) {
      setSelectedStatus(null);
      setSelectedContentIndex(0);
    } else {
      clearStatusSelection();
    }
  };

  // Simple emoji picker component
  const EmojiPicker = () => {
    const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '😍', '🙏', '👋', '😎', '🤔', '👏', '🌟', '💯', '✨', '⚡', '🚀', '🌈', '🍕', '🎵'];
    
    return (
      <div ref={emojiPickerRef} className="absolute bottom-16 left-2 bg-white rounded-xl shadow-lg p-3 z-20 border border-gray-200">
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

  if (selectedStatus) {
    const currentContent = selectedStatus.content[selectedContentIndex];
    
    return (
      <div className="p-0 h-full flex flex-col bg-gray-900">
        {/* Progress bar */}
        <div className="px-4 pt-2 flex space-x-1">
          {selectedStatus.content.map((_, index) => (
            <div 
              key={index} 
              className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden"
            >
              {index === selectedContentIndex && (
                <div 
                  ref={progressRef}
                  className="h-full bg-white w-0 transition-all duration-50"
                ></div>
              )}
              {index < selectedContentIndex && (
                <div className="h-full bg-white w-full"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Status header */}
        <div className="p-3 bg-black/70 text-white flex items-center justify-between z-10">
          <button 
            onClick={handleStatusClose} 
            className="text-white hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex items-center">
            <img 
              src={selectedStatus.avatar} 
              alt={selectedStatus.name} 
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
            <div className="ml-2 text-sm">
              <p className="font-medium">{selectedStatus.name}</p>
              <p className="text-xs opacity-70">{selectedStatus.time}</p>
            </div>
          </div>
          <button className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
        
        {/* Navigation buttons (invisible but clickable) */}
        <div className="absolute inset-0 flex z-10 pointer-events-none">
          <button
            className="w-1/3 h-full focus:outline-none pointer-events-auto"
            onClick={handlePrev}
          ></button>
          <div className="w-1/3 h-full"></div>
          <button
            className="w-1/3 h-full focus:outline-none pointer-events-auto"
            onClick={handleNext}
          ></button>
        </div>
        
        {/* Status content */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center">
          {currentContent.type === 'image' ? (
            <div className="relative w-full h-full">
              <img 
                src={currentContent.url} 
                alt={currentContent.caption} 
                className="w-full h-full object-contain"
              />
              {currentContent.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-center">
                  {currentContent.caption}
                </div>
              )}
            </div>
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center p-8 text-center text-white text-xl font-medium"
              style={{ backgroundColor: currentContent.backgroundColor }}
            >
              {currentContent.text}
            </div>
          )}
        </div>
        
        {/* Replies section */}
        <div className="bg-black/70 text-white">
          {selectedStatus.replies.length > 0 && (
            <div className="max-h-40 overflow-y-auto px-4 py-3">
              <h3 className="text-sm font-medium mb-2">Replies</h3>
              <div className="space-y-2">
                {selectedStatus.replies.map(reply => (
                  <div key={reply.id} className="flex space-x-2">
                    <div className="text-sm">
                      <span className="font-medium text-indigo-300">{reply.sender}</span>
                      <span className="ml-2">{reply.text}</span>
                      <span className="text-xs text-gray-400 block">{reply.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Status input */}
        <div className="p-3 bg-black/70 flex items-center relative">
          <button 
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </button>
          <input 
            type="text" 
            placeholder="Reply to status..." 
            className="flex-1 bg-white/20 text-white border-0 rounded-full py-2 px-4 mx-2 focus:outline-none focus:ring-1 focus:ring-white/50"
            value={statusReply}
            onChange={(e) => setStatusReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendReply();
              }
            }}
          />
          <button 
            className="text-white p-2 rounded-full hover:bg-white/10 disabled:opacity-50"
            onClick={handleSendReply}
            disabled={!statusReply.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
          
          {/* Emoji Picker */}
          {showEmojiPicker && <EmojiPicker />}
        </div>
      </div>
    );
  }
  
  if (showCreateForm) {
    return (
      <div className="p-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setShowCreateForm(false)} 
            className="text-indigo-600 mr-3 hover:text-indigo-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Create Status</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <button 
              className={`flex-1 py-2 ${selectedContentType === 'photo' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg`}
              onClick={() => setSelectedContentType('photo')}
            >
              Photo/Video
            </button>
            <button 
              className={`flex-1 py-2 ${selectedContentType === 'text' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg`}
              onClick={() => setSelectedContentType('text')}
            >
              Text Status
            </button>
          </div>
          
          {selectedContentType === 'photo' ? (
            <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center h-60 border-2 border-dashed border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-gray-500 mb-2">Upload photo or video</p>
              <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-indigo-700">
                Choose File
              </button>
            </div>
          ) : (
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 flex flex-col items-center justify-center h-60"
              style={{ backgroundColor: textBgColor }}
            >
              <textarea
                placeholder="Type your status..."
                rows="4"
                className="w-full h-full bg-transparent text-white border-0 text-center text-xl font-medium placeholder-white/70 focus:outline-none focus:ring-0"
              ></textarea>
            </div>
          )}
          
          {selectedContentType === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex space-x-2">
                {['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'].map(color => (
                  <button 
                    key={color} 
                    className={`w-10 h-10 rounded-full focus:outline-none ${textBgColor === color ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setTextBgColor(color)}
                  ></button>
                ))}
              </div>
            </div>
          )}
          
          {selectedContentType === 'photo' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
              <textarea
                placeholder="Add a caption..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          )}
          
          <button 
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => setShowCreateForm(false)}
          >
            Post Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-dashed border-2 border-indigo-500 flex items-center justify-center cursor-pointer" onClick={() => setShowCreateForm(true)}>
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </div>
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-gray-800">Add to Status</h3>
          <p className="text-xs text-gray-500">Share what's new with friends</p>
        </div>
      </div>
      
      <p className="text-xs font-medium text-gray-500 uppercase mb-3">Recent Updates</p>
      
      {statusUpdates.map(status => (
        <div 
          key={status.id} 
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => handleStatusSelect(status)}
        >
          <div className="relative">
            <div className={`status-ring w-14 h-14 rounded-full ${status.viewed ? 'opacity-40' : ''}`}>
              <img 
                src={status.avatar} 
                alt={status.name} 
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            {status.replies.length > 0 && (
              <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {status.replies.length}
              </div>
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-800">{status.name}</h3>
            <div className="flex items-center">
              <p className="text-xs text-gray-500">{status.time}</p>
              {!status.viewed && (
                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusTab; 