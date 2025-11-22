# Configuración Simplificada - MVP

## Resumen

Para el MVP, usamos **una sola private key** (`PRIVATE_KEY_GAS_SPONSOR`) que actúa como:
- Deployer del contrato
- Merchant wallet (mintea, quema, distribuye fondos)
- Sponsor de gas

## Configuración

El archivo `backend/.env` ya debería tener:

```env
PRIVATE_KEY_GAS_SPONSOR=tu_private_key_aqui
```

Esta misma key se usa para:
- ✅ Desplegar contratos
- ✅ Mintear NFTs
- ✅ Transferir NFTs en claims
- ✅ Distribuir RIF (Get RIF, Claim RIF)
- ✅ Distribuir tRBTC
- ✅ Quemar NFTs (merchant)

## Fondeo del Wallet

Este wallet necesita:

### tRBTC (para gas)
- Faucet: https://faucet.rootstock.io/
- Cantidad: ~0.05 tRBTC para pruebas

### RIF Tokens
- Faucet: https://faucet.rifos.org/
- Cantidad necesaria:
  - Get RIF: 0.75 RIF por click
  - Claim RIF: 2.5 RIF por click  
  - NFT Claims: 2.5 RIF por claim
  - **Total recomendado**: 20-30 RIF

## Flujo de Usuario vs Merchant

### Usuario (wallet del frontend)
- Recibe NFTs al reclamar con código
- Recibe 0.001 tRBTC + 2.5 RIF al reclamar NFT
- Puede clickear "Get RIF" para recibir 0.75 RIF
- Puede clickear "Claim RIF" para recibir 2.5 RIF
- Presenta NFT al merchant para canjear

### Merchant (wallet del .env = PRIVATE_KEY_GAS_SPONSOR)
- Posee los NFTs inicialmente
- Transfiere NFTs a usuarios cuando reclaman
- Distribuye fondos (tRBTC + RIF)
- Quema NFTs cuando usuario canjea recompensa

## Toggle MERCH

Cuando el toggle MERCH está activado:
- La interfaz cambia a modo merchant
- Se pueden quemar NFTs de usuarios
- Usa la wallet del backend (PRIVATE_KEY_GAS_SPONSOR)

## Verificar Configuración

```bash
cd backend
npm run dev
```

Si ves esto, está todo OK:
```
Server is running on port 3000
Claim API available at http://localhost:3000/api/claim
Merchant API available at http://localhost:3000/api/merchant
RIF API available at http://localhost:3000/api/rif
```

## Notas para Producción

⚠️ **IMPORTANTE**: En producción real:
- Merchant wallet y deployer deberían ser diferentes
- Usar multi-sig para merchant wallet
- Implementar rate limiting en distribución de RIF
- Validar identidad de usuarios (Telegram ID)

Para el MVP, esta configuración simplificada es suficiente.
