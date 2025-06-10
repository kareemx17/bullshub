import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  
  console.log('Selected chat:', selectedChat); // Debug log

  const handleChatSelect = (chat) => {
    console.log('Selecting chat:', chat); // Debug log
    setSelectedChat(chat);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="flex h-full max-w-7xl mx-auto bg-white shadow-2xl rounded-none lg:rounded-xl lg:m-4 lg:h-[calc(100vh-2rem)]">
        {/* Left sidebar with chat list */}
        <div className="w-full lg:w-1/3 border-r border-gray-100 flex flex-col">
          <ChatList 
            onChatSelect={handleChatSelect} 
            selectedChatId={selectedChat?.id} 
          />
        </div>
        
        {/* Right side with messages - hidden on mobile when no chat selected */}
        <div className={`w-full lg:w-2/3 flex flex-col ${
          selectedChat ? 'block' : 'hidden lg:block'
        }`}>
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="text-center max-w-md px-4">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Messages</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Connect with your team, friends, and colleagues. Select a conversation from the sidebar to start messaging, or create a new conversation to get started.
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Start New Conversation
                  </button>
                  <button className="w-full bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-200">
                    Invite Team Members
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile back button overlay */}
        {selectedChat && (
          <div className="lg:hidden absolute top-4 left-4 z-10">
            <button
              onClick={() => setSelectedChat(null)}
              className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage; 