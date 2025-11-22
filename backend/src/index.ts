import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initDB } from './db';
import { WalletService } from './services/wallet';
import { claimRouter } from './controllers/claimController';
import { rifRouter } from './controllers/rifController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('RTMCRP Backend is running');
});

// Wallet routes
app.post('/wallet/create', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const address = await WalletService.getOrCreateWallet(userId);
        res.json({ address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Claim routes
app.use('/api/claim', claimRouter);
app.use('/api/merchant', claimRouter);

// RIF routes
app.use('/api/rif', rifRouter);

app.listen(port, async () => {
    await initDB();
    console.log(`Server is running on port ${port}`);
    console.log(`Claim API available at http://localhost:${port}/api/claim`);
    console.log(`Merchant API available at http://localhost:${port}/api/merchant`);
    console.log(`RIF API available at http://localhost:${port}/api/rif`);
});
