import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../context/ChatContext';

const ChatWindow = () => {
  const { activeChat, newMessage, setNewMessage, sendMessage } = useChat();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const attachMenuRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Auto-scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages]);

  // Add scroll event listener to show/hide scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (!messageContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      
      setShowScrollButton(isScrolledUp);
    };
    
    const container = messageContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      // Clear any existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set typing state randomly (for demo purposes)
      if (Math.random() > 0.5) {
        setIsTyping(true);
        
        // Clear typing indicator after a random delay
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    }
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [newMessage]);

  // Close emoji picker or attach menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (attachMenuRef.current && !attachMenuRef.current.contains(event.target)) {
        setShowAttachMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage();
    setIsTyping(false);
  };

  const formatTime = (time) => {
    if (time.includes('Yesterday')) return 'Yesterday';
    return time;
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Group messages by date
  const groupMessages = () => {
    const groups = [];
    let currentGroup = [];
    let currentSender = null;
    
    activeChat.messages.forEach((message, index) => {
      // Create a new group if sender changes or time gap is significant
      if (
        currentSender !== message.sent ||
        index === 0 ||
        new Date(message.time) - new Date(activeChat.messages[index - 1].time) > 300000
      ) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [message];
        currentSender = message.sent;
      } else {
        currentGroup.push(message);
      }
    });
    
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups;
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

  // Attachment menu
  const AttachMenu = () => {
    const options = [
      { icon: '📷', label: 'Photos' },
      { icon: '📄', label: 'Documents' },
      { icon: '📍', label: 'Location' },
      { icon: '👤', label: 'Contact' },
      { icon: '🎵', label: 'Audio' },
    ];
    
    return (
      <div ref={attachMenuRef} className="absolute bottom-16 left-12 bg-white rounded-xl shadow-lg p-2 z-20 border border-gray-200">
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

  // Profile modal
  const ProfileModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-xl">
          <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
            <button 
              onClick={() => setShowProfileModal(false)}
              className="absolute top-3 right-3 bg-white/20 text-white p-1.5 rounded-full hover:bg-white/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full p-1 bg-white">
                <img 
                  src={activeChat.avatar} 
                  alt={activeChat.name} 
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChat.name)}&background=random`;
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-20 px-6 pb-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{activeChat.name}</h2>
            <p className="text-center text-indigo-500 mb-6">
              {activeChat.status === 'online' ? 'Online' : `Last active ${activeChat.lastActive}`}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-3 bg-indigo-50 rounded-lg">
                <span className="text-xl font-semibold text-indigo-700">{activeChat.messages.length}</span>
                <span className="text-xs text-gray-500">Messages</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-indigo-50 rounded-lg">
                <span className="text-xl font-semibold text-indigo-700">5</span>
                <span className="text-xs text-gray-500">Media</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-indigo-50 rounded-lg">
                <span className="text-xl font-semibold text-indigo-700">2</span>
                <span className="text-xs text-gray-500">Groups</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{activeChat.name.toLowerCase().replace(' ', '.')}@example.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-2">
              <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Message
              </button>
              <button className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Remind
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white">
      {/* Chat header */}
      <div className="px-6 py-4 border-b border-indigo-100 bg-white flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center cursor-pointer" onClick={() => setShowProfileModal(true)}>
          <div className="relative">
            <img 
              src={activeChat.avatar} 
              alt={activeChat.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChat.name)}&background=random`;
              }}
            />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${
              activeChat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-indigo-800">{activeChat.name}</h2>
            <p className="text-xs text-indigo-500">
              {activeChat.status === 'online' ? (
                isTyping ? (
                  <span className="flex items-center">
                    <span className="mr-1">typing</span>
                    <span className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </span>
                ) : (
                  'Online'
                )
              ) : (
                `Last active ${activeChat.lastActive}`
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </button>
          <button className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </button>
          <button className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages container */}
      <div 
        ref={messageContainerRef}
        className="flex-1 p-6 overflow-y-auto relative"
        style={{ 
          backgroundImage: 'url("https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cd.png")',
          backgroundSize: '350px',
          backgroundBlendMode: 'soft-light',
          backgroundColor: '#f9f7ff'
        }}
      >
        {activeChat.messages.length > 0 && (
          <div className="flex justify-center mb-6">
            <span className="text-xs bg-indigo-100 text-indigo-600 rounded-full px-4 py-1.5 inline-block shadow-sm">
              Today
            </span>
          </div>
        )}

        <div className="space-y-6">
          {groupMessages().map((group, groupIndex) => {
            const message = group[0]; // First message in group
            return (
              <div key={`group-${groupIndex}`} className="message-group">
                <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-1`}>
                  <span className="text-xs text-gray-500 px-2">
                    {formatTime(message.time)}
                  </span>
                </div>
                
                {group.map((msg, msgIndex) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sent ? 'justify-end' : 'justify-start'} items-end mb-2 ${
                      msg.sent ? 'message-out' : 'message-in'
                    }`}
                  >
                    {!msg.sent && msgIndex === 0 && (
                      <img 
                        src={activeChat.avatar} 
                        alt={activeChat.name} 
                        className="w-8 h-8 rounded-full mr-2 mb-1 cursor-pointer hover:opacity-80"
                        onClick={() => setShowProfileModal(true)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChat.name)}&background=random`;
                        }}
                      />
                    )}
                    {!msg.sent && msgIndex !== 0 && <div className="w-8 mr-2"></div>}
                    
                    <div 
                      className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                        msg.sent 
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none shadow-indigo-100 shadow-lg hover:shadow-xl transition-all duration-200' 
                          : 'bg-white text-gray-800 rounded-tl-none shadow hover:shadow-md transition-all duration-200'
                      } ${msgIndex === group.length - 1 ? 'mb-2' : 'mb-1'}`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                      {msgIndex === group.length - 1 && (
                        <p className={`text-xs mt-1 text-right ${msg.sent ? 'text-indigo-100' : 'text-gray-400'}`}>
                          {msg.sent && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 inline-block mr-1">
                              <path fillRule="evenodd" d="M4.5 12.75l6 6 9-13.5-1.5-1L10.5 16.5l-4.5-4.5L4.5 12.75z" clipRule="evenodd" />
                            </svg>
                          )}
                          {formatTime(msg.time)}
                        </p>
                      )}
                    </div>
                    
                    {/* Message options */}
                    <div className={`flex items-center ml-2 ${msg.sent ? 'order-last' : 'order-last'}`}>
                      <button className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          
          {/* Typing indicator for receiver */}
          {isTyping && activeChat.status === 'online' && (
            <div className="flex justify-start items-end mb-2">
              <img 
                src={activeChat.avatar} 
                alt={activeChat.name} 
                className="w-8 h-8 rounded-full mr-2 mb-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChat.name)}&background=random`;
                }}
              />
              <div className="bg-white text-gray-500 rounded-2xl rounded-tl-none px-4 py-3 shadow max-w-[100px]">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button 
            onClick={scrollToBottom}
            className="absolute bottom-20 right-6 bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors animate-bounce"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </button>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-indigo-100 bg-white relative">
        <div className="flex items-center bg-indigo-50 rounded-2xl p-1">
          <button 
            className="p-2 text-indigo-500 hover:text-indigo-700 rounded-full hover:bg-indigo-100"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </button>
          <button 
            className="p-2 text-indigo-500 hover:text-indigo-700 rounded-full hover:bg-indigo-100"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </button>
          <form onSubmit={handleSend} className="flex items-center flex-1">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border-0 bg-transparent py-2 px-3 focus:outline-none focus:ring-0"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`ml-2 ${newMessage.trim() ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700' : 'bg-indigo-300'} text-white rounded-full p-2.5 transition duration-150`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
          <button className="p-2 text-indigo-500 hover:text-indigo-700 rounded-full hover:bg-indigo-100 ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
        
        {/* Emoji Picker */}
        {showEmojiPicker && <EmojiPicker />}
        
        {/* Attachment Menu */}
        {showAttachMenu && <AttachMenu />}
      </div>
      
      {/* Profile Modal */}
      {showProfileModal && <ProfileModal />}
    </div>
  );
};

export default ChatWindow; 