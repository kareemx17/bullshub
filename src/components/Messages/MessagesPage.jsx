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
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar with chat list */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <ChatList 
          onChatSelect={handleChatSelect} 
          selectedChatId={selectedChat?.id} 
        />
      </div>
      
      {/* Right side with messages */}
      <div className="w-2/3 bg-white">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage; 