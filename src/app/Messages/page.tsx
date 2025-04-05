'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Search, Paperclip, Smile, Send, MoreVertical, Phone, Video, Image as ImageIcon, FileText, Mic, Menu, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    name: 'Emma Thompson',
    avatar: '/images/profiles/story/profile.jpg', // Fixed path to be absolute from public directory
    lastMessage: 'That sounds great! Let me check my schedule',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    online: true
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: '/images/profiles/story/profile.jpg',
    lastMessage: 'Did you see the latest research paper?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
    online: true
  },
  {
    id: '3',
    name: 'Sarah Parker',
    avatar: '/images/profiles/story/profile.jpg',
    lastMessage: 'Let\'s schedule a call to discuss the project',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 0,
    online: false
  },
  {
    id: '4',
    name: 'Michael Brown',
    avatar: '/images/profiles/story/profile.jpg',
    lastMessage: 'Thanks for sharing your insights!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
    online: false
  },
  {
    id: '5',
    name: 'Community Forum',
    avatar: '/images/profiles/story/profile.jpg',
    lastMessage: 'New topics are available in your field',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unread: 1,
    online: true,
    isGroup: true
  },
];

// Mock data for the active conversation
const mockMessages = [
  {
    id: 'm1',
    senderId: 'user',
    content: 'Hello Emma! I was wondering if you\'d be interested in collaborating on the research project?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: 'm2',
    senderId: '1', // Emma
    content: 'Hi there! Yes, I\'d be very interested. What\'s the project about?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23)
  },
  {
    id: 'm3',
    senderId: 'user',
    content: 'It\'s about neural networks and their applications in climate prediction. I thought your expertise would be valuable.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22)
  },
  {
    id: 'm4',
    senderId: '1', // Emma
    content: 'That sounds fascinating! I\'ve been working on similar concepts recently.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1)
  },
  {
    id: 'm5',
    senderId: '1', // Emma
    content: 'Do you have any specific aspects of climate prediction you want to focus on?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 'm6',
    senderId: 'user',
    content: 'I was thinking of precipitation patterns and extreme weather events. Would you be available for a call this week to discuss more details?',
    timestamp: new Date(Date.now() - 1000 * 60 * 20)
  },
  {
    id: 'm7',
    senderId: '1', // Emma
    content: 'That sounds great! Let me check my schedule and get back to you soon.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  }
];

const Messages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeConversation, setActiveConversation] = useState<string>('1');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [messageInput, setMessageInput] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  
  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (attachmentMenuRef.current && !attachmentMenuRef.current.contains(event.target as Node)) {
        setShowAttachmentMenu(false);
      }
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConversationSelect = (id: string) => {
    setActiveConversation(id);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: `m${messages.length + 1}`,
        senderId: 'user',
        content: messageInput.trim(),
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Update conversation last message
      setConversations(
        conversations.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, lastMessage: messageInput.trim(), timestamp: new Date(), unread: 0 }
            : conv
        )
      );
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = yesterday.toDateString() === date.toDateString();
      
      if (isYesterday) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    }
  };

  const emojis = ['😊', '👍', '❤️', '🎉', '🔥', '😂', '🤔', '👏', '✅'];

  // Filter conversations by search term
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get details of active conversation
  const activeConv = conversations.find(conv => conv.id === activeConversation);

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Conversation List */}
      <div 
        className={`${
          showSidebar ? 'flex' : 'hidden'
        } md:flex flex-col bg-white border-r border-gray-200 ${
          isMobile ? 'w-full absolute z-10' : 'w-full md:w-1/3 lg:w-1/4'
        }`}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Messages</h1>
            {isMobile && (
              <button 
                onClick={() => setShowSidebar(false)}
                className="p-1 text-gray-500 hover:text-teal-500"
              >
                <ArrowLeft size={20} />
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No conversations found</p>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <div 
                key={conv.id}
                className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${activeConversation === conv.id ? 'bg-gray-100' : ''}`}
                onClick={() => handleConversationSelect(conv.id)}
              >
                <div className="relative">
                  <Image 
                    src={conv.avatar} 
                    alt={conv.name}
                    width={50} 
                    height={50}
                    className="rounded-full object-cover"
                  />
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{conv.timestamp ? formatTime(conv.timestamp) : ''}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2 flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${
        !showSidebar || !isMobile ? 'flex' : 'hidden'
      } md:flex flex-1 flex-col`}>
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="px-4 md:px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between">
              {isMobile && (
                <button 
                  onClick={() => setShowSidebar(true)} 
                  className="mr-2 text-gray-500 hover:text-teal-500 md:hidden"
                >
                  <Menu size={20} />
                </button>
              )}
              
              <div className="flex items-center flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <Image 
                    src={activeConv.avatar} 
                    alt={activeConv.name}
                    width={40} 
                    height={40}
                    className="rounded-full object-cover"
                  />
                  {activeConv.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{activeConv.name}</h3>
                  <p className="text-xs text-gray-500">
                    {activeConv.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <button className="text-gray-500 hover:text-teal-500 transition hidden sm:block">
                  <Phone size={20} />
                </button>
                <button className="text-gray-500 hover:text-teal-500 transition hidden sm:block">
                  <Video size={20} />
                </button>
                <button className="text-gray-500 hover:text-teal-500 transition">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
              {messages.map(message => {
                const isUser = message.senderId === 'user';
                
                return (
                  <div 
                    key={message.id} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
                      <div 
                        className={`rounded-2xl px-4 py-3 ${
                          isUser 
                            ? 'bg-teal-500 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                        }`}
                      >
                        <p className="text-sm break-words">{message.content}</p>
                      </div>
                      <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
                        {message.timestamp ? formatTime(message.timestamp) : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-2 sm:p-4">
              <div className="flex items-center bg-gray-100 rounded-full px-2 sm:px-4 py-2">
                <div className="relative z-10">
                  <button 
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="p-2 text-gray-500 hover:text-teal-500 transition cursor-pointer"
                    type="button"
                  >
                    <Paperclip size={20} />
                  </button>
                  
                  {/* Attachment Menu */}
                  {showAttachmentMenu && (
                    <div 
                      ref={attachmentMenuRef}
                      className="absolute bottom-10 left-0 bg-white rounded-lg shadow-lg py-2 w-40 border"
                    >
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <ImageIcon size={16} className="mr-2 text-teal-500" />
                        <span>Photos</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <FileText size={16} className="mr-2 text-teal-500" />
                        <span>Documents</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <Mic size={16} className="mr-2 text-teal-500" />
                        <span>Audio</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 px-2 sm:px-3 py-1 text-sm sm:text-base"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                <div className="flex items-center space-x-1 sm:space-x-2 z-10">
                  <div className="relative">
                    <button 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 text-gray-500 hover:text-teal-500 transition cursor-pointer"
                      type="button"
                    >
                      <Smile size={20} />
                    </button>
                    
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <div 
                        ref={emojiPickerRef}
                        className="absolute bottom-10 right-0 bg-white rounded-lg shadow-lg p-2 px-4 sm:px-8 grid grid-cols-3 gap-2 border"
                      >
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-gray-100 rounded flex items-center justify-center text-lg sm:text-xl"
                            onClick={() => {
                              setMessageInput(prev => prev + emoji);
                              setShowEmojiPicker(false);
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleSendMessage}
                    className={`p-2 rounded-full ${
                      messageInput.trim() 
                        ? 'bg-teal-500 text-white hover:bg-teal-600' 
                        : 'bg-gray-300 text-gray-500'
                    } transition cursor-pointer`}
                    disabled={!messageInput.trim()}
                    type="button"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No conversation selected</h2>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
              {isMobile && !showSidebar && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
                >
                  View Conversations
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;