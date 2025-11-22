# 🚀 Ready to Deploy!

## ✅ IPFS Assets Uploaded

| Asset | CID | Verify URL |
|-------|-----|------------|
| **Images** | `QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m` | [View Café](https://ipfs.io/ipfs/QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m/cafe.png) |
| **Metadata** | `QmXKkMpzckyFbB7e6gTX3kawCX9FnMRPhp6eG3Vsgnfa5k` | [View JSON 1](https://ipfs.io/ipfs/QmXKkMpzckyFbB7e6gTX3kawCX9FnMRPhp6eG3Vsgnfa5k/1.json) |

## 🎯 Deploy Contract Now

```bash
cd contracts
npx hardhat run scripts/deploy-enhanced.ts --network rootstockTestnet
```

El script:
1. Desplegará el contrato CampaignNFT mejorado
2. Configurará automáticamente el base URI a IPFS
3. Te dará la nueva CONTRACT_ADDRESS

## 📝 Después del Deploy

Una vez tengas la **CONTRACT_ADDRESS**, actualiza en:

### 1. mint-rewards.ts
```typescript
const CONTRACT_ADDRESS = "TU_NUEVA_ADDRESS";
```

### 2. frontend/src/config/contractConfig.ts
```typescript
address: 'TU_NUEVA_ADDRESS',
```

## 🎨 Mint NFTs

```bash
npx hardhat run scripts/mint-rewards.ts --network rootstockTestnet
```

Esto minteará los 5 NFTs al merchant wallet.

## ✨ Resultado

Tendrás:
- ✅ Contrato desplegado en Rootstock Testnet
- ✅ Base URI apuntando a IPFS metadata
- ✅ 5 NFTs minteados (Café, Medialuna, Refresco, Magdalena, Tostado)
- ✅ Metadata e imágenes en IPFS descentralizado
