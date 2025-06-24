import React, { createContext, useState, useContext } from 'react';

// Hardcoded chat data
const initialChats = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'online',
    messages: [
      { id: 1, text: 'Hey, how are you doing?', time: '10:00 AM', sent: false },
      { id: 2, text: 'I\'m good, thanks! How about you?', time: '10:02 AM', sent: true },
      { id: 3, text: 'Working on that project we discussed.', time: '10:05 AM', sent: false },
      { id: 4, text: 'Need any help with it?', time: '10:08 AM', sent: true },
      { id: 5, text: 'Actually yes, could you review the code I sent yesterday?', time: '10:10 AM', sent: false },
      { id: 6, text: 'Sure, I\'ll take a look and get back to you soon.', time: '10:11 AM', sent: true },
      { id: 7, text: 'Thanks! I appreciate it. Let me know if you have any questions.', time: '10:12 AM', sent: false },
    ],
    unread: 2,
    lastActive: '10 min ago',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    status: 'online',
    messages: [
      { id: 1, text: 'Did you see the meeting notes?', time: '9:30 AM', sent: false },
      { id: 2, text: 'Yes, I reviewed them this morning.', time: '9:35 AM', sent: true },
      { id: 3, text: 'Great! I have some suggestions.', time: '9:40 AM', sent: false },
      { id: 4, text: 'I think we should focus more on the UI/UX aspect.', time: '9:42 AM', sent: false },
      { id: 5, text: 'That makes sense. The current design needs improvement.', time: '9:45 AM', sent: true },
      { id: 6, text: 'I\'ll prepare some mockups for tomorrow\'s call.', time: '9:47 AM', sent: true },
      { id: 7, text: 'Perfect! Looking forward to seeing them.', time: '9:50 AM', sent: false },
    ],
    unread: 1,
    lastActive: '30 min ago',
  },
  {
    id: 3,
    name: 'Mike Brown',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    status: 'offline',
    messages: [
      { id: 1, text: 'When is the deadline for the report?', time: 'Yesterday', sent: false },
      { id: 2, text: 'It\'s due next Friday.', time: 'Yesterday', sent: true },
      { id: 3, text: 'Thanks for the reminder!', time: 'Yesterday', sent: false },
      { id: 4, text: 'No problem. Let me know if you need any info from my side.', time: 'Yesterday', sent: true },
      { id: 5, text: 'Will do. I might need some data from your department.', time: 'Yesterday', sent: false },
    ],
    unread: 0,
    lastActive: '1 day ago',
  },
  {
    id: 4,
    name: 'Emily Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'online',
    messages: [
      { id: 1, text: 'Hi! Can we discuss the new marketing campaign?', time: '8:15 AM', sent: false },
      { id: 2, text: 'Of course! What aspects do you want to focus on?', time: '8:20 AM', sent: true },
      { id: 3, text: 'I think we should target younger demographics this time.', time: '8:22 AM', sent: false },
      { id: 4, text: 'That makes sense. Our data shows they\'re engaging more with our content.', time: '8:25 AM', sent: true },
      { id: 5, text: 'Exactly! Let\'s schedule a brainstorming session.', time: '8:30 AM', sent: false },
    ],
    unread: 3,
    lastActive: '1 hour ago',
  },
  {
    id: 5,
    name: 'David Clark',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'offline',
    messages: [
      { id: 1, text: 'Did you review the budget proposal?', time: 'Monday', sent: false },
      { id: 2, text: 'Yes, everything looks good from my end.', time: 'Monday', sent: true },
      { id: 3, text: 'Great! I\'ll submit it to management then.', time: 'Monday', sent: false },
      { id: 4, text: 'Keep me posted on their feedback.', time: 'Monday', sent: true },
    ],
    unread: 0,
    lastActive: '3 days ago',
  },
  {
    id: 6,
    name: 'Jennifer Lee',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    status: 'online',
    messages: [
      { id: 1, text: 'The client loved our presentation!', time: '11:30 AM', sent: false },
      { id: 2, text: 'That\'s fantastic news! Great job!', time: '11:32 AM', sent: true },
      { id: 3, text: 'They want to move forward with the project.', time: '11:35 AM', sent: false },
      { id: 4, text: 'I\'ll prepare the contracts right away.', time: '11:38 AM', sent: true },
      { id: 5, text: 'Perfect! They\'re eager to get started.', time: '11:40 AM', sent: false },
    ],
    unread: 2,
    lastActive: '15 min ago',
  }
];

