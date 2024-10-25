import { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';
import ChatHistory from './ChatHistory';
import Image from 'next/image';
import Logo from '../../public/logo.png';

const ChatWindow = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatSessions, activeChatId]);

  // Load chat sessions and active chat ID from local storage on component mount
  useEffect(() => {
    const storedChats = localStorage.getItem('chatSessions');
    const storedActiveChatId = localStorage.getItem('activeChatId');
    
    if (storedChats) {
      setChatSessions(JSON.parse(storedChats));
    }
    if (storedActiveChatId) {
      setActiveChatId(storedActiveChatId);
    }
  }, []);

  // Save chat sessions and active chat ID to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    if (activeChatId !== null) {
      localStorage.setItem('activeChatId', activeChatId);
    }
  }, [chatSessions, activeChatId]);

  // Start a new chat session
  const startNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      topic: 'New Chat',
      messages: [],
    };
    setChatSessions((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
  };

  // Handle sending a message
  // Handle sending a message
const sendMessage = (message) => {
    if (!message.trim()) return; // Prevent empty messages
  
    if (!activeChatId) {
      // Create a new chat if there is no active chat
      const newChatId = Date.now().toString();
      const newChat = {
        id: newChatId,
        topic: message,
        messages: [{ sender: 'User', text: message }],
      };
      setChatSessions((prevChats) => [...prevChats, newChat]);
      setActiveChatId(newChatId);
  
      // Simulate a delay for fetching the response
      setIsLoading(true);
      setTimeout(() => {
        setChatSessions((prevChats) =>
          prevChats.map((chat) =>
            chat.id === newChatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    { sender: 'AI', text: 'Lorem Ipsum response...' },
                  ],
                }
              : chat
          )
        );
        setIsLoading(false);
      }, 2000);
    } else {
      // Add message to the existing active chat
      setChatSessions((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { sender: 'User', text: message },
                ],
                topic: chat.messages.length === 0 ? message : chat.topic, // Set topic to first message
              }
            : chat
        )
      );
  
      // Simulate a delay for fetching the response
      setIsLoading(true);
      setTimeout(() => {
        setChatSessions((prevChats) =>
          prevChats.map((chat) =>
            chat.id === activeChatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    { sender: 'AI', text: 'Lorem Ipsum response...' },
                  ],
                }
              : chat
          )
        );
        setIsLoading(false);
      }, 2000);
    }
  };

  // Find active chat messages
  const activeChat = chatSessions.find((chat) => chat.id === activeChatId);

  return (
    <div className="flex h-full bg-zinc-950">
      {/* Chat History Section */}
      <div className="w-1/4 h-full bg-custom-dark border-r border-gray-700">
        <ChatHistory
          activeChatId={activeChatId}
          setActiveChatId={setActiveChatId}
          chatSessions={chatSessions}
          startNewChat={startNewChat}
        />
      </div>

      {/* Chat Window Section */}
      <div className="flex flex-col flex-1 h-full">
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-950 max-h-[calc(100vh-12rem)]">
          {activeChat?.messages.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'AI' && (
                <div className="w-8 h-8 mr-2">
                  <Image src={Logo} alt="AI Logo" width={32} height={32} className="rounded-full" />
                </div>
              )}
              <span className="inline-block px-4 py-2 rounded-lg text-custom-grey bg-zinc-900">
                {msg.text}
              </span>
              {msg.sender === 'User' && (
                <div className="w-8 h-8 ml-2">
                  <Image src={Logo} alt="User Logo" width={32} height={32} className="rounded-full" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
          {isLoading && (
            <div className="text-left">
              <LoadingIndicator />
            </div>
          )}
        </div>
        <div className="bg-zinc-950 border-t border-gray-800">
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;