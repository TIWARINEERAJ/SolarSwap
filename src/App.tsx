import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import DashboardPage from './pages/DashboardPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import CreateListingPage from './pages/CreateListingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import WalletDebug from './components/wallet/WalletDebug';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:id" element={<ListingDetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-listing" element={<CreateListingPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>
        </Layout>
        {/* Debug component (only appears in development) */}
        <WalletDebug />
      </Router>
    </WalletProvider>
  );
}

export default App;