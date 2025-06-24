import React from 'react';
import { useChat } from '../context/ChatContext';

const UserDetailsModal = () => {
  const { userDetailsOpen, selectedUser, closeUserDetails } = useChat();

  if (!userDetailsOpen || !selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 h-32"></div>
          <button 
            onClick={closeUserDetails}
            className="absolute top-3 right-3 text-white bg-black/20 hover:bg-black/30 rounded-full p-1.5 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* User avatar */}
          <div className="pt-16 pb-4 px-6 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-white rounded-full ${
                  selectedUser.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* User info */}
        <div className="p-6 pt-2 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h2>
          <p className="text-indigo-600 flex items-center justify-center mt-1">
            {selectedUser.status === 'online' ? (
              <>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                Online
              </>
            ) : (
              <>Last active {selectedUser.lastActive}</>
            )}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 my-6 border-y border-gray-100 py-4">
            <div className="text-center">
              <p className="font-bold text-indigo-600">{selectedUser.messages.length}</p>
              <p className="text-sm text-gray-500">Messages</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="font-bold text-indigo-600">
                {selectedUser.messages.filter(m => m.sent === false).length}
              </p>
              <p className="text-sm text-gray-500">Received</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-indigo-600">
                {selectedUser.messages.filter(m => m.sent === true).length}
              </p>
              <p className="text-sm text-gray-500">Sent</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button 
              className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
              onClick={closeUserDetails}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call
            </button>
            <button 
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
              onClick={closeUserDetails}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              Message
            </button>
          </div>

          <div className="mt-5 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium text-gray-700 mb-1">Recent activity</p>
            <p className="text-xs">
              Last message: {selectedUser.messages[selectedUser.messages.length - 1].text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal; 