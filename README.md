# Onchain TicTacToe

A decentralized TicTacToe game built on the Ethereum blockchain using Solidity and React. Play against other players in a trustless environment where game state and moves are verified on-chain.

## Deployment

### Smart Contract Deployment

1. Deploy the TicTacToe contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

2. Update the contract address in `client/lib/contract_config.js`:
```javascript
export const REGISTRY_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

### Frontend Deployment

1. Install dependencies:
```bash
cd client
npm install
```

2. Build the frontend:
```bash
npm run build
```

3. Deploy to Vercel:
```bash
vercel
```

## License

MIT
