import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Sun, Wind, Droplets, Package, MapPin, 
  Calendar, Clock, ArrowRight, AlertCircle, 
  Check, Loader2
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { getEnergyListing } from '../services/api';
import { createEnergyPurchaseTransaction } from '../services/solana';
import { EnergyListing, EnergySource } from '../types';
import { format, differenceInDays } from 'date-fns';

const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const [listing, setListing] = useState<EnergyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseState, setPurchaseState] = useState<'idle' | 'purchasing' | 'success' | 'error'>('idle');
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getEnergyListing(id);
        setListing(data);
        if (data) {
          setPurchaseAmount(data.kWh);
        }
      } catch (error) {
        console.error('Failed to fetch energy listing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const getSourceIcon = (source: EnergySource) => {
    switch (source) {
      case 'solar':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'wind':
        return <Wind className="w-6 h-6 text-blue-500" />;
      case 'hydro':
        return <Droplets className="w-6 h-6 text-secondary-500" />;
      default:
        return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  const getExpiryText = (date: Date) => {
    const daysLeft = differenceInDays(new Date(date), new Date());
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Expires today';
    return `Expires in ${daysLeft} days`;
  };

  const handlePurchase = async () => {
    if (!connected || !publicKey || !listing) {
      alert('Please connect your wallet first');
      return;
    }

    if (purchaseAmount <= 0 || purchaseAmount > listing.kWh) {
      alert('Please enter a valid purchase amount');
      return;
    }

    try {
      setPurchaseState('purchasing');
      const signature = await createEnergyPurchaseTransaction(
        publicKey,
        listing.seller,
        purchaseAmount * listing.pricePerKWh
      );
      
      setTransactionSignature(signature);
      setPurchaseState('success');
    } catch (error) {
      console.error('Purchase failed:', error);
      setPurchaseState('error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Listing Not Found</h3>
          <p className="text-slate-500 mb-6">The energy listing you're looking for doesn't exist or has been removed</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/marketplace')}
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/marketplace')}
          className="text-primary-600 hover:text-primary-700 flex items-center mb-4"
        >
          <ArrowRight size={16} className="mr-1 transform rotate-180" />
          Back to Marketplace
        </button>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {listing.kWh} kWh of {listing.source} Energy
        </h1>
        <div className="flex items-center text-slate-600">
          <MapPin size={18} className="mr-1" />
          {listing.location}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <div className="flex items-center mb-6">
              {getSourceIcon(listing.source)}
              <h2 className="text-xl font-semibold ml-2 capitalize">{listing.source} Energy Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-500 text-sm mb-1">Energy Amount</p>
                <p className="text-xl font-medium">{listing.kWh} kWh</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-500 text-sm mb-1">Price per kWh</p>
                <p className="text-xl font-medium">${listing.pricePerKWh.toFixed(2)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-500 text-sm mb-1">Total Price</p>
                <p className="text-xl font-medium">${listing.totalPrice.toFixed(2)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-500 text-sm mb-1">Status</p>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    listing.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : listing.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {listing.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-semibold mb-4">Timeline</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar size={18} className="text-slate-400 mr-2" />
                  <span className="text-sm text-slate-600">Listed on:</span>
                </div>
                <span className="text-sm font-medium">
                  {format(new Date(listing.listedDate), 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock size={18} className="text-slate-400 mr-2" />
                  <span className="text-sm text-slate-600">Expiration:</span>
                </div>
                <span className={`text-sm font-medium ${
                  differenceInDays(new Date(listing.expiryDate), new Date()) < 3 
                    ? 'text-amber-600' 
                    : 'text-slate-700'
                }`}>
                  {format(new Date(listing.expiryDate), 'MMMM d, yyyy')} ({getExpiryText(listing.expiryDate)})
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">About the Seller</h3>
            <div className="flex items-start mb-6">
              <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Sun className="text-primary-500" />
              </div>
              <div>
                <p className="font-medium">Energy Producer</p>
                <p className="text-sm text-slate-500">
                  {listing.seller.slice(0, 6)}...{listing.seller.slice(-6)}
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-sm">
              This seller is offering clean energy generated from {listing.source} sources
              in the {listing.location} area. The energy is certified renewable and tracked 
              on the Solana blockchain.
            </p>
          </div>
        </div>

        {/* Purchase Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="font-semibold mb-6">Purchase Energy</h3>

            {purchaseState === 'success' ? (
              <div className="text-center py-6">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-xl font-medium text-slate-800 mb-2">Purchase Successful!</h4>
                <p className="text-slate-600 mb-6">
                  Your energy purchase has been processed successfully.
                </p>
                {transactionSignature && (
                  <div className="mb-6">
                    <p className="text-sm text-slate-500 mb-1">Transaction ID:</p>
                    <a 
                      href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm break-all"
                    >
                      {transactionSignature}
                    </a>
                  </div>
                )}
                <div className="flex space-x-4">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary flex-1"
                  >
                    View Dashboard
                  </button>
                  <button 
                    onClick={() => navigate('/marketplace')}
                    className="btn-outline flex-1"
                  >
                    Back to Marketplace
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Purchase Amount (kWh)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    max={listing.kWh}
                    step="0.1"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                    className="input w-full"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Maximum available: {listing.kWh} kWh
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Price per kWh:</span>
                    <span className="font-medium">${listing.pricePerKWh.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Selected amount:</span>
                    <span className="font-medium">{purchaseAmount} kWh</span>
                  </div>
                  <div className="border-t border-slate-100 my-2 pt-2"></div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total Cost:</span>
                    <span className="font-semibold text-lg">
                      ${(purchaseAmount * listing.pricePerKWh).toFixed(2)}
                    </span>
                  </div>
                </div>

                {!connected ? (
                  <div className="mb-4">
                    <button 
                      className="btn-primary w-full"
                      onClick={() => {/* wallet connection handled by context */}}
                    >
                      Connect Wallet to Purchase
                    </button>
                    <p className="text-xs text-slate-500 text-center mt-2">
                      You need to connect your wallet to make a purchase
                    </p>
                  </div>
                ) : listing.seller === publicKey ? (
                  <div className="bg-amber-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        You cannot purchase your own energy listing.
                      </p>
                    </div>
                  </div>
                ) : purchaseState === 'error' ? (
                  <div>
                    <div className="bg-red-50 p-4 rounded-lg mb-6">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                        <p className="text-sm text-red-800">
                          Transaction failed. Please try again.
                        </p>
                      </div>
                    </div>
                    <button 
                      className="btn-primary w-full"
                      onClick={handlePurchase}
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn-primary w-full flex items-center justify-center"
                    onClick={handlePurchase}
                    disabled={purchaseState === 'purchasing' || purchaseAmount <= 0 || purchaseAmount > listing.kWh}
                  >
                    {purchaseState === 'purchasing' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Purchase Energy'
                    )}
                  </button>
                )}

                <div className="mt-6 text-xs text-slate-500">
                  <p className="mb-2">By completing this purchase you agree to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pay the listed price for the energy</li>
                    <li>Complete the transaction on Solana blockchain</li>
                    <li>Accept the platform's <a href="#" className="text-primary-600">terms of service</a></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;