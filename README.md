# SolarSwap - P2P Energy Trading Platform

SolarSwap is a decentralized peer-to-peer energy trading platform built on the Solana blockchain. It enables users to buy and sell excess renewable energy directly with their community.

## Features

- 🌞 **P2P Energy Trading**: Buy and sell renewable energy directly with other users
- 🔐 **Wallet Integration**: Secure authentication using Phantom wallet
- ⚡ **Real-time Market**: Browse and create energy listings with live updates
- 📊 **Dashboard**: Track your energy production, sales, and purchases
- 💰 **Secure Payments**: All transactions are secured by Solana blockchain

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Blockchain**: Solana, Phantom Wallet
- **State Management**: React Context
- **Routing**: React Router
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- Phantom Wallet browser extension

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/solarswap.git
   cd solarswap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React Context providers
├── pages/         # Page components
├── services/      # API and blockchain services
├── types/         # TypeScript type definitions
└── main.tsx       # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.