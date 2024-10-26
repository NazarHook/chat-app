import { useState } from 'react';
import addNew from '../../public/icons/newChat.svg';
import Image from 'next/image';

const ChatHistory = ({ activeChatId, setActiveChatId, chatSessions, startNewChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chatSessions.filter((chat) =>
    chat.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <b key={index} className="text-white">{part}</b> : part
    );
  };

  return (
    <div className="p-4 bg-custom-dark border-r border-gray-600 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-custom-grey">Chat History</h2>
        <button onClick={startNewChat} className="p-2 text-white rounded-full">
          <div className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg">
            <Image src={addNew} alt="New Chat" width={24} height={24} />
          </div>
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search assistants..."
          className="w-full p-2 rounded-lg bg-custom-dark text-custom-grey placeholder-gray-500 focus:outline-none border border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {chatSessions.length === 0 ? (
        <p className="text-gray-500">No chats available. Start one by sending a message!</p>
      ) : filteredChats.length > 0 ? (
        <ul className="bg-custom-dark">
          {filteredChats.map((chat, index) => (
            <li
              key={chat.id}
              className={`text-custom-grey mb-2 p-2 rounded-lg cursor-pointer ${
                chat.id === activeChatId ? 'bg-gray-700' : 'bg-custom-dark'
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              {highlightMatch(chat.topic || `Chat ${index + 1}`, searchTerm)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No matching chats found.</p>
      )}
    </div>
  );
};

export default ChatHistory;