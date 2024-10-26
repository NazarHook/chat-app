import { useState, useEffect } from 'react';
import Brain from '../../public/icons/brain.svg';
import File from '../../public/icons/paperclip.svg';
import Library from '../../public/icons/library.svg';
import Thermo from '../../public/icons/thermometr.svg';
import Timer from '../../public/icons/timer-off.svg';
import Mic from '../../public/icons/mic.svg';
import Blocks from '../../public/icons/blocks.svg';
import Eraser from '../../public/icons/eraser.svg';
import Maximize from '../../public/icons/maximize.svg';
import Image from 'next/image';

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  useEffect(() => {
    const savedInput = localStorage.getItem('chatInput');
    if (savedInput) {
      setInput(savedInput);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatInput', input);
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput(''); 
      localStorage.removeItem('chatInput');
    }
  };

  return (
    <div className="w-full bg-zinc-950 p-3 rounded-lg">
      <div className="flex justify-between items-center mb-2 px-3">
        <div className="flex gap-3 text-custom-grey items-center">
          {[
            { src: Brain, alt: "Brain" },
            { src: File, alt: "File" },
            { src: Library, alt: "Library" },
            { src: Thermo, alt: "Thermometer" },
            { src: Timer, alt: "Timer" },
            { src: Mic, alt: "Microphone" },
            { src: Blocks, alt: "Blocks" }
          ].map((icon, index) => (
            <div key={index} className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg">
              <Image src={icon.src} alt={icon.alt} width={20} height={20} />
            </div>
          ))}
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs cursor-pointer">Used 0</div>
        </div>

        <div className="flex gap-3 text-custom-grey items-center">
          <div className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg">
            <Image src={Eraser} alt="Eraser" width={20} height={20} />
          </div>
          <div className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg">
            <Image src={Maximize} alt="Maximize" width={20} height={20} />
          </div>
        </div>
      </div>

      <div className="flex p-2 max-w-3xl items-center rounded-lg">
        <input
          type="text"
          className="flex-1 h-22 p-4 rounded bg-zinc-950 text-custom-grey placeholder-gray-400 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
      </div>

      <div className="flex justify-end items-center mt-2 gap-2">
        <span className="text-custom-grey text-xs">↵ Send / ⌘ ↵ New Line</span>
        <button
          onClick={handleSend}
          className={`px-4 py-1 rounded-lg ${
            isLoading
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-black hover:bg-gray-200'
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;