import React from 'react';

const ChatList = ({ onChatSelect, selectedChatId }) => {
  // Enhanced dummy data with all required fields
  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: "2:30 PM",
      avatar: "https://via.placeholder.com/40",
      unread: 2,
      messages: [
        {
          id: 1,
          text: "Hey, how are you?",
          sender: "John Doe",
          timestamp: "2:30 PM",
          isOwn: false
        },
        {
          id: 2,
          text: "I'm good, thanks! How about you?",
          sender: "You",
          timestamp: "2:31 PM",
          isOwn: true
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "See you tomorrow!",
      timestamp: "1:45 PM",
      avatar: "https://via.placeholder.com/40",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hi Jane!",
          sender: "You",
          timestamp: "1:30 PM",
          isOwn: true
        },
        {
          id: 2,
          text: "See you tomorrow!",
          sender: "Jane Smith",
          timestamp: "1:45 PM",
          isOwn: false
        }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <div className="overflow-y-auto flex-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 
              ${selectedChatId === chat.id ? 'bg-blue-50' : ''}`}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">{chat.name}</h3>
                <span className="text-sm text-gray-500">{chat.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList; 