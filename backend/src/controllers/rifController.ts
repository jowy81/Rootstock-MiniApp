import express from 'express';
import { ethers } from 'ethers';

export const rifRouter = express.Router();

const RPC_URL = process.env.ROOTSTOCK_RPC_URL || 'https://public-node.rsk.co';

// Mainnet RIF Token address - using lowercase to avoid checksum validation errors
const RIF_TOKEN = '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5';

const ERC20_ABI = [
    'function transfer(address to, uint256 amount) public returns (bool)',
    'function balanceOf(address account) public view returns (uint256)'
];

// POST /api/rif/get - Send 0.75 RIF
rifRouter.post('/get', async (req, res) => {
    try {
        const { userAddress } = req.body;
        const merchantKey = process.env.PRIVATE_KEY_GAS_SPONSOR;

        if (!userAddress) {
            return res.status(400).json({
                success: false,
                error: 'User address required'
            });
        }

        if (!merchantKey) {
            return res.status(500).json({
                success: false,
                error: 'Merchant wallet not configured'
            });
        }

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const merchantWallet = new ethers.Wallet(merchantKey, provider);
        const rifContract = new ethers.Contract(RIF_TOKEN, ERC20_ABI, merchantWallet);

        const tx = await rifContract.transfer(userAddress, ethers.parseEther('0.75'));
        await tx.wait();

        res.json({
            success: true,
            amount: '0.75',
            txHash: tx.hash,
            message: '0.75 RIF sent successfully'
        });
    } catch (error: any) {
        console.error('Error sending RIF:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /api/rif/claim - Send 2.5 RIF
rifRouter.post('/claim', async (req, res) => {
    try {
        const { userAddress } = req.body;
        const merchantKey = process.env.PRIVATE_KEY_GAS_SPONSOR;

        if (!userAddress) {
            return res.status(400).json({
                success: false,
                error: 'User address required'
            });
        }

        if (!merchantKey) {
            return res.status(500).json({
                success: false,
                error: 'Merchant wallet not configured'
            });
        }

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const merchantWallet = new ethers.Wallet(merchantKey, provider);
        const rifContract = new ethers.Contract(RIF_TOKEN, ERC20_ABI, merchantWallet);

        const tx = await rifContract.transfer(userAddress, ethers.parseEther('2.5'));
        await tx.wait();

        res.json({
            success: true,
            amount: '2.5',
            txHash: tx.hash,
            message: '2.5 RIF sent successfully'
        });
    } catch (error: any) {
        console.error('Error claiming RIF:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET /api/rif/balance/:address - Check RIF balance
rifRouter.get('/balance/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const rifContract = new ethers.Contract(RIF_TOKEN, ERC20_ABI, provider);

        const balance = await rifContract.balanceOf(address);
        const balanceFormatted = ethers.formatEther(balance);

        res.json({
            success: true,
            address,
            balance: balanceFormatted
        });
    } catch (error: any) {
        console.error('Error getting RIF balance:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
