import { ethers } from 'ethers';
import { getDB } from '../db';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

// Helper to encrypt private key
function encrypt(text: string): string {
    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) throw new Error('ENCRYPTION_SECRET not set');

    // Key must be 32 bytes. If secret is string, hash it to get 32 bytes.
    const key = crypto.createHash('sha256').update(secret).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Helper to decrypt private key
function decrypt(text: string): string {
    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) throw new Error('ENCRYPTION_SECRET not set');

    const key = crypto.createHash('sha256').update(secret).digest();
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export class WalletService {
    static async getOrCreateWallet(userId: number): Promise<string> {
        const db = await getDB();
        const existing = await db.get('SELECT address FROM wallets WHERE user_id = ?', userId);

        if (existing) {
            return existing.address;
        }

        const wallet = ethers.Wallet.createRandom();
        const encryptedPk = encrypt(wallet.privateKey);

        await db.run(
            'INSERT INTO wallets (user_id, address, encrypted_pk) VALUES (?, ?, ?)',
            userId, wallet.address, encryptedPk
        );

        // TODO: Trigger Gas Sponsor to send RBTC

        return wallet.address;
    }

    static async getSigner(address: string): Promise<ethers.Wallet> {
        const db = await getDB();
        const record = await db.get('SELECT encrypted_pk FROM wallets WHERE address = ?', address);

        if (!record) throw new Error('Wallet not found');

        const privateKey = decrypt(record.encrypted_pk);
        const provider = new ethers.JsonRpcProvider(process.env.ROOTSTOCK_RPC_URL);
        return new ethers.Wallet(privateKey, provider);
    }
}
