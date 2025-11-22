import { ethers } from 'ethers';
import { getClaimCode, markAsClaimed } from '../data/claimCodes';

const RPC_URL = process.env.ROOTSTOCK_RPC_URL || 'https://public-node.rsk.co';

// Mainnet Contract addresses - using lowercase to avoid checksum validation errors
const NFT_CONTRACT = '0x74d5d5e304ac227cfeaec50b4b2959a5be37767d';
const RIF_TOKEN = '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5';

// ABIs
const NFT_ABI = [
    'function transferFrom(address from, address to, uint256 tokenId) public',
    'function ownerOf(uint256 tokenId) public view returns (address)',
    'function burn(uint256 tokenId) public'
];

const ERC20_ABI = [
    'function transfer(address to, uint256 amount) public returns (bool)',
    'function balanceOf(address account) public view returns (uint256)'
];

export async function validateClaimCode(code: string) {
    const claim = getClaimCode(code);

    if (!claim) {
        return { valid: false, message: 'Invalid code' };
    }

    if (claim.claimed) {
        return { valid: false, message: 'Code already claimed' };
    }

    return { valid: true, nftId: claim.nftTokenId };
}

export async function executeClaim(code: string, userAddress: string) {
    // 1. Validate code
    const validation = await validateClaimCode(code);
    if (!validation.valid) {
        throw new Error(validation.message);
    }

    // Read key directly from env
    const merchantKey = process.env.PRIVATE_KEY_GAS_SPONSOR;
    if (!merchantKey) {
        throw new Error('Merchant private key not configured');
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const merchantWallet = new ethers.Wallet(merchantKey, provider);

    const txHashes: { nft?: string; rbtc?: string; rif?: string } = {};

    try {
        // 2. Transfer NFT
        const nftContract = new ethers.Contract(NFT_CONTRACT, NFT_ABI, merchantWallet);
        const nftTx = await nftContract.transferFrom(
            merchantWallet.address,
            userAddress,
            validation.nftId
        );
        await nftTx.wait();
        txHashes.nft = nftTx.hash;

        // 3. Transfer rBTC ($3 USD at BTC=$84,000 = 0.0000357 BTC)
        const rbtcTx = await merchantWallet.sendTransaction({
            to: userAddress,
            value: ethers.parseEther('0.000036') // ~$3 USD
        });
        await rbtcTx.wait();
        txHashes.rbtc = rbtcTx.hash;

        // 4. Transfer RIF (100 tokens)
        const rifContract = new ethers.Contract(RIF_TOKEN, ERC20_ABI, merchantWallet);
        const rifTx = await rifContract.transfer(
            userAddress,
            ethers.parseEther('100')
        );
        await rifTx.wait();
        txHashes.rif = rifTx.hash;

        // 5. Mark as claimed
        markAsClaimed(code, userAddress);

        return {
            success: true,
            nftId: validation.nftId,
            txHashes
        };
    } catch (error: any) {
        console.error('Error executing claim:', error);
        throw new Error(`Failed to execute claim: ${error.message}`);
    }
}

export async function burnNFT(userAddress: string, nftId: number) {
    // Read key directly from env
    const merchantKey = process.env.PRIVATE_KEY_GAS_SPONSOR;
    if (!merchantKey) {
        throw new Error('Merchant private key not configured');
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const merchantWallet = new ethers.Wallet(merchantKey, provider);
    const nftContract = new ethers.Contract(NFT_CONTRACT, NFT_ABI, provider);

    // Verify user owns the NFT
    const owner = await nftContract.ownerOf(nftId);
    if (owner.toLowerCase() !== userAddress.toLowerCase()) {
        throw new Error('User does not own this NFT');
    }

    // Burn NFT (only merchant can burn)
    const nftWithSigner = new ethers.Contract(NFT_CONTRACT, NFT_ABI, merchantWallet);
    const tx = await nftWithSigner.burn(nftId);
    await tx.wait();

    return {
        success: true,
        txHash: tx.hash,
        message: 'NFT burned successfully'
    };
}
