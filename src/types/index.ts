export interface User {
  walletAddress: string;
  nickname?: string;
  avatar?: string;
  energyProduced: number;
  energySold: number;
  energyBought: number;
  dateJoined: Date;
}

export interface EnergyListing {
  id: string;
  seller: string;
  kWh: number;
  pricePerKWh: number;
  totalPrice: number;
  location: string;
  source: 'solar' | 'wind' | 'hydro' | 'other';
  listedDate: Date;
  expiryDate: Date;
  status: 'active' | 'pending' | 'completed' | 'expired';
}

export interface Trade {
  id: string;
  listingId: string;
  buyer: string;
  seller: string;
  kWh: number;
  pricePerKWh: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  transactionSignature?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Transaction {
  signature: string;
  from: string;
  to: string;
  amount: number;
  timestamp: Date;
  status: 'confirmed' | 'pending' | 'failed';
  type: 'buy' | 'sell';
}

export type EnergySource = 'solar' | 'wind' | 'hydro' | 'other';

export interface WalletContextState {
  connected: boolean;
  publicKey: string | null;
  connecting: boolean;
  disconnect: () => Promise<void>;
  connect: () => Promise<void>;
}