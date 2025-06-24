import React, { useState, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import GroupsTab from './GroupsTab';
import StatusTab from './StatusTab';
import BlogsTab from './BlogsTab';

const ChatSidebar = () => {
  const { 
    chats, 
    activeChat, 
    handleUserClick, 
    handleUserDoubleClick,
    activeView,
    setActiveView
  } = useChat();
  const [clickedChat, setClickedChat] = useState(null);
  const [activeTab, setActiveTab] = useState('chats');
  const clickTimeoutRef = useRef(null);
  const clickCountRef = useRef(0);
  
  // Handle click with single/double click detection
  const handleClick = (chat) => {
    clickCountRef.current += 1;
    
    if (clickCountRef.current === 1) {
      setClickedChat(chat.id);
      clickTimeoutRef.current = setTimeout(() => {
        if (clickCountRef.current === 1) {
          // Single click
          handleUserClick(chat);
        }
        clickCountRef.current = 0;
        
        // Reset the glitch effect after animation completes
        setTimeout(() => {
          setClickedChat(null);
        }, 300);
      }, 250); // Adjust this delay to distinguish between single and double click
    } else if (clickCountRef.current === 2) {
      // Double click
      clearTimeout(clickTimeoutRef.current);
      clickCountRef.current = 0;
      handleUserDoubleClick(chat);
      
      // Reset the glitch effect after animation completes
      setTimeout(() => {
        setClickedChat(null);
      }, 300);
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Reset active view when switching tabs
    if (tab === 'chats') {
      if (activeChat) {
        setActiveView('chat');
      } else {
        setActiveView('welcome');
      }
    } else if (activeView !== 'welcome' && activeView !== tab) {
      setActiveView('welcome');
    }
  };

  return (
    <div className="w-80 bg-white border-r border-indigo-100 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">ChatApp</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full hover:bg-indigo-500/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-indigo-500/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-3 relative">
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full py-2 px-3 bg-indigo-500/30 rounded-lg text-white placeholder-indigo-200 outline-none focus:ring-2 focus:ring-white/50"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute right-3 top-2.5 text-indigo-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-indigo-100 bg-white sticky top-[112px] z-10">
        <button 
          className={`flex-1 py-3 px-2 text-sm font-medium relative ${
            activeTab === 'chats' 
              ? 'text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('chats')}
        >
          Chats
          {activeTab === 'chats' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
        </button>
        <button 
          className={`flex-1 py-3 px-2 text-sm font-medium relative ${
            activeTab === 'groups' 
              ? 'text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('groups')}
        >
          Groups
          {activeTab === 'groups' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
        </button>
        <button 
          className={`flex-1 py-3 px-2 text-sm font-medium relative ${
            activeTab === 'status' 
              ? 'text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('status')}
        >
          Status
          {activeTab === 'status' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
        </button>
        <button 
          className={`flex-1 py-3 px-2 text-sm font-medium relative ${
            activeTab === 'blogs' 
              ? 'text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('blogs')}
        >
          Blogs
          {activeTab === 'blogs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Chats Tab */}
        {activeTab === 'chats' && (
          <div>
            {/* Online Users Section */}
            <div className="py-3 px-4">
              <p className="text-xs font-medium text-gray-500 uppercase mb-3">Online Users</p>
              <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
                {chats.filter(chat => chat.status === 'online').map(chat => (
                  <div key={`online-${chat.id}`} className="flex flex-col items-center space-y-1 min-w-[60px]">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                        <img 
                          src={chat.avatar} 
                          alt={chat.name} 
                          className="w-full h-full object-cover rounded-full border-2 border-white"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700 truncate w-full text-center">
                      {chat.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-xs font-medium text-gray-500 uppercase px-4 mb-2">Recent Chats</p>
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  className={`flex items-center p-3 mx-2 rounded-xl cursor-pointer transition-all duration-200 
                    ${activeChat && activeChat.id === chat.id ? 'bg-indigo-50 shadow-sm' : 'hover:bg-gray-50'} 
                    ${clickedChat === chat.id ? 'animate-pulse' : ''}
                    relative overflow-hidden mb-1`}
                  onClick={() => handleClick(chat)}
                >
                  {/* Glitch effect overlay */}
                  {clickedChat === chat.id && (
                    <div className="absolute inset-0 bg-indigo-100/30 z-0 animate-pulse"></div>
                  )}
                  
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${chat.status === 'online' ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                      <img 
                        src={chat.avatar} 
                        alt={chat.name} 
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random`;
                        }}
                      />
                    </div>
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-semibold truncate ${activeChat && activeChat.id === chat.id ? 'text-indigo-700' : 'text-gray-800'}`}>
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-1">
                        {chat.messages[chat.messages.length - 1].time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className={`text-sm truncate max-w-[140px] ${activeChat && activeChat.id === chat.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                        {chat.messages[chat.messages.length - 1].text}
                      </p>
                      {chat.unread > 0 && (!activeChat || chat.id !== activeChat.id) && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full ml-1 whitespace-nowrap">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && <GroupsTab />}

        {/* Status Tab */}
        {activeTab === 'status' && <StatusTab />}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && <BlogsTab />}
      </div>
      
      {/* Bottom profile section */}
      <div className="p-4 border-t border-indigo-100 bg-indigo-50 flex items-center">
        <img 
          src="https://randomuser.me/api/portraits/men/43.jpg" 
          alt="Your Avatar" 
          className="w-10 h-10 rounded-full border-2 border-white shadow"
        />
        <div className="ml-3">
          <h3 className="font-medium text-indigo-800">Your Name</h3>
          <p className="text-xs text-indigo-500 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
            Available
          </p>
        </div>
        <div className="ml-auto">
          <button className="text-indigo-500 hover:text-indigo-700 p-1.5 rounded-full hover:bg-indigo-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar; 