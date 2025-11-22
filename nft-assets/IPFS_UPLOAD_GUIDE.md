# 📦 NFT Assets Ready for IPFS Upload

## ✅ What's Ready

He preparado todo para que puedas subir los assets a Pinata (IPFS):

### Directorio: `nft-assets/`

```
nft-assets/
├── images/                    # 5 imágenes PNG listas para subir
│   ├── cafe.png
│   ├── medialuna.png
│   ├── refresco.png
│   ├── magdalena.png
│   └── tostado.png
│
├── metadata/                  # 5 archivos JSON con placeholder IMAGES_CID
│   ├── 1.json                # Café
│   ├── 2.json                # Medialuna
│   ├── 3.json                # Refresco
│   ├── 4.json                # Magdalena
│   └── 5.json                # Tostado
│
├── README.md                  # Guía completa de upload
├── UPLOAD_TRACKING.md         # Checklist para tracking
└── update-metadata-cids.js    # Script helper
```

## 🚀 Proceso de Upload (Paso a Paso)

### Paso 1: Subir Imágenes a Pinata

1. Ve a [Pinata](https://app.pinata.cloud/)
2. Click en "Upload" → "Folder"
3. Selecciona la carpeta `nft-assets/images/`
4. **Importante**: Sube como DAG para mantener la estructura
5. Copia el CID que te da (ejemplo: `QmXxx123...`)

**Verifica**: Abre `https://ipfs.io/ipfs/<TU_CID>/cafe.png`

### Paso 2: Actualizar Metadata con el CID de Imágenes

Usa el script helper:

```bash
cd nft-assets
node update-metadata-cids.js QmXxx123...
```

Esto reemplazará `IMAGES_CID` en todos los JSON con tu CID real.

**Verifica**: Abre `metadata/1.json` y confirma que dice `ipfs://QmXxx.../cafe.png`

### Paso 3: Subir Metadata a Pinata

1. Regresa a Pinata
2. Click en "Upload" → "Folder"
3. Selecciona la carpeta `nft-assets/metadata/` (ya actualizada)
4. Sube como DAG
5. Copia el CID (ejemplo: `QmYyy456...`)

**Verifica**: Abre `https://ipfs.io/ipfs/<TU_CID>/1.json`

### Paso 4: Actualizar Script de Deployment

Edita `contracts/scripts/deploy-enhanced.ts`:

```typescript
const baseURI = "ipfs://QmYyy456.../";  // Tu CID de metadata + /
```

### Paso 5: Deploy y Mint

```bash
cd contracts

# Deploy contract
npx hardhat run scripts/deploy-enhanced.ts --network rootstockTestnet

# Actualizar CONTRACT_ADDRESS en:
# - contracts/scripts/mint-rewards.ts (línea 4)
# - frontend/src/config/contractConfig.ts (línea 3)

# Mint NFTs
npx hardhat run scripts/mint-rewards.ts --network rootstockTestnet
```

## 📋 Tracking

Usa [UPLOAD_TRACKING.md](file:///d:/Git/RTMCRP2/nft-assets/UPLOAD_TRACKING.md) para ir marcando cada paso.

## 🔗 CIDs a Registrar

Una vez completado, registra aquí:

| Asset | CID | Gateway URL |
|-------|-----|-------------|
| Images DAG | `_______________________` | `https://ipfs.io/ipfs/<CID>/cafe.png` |
| Metadata DAG | `_______________________` | `https://ipfs.io/ipfs/<CID>/1.json` |
| Contract | `_______________________` | `https://explorer.testnet.rootstock.io/address/<ADDRESS>` |

## 💡 Tips

- **DAG vs File**: Subir como DAG mantiene la estructura de carpeta, permitiendo `<CID>/cafe.png`
- **Pinning**: Pinata automáticamente "pinea" tus archivos para que permanezcan disponibles
- **Gateways**: Si `ipfs.io` es lento, prueba `gateway.pinata.cloud` o `cloudflare-ipfs.com`
- **Inmutabilidad**: Los archivos en IPFS son inmutables. Si necesitas cambiar algo, deberás subir de nuevo y obtener un nuevo CID

## ❓ Troubleshooting

**Q: ¿Puedo subir manualmente sin el script?**  
A: Sí, solo asegúrate de reemplazar `IMAGES_CID` en cada JSON con tu CID real antes de subir metadata.

**Q: ¿Qué pasa si me equivoco en el CID?**  
A: Deberás actualizar los JSON, volver a subir metadata (nuevo CID), y redesplegar el contrato.

**Q: ¿Necesito cuenta premium en Pinata?**  
A: No, la cuenta gratuita es suficiente para este proyecto (5 archivos pequeños).
