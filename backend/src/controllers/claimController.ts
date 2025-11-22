import express from 'express';
import { validateClaimCode, executeClaim, burnNFT } from '../services/claimService';
import { claimCodes } from '../data/claimCodes';

export const claimRouter = express.Router();

// POST /api/claim/validate
claimRouter.post('/validate', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ valid: false, message: 'Código requerido' });
        }

        const result = await validateClaimCode(code);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ valid: false, message: error.message });
    }
});

// POST /api/claim/execute
claimRouter.post('/execute', async (req, res) => {
    try {
        const { code, userAddress } = req.body;

        if (!code || !userAddress) {
            return res.status(400).json({
                success: false,
                error: 'Código y dirección requeridos'
            });
        }

        const result = await executeClaim(code, userAddress);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// GET /api/claim/status
claimRouter.get('/status', (req, res) => {
    res.json(claimCodes.map(c => ({
        code: c.code,
        nftId: c.nftTokenId,
        claimed: c.claimed,
        claimedBy: c.claimedBy
    })));
});

// POST /api/merchant/burn
claimRouter.post('/burn', async (req, res) => {
    try {
        const { userAddress, nftId } = req.body;

        if (!userAddress || !nftId) {
            return res.status(400).json({
                success: false,
                error: 'Dirección de usuario y NFT ID requeridos'
            });
        }

        const result = await burnNFT(userAddress, parseInt(nftId));
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});
