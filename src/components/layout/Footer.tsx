import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Sun className="w-6 h-6 text-accent-400" />
              <span className="text-lg font-bold">SolarSwap</span>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              The peer-to-peer marketplace for clean energy trading, powered by Solana blockchain.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-accent-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-accent-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Discord Community
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-slate-300 hover:text-accent-400 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SolarSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;