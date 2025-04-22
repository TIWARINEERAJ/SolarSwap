import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Wind, Droplets, Package, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { createEnergyListing } from '../services/api';
import { EnergySource } from '../types';
import { addDays, format } from 'date-fns';

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    kWh: '',
    pricePerKWh: '',
    location: '',
    source: 'solar' as EnergySource,
    expiryDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!connected || !publicKey) {
    navigate('/');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.kWh || parseFloat(formData.kWh) <= 0) {
      newErrors.kWh = 'Please enter a valid energy amount';
    }
    
    if (!formData.pricePerKWh || parseFloat(formData.pricePerKWh) <= 0) {
      newErrors.pricePerKWh = 'Please enter a valid price';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Please enter a location';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Please select an expiry date';
    } else {
      const selected = new Date(formData.expiryDate);
      const today = new Date();
      if (selected <= today) {
        newErrors.expiryDate = 'Expiry date must be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const kWh = parseFloat(formData.kWh);
      const pricePerKWh = parseFloat(formData.pricePerKWh);
      const totalPrice = kWh * pricePerKWh;
      
      const listing = await createEnergyListing({
        seller: publicKey,
        kWh,
        pricePerKWh,
        totalPrice,
        location: formData.location,
        source: formData.source,
        expiryDate: new Date(formData.expiryDate),
      });
      
      // Navigate to the new listing
      navigate(`/marketplace/${listing.id}`);
    } catch (error) {
      console.error('Failed to create listing:', error);
      setErrors({ submit: 'Failed to create listing. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderSourceIcon = (source: EnergySource) => {
    switch (source) {
      case 'solar':
        return <Sun className="w-5 h-5" />;
      case 'wind':
        return <Wind className="w-5 h-5" />;
      case 'hydro':
        return <Droplets className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

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
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Energy Listing</h1>
        <p className="text-slate-600">Sell your excess renewable energy to others in your community.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card">
            <h2 className="text-xl font-semibold mb-6">Listing Details</h2>
            
            {/* Energy Amount */}
            <div className="mb-6">
              <label htmlFor="kWh" className="block text-sm font-medium text-slate-700 mb-2">
                Energy Amount (kWh) *
              </label>
              <input
                type="number"
                id="kWh"
                name="kWh"
                min="0.1"
                step="0.1"
                className={`input w-full ${errors.kWh ? 'border-red-300 focus:ring-red-500' : ''}`}
                value={formData.kWh}
                onChange={handleChange}
                required
              />
              {errors.kWh && (
                <p className="mt-1 text-sm text-red-600">{errors.kWh}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Enter the amount of energy you want to sell in kilowatt-hours
              </p>
            </div>
            
            {/* Price per kWh */}
            <div className="mb-6">
              <label htmlFor="pricePerKWh" className="block text-sm font-medium text-slate-700 mb-2">
                Price per kWh ($) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500">$</span>
                </div>
                <input
                  type="number"
                  id="pricePerKWh"
                  name="pricePerKWh"
                  min="0.01"
                  step="0.01"
                  className={`input pl-8 w-full ${errors.pricePerKWh ? 'border-red-300 focus:ring-red-500' : ''}`}
                  value={formData.pricePerKWh}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.pricePerKWh && (
                <p className="mt-1 text-sm text-red-600">{errors.pricePerKWh}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Set your desired price per kilowatt-hour in USD
              </p>
            </div>
            
            {/* Energy Source */}
            <div className="mb-6">
              <label htmlFor="source" className="block text-sm font-medium text-slate-700 mb-2">
                Energy Source *
              </label>
              <div className="relative">
                <select
                  id="source"
                  name="source"
                  className="input w-full appearance-none pr-10"
                  value={formData.source}
                  onChange={handleChange}
                  required
                >
                  <option value="solar">Solar</option>
                  <option value="wind">Wind</option>
                  <option value="hydro">Hydro</option>
                  <option value="other">Other Renewable</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {renderSourceIcon(formData.source)}
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Select the source of your renewable energy
              </p>
            </div>
            
            {/* Location */}
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={`input w-full ${errors.location ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                required
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Enter the location where the energy is generated
              </p>
            </div>
            
            {/* Expiry Date */}
            <div className="mb-8">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-2">
                Listing Expiry Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-slate-500" />
                </div>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  className={`input pl-10 w-full ${errors.expiryDate ? 'border-red-300 focus:ring-red-500' : ''}`}
                  value={formData.expiryDate}
                  onChange={handleChange}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
                />
              </div>
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Choose when your listing should expire (max 90 days)
              </p>
            </div>
            
            {/* Submit Button */}
            <div className="border-t border-slate-100 pt-6">
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {errors.submit}
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/marketplace')}
                  className="btn-outline mr-4"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create Listing'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="font-semibold mb-6">Listing Preview</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {renderSourceIcon(formData.source)}
                  <span className="ml-2 text-sm font-medium capitalize">
                    {formData.source} Energy
                  </span>
                </div>
                <span className="badge-success">Preview</span>
              </div>
            </div>
            
            <h4 className="text-xl font-semibold mb-2">
              {formData.kWh ? parseFloat(formData.kWh).toFixed(1) : '0'} kWh at ${formData.pricePerKWh ? parseFloat(formData.pricePerKWh).toFixed(2) : '0.00'}/kWh
            </h4>
            
            <div className="flex items-center text-slate-500 text-sm mb-4">
              <ArrowRight size={16} className="mr-1" />
              {formData.location || 'Your location'}
            </div>
            
            <div className="flex justify-between items-center text-sm text-slate-600 mb-6">
              <div>
                Total price: 
                <span className="font-semibold"> ${
                  formData.kWh && formData.pricePerKWh 
                    ? (parseFloat(formData.kWh) * parseFloat(formData.pricePerKWh)).toFixed(2) 
                    : '0.00'
                }</span>
              </div>
              <div>{formData.expiryDate ? format(new Date(formData.expiryDate), 'MMM d, yyyy') : 'Expiry date'}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium mb-2">Selling Tips:</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Set competitive prices based on local market rates</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Include accurate location information</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Check your wallet has enough SOL for transaction fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;