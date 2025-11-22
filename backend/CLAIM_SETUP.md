# Backend Claim System - Setup Guide

## 1. Configure Merchant Wallet

Necesitas configurar la private key del merchant wallet que posee los NFTs.

### Opción A: Usar el wallet que minteó los NFTs

Si ya tienes el wallet que minteó los NFTs, usa su private key:

```bash
cd backend
# Edita .env y agrega:
MERCHANT_PRIVATE_KEY=tu_private_key_aqui
```

### Opción B: Crear nuevo wallet y transferir NFTs

Si necesitas un nuevo wallet:

1. Crear wallet:
```bash
npx hardhat run scripts/create-merchant-wallet.ts
```

2. Transferir los 5 NFTs al nuevo wallet
3. Agregar private key al `.env`

## 2. Fondear Merchant Wallet

El merchant wallet necesita fondos para ejecutar los claims:

### tRBTC (para gas)
- Necesario para: transferir NFTs, transferir RIF, quemar NFTs
- Estimado: ~0.01 tRBTC para 5 claims + burns

### RIF Tokens
- Necesario para: enviar 2.5 RIF por claim
- Total para 5 claims: 12.5 RIF

### Obtener fondos:

**tRBTC**:
- Faucet: https://faucet.rootstock.io/

**RIF**:
- Faucet RIF: https://faucet.rifos.org/
- O swap en DEX de Rootstock Testnet

## 3. Verificar Configuración

```bash
cd backend

# Verificar que tienes las dependencias
npm install

# Compilar TypeScript
npm run build

# Iniciar servidor
npm run dev
```

Deberías ver:
```
Server is running on port 3000
Claim API available at http://localhost:3000/api/claim
Merchant API available at http://localhost:3000/api/merchant
```

## 4. Probar Endpoints

### Test 1: Validar código
```bash
curl -X POST http://localhost:3000/api/claim/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"GIFT01"}'
```

Respuesta esperada:
```json
{"valid":true,"nftId":1}
```

### Test 2: Ver status de códigos
```bash
curl http://localhost:3000/api/claim/status
```

### Test 3: Ejecutar claim (requiere merchant wallet fondeado)
```bash
curl -X POST http://localhost:3000/api/claim/execute \
  -H "Content-Type: application/json" \
  -d '{"code":"GIFT01","userAddress":"0x..."}'
```

## 5. Troubleshooting

**Error: "Merchant private key not configured"**
- Verifica que `MERCHANT_PRIVATE_KEY` esté en `.env`

**Error: "insufficient funds"**
- Fondea el merchant wallet con tRBTC y RIF

**Error: "ERC721: transfer from incorrect owner"**
- Verifica que el merchant wallet sea dueño de los NFTs
- Usa `npx hardhat run scripts/check-nft-ownership.ts`

## 6. Próximos Pasos

Una vez el backend funcione:
1. Integrar frontend con los endpoints
2. Probar claim completo desde UI
3. Implementar merchant burn interface
4. Activar toggle MERCH en frontend
