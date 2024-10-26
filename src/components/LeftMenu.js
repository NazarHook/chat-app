import Image from 'next/image';
import Logo from '/public/logo.png';
import Folder from '/public/icons/folder.svg';
import Chat from '/public/icons/chat.svg';
import Compass from '/public/icons/compass.svg';

const LeftMenu = ({ onSelectModel }) => {
  return (
    <div className="w-20 bg-custom-dark p-4 flex flex-col items-center border-r border-gray-600">
      <div className="mb-4">
        <Image src={Logo} alt="Logo" width={40} height={40} className="rounded-full" />
      </div>
      <div
        className="mb-4 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
        onClick={() => onSelectModel('chat')}
      >
        <Image src={Chat} alt="Chat" width={24} height={24} />
      </div>
      <div
        className="mb-4 cursor-pointer p-2 rounded-lg hover:bg-gray-800"
        onClick={() => onSelectModel('folder')}
      >
        <Image src={Folder} alt="Folder" width={24} height={24} />
      </div>
      <div
        className="cursor-pointer p-2 rounded-lg hover:bg-gray-800"
        onClick={() => onSelectModel('compass')}
      >
        <Image src={Compass} alt="Compass" width={24} height={24} />
      </div>
    </div>
  );
};

export default LeftMenu;