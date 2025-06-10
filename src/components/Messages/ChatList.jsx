import React, { useState, useMemo } from 'react';

const ChatList = ({ onChatSelect, selectedChatId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced dummy data with all required fields
  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: "2:30 PM",
      avatar: "https://via.placeholder.com/40",
      unread: 2,
      isOnline: true,
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
      isOnline: false,
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
    },
    {
      id: 3,
      name: "Alex Johnson",
      lastMessage: "Great work on the project!",
      timestamp: "Yesterday",
      avatar: "https://via.placeholder.com/40",
      unread: 1,
      isOnline: true,
      messages: [
        {
          id: 1,
          text: "Great work on the project!",
          sender: "Alex Johnson",
          timestamp: "Yesterday",
          isOwn: false
        }
      ]
    },
    {
      id: 4,
      name: "Sarah Wilson",
      lastMessage: "Let's schedule a meeting",
      timestamp: "Monday",
      avatar: "https://via.placeholder.com/40",
      unread: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          text: "Let's schedule a meeting",
          sender: "Sarah Wilson",
          timestamp: "Monday",
          isOwn: false
        }
      ]
    },
    {
      id: 5,
      name: "Mike Brown",
      lastMessage: "Thanks for the help with the code review",
      timestamp: "2 days ago",
      avatar: "https://via.placeholder.com/40",
      unread: 0,
      isOnline: true,
      messages: [
        {
          id: 1,
          text: "Thanks for the help with the code review",
          sender: "Mike Brown",
          timestamp: "2 days ago",
          isOwn: false
        }
      ]
    },
    {
      id: 6,
      name: "Emily Davis",
      lastMessage: "Can we discuss the marketing strategy?",
      timestamp: "Last week",
      avatar: "https://via.placeholder.com/40",
      unread: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          text: "Can we discuss the marketing strategy?",
          sender: "Emily Davis",
          timestamp: "Last week",
          isOwn: false
        }
      ]
    }
  ];

  // Filter chats based on search term
  const filteredChats = useMemo(() => {
    if (!searchTerm.trim()) {
      return chats;
    }

    return chats.filter(chat => 
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with modern styling */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Messages</h2>
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        {/* Search bar */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-10 py-2 border border-blue-500 rounded-xl bg-blue-500/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white transition-colors"
            >
              <svg className="h-5 w-5 text-blue-200 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Search results info */}
        {searchTerm && (
          <div className="mt-2 text-blue-200 text-sm">
            {filteredChats.length === 0 
              ? "No conversations found" 
              : `${filteredChats.length} conversation${filteredChats.length !== 1 ? 's' : ''} found`}
          </div>
        )}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-8">
            <div>
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No conversations found</h3>
              <p className="text-gray-500 text-sm">
                {searchTerm 
                  ? `No results for "${searchTerm}". Try a different search term.`
                  : "Start a new conversation to get started!"}
              </p>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 border-l-4 
                ${selectedChatId === chat.id 
                  ? 'bg-blue-50 border-blue-500 shadow-sm' 
                  : 'border-transparent hover:border-gray-200'}`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-14 h-14 rounded-full border-2 border-gray-200 shadow-sm"
                />
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <div className="flex flex-col items-end ml-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp}</span>
                    {chat.unread > 0 && (
                      <span className="mt-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mt-1">
                  <p className="text-sm text-gray-600 truncate flex-1">{chat.lastMessage}</p>
                </div>
                
                {/* Online status indicator */}
                <div className="flex items-center mt-1">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    chat.isOnline ? 'bg-green-400' : 'bg-gray-300'
                  }`}></div>
                  <span className={`text-xs ${
                    chat.isOnline ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {chat.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick actions at bottom */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatList; 