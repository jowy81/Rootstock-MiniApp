# ✅ Metadata Actualizado - Listo para Upload

## Estado Actual

✅ **Imágenes en IPFS**: `QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m`

✅ **Metadata Actualizado**: Todos los archivos JSON ahora apuntan a las imágenes en IPFS

### Verificación de Metadata

Todos los archivos JSON tienen el formato correcto:

```json
{
  "name": "Café Gratis",
  "description": "Canjea este NFT por un café gratis en nuestro local",
  "image": "ipfs://QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m/cafe.png",
  "attributes": [...]
}
```

## 📤 Próximo Paso: Subir Metadata a Pinata

1. Ve a [Pinata](https://app.pinata.cloud/)
2. Click en "Upload" → "Folder"
3. Selecciona la carpeta `nft-assets/metadata/`
4. Sube como **DAG**
5. Copia el **CID** que te dé

## 🔧 Después del Upload de Metadata

Una vez tengas el **METADATA_CID**, necesitas:

### 1. Actualizar `deploy-enhanced.ts`

```typescript
// En contracts/scripts/deploy-enhanced.ts, línea ~15
const baseURI = "ipfs://TU_METADATA_CID/";
```

### 2. Deploy del Contrato

```bash
cd contracts
npx hardhat run scripts/deploy-enhanced.ts --network rootstockTestnet
```

Esto te dará la nueva **CONTRACT_ADDRESS**.

### 3. Actualizar Configuración

Actualiza el CONTRACT_ADDRESS en:

**A. `contracts/scripts/mint-rewards.ts` (línea 4)**
```typescript
const CONTRACT_ADDRESS = "TU_NUEVA_ADDRESS";
```

**B. `frontend/src/config/contractConfig.ts` (línea 3)**
```typescript
address: 'TU_NUEVA_ADDRESS',
```

### 4. Mintear los NFTs

```bash
cd contracts
npx hardhat run scripts/mint-rewards.ts --network rootstockTestnet
```

## 🎯 Resultado Final

Después de estos pasos tendrás:

- ✅ 5 NFTs minteados en Rootstock Testnet
- ✅ Imágenes en IPFS descentralizado
- ✅ Metadata en IPFS descentralizado
- ✅ Smart contract desplegado y configurado
- ✅ Frontend listo para mostrar los NFTs

## 📋 URLs de Verificación

Una vez completado, podrás verificar:

- **Imágenes**: `https://ipfs.io/ipfs/QmUtLAxx8cjXT1U6tFaTTiC18ZPebiPqy8LBmEgKuyps4m/cafe.png`
- **Metadata**: `https://ipfs.io/ipfs/TU_METADATA_CID/1.json`
- **Contrato**: `https://explorer.testnet.rootstock.io/address/TU_CONTRACT_ADDRESS`
- **NFT en Explorer**: `https://explorer.testnet.rootstock.io/token/TU_CONTRACT_ADDRESS?tab=token_transfer`
