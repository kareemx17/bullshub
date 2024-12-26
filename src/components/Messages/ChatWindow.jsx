import React, { useState } from 'react';
import MessagesPage from './MessagesPage';

const ChatWindow = ({ chat }) => {
  const [newMessage, setNewMessage] = useState('');
  
  console.log('ChatWindow received chat:', chat); // Debug log

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add your send message logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  if (!chat) {
    return <div>No chat selected</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full"
        />
        <h2 className="ml-3 font-semibold">{chat.name}</h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages && chat.messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>

      {/* Message input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow; 