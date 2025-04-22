import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Wind, Zap, Users, Shield, ArrowRight, ChevronRight, HelpCircle } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import WalletTroubleshooter from '../components/wallet/WalletTroubleshooter';

const HomePage: React.FC = () => {
  const { connected, connect } = useWallet();
  const [showTroubleshooter, setShowTroubleshooter] = useState(false);
  
  const handleConnectClick = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection attempt failed:', error);
      setShowTroubleshooter(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                Trade <span className="text-primary-600">Clean Energy</span> Directly with Your Community
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                The first peer-to-peer marketplace for buying and selling excess renewable energy, powered by Solana blockchain.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {connected ? (
                  <Link to="/marketplace" className="btn-primary text-center flex items-center justify-center">
                    Browse Marketplace
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <button 
                      onClick={handleConnectClick} 
                      className="btn-primary flex items-center justify-center"
                    >
                      Connect Wallet to Start
                      <ArrowRight size={18} className="ml-2" />
                    </button>
                    <button
                      onClick={() => setShowTroubleshooter(!showTroubleshooter)}
                      className="text-sm text-primary-600 flex items-center hover:underline"
                    >
                      <HelpCircle size={14} className="mr-1" />
                      Having trouble connecting?
                    </button>
                  </div>
                )}
                <Link to="/how-it-works" className="btn-outline text-center">
                  Learn How It Works
                </Link>
              </div>
              
              {/* Wallet Troubleshooter */}
              {showTroubleshooter && !connected && (
                <WalletTroubleshooter />
              )}
            </div>
            
            <div className="md:w-1/2 md:pl-12">
              <img 
                src="https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Solar panels on a house roof" 
                className="rounded-xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Trade on SolarSwap?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform makes renewable energy trading simple, secure, and sustainable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:translate-y-[-8px]">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Sun className="text-primary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Peer Trading</h3>
              <p className="text-slate-600">
                Buy and sell energy directly with others in your community, cutting out the middleman and reducing costs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:translate-y-[-8px]">
              <div className="bg-secondary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="text-secondary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Blockchain Security</h3>
              <p className="text-slate-600">
                Every transaction is secured by Solana blockchain, ensuring transparency and immutability.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:translate-y-[-8px]">
              <div className="bg-accent-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Zap className="text-accent-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Settlements</h3>
              <p className="text-slate-600">
                Energy trades are settled instantly on the Solana network, with low fees and minimal environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trading energy on SolarSwap is simple and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="card text-center h-full">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
                <p className="text-slate-600">
                  Connect your Phantom wallet to access the platform.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-slate-300">
                <ChevronRight size={24} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="card text-center h-full">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse Energy</h3>
                <p className="text-slate-600">
                  Browse available energy offerings in the marketplace.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-slate-300">
                <ChevronRight size={24} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="card text-center h-full">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Buy or Sell</h3>
                <p className="text-slate-600">
                  Purchase energy or list your excess production for sale.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-slate-300">
                <ChevronRight size={24} />
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="card text-center h-full">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Confirmation</h3>
                <p className="text-slate-600">
                  Trades are confirmed on the blockchain and energy is transferred.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works" className="btn-secondary inline-flex items-center">
              View Detailed Guide
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Clean Energy Revolution?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start trading renewable energy with your community today and be part of the solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {connected ? (
              <Link to="/marketplace" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Explore Marketplace
              </Link>
            ) : (
              <button onClick={handleConnectClick} className="btn bg-white text-primary-600 hover:bg-gray-100">
                Connect Wallet
              </button>
            )}
            <Link to="/how-it-works" className="btn bg-transparent border border-white hover:bg-white/10">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials (placeholder) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of users already trading energy on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Michael J.</h4>
                  <p className="text-slate-500 text-sm">Solar producer, California</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "I've been able to offset my solar installation costs by selling excess energy to my neighbors. The platform makes it incredibly simple."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Sarah L.</h4>
                  <p className="text-slate-500 text-sm">Energy buyer, Texas</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "I don't have my own solar panels, but SolarSwap lets me support local renewable energy production while saving on my electricity bills."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">David K.</h4>
                  <p className="text-slate-500 text-sm">Community solar manager</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "Our community solar project distributes energy to dozens of households through SolarSwap. The blockchain verification gives everyone peace of mind."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;