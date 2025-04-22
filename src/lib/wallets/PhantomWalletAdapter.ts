/**
 * Custom implementation of PhantomWalletAdapter to ensure compatibility
 * This avoids type issues with the @solana/wallet-adapter-phantom package
 */

// Interface for the Phantom provider on the window object
interface PhantomWindow {
  phantom?: {
    solana?: {
      isPhantom?: boolean;
      connect: (options?: { onlyIfTrusted?: boolean }) => Promise<any>;
      disconnect: () => Promise<void>;
      // Optional methods that may or may not exist depending on Phantom version
      signTransaction?: (transaction: any) => Promise<any>;
      signAllTransactions?: (transactions: any[]) => Promise<any[]>;
      signMessage?: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      on: (event: string, callback: (args: any) => void) => void;
      off: (event: string, callback: (args: any) => void) => void;
      request: (options: { method: string; params?: any }) => Promise<any>;
      publicKey?: { toString: () => string };
      isConnected?: boolean;
    };
  };
}

// Declare that window implements our custom interface
declare global {
  interface Window extends PhantomWindow {}
}

export class PhantomWalletAdapter {
  private _publicKey: string | null = null;
  private _connected: boolean = false;
  private _connecting: boolean = false;
  private _eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    // Initialize event listeners
    this._eventListeners.set('connect', []);
    this._eventListeners.set('disconnect', []);
    this._eventListeners.set('error', []);
    
    // Check if already connected
    this._checkConnection();
    
    // Listen for Phantom events
    if (window.phantom?.solana) {
      window.phantom.solana.on('connect', () => {
        this._handleConnect();
      });
      window.phantom.solana.on('disconnect', () => {
        this._handleDisconnect();
      });
    }
  }

  private _checkConnection(): void {
    // Check if Phantom exists
    const provider = window.phantom?.solana;
    if (!provider) return;

    // Check connection status - use publicKey as a proxy for connection status
    if (provider.publicKey) {
      this._connected = true;
      this._publicKey = provider.publicKey.toString();
    } else {
      this._connected = false;
      this._publicKey = null;
    }
  }

  private _handleConnect(): void {
    this._checkConnection();
    this._connecting = false;
    this._emit('connect');
  }

  private _handleDisconnect(): void {
    this._connected = false;
    this._publicKey = null;
    this._emit('disconnect');
  }

  private _emit(event: string): void {
    const listeners = this._eventListeners.get(event);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener();
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  // Public properties
  get publicKey(): { toString: () => string } | null {
    if (!this._publicKey) return null;
    
    return {
      toString: () => this._publicKey || ''
    };
  }

  get connected(): boolean {
    return this._connected;
  }

  get connecting(): boolean {
    return this._connecting;
  }

  get ready(): boolean {
    return !!window.phantom?.solana?.isPhantom;
  }

  // Public methods
  async connect(): Promise<void> {
    try {
      if (this.connected) return;
      if (!this.ready) throw new Error('Phantom wallet not installed');
      
      this._connecting = true;
      
      await window.phantom?.solana?.connect();
      
      // Connection events will be handled by the Phantom events
    } catch (error) {
      this._connecting = false;
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (!this.connected) return;
      
      await window.phantom?.solana?.disconnect();
      
      // Disconnection events will be handled by the Phantom events
    } catch (error) {
      throw error;
    }
  }

  async signTransaction(transaction: any): Promise<any> {
    if (!this.connected) throw new Error('Wallet not connected');
    
    // Use request method as a fallback
    const provider = window.phantom?.solana;
    if (!provider) throw new Error('Wallet not found');
    
    // Use type assertion to bypass TypeScript error
    // This is safe because we're handling potential errors appropriately
    const phantomProviderAny = provider as any;
    
    if (typeof phantomProviderAny.signTransaction === 'function') {
      return await phantomProviderAny.signTransaction(transaction);
    } else if (typeof provider.request === 'function') {
      return await provider.request({
        method: 'signTransaction',
        params: { transaction }
      });
    } else {
      throw new Error('Wallet does not support signing transactions');
    }
  }

  async signAllTransactions(transactions: any[]): Promise<any[]> {
    if (!this.connected) throw new Error('Wallet not connected');
    
    // Use request method as a fallback
    const provider = window.phantom?.solana;
    if (!provider) throw new Error('Wallet not found');
    
    // Use type assertion to bypass TypeScript error
    // This is safe because we're handling potential errors appropriately
    const phantomProviderAny = provider as any;
    
    if (typeof phantomProviderAny.signAllTransactions === 'function') {
      return await phantomProviderAny.signAllTransactions(transactions);
    } else if (typeof provider.request === 'function') {
      return await provider.request({
        method: 'signAllTransactions',
        params: { transactions }
      });
    } else {
      throw new Error('Wallet does not support signing multiple transactions');
    }
  }

  on(event: string, callback: () => void): void {
    const listeners = this._eventListeners.get(event) || [];
    listeners.push(callback);
    this._eventListeners.set(event, listeners);
  }

  off(event: string, callback: () => void): void {
    const listeners = this._eventListeners.get(event) || [];
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
      this._eventListeners.set(event, listeners);
    }
  }
} 