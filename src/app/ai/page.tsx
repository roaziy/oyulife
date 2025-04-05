'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Bot, User, Send, Sparkles, Sliders, X, ThumbsUp, ThumbsDown, Copy, Settings, PenLine, Clock, Trash2, Plus, ChevronDown, ChevronRight, Loader2 } from 'lucide-react'

// Define the message type
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Define chat history type
interface ChatHistory {
  id: string;
  title: string;
  date: Date;
}

export default function AIAssistant() {
  // State for messages in the current conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Сайн байна уу! Би OyuLife-ийн AI туслах хэрэгсэл. Танд хэрхэн туслах вэ?',
      timestamp: new Date(),
    },
  ]);
  
  // State for current prompt input
  const [input, setInput] = useState('');
  
  // State for loading indication
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for the selected model
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  
  // State for chat histories
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    { id: '1', title: 'Дасгалын талаар асуулт', date: new Date(Date.now() - 3600000) },
    { id: '2', title: 'Биологийн судалгааны тусламж', date: new Date(Date.now() - 86400000) },
    { id: '3', title: 'Програмчлалын бодлого', date: new Date(Date.now() - 172800000) },
  ]);

  // Example suggested prompts
  const suggestedPrompts = [
    "Математик II даалгаврыг хэрхэн бодох талаар тусална уу.",
    "Физикийн дасгал ажлын талаар асуух зүйл байна.",
    "Англи хэлний эссэ бичихэд туслана уу?",
    "Програмчлалын энэ кодыг засахад тусалж чадах уу?"
  ];

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple function to generate mock AI responses
  const getAIResponse = (query: string): string => {
    // This would be replaced with actual API calls to your AI service
    const responses = [
      "Энэ асуултад хариулахад, бид эхлээд үндсэн ойлголтуудыг авч үзэх хэрэгтэй. Таны асуултын дагуу...",
      "Таны хүсэлтийн дагуу, дараах мэдээллийг танд өгч байна. Энэ нь танд тусална гэж найдаж байна.",
      "Энэ бол маш сонирхолтой асуулт байна. Энэ талаар илүү дэлгэрэнгүй судалгаа хийж үзье.",
      "Таны асуултыг шийдвэрлэхийн тулд хэд хэдэн алхам хийх хэрэгтэй. Эхлээд...",
      "Таны хүссэн дагуу мэдээллийг боловсруулж байна. Үүнийг хэрхэн ашиглах талаар хэдэн зөвлөгөө өгье."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };


  // Handle key press to send messages with Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Start a new chat
  const handleNewChat = () => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: 'Сайн байна уу! Шинэ яриа эхэллээ. Би танд хэрхэн туслах вэ?',
      timestamp: new Date(),
    }]);
  };

  // Handle prompt selection
  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat history */}
      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative z-20 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* New Chat Button */}
          <div className="p-4 border-b border-gray-200">
            <button 
              onClick={handleNewChat}
              className="flex items-center gap-2 w-full py-2 px-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
            >
              <Plus size={16} />
              <span>Шинэ яриа</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="mb-4">
              <h3 className="flex items-center gap-2 px-2 text-xs font-medium text-gray-500 mb-1">
                <Clock size={14} />
                <span>СҮҮЛИЙН ЯРИА</span>
              </h3>
              <div className="space-y-1">
                {chatHistories.map(chat => (
                  <button 
                    key={chat.id}
                    className="flex items-center w-full gap-2 rounded-md p-2 hover:bg-gray-100 text-left text-sm"
                  >
                    <ChevronRight size={16} className="flex-shrink-0 text-gray-400" />
                    <div className="flex-1 truncate">
                      <span className="font-medium">{chat.title}</span>
                      <div className="text-xs text-gray-500">
                        {new Date(chat.date).toLocaleDateString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings and Model Selection */}
          <div className="p-3 border-t border-gray-200">
            <div className="bg-gray-50 rounded-md p-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Sparkles size={16} className="text-yellow-500" />
                  <span>AI загвар</span>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <button 
                  className={`py-1 px-2 text-xs rounded ${selectedModel === 'gpt-4' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedModel('gpt-4')}
                >
                  GPT-4
                </button>
                <button 
                  className={`py-1 px-2 text-xs rounded ${selectedModel === 'gpt-3.5' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedModel('gpt-3.5')}
                >
                  GPT-3.5
                </button>
                <button 
                  className={`py-1 px-2 text-xs rounded ${selectedModel === 'claude' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedModel('claude')}
                >
                  Claude
                </button>
                <button 
                  className={`py-1 px-2 text-xs rounded ${selectedModel === 'llama' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedModel('llama')}
                >
                  Llama 2
                </button>
              </div>
            </div>
            <button className="flex items-center gap-2 w-full mt-2 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition px-2">
              <Settings size={16} />
              <span>Тохиргоо</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <ChevronRight size={20} />}
          </button>
          <h2 className="font-medium">AI Туслах</h2>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Plus size={20} />
          </button>
        </div>

        {/* Chat content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 1 && (
            <div className="max-w-2xl mx-auto mb-8">
              <h1 className="text-4xl font-bold text-center mb-6">OyuLife AI Туслах</h1>
              <p className="text-center text-gray-600 mb-8">
                Хичээлийн даалгавар, судалгааны ажил, програмчлал гэх мэт олон төрлийн сэдвээр тусламж авах боломжтой.
              </p>
              
              {/* Example prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {suggestedPrompts.map((prompt, index) => (
                  <button 
                    key={index}
                    className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 text-left"
                    onClick={() => handlePromptSelect(prompt)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-teal-500" />
                      <span className="font-medium">Санал</span>
                    </div>
                    <p className="text-sm text-gray-700">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Messages */}
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-6 ${message.role === 'user' ? 'text-right' : ''}`}
              >
                <div className={`inline-block max-w-[85%] ${message.role === 'user' ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200'} rounded-2xl p-4 shadow-sm`}>
                  <div className="flex items-start">
                    {message.role === 'assistant' && (
                      <div className="mr-3 pt-1">
                        <div className="bg-teal-100 p-1 rounded-lg">
                          <Bot size={18} className="text-teal-700" />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={`mb-1 text-sm ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                        {message.content}
                      </p>
                      <div className="text-xs text-right mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="ml-3 pt-1">
                        <div className="bg-teal-400 p-1 rounded-lg">
                          <User size={18} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Message actions */}
                {message.role === 'assistant' && (
                  <div className="flex items-center justify-start gap-2 mt-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <ThumbsDown size={14} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <Copy size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="mb-6">
                <div className="inline-block max-w-[85%] bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="bg-teal-100 p-1 rounded-lg">
                      <Bot size={18} className="text-teal-700" />
                    </div>
                    <div className="flex items-center">
                      <Loader2 size={16} className="animate-spin text-teal-500 mr-2" />
                      <span className="text-sm text-gray-500">Хариу бэлдэж байна...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto relative">
            <div className="relative rounded-xl border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 bg-white overflow-hidden transition-all">
              <textarea
                rows={1}
                placeholder="Мессеж бичих..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full py-3 px-4 pr-14 focus:outline-none resize-none max-h-40"
                style={{
                  minHeight: '56px',
                  height: 'auto',
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className={`absolute right-2 bottom-2 p-2 rounded-lg ${
                  !input.trim() || isLoading ? 'text-gray-300' : 'text-teal-500 hover:bg-teal-50'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="mt-2 text-xs text-center text-gray-500">
              AI туслах ажиллагаа нь туршилтын шатандаа яваа бөгөөд заримдаа буруу мэдээлэл өгч болохыг анхаарна уу.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
