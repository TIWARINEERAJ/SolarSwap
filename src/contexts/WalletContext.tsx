import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WalletContextState } from '../types';

// Default context value
const defaultContextValue: WalletContextState = {
  connected: false,
  publicKey: null,
  connecting: false,
  disconnect: async () => {},
  connect: async () => {},
};

// Create the wallet context
const WalletContext = createContext<WalletContextState>(defaultContextValue);

// Export as a named export to fix Fast Refresh
export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [walletNotInstalled, setWalletNotInstalled] = useState(false);

  // Check if Phantom is installed in the browser
  const checkPhantomInstalled = useCallback(() => {
    // @ts-ignore - Phantom adds solana to the window object
    const provider = window?.phantom?.solana;
    return !!provider;
  }, []);

  // Setup wallet event listeners
  useEffect(() => {
    // Exit if Phantom is not installed
    if (!checkPhantomInstalled()) {
      console.log("Phantom wallet is not installed");
      setWalletNotInstalled(true);
      return;
    }

    // Define event handlers
    const handleConnect = () => {
      console.log("Phantom connected");
      // @ts-ignore
      const publicKeyStr = window?.phantom?.solana?.publicKey?.toString();
      setConnected(true);
      setPublicKey(publicKeyStr || null);
      setConnecting(false);
    };

    const handleDisconnect = () => {
      console.log("Phantom disconnected");
      setConnected(false);
      setPublicKey(null);
    };

    // Register event listeners
    // @ts-ignore
    window.phantom?.solana?.on('connect', handleConnect);
    // @ts-ignore
    window.phantom?.solana?.on('disconnect', handleDisconnect);

    // Check if already connected
    // @ts-ignore
    if (window.phantom?.solana?.publicKey) {
      handleConnect();
    }

    // Cleanup function
    return () => {
      // @ts-ignore
      window.phantom?.solana?.off('connect', handleConnect);
      // @ts-ignore
      window.phantom?.solana?.off('disconnect', handleDisconnect);
    };
  }, [checkPhantomInstalled]);

  // Handle connection attempt
  const connect = useCallback(async () => {
    if (walletNotInstalled) {
      window.open('https://phantom.app/', '_blank');
      return;
    }
    
    if (!connected) {
      try {
        setConnecting(true);
        
        // @ts-ignore
        if (!window.phantom?.solana) {
          throw new Error('Phantom wallet is not installed.');
        }
        
        // @ts-ignore
        await window.phantom.solana.connect();
        // The connect event handler will update the state
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setConnecting(false);
        alert("Failed to connect to Phantom wallet. Please make sure it's installed and unlocked.");
      }
    }
  }, [connected, walletNotInstalled]);

  // Handle disconnection
  const disconnect = useCallback(async () => {
    if (connected) {
      try {
        // @ts-ignore
        await window.phantom?.solana?.disconnect();
        // The disconnect event handler will update the state
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
  }, [connected]);

  // Prepare the context value object
  const contextValue = {
    connected,
    publicKey,
    connecting,
    disconnect,
    connect,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};