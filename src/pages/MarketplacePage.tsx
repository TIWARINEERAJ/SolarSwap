import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, Wind, Droplets, Package, Search, 
  SlidersHorizontal, ChevronDown, MapPin 
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { getEnergyListings } from '../services/api';
import { EnergyListing, EnergySource } from '../types';
import { format } from 'date-fns';

const MarketplacePage: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [listings, setListings] = useState<EnergyListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<EnergyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0.5]);
  const [selectedSources, setSelectedSources] = useState<EnergySource[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getEnergyListings();
        setListings(data);
        setFilteredListings(data);
        
        // Set initial price range based on data
        if (data.length > 0) {
          const minPrice = Math.min(...data.map(l => l.pricePerKWh));
          const maxPrice = Math.max(...data.map(l => l.pricePerKWh));
          setPriceRange([minPrice, maxPrice]);
        }
      } catch (error) {
        console.error('Failed to fetch energy listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    // Apply filters
    let results = listings;

    // Search filter
    if (searchTerm) {
      results = results.filter(listing => 
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    results = results.filter(listing => 
      listing.pricePerKWh >= priceRange[0] && 
      listing.pricePerKWh <= priceRange[1]
    );

    // Source filter
    if (selectedSources.length > 0) {
      results = results.filter(listing => 
        selectedSources.includes(listing.source)
      );
    }

    setFilteredListings(results);
  }, [searchTerm, priceRange, selectedSources, listings]);

  const toggleSourceFilter = (source: EnergySource) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const getSourceIcon = (source: EnergySource) => {
    switch (source) {
      case 'solar':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'wind':
        return <Wind className="w-5 h-5 text-blue-500" />;
      case 'hydro':
        return <Droplets className="w-5 h-5 text-secondary-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Energy Marketplace</h1>
        <p className="text-slate-600">Browse and purchase renewable energy from producers in your area.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by location..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="btn-outline flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filters
            <ChevronDown 
              size={16} 
              className={`ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} 
            />
          </button>
          {connected && (
            <Link to="/create-listing" className="btn-primary">
              Create Listing
            </Link>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Energy Source Filters */}
              <div>
                <h3 className="font-medium mb-3 text-slate-800">Energy Source</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                      selectedSources.includes('solar') 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    onClick={() => toggleSourceFilter('solar')}
                  >
                    <Sun size={16} className="mr-1.5" />
                    Solar
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                      selectedSources.includes('wind') 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    onClick={() => toggleSourceFilter('wind')}
                  >
                    <Wind size={16} className="mr-1.5" />
                    Wind
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                      selectedSources.includes('hydro') 
                        ? 'bg-secondary-100 text-secondary-800' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    onClick={() => toggleSourceFilter('hydro')}
                  >
                    <Droplets size={16} className="mr-1.5" />
                    Hydro
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                      selectedSources.includes('other') 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    onClick={() => toggleSourceFilter('other')}
                  >
                    <Package size={16} className="mr-1.5" />
                    Other
                  </button>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3 text-slate-800">Price per kWh</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>${priceRange[0].toFixed(2)}</span>
                    <span>${priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Quick filters */}
              <div>
                <h3 className="font-medium mb-3 text-slate-800">Quick Filters</h3>
                <div className="space-y-2">
                  <button 
                    className="btn-outline text-sm py-1.5"
                    onClick={() => setSelectedSources([])}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-slate-600">
              Showing {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'}
            </p>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="card group hover:shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {getSourceIcon(listing.source)}
                      <span className="ml-2 text-sm font-medium capitalize">
                        {listing.source} Energy
                      </span>
                    </div>
                    <span className="badge-success">
                      {listing.status === 'active' ? 'Available' : listing.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">
                    {listing.kWh} kWh at ${listing.pricePerKWh.toFixed(2)}/kWh
                  </h3>
                  
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin size={16} className="mr-1" />
                    {listing.location}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-slate-600 mb-6">
                    <div>Total price: <span className="font-semibold">${listing.totalPrice.toFixed(2)}</span></div>
                    <div>Listed: {format(new Date(listing.listedDate), 'MMM d, yyyy')}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                      Seller: {listing.seller.slice(0, 4)}...{listing.seller.slice(-4)}
                    </div>
                    <Link 
                      to={`/marketplace/${listing.id}`}
                      className="btn-secondary py-1.5 px-3 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <Package size={48} className="mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No listings found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or search criteria</p>
              <button 
                className="btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSources([]);
                  setPriceRange([0, 0.5]);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* "Create Listing" CTA for non-authenticated users */}
      {!connected && (
        <div className="mt-12 p-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-4">Have excess energy to sell?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Connect your wallet to create energy listings and start earning from your renewable energy production.
          </p>
          <button 
            onClick={() => {/* wallet connection handled by context */}}
            className="btn-primary"
          >
            Connect Wallet to Sell Energy
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;