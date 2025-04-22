import { EnergyListing, Trade, Transaction, User } from '../types';

// Mock data for development
const mockUsers: User[] = [
  {
    walletAddress: '8WZpvXjBXmpxNQP3XrFwQP5FQ92LQz1rbNJ9UJwqZQK6',
    nickname: 'SolarPower123',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    energyProduced: 245.6,
    energySold: 120.3,
    energyBought: 40.5,
    dateJoined: new Date('2023-04-15'),
  },
  {
    walletAddress: '5VnAspRgYmeRrePXV1hi8m2RBRoYRJu7dujnG5YrLhTy',
    nickname: 'GreenEnergy',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    energyProduced: 325.8,
    energySold: 200.2,
    energyBought: 0,
    dateJoined: new Date('2023-02-10'),
  },
];

const mockEnergyListings: EnergyListing[] = [
  {
    id: '1',
    seller: '8WZpvXjBXmpxNQP3XrFwQP5FQ92LQz1rbNJ9UJwqZQK6',
    kWh: 25.5,
    pricePerKWh: 0.12,
    totalPrice: 25.5 * 0.12,
    location: 'San Francisco, CA',
    source: 'solar',
    listedDate: new Date('2023-08-15'),
    expiryDate: new Date('2023-09-15'),
    status: 'active',
  },
  {
    id: '2',
    seller: '5VnAspRgYmeRrePXV1hi8m2RBRoYRJu7dujnG5YrLhTy',
    kWh: 40.0,
    pricePerKWh: 0.11,
    totalPrice: 40.0 * 0.11,
    location: 'Austin, TX',
    source: 'wind',
    listedDate: new Date('2023-08-10'),
    expiryDate: new Date('2023-09-10'),
    status: 'active',
  },
  {
    id: '3',
    seller: '8WZpvXjBXmpxNQP3XrFwQP5FQ92LQz1rbNJ9UJwqZQK6',
    kWh: 15.2,
    pricePerKWh: 0.13,
    totalPrice: 15.2 * 0.13,
    location: 'San Francisco, CA',
    source: 'solar',
    listedDate: new Date('2023-08-05'),
    expiryDate: new Date('2023-09-05'),
    status: 'active',
  },
  {
    id: '4',
    seller: '5VnAspRgYmeRrePXV1hi8m2RBRoYRJu7dujnG5YrLhTy',
    kWh: 30.0,
    pricePerKWh: 0.10,
    totalPrice: 30.0 * 0.10,
    location: 'Austin, TX',
    source: 'solar',
    listedDate: new Date('2023-08-01'),
    expiryDate: new Date('2023-09-01'),
    status: 'active',
  },
];

const mockTrades: Trade[] = [
  {
    id: '1',
    listingId: '1',
    buyer: '5VnAspRgYmeRrePXV1hi8m2RBRoYRJu7dujnG5YrLhTy',
    seller: '8WZpvXjBXmpxNQP3XrFwQP5FQ92LQz1rbNJ9UJwqZQK6',
    kWh: 10.0,
    pricePerKWh: 0.12,
    totalPrice: 10.0 * 0.12,
    status: 'completed',
    transactionSignature: '4AawGwYBUx8WPZQYZkJPMX9KztnUHzLZbSjrrYYU9EPt',
    createdAt: new Date('2023-07-15'),
    completedAt: new Date('2023-07-15'),
  },
  {
    id: '2',
    listingId: '2',
    buyer: '8WZpvXjBXmpxNQP3XrFwQP5FQ92LQz1rbNJ9UJwqZQK6',
    seller: '5VnAspRgYmeRrePXV1hi8m2RBRoYRJu7dujnG5YrLhTy',
    kWh: 5.0,
    pricePerKWh: 0.11,
    totalPrice: 5.0 * 0.11,
    status: 'pending',
    createdAt: new Date('2023-07-20'),
  },
];

const mockTransactions: Transaction[] = [
  {
    signature: '4AawGwYBUx8WPZQYZkJPMX9KztnUHzLZbSjrrYYU9EPt',
    from: '8WZpvXjBXmpxNQP3XrFwQP5FQ92LQz1rbNJ9UJwqZQK6',
    to: '5VnAspRgYmeRrePXV1hi8m2RBRoYRJu7dujnG5YrLhTy',
    amount: 1.2,
    timestamp: new Date('2023-07-15'),
    status: 'confirmed',
    type: 'sell',
  },
  {
    signature: '2FxzGrER56CEzGnq6RRzKfAuPmyZLv9VjnG5YRLhTrF',
    from: '5VnAspRgYmeRrePXV1hi8m2RBRoYRJu7dujnG5YrLhTy',
    to: '8WZpvXjBXmpxNQP3XrFwQP5FQ92LQz1rbNJ9UJwqZQK6',
    amount: 0.55,
    timestamp: new Date('2023-07-20'),
    status: 'pending',
    type: 'buy',
  },
];

// API service functions
export const getUser = async (walletAddress: string): Promise<User | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.walletAddress === walletAddress);
      resolve(user || null);
    }, 300);
  });
};

export const getEnergyListings = async (): Promise<EnergyListing[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEnergyListings);
    }, 300);
  });
};

export const getEnergyListing = async (id: string): Promise<EnergyListing | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const listing = mockEnergyListings.find(l => l.id === id);
      resolve(listing || null);
    }, 300);
  });
};

export const createEnergyListing = async (listing: Omit<EnergyListing, 'id' | 'listedDate' | 'status'>): Promise<EnergyListing> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newListing: EnergyListing = {
        ...listing,
        id: Math.random().toString(36).substring(2, 9),
        listedDate: new Date(),
        status: 'active',
      };
      mockEnergyListings.push(newListing);
      resolve(newListing);
    }, 300);
  });
};

export const getUserTrades = async (walletAddress: string): Promise<Trade[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const trades = mockTrades.filter(t => t.buyer === walletAddress || t.seller === walletAddress);
      resolve(trades);
    }, 300);
  });
};

export const createTrade = async (trade: Omit<Trade, 'id' | 'createdAt' | 'completedAt'>): Promise<Trade> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTrade: Trade = {
        ...trade,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date(),
      };
      mockTrades.push(newTrade);
      resolve(newTrade);
    }, 300);
  });
};

export const getUserTransactions = async (walletAddress: string): Promise<Transaction[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactions = mockTransactions.filter(
        t => t.from === walletAddress || t.to === walletAddress
      );
      resolve(transactions);
    }, 300);
  });
};