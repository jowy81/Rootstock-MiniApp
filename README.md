# Rootstock Commerce Rewards Platform

A decentralized commerce rewards platform built on Rootstock Mainnet, enabling merchants to distribute NFT-based rewards to customers.

## 🚀 Live Deployment

- **Network**: Rootstock Mainnet (Chain ID: 30)
- **NFT Contract**: [`0x74d5D5e304aC227CFEaEC50b4B2959A5be37767d`](https://explorer.rootstock.io/address/0x74d5D5e304aC227CFEaEC50b4B2959A5be37767d)
- **Explorer**: [Rootstock Explorer](https://explorer.rootstock.io)

## 📋 Features

- ✅ NFT-based reward system with 5 unique rewards
- ✅ Claim codes for reward distribution
- ✅ Merchant panel for NFT burning (redemption)
- ✅ RIF token integration
- ✅ stRIF staking display
- ✅ Multi-language support (English)
- ✅ QR code wallet display
- ✅ Persistent user wallets

## 🏗️ Architecture

```
RTMCRP2/
├── frontend/        # React + Vite + ethers.js
├── backend/         # Node.js + Express + SQLite
├── contracts/       # Hardhat + Solidity
└── bot/            # Telegram Bot integration
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, ethers.js v6
- **Backend**: Node.js, Express, SQLite, ethers.js v6
- **Smart Contracts**: Solidity 0.8.20, Hardhat 2.22, OpenZeppelin 5.1
- **Blockchain**: Rootstock Mainnet, RIF Token, stRIF Staking

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/jowyk81/Rootstock-MiniApp.git
cd Rootstock-MiniApp
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Contracts
cd ../contracts
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` in each directory and fill in your values:

**Backend `.env`**:
```env
PORT=3000
ROOTSTOCK_RPC_URL=https://public-node.rsk.co
PRIVATE_KEY_GAS_SPONSOR=your_private_key_here
PINARKIVE_API_KEY=your_pinata_key_here
DATABASE_URL=./database.sqlite
```

**Contracts `.env`**:
```env
ROOTSTOCK_RPC_URL=https://public-node.rsk.co
PRIVATE_KEY_DEPLOYER=your_deployer_private_key_here
```

## 🚀 Running Locally

### Frontend
```bash
cd frontend
npm run dev
# Opens on http://localhost:5173
```

### Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:3000
```

## 📝 Smart Contract

The NFT contract is deployed on Rootstock Mainnet with the following features:

- **Minting**: Only owner can mint NFTs
- **Burning**: Only owner can burn NFTs (for reward redemption)
- **Metadata**: IPFS-based metadata storage
- **Events**: NFTMinted and NFTBurned events

### Contract Details
- **Address**: `0x74d5D5e304aC227CFEaEC50b4B2959A5be37767d`
- **Name**: CampaignNFT
- **Symbol**: CNFT
- **Total Supply**: 5 NFTs (IDs 1-5)

## 🎯 Usage

### For Users
1. Open the app
2. Your wallet is automatically created and persisted
3. Enter a claim code (e.g., `GIFT01`)
4. Receive NFT + 100 RIF + rBTC for gas
5. Show NFT to merchant to redeem physical reward

### For Merchants
1. Toggle "Merch" mode in footer
2. Enter user's wallet address
3. Enter NFT ID to burn
4. Confirm burn transaction
5. Give physical reward to customer

## 💰 Token Economics

- **Claim Reward**: 100 RIF + ~$3 USD in rBTC
- **Gas Costs**: ~0.00006 rBTC for contract deployment
- **Transaction Fees**: ~0.000001-0.000002 rBTC per transaction

## 🔐 Security

- Private keys stored in `.env` (never committed)
- User wallets stored in browser localStorage
- Backend validates all claim codes
- NFT burning requires merchant authentication

## 📊 Deployment Costs

Total deployment cost on Rootstock Mainnet:
- Contract Creation: 0.00005898 rBTC
- Set Base URI: 0.0000022 rBTC
- Mint 5 NFTs: 0.00000685 rBTC (5 × ~0.00000137)
- **Total**: ~0.00006 rBTC (~$0.06 USD)

## 🤝 Contributing

This project was built for the Rootstock Hackathon. Contributions are welcome!

## 📄 License

ISC

## 🔗 Links

- [Rootstock](https://rootstock.io)
- [RIF Token](https://rif.technology)
- [Explorer](https://explorer.rootstock.io)

---

Built with ❤️ for Rootstock Hackathon
