import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Zap, DollarSign, ArrowUpRight, 
  ArrowDownRight, Sun, Clock, Package, Plus
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { getUser, getUserTrades, getUserTransactions } from '../services/api';
import { getAccountBalance } from '../services/solana';
import { User, Trade, Transaction } from '../types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'trades' | 'transactions'>('overview');

  useEffect(() => {
    if (!connected || !publicKey) {
      navigate('/');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [userData, tradesData, transactionsData, balanceData] = await Promise.all([
          getUser(publicKey),
          getUserTrades(publicKey),
          getUserTransactions(publicKey),
          getAccountBalance(publicKey),
        ]);

        setUser(userData);
        setTrades(tradesData);
        setTransactions(transactionsData);
        setBalance(balanceData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [connected, publicKey, navigate]);

  // Chart data
  const energyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Energy Produced (kWh)',
        data: [65, 78, 90, 85, 92, 110],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Energy Sold (kWh)',
        data: [40, 45, 55, 50, 62, 75],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage your energy trading activities</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => navigate('/create-listing')}
            className="btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Create New Listing
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Energy Produced */}
        <div className="card flex items-center">
          <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <Sun className="text-primary-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Energy Produced</p>
            <h3 className="text-2xl font-semibold">{user?.energyProduced.toFixed(1)} kWh</h3>
          </div>
        </div>

        {/* Energy Sold */}
        <div className="card flex items-center">
          <div className="bg-secondary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <ArrowUpRight className="text-secondary-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Energy Sold</p>
            <h3 className="text-2xl font-semibold">{user?.energySold.toFixed(1)} kWh</h3>
          </div>
        </div>

        {/* Energy Bought */}
        <div className="card flex items-center">
          <div className="bg-accent-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <ArrowDownRight className="text-accent-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Energy Bought</p>
            <h3 className="text-2xl font-semibold">{user?.energyBought.toFixed(1)} kWh</h3>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="card flex items-center">
          <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <DollarSign className="text-purple-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">SOL Balance</p>
            <h3 className="text-2xl font-semibold">{balance !== null ? balance.toFixed(2) : '--'}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <div className="flex overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
              activeTab === 'trades'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('trades')}
          >
            My Trades
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
              activeTab === 'transactions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Energy Chart */}
          <div className="lg:col-span-2">
            <div className="card h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Energy Activity</h3>
                <div className="text-xs bg-slate-100 rounded-full px-3 py-1">Last 6 months</div>
              </div>
              <div>
                <Line data={energyChartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="card h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
                <button className="text-xs text-primary-600 hover:text-primary-700">View All</button>
              </div>
              
              {trades.length > 0 ? (
                <div className="space-y-4">
                  {trades.slice(0, 4).map((trade) => (
                    <div key={trade.id} className="flex items-start border-b border-slate-100 pb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        trade.buyer === publicKey ? 'bg-accent-100' : 'bg-primary-100'
                      }`}>
                        {trade.buyer === publicKey ? (
                          <ArrowDownRight className={`w-4 h-4 text-accent-600`} />
                        ) : (
                          <ArrowUpRight className={`w-4 h-4 text-primary-600`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium">
                              {trade.buyer === publicKey ? 'Bought Energy' : 'Sold Energy'}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {format(new Date(trade.createdAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                          <span className={`text-sm font-medium ${
                            trade.buyer === publicKey ? 'text-accent-600' : 'text-primary-600'
                          }`}>
                            {trade.kWh} kWh
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trades' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Energy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Counterparty
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {trades.length > 0 ? (
                  trades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {format(new Date(trade.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          trade.buyer === publicKey
                            ? 'bg-accent-100 text-accent-800'
                            : 'bg-primary-100 text-primary-800'
                        }`}>
                          {trade.buyer === publicKey ? 'Buy' : 'Sell'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {trade.kWh} kWh
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        ${trade.totalPrice.toFixed(2)}
                        <span className="text-xs text-slate-500 ml-1">
                          (${trade.pricePerKWh.toFixed(2)}/kWh)
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          trade.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : trade.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {trade.buyer === publicKey
                          ? `${trade.seller.slice(0, 4)}...${trade.seller.slice(-4)}`
                          : `${trade.buyer.slice(0, 4)}...${trade.buyer.slice(-4)}`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No trades found. Start trading clean energy!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Transaction
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.signature} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {format(new Date(tx.timestamp), 'MMM d, yyyy HH:mm')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.type === 'buy'
                            ? 'bg-accent-100 text-accent-800'
                            : 'bg-primary-100 text-primary-800'
                        }`}>
                          {tx.type === 'buy' ? 'Outgoing' : 'Incoming'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {tx.amount} SOL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : tx.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:text-primary-800">
                        <a href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`} target="_blank" rel="noopener noreferrer">
                          {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;