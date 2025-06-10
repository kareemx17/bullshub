import { useState } from 'react';

// Message component for individual messages
const Message = ({ text, sender, timestamp, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        isOwn 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800'
      } shadow-sm`}>
        <p className="text-sm">{text}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
};

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
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat header with modern styling */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50 shadow-sm">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-800">{chat.name}</h2>
            <p className="text-sm text-green-500 font-medium">Online</p>
          </div>
        </div>
      </div>

      {/* Messages area with modern styling */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="space-y-2">
          {chat.messages && chat.messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>
      </div>

      {/* Modern message input */}
      <div className="p-6 bg-white border-t border-gray-100">
        <form onSubmit={handleSend}>
          <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-2">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 py-2"
            />
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-3 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow; 