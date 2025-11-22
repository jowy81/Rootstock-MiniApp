# NFT Assets - IPFS Upload Guide

Este directorio contiene todos los assets necesarios para los NFTs de rewards.

## Estructura

```
nft-assets/
├── images/          # 5 imágenes PNG de los rewards
│   ├── cafe.png
│   ├── medialuna.png
│   ├── refresco.png
│   ├── magdalena.png
│   └── tostado.png
└── metadata/        # 5 archivos JSON de metadata
    ├── 1.json       # Café
    ├── 2.json       # Medialuna
    ├── 3.json       # Refresco
    ├── 4.json       # Magdalena
    └── 5.json       # Tostado
```

## Proceso de Upload a Pinata (IPFS)

### Paso 1: Subir Imágenes como DAG

1. Ve a [Pinata](https://app.pinata.cloud/)
2. Sube la carpeta `images/` completa como un DAG
3. Esto te dará un CID para las imágenes (ej: `QmXxx...`)
4. Las imágenes estarán disponibles como:
   - `ipfs://QmXxx.../cafe.png`
   - `ipfs://QmXxx.../medialuna.png`
   - etc.

### Paso 2: Actualizar Metadata con CID de Imágenes

Una vez tengas el CID de las imágenes, actualiza los archivos JSON en `metadata/`:

**Buscar y reemplazar en todos los archivos:**
- `IMAGES_CID` → Tu CID real (ej: `QmXxx...`)

Ejemplo:
```json
{
  "image": "ipfs://QmXxx.../cafe.png"
}
```

### Paso 3: Subir Metadata como DAG

1. Después de actualizar los JSON con el CID correcto
2. Sube la carpeta `metadata/` completa como un DAG
3. Esto te dará un CID para la metadata (ej: `QmYyy...`)
4. Los metadata estarán disponibles como:
   - `ipfs://QmYyy.../1.json`
   - `ipfs://QmYyy.../2.json`
   - etc.

### Paso 4: Configurar Smart Contract

Actualiza el script de deployment con el CID de metadata:

**En `contracts/scripts/deploy-enhanced.ts`:**
```typescript
const baseURI = "ipfs://QmYyy.../";  // Tu CID de metadata + /
```

Esto hará que:
- Token ID 1 → `ipfs://QmYyy.../1.json`
- Token ID 2 → `ipfs://QmYyy.../2.json`
- etc.

## Comandos de Deployment

Una vez configurado todo:

```bash
cd contracts

# 1. Redesplegar contrato con base URI de IPFS
npx hardhat run scripts/deploy-enhanced.ts --network rootstockTestnet

# 2. Actualizar CONTRACT_ADDRESS en frontend/src/config/contractConfig.ts

# 3. Mintear los 5 NFTs
npx hardhat run scripts/mint-rewards.ts --network rootstockTestnet
```

## Verificación

Para verificar que todo funciona:

1. **Imágenes**: Abre `https://ipfs.io/ipfs/QmXxx.../cafe.png`
2. **Metadata**: Abre `https://ipfs.io/ipfs/QmYyy.../1.json`
3. **Contract**: Llama a `tokenURI(1)` y verifica que retorna el URI correcto

## CIDs a Registrar

Una vez subido, registra aquí los CIDs:

```
IMAGES_CID: ___________________________________
METADATA_CID: _________________________________
CONTRACT_ADDRESS: _____________________________
```

## Notas

- Los archivos en IPFS son inmutables, así que asegúrate de que las imágenes y metadata estén correctos antes de subir
- Pinata permite "pinning" para garantizar que los archivos permanezcan disponibles
- El formato `ipfs://` es el estándar para NFTs y es compatible con la mayoría de wallets y marketplaces
