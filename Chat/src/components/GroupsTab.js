import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const GroupsTab = ({ standalone = false, initialSelected = null }) => {
  const { selectGroup, clearGroupSelection } = useChat();
  const [selectedGroup, setSelectedGroup] = useState(initialSelected);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const attachMenuRef = useRef(null);
  
  // Initialize selected group from prop if in standalone mode
  useEffect(() => {
    if (standalone && initialSelected) {
      setSelectedGroup(initialSelected);
    }
  }, [standalone, initialSelected]);

  // Dummy data for groups
  const groups = [
    { 
      id: 1, 
      name: 'Design Team', 
      avatar: 'https://ui-avatars.com/api/?background=6366F1&color=fff&name=Design+Team', 
      lastMessage: 'Let\'s finalize the homepage mockup', 
      time: '11:45 AM', 
      unread: 5,
      members: [
        { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', isAdmin: true, status: 'online' },
        { id: 2, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', isAdmin: false, status: 'online' },
        { id: 3, name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', isAdmin: false, status: 'offline' },
        { id: 4, name: 'Emily Wilson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', isAdmin: false, status: 'offline' },
      ],
      messages: [
        { id: 1, text: 'Hi everyone, welcome to the Design Team group!', sent: true, sender: 'John Doe', time: '10:30 AM', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, text: 'Thanks for creating this group, John!', sent: false, sender: 'Sarah Johnson', time: '10:32 AM', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 3, text: 'I\'ve uploaded the latest mockups to the shared folder', sent: false, sender: 'Mike Brown', time: '10:40 AM', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 4, text: 'Let\'s finalize the homepage mockup by EOD', sent: true, sender: 'John Doe', time: '11:45 AM', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      ],
      description: 'Team for UI/UX design discussions and file sharing'
    },
    { 
      id: 2, 
      name: 'Marketing', 
      avatar: 'https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Marketing', 
      lastMessage: 'Campaign results are in!', 
      time: 'Yesterday', 
      unread: 0,
      members: [
        { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', isAdmin: false, status: 'online' },
        { id: 5, name: 'David Clark', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', isAdmin: true, status: 'online' },
        { id: 6, name: 'Jennifer Lee', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', isAdmin: false, status: 'offline' },
      ],
      messages: [
        { id: 1, text: 'Welcome to the Marketing team group!', sent: true, sender: 'David Clark', time: '9:30 AM', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 2, text: 'Thanks David!', sent: false, sender: 'John Doe', time: '9:32 AM', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 3, text: 'I\'m excited to work with everyone', sent: false, sender: 'Jennifer Lee', time: '9:35 AM', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { id: 4, text: 'Campaign results are in!', sent: true, sender: 'David Clark', time: 'Yesterday', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      ],
      description: 'Marketing team coordination and campaign planning'
    },
    { 
      id: 3, 
      name: 'Development', 
      avatar: 'https://ui-avatars.com/api/?background=EC4899&color=fff&name=Dev+Team', 
      lastMessage: 'Sprint planning at 3 PM', 
      time: 'Monday', 
      unread: 2,
      members: [
        { id: 3, name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', isAdmin: true, status: 'offline' },
        { id: 4, name: 'Emily Wilson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', isAdmin: false, status: 'online' },
        { id: 5, name: 'David Clark', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', isAdmin: false, status: 'online' },
      ],
      messages: [
        { id: 1, text: 'Hey team, welcome to the Dev group!', sent: true, sender: 'Mike Brown', time: '9:00 AM', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 2, text: 'Thanks Mike!', sent: false, sender: 'Emily Wilson', time: '9:05 AM', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, text: 'Let me know if you need any help with the API integration', sent: false, sender: 'David Clark', time: '9:10 AM', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, text: 'Sprint planning at 3 PM', sent: true, sender: 'Mike Brown', time: 'Monday', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      ],
      description: 'Development team discussions, code reviews, and tech support'
    },
  ];

  // Auto-scroll to bottom of messages when a group is selected
  useEffect(() => {
    if (selectedGroup) {
      scrollToBottom();
    }
  }, [selectedGroup]);

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
    if (!newMessage.trim()) return;
    
    // Create new message object
    const newMsg = {
      id: selectedGroup.messages.length + 1,
      text: newMessage,
      sent: true,
      sender: 'You',
      time: 'Just now',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
    };
    
    // Update the selected group with the new message
    const updatedGroup = {
      ...selectedGroup,
      messages: [...selectedGroup.messages, newMsg],
      lastMessage: newMessage
    };
    
    // Update the groups array
    const updatedGroups = groups.map(group => 
      group.id === selectedGroup.id ? updatedGroup : group
    );
    
    // Set the selected group to the updated version
    setSelectedGroup(updatedGroup);
    
    // Clear the input
    setNewMessage('');
    
    // Scroll to bottom
    setTimeout(scrollToBottom, 100);
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Handle group selection in standalone mode
  const handleGroupSelect = (group) => {
    if (standalone) {
      setSelectedGroup(group);
    } else {
      // Use the context function to update the global state
      selectGroup(group);
    }
  };

  // Handle back button in standalone mode
  const handleBackButton = () => {
    if (standalone) {
      setSelectedGroup(null);
    } else {
      clearGroupSelection();
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

  // Members modal
  const MembersModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Group Members</h2>
              <button 
                onClick={() => setShowMembersModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {selectedGroup.members.map(member => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        {member.isAdmin && <span className="text-indigo-600 mr-2">Admin</span>}
                        {member.status === 'online' ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Add New Member
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (selectedGroup) {
    return (
      <div className="flex flex-col h-full">
        {/* Group chat header */}
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
            <div className="relative">
              <img 
                src={selectedGroup.avatar} 
                alt={selectedGroup.name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow"
              />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-indigo-800">{selectedGroup.name}</h2>
              <p className="text-xs text-indigo-500">
                {selectedGroup.members.length} members • {selectedGroup.members.filter(m => m.status === 'online').length} online
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button 
              className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50 transition-colors"
              onClick={() => setShowMembersModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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
          className="flex-1 p-6 overflow-y-auto"
          style={{ 
            backgroundImage: 'url("https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cd.png")',
            backgroundSize: '350px',
            backgroundBlendMode: 'soft-light',
            backgroundColor: '#f9f7ff'
          }}
        >
          <div className="flex justify-center mb-6">
            <span className="text-xs bg-indigo-100 text-indigo-600 rounded-full px-4 py-1.5 inline-block shadow-sm">
              Group created
            </span>
          </div>

          <div className="space-y-6">
            {selectedGroup.messages.map((message, index) => (
              <div key={message.id} className={`message-group ${message.sent ? 'message-out' : 'message-in'}`}>
                <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'} items-end mb-2`}>
                  {!message.sent && (
                    <div className="flex flex-shrink-0 mr-2">
                      <img 
                        src={message.avatar} 
                        alt={message.sender} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-col">
                    {!message.sent && (
                      <span className="text-xs text-gray-500 mb-1 ml-1">{message.sender}</span>
                    )}
                    <div 
                      className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 ${
                        message.sent 
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none shadow-indigo-100 shadow-lg hover:shadow-xl transition-all duration-200' 
                          : 'bg-white text-gray-800 rounded-tl-none shadow hover:shadow-md transition-all duration-200'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 text-right ${message.sent ? 'text-indigo-100' : 'text-gray-400'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>

                  {message.sent && (
                    <div className="flex flex-shrink-0 ml-2">
                      <img 
                        src={message.avatar} 
                        alt={message.sender} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
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
        
        {/* Members Modal */}
        {showMembersModal && <MembersModal />}
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
          <h2 className="text-lg font-semibold text-gray-800">Create New Group</h2>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input 
              type="text" 
              placeholder="Enter group name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Description</label>
            <textarea
              placeholder="Enter group description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Members</label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
              {[1, 2, 3, 4, 5, 6].map(id => (
                <div key={id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <img 
                      src={`https://randomuser.me/api/portraits/${id % 2 === 0 ? 'women' : 'men'}/${id}.jpg`} 
                      alt={`Contact ${id}`} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="ml-2 text-sm text-gray-800">Contact {id}</span>
                  </div>
                  <div className="custom-checkbox"></div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            type="button" 
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700"
            onClick={() => setShowCreateForm(false)}
          >
            Create Group
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center px-2 mb-3">
        <p className="text-xs font-medium text-gray-500 uppercase">Your Groups</p>
        <button 
          className="text-indigo-600 text-xs font-medium hover:text-indigo-800"
          onClick={() => setShowCreateForm(true)}
        >
          Create New
        </button>
      </div>
      
      {groups.map(group => (
        <div 
          key={group.id} 
          className="flex items-center p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 mb-1"
          onClick={() => handleGroupSelect(group)}
        >
          <div className="relative">
            <img 
              src={group.avatar} 
              alt={group.name} 
              className="w-12 h-12 rounded-lg object-cover shadow-sm"
            />
            {group.unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {group.unread}
              </span>
            )}
          </div>
          
          <div className="ml-3 flex-1 overflow-hidden">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-800 truncate">{group.name}</h3>
              <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">{group.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 truncate max-w-[140px]">{group.lastMessage}</p>
              <div className="group-avatar-stack ml-1">
                {group.members.slice(0, 3).map((member, index) => (
                  <img 
                    key={member.id} 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-5 h-5 rounded-full object-cover"
                    style={{ marginLeft: index > 0 ? '-8px' : '0', zIndex: 3 - index }}
                  />
                ))}
                {group.members.length > 3 && (
                  <div 
                    className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-medium"
                    style={{ marginLeft: '-8px', zIndex: 0 }}
                  >
                    +{group.members.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupsTab; 