// Create the context
const ChatContext = createContext();

// Create the provider component
export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Add new state for active view management
  const [activeView, setActiveView] = useState('welcome'); // Default to welcome screen
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        const newMsg = {
          id: chat.messages.length + 1,
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sent: true,
        };
        return {
          ...chat,
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
    setActiveChat(updatedChats.find(chat => chat.id === activeChat.id));
    setNewMessage('');
    
    // Simulate a reply after 2 seconds
    if (Math.random() > 0.3) { // 70% chance of getting a reply
      setTimeout(() => {
        const randomReplies = [
          "Got it, thanks!",
          "I see, that makes sense.",
          "Thanks for letting me know.",
          "I'll check and get back to you.",
          "Sounds good to me!",
          "Perfect, let's proceed with that.",
          "Can you provide more details?",
          "I appreciate your quick response."
        ];
        
        const replyText = randomReplies[Math.floor(Math.random() * randomReplies.length)];
        
        const updatedChatsWithReply = chats.map(chat => {
          if (chat.id === activeChat.id) {
            const replyMsg = {
              id: chat.messages.length + 2,
              text: replyText,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              sent: false,
            };
            return {
              ...chat,
              messages: [...chat.messages, replyMsg]
            };
          }
          return chat;
        });
        
        setChats(updatedChatsWithReply);
        if (activeChat && activeChat.id === updatedChatsWithReply.find(c => c.id === activeChat.id)?.id) {
          setActiveChat(updatedChatsWithReply.find(c => c.id === activeChat.id));
        }
      }, 2000);
    }
  };

  const selectChat = (chatId) => {
    const selected = chats.find(chat => chat.id === chatId);
    if (selected) {
      // Mark messages as read
      const updatedChats = chats.map(chat => {
        if (chat.id === chatId) {
          return { ...chat, unread: 0 };
        }
        return chat;
      });
      setChats(updatedChats);
      setActiveChat(selected);
      
      // Set active view to chat
      setActiveView('chat');
    }
  };
  
  const handleUserClick = (chat) => {
    selectChat(chat.id);
  };
  
  const handleUserDoubleClick = (chat) => {
    setSelectedUser(chat);
    setUserDetailsOpen(true);
  };
  
  const closeUserDetails = () => {
    setUserDetailsOpen(false);
    setSelectedUser(null);
  };

  // Group handling functions
  const selectGroup = (group) => {
    setSelectedGroup(group);
    setActiveView('group');
  };

  const clearGroupSelection = () => {
    setSelectedGroup(null);
    setActiveView('welcome');
  };

  // Status handling functions
  const selectStatus = (status) => {
    setSelectedStatus(status);
    setActiveView('status');
  };

  const clearStatusSelection = () => {
    setSelectedStatus(null);
    setActiveView('welcome');
  };

  // Blog handling functions
  const selectBlog = (blog) => {
    setSelectedBlog(blog);
    setActiveView('blog');
  };

  const clearBlogSelection = () => {
    setSelectedBlog(null);
    setActiveView('welcome');
  };

  return (
    <ChatContext.Provider value={{ 
      chats, 
      activeChat, 
      newMessage, 
      setNewMessage, 
      sendMessage, 
      selectChat,
      handleUserClick,
      handleUserDoubleClick,
      userDetailsOpen,
      selectedUser,
      closeUserDetails,
      // New view management values
      activeView,
      setActiveView,
      selectedGroup,
      selectGroup,
      clearGroupSelection,
      selectedStatus,
      selectStatus,
      clearStatusSelection,
      selectedBlog,
      selectBlog,
      clearBlogSelection
    }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 