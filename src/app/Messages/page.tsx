'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Search, Paperclip, Smile, Send, MoreVertical, Phone, Video, Image as ImageIcon, FileText, Mic } from 'lucide-react';
import Image from 'next/image';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    name: 'Emma Thompson',
    avatar: '../../../public/images/profiles/story/profile.jpg',
    lastMessage: 'That sounds great! Let me check my schedule',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    online: true
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: '/images/DesktopNavbar/user.png',
    lastMessage: 'Did you see the latest research paper?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
    online: true
  },
  {
    id: '3',
    name: 'Sarah Parker',
    avatar: '/images/DesktopNavbar/user.png',
    lastMessage: 'Let\'s schedule a call to discuss the project',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 0,
    online: false
  },
  {
    id: '4',
    name: 'Michael Brown',
    avatar: '/images/DesktopNavbar/user.png',
    lastMessage: 'Thanks for sharing your insights!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
    online: false
  },
  {
    id: '5',
    name: 'Community Forum',
    avatar: '/images/DesktopNavbar/user.png',
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
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (attachmentMenuRef.current && !attachmentMenuRef.current.contains(event.target as Node)) {
        setShowAttachmentMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="flex h-screen max-h-screen overflow-hidden">
              <div className="w-[250px] flex flex-col gap-4 py-6 pl-8 ">
              </div>
      {/* Sidebar - Conversation List */}
      <div className="w-1/4 border-r border-gray-200 flex flex-col bg-white">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
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
                onClick={() => setActiveConversation(conv.id)}
              >
                <div className="relative flex flex-col-2">
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
                
                <div className="ml-4 flex-1 mt-[5px]">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.timestamp ? formatTime(conv.timestamp) : ''}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate max-w-[180px]">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
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
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{activeConv.name}</h3>
                  <p className="text-xs text-gray-500">
                    {activeConv.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-teal-500 transition">
                  <Phone size={20} />
                </button>
                <button className="text-gray-500 hover:text-teal-500 transition">
                  <Video size={20} />
                </button>
                <button className="text-gray-500 hover:text-teal-500 transition">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => {
                const isUser = message.senderId === 'user';
                
                return (
                  <div 
                    key={message.id} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
                      <div 
                        className={`rounded-2xl px-4 py-3 ${
                          isUser 
                            ? 'bg-teal-500 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
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
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <div className="relative">
                  <button 
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="text-gray-500 hover:text-teal-500 transition"
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
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 px-3 py-1"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-gray-500 px-28 hover:text-teal-500 transition"
                    >
                      <Smile size={20} />
                    </button>
                    
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <div className="absolute bottom-10 right-0 bg-white rounded-lg shadow-lg p-2 px-8 grid grid-cols-3 gap-2 border">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            className="w-8 h-8 hover:bg-gray-100 rounded flex items-center justify-center text-xl"
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
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition`}
                    disabled={!messageInput.trim()}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
