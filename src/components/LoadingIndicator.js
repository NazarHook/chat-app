import Image from 'next/image';
import { useState, useEffect } from 'react';
import Logo from '../../public/logo.png'; 

const LoadingIndicator = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8">
        <Image src={Logo} alt="Loading Logo" width={28} height={28} className="rounded-full" />
      </div>
      <div className="bg-zinc-900 text-custom-grey px-3 py-1 rounded-lg">
        {dots || '...'}
      </div>
    </div>
  );
};

export default LoadingIndicator;