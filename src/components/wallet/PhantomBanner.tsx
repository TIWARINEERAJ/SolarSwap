import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, ExternalLink } from 'lucide-react';

const PhantomBanner: React.FC = () => {
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if Phantom is installed
    // @ts-ignore - Phantom adds solana to the window object
    const provider = window?.phantom?.solana;
    setIsPhantomInstalled(!!provider);
    
    // Check localStorage to see if the user has previously dismissed the banner
    const previouslyDismissed = localStorage.getItem('phantom_banner_dismissed');
    if (previouslyDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('phantom_banner_dismissed', 'true');
  };

  // Don't render anything if Phantom is installed or the banner was dismissed
  if (isPhantomInstalled === null || isPhantomInstalled || dismissed) {
    return null;
  }

  return (
    <div className="bg-amber-100 border-amber-300 border-l-4 p-4 flex items-start justify-between">
      <div className="flex items-start">
        <AlertTriangle className="text-amber-600 w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800">Phantom Wallet Required</h3>
          <p className="text-amber-700 mt-1">
            To use SolarSwap, you need to install the Phantom wallet extension.
          </p>
          <a 
            href="https://phantom.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-sm font-medium text-amber-800 hover:underline"
          >
            Install Phantom
            <ExternalLink className="ml-1 w-3 h-3" />
          </a>
        </div>
      </div>
      <button 
        className="text-amber-600 hover:text-amber-800"
        onClick={handleDismiss}
        aria-label="Dismiss"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PhantomBanner; 