import React from 'react';
import { useChat } from '../context/ChatContext';

const WelcomeScreen = () => {
  const { activeTab } = useChat();
  
  // Different welcome messages based on the active tab
  const getWelcomeContent = () => {
    switch (activeTab) {
      case 'chats':
        return {
          title: 'Welcome to ChatApp',
          subtitle: 'Select a conversation to start chatting',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )
        };
      case 'groups':
        return {
          title: 'Group Conversations',
          subtitle: 'Connect with multiple people at once',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )
        };
      case 'status':
        return {
          title: 'Status Updates',
          subtitle: 'Share moments with your contacts',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'blogs':
        return {
          title: 'Blog Articles',
          subtitle: 'Discover news and updates',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          )
        };
      default:
        return {
          title: 'Welcome to ChatApp',
          subtitle: 'Connect with friends and colleagues',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )
        };
    }
  };
  
  const content = getWelcomeContent();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="text-center p-8 max-w-md">
        {content.icon}
        <h1 className="text-3xl font-bold text-indigo-700 mt-6 mb-2">{content.title}</h1>
        <p className="text-lg text-indigo-500">{content.subtitle}</p>
        
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Tips</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Use the tabs above to switch between chats, groups, status updates, and blogs
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Click on any contact or item to view details
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Use the search bar to find specific conversations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 