# IPFS Upload Tracking

## Upload Status

### Step 1: Images DAG ✅
- [x] Upload `images/` folder to Pinata
- [x] CID: `QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m`
- [x] Verify: `https://ipfs.io/ipfs/QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m/cafe.png`

### Step 2: Update Metadata ✅
- [x] Run: `node update-metadata-cids.js QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m`
- [x] Verify all 5 JSON files updated

### Step 3: Metadata DAG ✅
- [x] Upload `metadata/` folder to Pinata
- [x] CID: `QmXKkMpzckyFbB7e6gTX3kawCX9FnMRPhp6eG3Vsgnfa5k`
- [x] Verify: `https://ipfs.io/ipfs/QmXKkMpzckyFbB7e6gTX3kawCX9FnMRPhp6eG3Vsgnfa5k/1.json`

### Step 4: Contract Deployment ✅
- [x] Update `deploy-enhanced.ts` with metadata CID
- [x] Deploy contract
- [x] Contract Address: `0x01dB7E6AF3e890572a48423798c88cDe76d542AF`
- [x] Verify on explorer: https://explorer.testnet.rootstock.io/address/0x01dB7E6AF3e890572a48423798c88cDe76d542AF

### Step 5: Mint NFTs ✅
- [x] Update `mint-rewards.ts` with contract address
- [x] Run minting script
- [x] Verify 5 NFTs minted successfully
  - Token ID 1: Café
  - Token ID 2: Medialuna
  - Token ID 3: Refresco
  - Token ID 4: Magdalena
  - Token ID 5: Tostado de queso

## Quick Reference

```bash
# Update metadata with images CID
cd nft-assets
node update-metadata-cids.js QmXxx...

# Deploy contract
cd ../contracts
npx hardhat run scripts/deploy-enhanced.ts --network rootstockTestnet

# Mint NFTs
npx hardhat run scripts/mint-rewards.ts --network rootstockTestnet
```

## IPFS Gateways for Testing

- `https://ipfs.io/ipfs/<CID>`
- `https://gateway.pinata.cloud/ipfs/<CID>`
- `https://cloudflare-ipfs.com/ipfs/<CID>`

## Notes

- Date: _______________
- Uploaded by: _______________
- Network: Rootstock Testnet
