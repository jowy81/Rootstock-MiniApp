# Contract Verification Guide - Rootstock Mainnet

## Contract Details
- **Contract Name**: `CampaignNFT`
- **Address**: `0x74d5d5e304ac227cfeaec50b4b2959a5be37767d`
- **Network**: Rootstock Mainnet
- **Compiler Version**: `v0.8.20`
- **Optimization**: No (Runs: 200) - *Default Hardhat setting*
- **EVM Version**: `paris` (default for 0.8.20)
- **License**: MIT

## Verification Steps

1. Go to [Rootstock Explorer](https://explorer.rootstock.io/address/0x74d5d5e304ac227cfeaec50b4b2959a5be37767d)
2. Click on the **Code** tab.
3. Click **Verify & Publish**.
4. Select:
   - **Compiler**: `v0.8.20+commit...`
   - **EVM Version**: `default` (or `paris`)
   - **Optimization**: `No`
5. Upload the flattened source code file: `contracts/CampaignNFT_flat.sol`
   *(This file contains all dependencies combined into one)*
6. Click **Verify**.

## ABI
If needed, here is the ABI:

```json
[
  "function mint(address to, uint256 tokenId) public",
  "function burn(uint256 tokenId) public",
  "function setBaseTokenURI(string memory baseURI) public",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function getBaseTokenURI() public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function balanceOf(address owner) public view returns (uint256)",
  "event NFTMinted(address indexed to, uint256 indexed tokenId)",
  "event NFTBurned(uint256 indexed tokenId)"
]
```
