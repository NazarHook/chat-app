import addNew from '../../public/icons/newChat.svg'
import Image from 'next/image';
const ChatHistory = ({ activeChatId, setActiveChatId, chatSessions, startNewChat }) => {
    return (
      <div className="p-4 bg-custom-dark border-r border-gray-600 h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-custom-grey">Chat History</h2>
          <button
            onClick={startNewChat}
            className="p-2 text-white rounded-full"
          >
           <div className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg">
            <Image src={addNew} alt="New Chat" width={24} height={24} />
          </div>
          </button>
        </div>
        {chatSessions.length > 0 ? (
          <ul className="bg-custom-dark">
            {chatSessions.map((chat, index) => (
              <li
                key={chat.id}
                className={`text-custom-grey mb-2 p-2 rounded-lg cursor-pointer ${
                  chat.id === activeChatId ? 'bg-gray-700' : 'bg-custom-dark'
                }`}
                onClick={() => setActiveChatId(chat.id)}
              >
                {chat.topic || `Chat ${index + 1}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No chats available. Start one by sending a message!</p>
        )}
      </div>
    );
  };
  
  export default ChatHistory;