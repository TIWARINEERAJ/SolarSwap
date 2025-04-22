import React, { useState, useEffect } from 'react';
import { Wallet, LogOut, ExternalLink } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

const WalletButton: React.FC = () => {
  const { connected, publicKey, connecting, connect, disconnect } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(true);
  
  useEffect(() => {
    // Check if Phantom is installed
    // @ts-ignore - Phantom adds solana to the window object
    const provider = window?.phantom?.solana;
    setIsPhantomInstalled(!!provider);
  }, []);
  
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connecting) {
    return (
      <button className="btn-outline animate-pulse" disabled>
        Connecting...
      </button>
    );
  }
  
  if (connected && publicKey) {
    return (
      <div className="relative">
        <button 
          className="btn-secondary flex items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Wallet size={16} className="mr-2" />
          {truncateAddress(publicKey)}
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 flex items-center"
              onClick={() => {
                disconnect();
                setIsDropdownOpen(false);
              }}
            >
              <LogOut size={16} className="mr-2" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  // Phantom not installed
  if (!isPhantomInstalled) {
    return (
      <a
        href="https://phantom.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex items-center"
      >
        <Wallet size={16} className="mr-2" />
        Install Phantom
        <ExternalLink size={14} className="ml-2" />
      </a>
    );
  }

  return (
    <button
      className="btn-primary flex items-center"
      onClick={connect}
    >
      <Wallet size={16} className="mr-2" />
      Connect Wallet
    </button>
  );
};

export default WalletButton;