import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, Search, ShoppingCart, CheckCircle, 
  Zap, ArrowRight, Shield, BarChart, Scale
} from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              How SolarSwap Works
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Learn how our peer-to-peer energy trading platform leverages blockchain technology 
              to create a sustainable energy marketplace.
            </p>
            <Link to="/marketplace" className="btn-primary inline-flex items-center">
              Explore the Marketplace
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-slate-600">
              Trading clean energy on SolarSwap is easy and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="card text-center h-full">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect Wallet</h3>
                <p className="text-slate-600">
                  Connect your Phantom wallet to authenticate and access your account on SolarSwap.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Step 1
                  </span>
                </div>
              </div>
              <div className="hidden lg:block absolute top-32 right-0 w-12 h-2 bg-slate-100 transform translate-x-1/2"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="card text-center h-full">
                <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse Market</h3>
                <p className="text-slate-600">
                  Explore available energy listings, compare prices, and find the best match for your needs.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-secondary-100 text-secondary-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Step 2
                  </span>
                </div>
              </div>
              <div className="hidden lg:block absolute top-32 right-0 w-12 h-2 bg-slate-100 transform translate-x-1/2"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="card text-center h-full">
                <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Make Purchase</h3>
                <p className="text-slate-600">
                  Select the energy amount you want to buy and complete the transaction using SOL.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-accent-100 text-accent-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Step 3
                  </span>
                </div>
              </div>
              <div className="hidden lg:block absolute top-32 right-0 w-12 h-2 bg-slate-100 transform translate-x-1/2"></div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="card text-center h-full">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Receive Energy</h3>
                <p className="text-slate-600">
                  The energy transfer is confirmed on blockchain and delivered through the grid.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Step 4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">For Energy Producers</h2>
              <p className="text-lg text-slate-600 mb-6">
                Turn your excess renewable energy into income by selling directly to consumers.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                    <Zap className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">List Your Excess Energy</h3>
                    <p className="text-slate-600">
                      Create listings for your unused solar, wind, or hydro energy with just a few clicks.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                    <Scale className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Set Your Own Price</h3>
                    <p className="text-slate-600">
                      You control the pricing, allowing you to get fair market value for your clean energy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                    <BarChart className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Track Your Sales</h3>
                    <p className="text-slate-600">
                      Monitor your energy sales, earnings, and production metrics in a comprehensive dashboard.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/create-listing" className="btn-primary inline-flex items-center">
                  Start Selling Energy
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/9875380/pexels-photo-9875380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Solar panels on house roof" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 order-2 lg:order-1">
              <img 
                src="https://images.pexels.com/photos/3824/black-and-white-hand-papers-people.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Person using a digital dashboard" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            
            <div className="lg:w-1/2 lg:pl-12 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">For Energy Consumers</h2>
              <p className="text-lg text-slate-600 mb-6">
                Support local clean energy production while potentially saving on your electricity costs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-secondary-100 p-2 rounded-full mr-4">
                    <Search className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Find Local Energy</h3>
                    <p className="text-slate-600">
                      Browse listings from energy producers in your area to support your local community.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary-100 p-2 rounded-full mr-4">
                    <ShoppingCart className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Buy What You Need</h3>
                    <p className="text-slate-600">
                      Purchase as much or as little renewable energy as you require, without long-term contracts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary-100 p-2 rounded-full mr-4">
                    <Shield className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Secure Transactions</h3>
                    <p className="text-slate-600">
                      All energy purchases are secured by Solana blockchain technology for transparent verification.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/marketplace" className="btn-secondary inline-flex items-center">
                  Browse Energy Listings
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Integration */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Powered by Solana Blockchain</h2>
            <p className="text-lg text-slate-600">
              SolarSwap leverages the Solana blockchain for fast, secure, and low-cost energy trading.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="bg-accent-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Zap className="text-accent-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Transactions</h3>
              <p className="text-slate-600">
                Solana's high-throughput blockchain enables near-instant transaction confirmations for seamless energy trading.
              </p>
            </div>
            
            <div className="card">
              <div className="bg-accent-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Shield className="text-accent-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Smart Contracts</h3>
              <p className="text-slate-600">
                Our smart contracts automate the energy trading process, ensuring secure and trustless transactions.
              </p>
            </div>
            
            <div className="card">
              <div className="bg-accent-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <BarChart className="text-accent-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent Tracking</h3>
              <p className="text-slate-600">
                All energy trades are recorded on the blockchain, providing transparent and immutable verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">How does the energy actually get delivered?</h3>
                <p className="text-slate-600">
                  The energy is delivered through the existing power grid. When you purchase energy on SolarSwap, 
                  you're buying the rights to clean energy that's fed into the grid. The blockchain transaction 
                  ensures that the producer is credited and the buyer receives the corresponding amount of energy.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">Do I need special equipment to sell energy?</h3>
                <p className="text-slate-600">
                  You need a renewable energy generation system (like solar panels) and a smart meter that can 
                  measure your energy production. Most modern solar installations already include the necessary 
                  monitoring equipment. Contact your utility provider to ensure your system is compatible.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">How are the prices determined?</h3>
                <p className="text-slate-600">
                  Prices are set by the sellers based on market conditions, their production costs, and desired profit margins. 
                  SolarSwap is a free marketplace that allows energy producers to set their own competitive rates.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">What happens if a seller can't deliver the energy?</h3>
                <p className="text-slate-600">
                  Our smart contracts ensure that sellers must have the energy available before listing it. 
                  If a seller suddenly cannot deliver (due to equipment failure, etc.), the smart contract 
                  automatically refunds the buyer and adjusts the marketplace accordingly.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">Is SolarSwap available everywhere?</h3>
                <p className="text-slate-600">
                  SolarSwap is currently available in select regions where regulations allow for peer-to-peer 
                  energy trading. We're constantly expanding to new areas as regulations evolve. Check 
                  your local utility provider's policies on energy trading to see if your area is eligible.
                </p>
              </div>
            </div>
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
            <Link to="/marketplace" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Explore Marketplace
            </Link>
            <Link to="/create-listing" className="btn bg-transparent border border-white hover:bg-white/10">
              Sell Your Energy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;