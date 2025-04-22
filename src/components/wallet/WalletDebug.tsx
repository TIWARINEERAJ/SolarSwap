import React, { useState, useEffect } from 'react';
import { useWallet } from '../../contexts/WalletContext';

// This component is for development purposes only
const WalletDebug: React.FC = () => {
  const wallet = useWallet();
  const [phantomInfo, setPhantomInfo] = useState<any>(null);
  const [connectionDetails, setConnectionDetails] = useState<string[]>([]);
  
  // Add a log entry with timestamp
  const addConnectionLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConnectionDetails(prev => 
      [`${timestamp}: ${message}`, ...prev].slice(0, 5)
    );
  };
  
  // Handle connection attempt with logging
  const handleConnect = async () => {
    addConnectionLog("Connection attempt started");
    try {
      await wallet.connect();
      addConnectionLog("Connection successful");
    } catch (error) {
      addConnectionLog(`Connection failed: ${error}`);
      console.error(error);
    }
  };
  
  // Handle disconnect with logging
  const handleDisconnect = async () => {
    addConnectionLog("Disconnect attempt started");
    try {
      await wallet.disconnect();
      addConnectionLog("Disconnect successful");
    } catch (error) {
      addConnectionLog(`Disconnect failed: ${error}`);
      console.error(error);
    }
  };
  
  useEffect(() => {
    // Only collect debug info if in development
    if (import.meta.env.DEV) {
      try {
        // Check for Phantom
        // @ts-ignore
        const phantom = window?.phantom?.solana;
        
        if (phantom) {
          setPhantomInfo({
            isPhantom: phantom.isPhantom,
            publicKey: phantom.publicKey?.toString() || 'Not connected',
            isConnected: !!phantom.publicKey,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            browserInfo: navigator.userAgent
          });
        } else {
          setPhantomInfo({ 
            error: 'Phantom not detected',
            browserInfo: navigator.userAgent
          });
        }
      } catch (error) {
        setPhantomInfo({ 
          error: `Error collecting info: ${error}`,
          browserInfo: navigator.userAgent
        });
      }
    }
  }, [wallet.connected]);

  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 bg-slate-800 text-white p-4 text-xs font-mono z-50 w-96 opacity-80 hover:opacity-100 transition-opacity overflow-auto max-h-[80vh]">
      <div className="mb-2 font-bold pb-1 border-b border-slate-600">Wallet Debug Info:</div>
      <div className="space-y-1">
        <div><span className="text-slate-400">Context State:</span></div>
        <div>Connected: <span className="text-green-400">{String(wallet.connected)}</span></div>
        <div>Public Key: <span className="text-green-400">{wallet.publicKey || 'null'}</span></div>
        <div>Connecting: <span className="text-green-400">{String(wallet.connecting)}</span></div>
        
        {phantomInfo && (
          <>
            <div className="mt-2"><span className="text-slate-400">Phantom Provider:</span></div>
            {Object.entries(phantomInfo).map(([key, value]) => (
              <div key={key}>{key}: <span className="text-yellow-400">{
                typeof value === 'object' 
                  ? JSON.stringify(value).substring(0, 50) + (JSON.stringify(value).length > 50 ? '...' : '')
                  : String(value)
              }</span></div>
            ))}
          </>
        )}

        <div className="mt-2 pt-1 border-t border-slate-600">
          <button 
            className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs mr-2" 
            onClick={handleConnect}
          >
            Connect
          </button>
          <button 
            className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs" 
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
        
        {connectionDetails.length > 0 && (
          <div className="mt-2 pt-1 border-t border-slate-600">
            <div className="text-slate-400">Connection Logs:</div>
            {connectionDetails.map((log, index) => (
              <div key={index} className="text-blue-300 mt-1">{log}</div>
            ))}
          </div>
        )}
        
        <div className="mt-2 pt-1 border-t border-slate-600">
          <details>
            <summary className="cursor-pointer text-slate-400">Troubleshooting Tips</summary>
            <ul className="ml-2 mt-1 space-y-1 text-slate-300">
              <li>• Check if Phantom extension is installed</li>
              <li>• Make sure Phantom is unlocked</li>
              <li>• Try refreshing the page</li>
              <li>• Check Phantom settings for site connections</li>
              <li>• Verify no popup blockers are active</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};

export default WalletDebug; 