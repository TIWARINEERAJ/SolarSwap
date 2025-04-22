/// <reference types="vite/client" />

interface PhantomProvider {
  solana?: {
    isPhantom?: boolean;
    connect: (options?: { onlyIfTrusted?: boolean }) => Promise<any>;
    disconnect: () => Promise<void>;
    on: (event: string, callback: (args: any) => void) => void;
    request: (method: any, params: any) => Promise<any>;
    publicKey?: any;
  };
}

interface Window {
  phantom?: PhantomProvider;
}

// Extended Interface for PhantomWalletAdapter to include ready property
declare module '@solana/wallet-adapter-phantom' {
  export class PhantomWalletAdapter {
    publicKey: any;
    ready: boolean;
    connecting: boolean;
    connected: boolean;
    connect(): Promise<any>;
    disconnect(): Promise<void>;
    signTransaction(transaction: any): Promise<any>;
    signAllTransactions(transactions: any[]): Promise<any[]>;
  }
}
