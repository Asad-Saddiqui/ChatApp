import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import UserDetailsModal from './UserDetailsModal';
import { ChatProvider, useChat } from '../context/ChatContext';
import GroupsTab from './GroupsTab';
import StatusTab from './StatusTab';
import BlogsTab from './BlogsTab';
import WelcomeScreen from './WelcomeScreen';

// Main content component that changes based on the active view
const MainContent = () => {
  const { activeView, selectedGroup, selectedStatus, selectedBlog } = useChat();
  
  switch (activeView) {
    case 'group':
      return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <GroupsTab standalone={true} initialSelected={selectedGroup} />
        </div>
      );
    case 'status':
      return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <StatusTab standalone={true} initialSelected={selectedStatus} />
        </div>
      );
    case 'blog':
      return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <BlogsTab standalone={true} initialSelected={selectedBlog} />
        </div>
      );
    case 'chat':
      return <ChatWindow />;
    case 'welcome':
      return <WelcomeScreen />;
    default:
      return <ChatWindow />;
  }
};

const Chat = () => {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-50 overflow-hidden">
        <div className="w-full max-w-screen-xl mx-auto flex shadow-xl rounded-xl my-4 overflow-hidden border border-indigo-100">
          <ChatSidebar />
          <MainContent />
        </div>
        <UserDetailsModal />
      </div>
    </ChatProvider>
  );
};

export default Chat; 