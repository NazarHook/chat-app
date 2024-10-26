import { useState } from 'react';
import LeftMenu from '../components/LeftMenu';
import ChatPage from './ChatPage';
import FolderPage from './FolderPage';
import CompassPage from './CompassPage';

export default function HomePage() {
  const [selectedPage, setSelectedPage] = useState('chat'); 

  return (
    <div className="flex h-screen bg-custom-dark text-white">
      <LeftMenu onSelectModel={setSelectedPage} />
      <div className="flex-1 flex flex-col">
        {selectedPage === 'chat' && <ChatPage />}
        {selectedPage === 'folder' && <FolderPage />}
        {selectedPage === 'compass' && <CompassPage />}
      </div>
    </div>
  );
}