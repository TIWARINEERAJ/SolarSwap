import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

const WalletTroubleshooter: React.FC = () => {
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean | null>(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);

  useEffect(() => {
    // Check if using a supported browser (Chrome, Firefox, Brave, Edge)
    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome = userAgent.indexOf('chrome') > -1;
    const isFirefox = userAgent.indexOf('firefox') > -1;
    const isEdge = userAgent.indexOf('edg') > -1;
    
    // Check for most common supported browsers
    setIsBrowserSupported(isChrome || isFirefox || isEdge);
    
    // Check if Phantom is installed
    // @ts-ignore - Phantom adds solana to the window object
    const provider = window?.phantom?.solana;
    setIsPhantomInstalled(!!provider);
  }, []);

  if (isPhantomInstalled === null) {
    return null; // Still checking, don't render anything
  }

  return (
    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="text-lg font-semibold mb-4">Wallet Connection Troubleshooting</h3>
      
      <div className="space-y-4">
        {/* Browser Check */}
        <div className="flex items-start gap-3">
          {isBrowserSupported ? (
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
          )}
          <div>
            <h4 className="font-medium">Browser Compatibility</h4>
            {isBrowserSupported ? (
              <p className="text-sm text-slate-600">Your browser is supported.</p>
            ) : (
              <p className="text-sm text-slate-600">
                Your browser may not be fully compatible. For the best experience, use Chrome, Firefox, or Edge.
              </p>
            )}
          </div>
        </div>
        
        {/* Phantom Check */}
        <div className="flex items-start gap-3">
          {isPhantomInstalled ? (
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
          )}
          <div>
            <h4 className="font-medium">Phantom Wallet</h4>
            {isPhantomInstalled ? (
              <p className="text-sm text-slate-600">Phantom wallet extension is installed.</p>
            ) : (
              <div>
                <p className="text-sm text-slate-600 mb-2">
                  Phantom wallet extension is not installed. You need to install it to connect your wallet.
                </p>
                <a 
                  href="https://phantom.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 font-medium inline-flex items-center hover:underline"
                >
                  Install Phantom Wallet
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Tips */}
        <div className="flex items-start gap-3">
          <div>
            <h4 className="font-medium mt-2">Additional Tips:</h4>
            <ul className="text-sm text-slate-600 list-disc ml-5 space-y-1 mt-1">
              <li>Make sure your Phantom wallet is unlocked</li>
              <li>Check if you're connected to the correct Solana network (Mainnet or Devnet)</li>
              <li>Try refreshing the page</li>
              <li>Ensure your browser extensions are up to date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTroubleshooter; 