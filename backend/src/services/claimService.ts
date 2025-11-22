import { ethers } from 'ethers';
import { getClaimCode, markAsClaimed } from '../data/claimCodes';

const RPC_URL = process.env.ROOTSTOCK_RPC_URL || 'https://public-node.testnet.rsk.co';

// Contract addresses
const NFT_CONTRACT = '0x01dB7E6AF3e890572a48423798c88cDe76d542AF';
const RIF_TOKEN = '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe';

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
        return { valid: false, message: 'Código inválido' };
    }

    if (claim.claimed) {
        return { valid: false, message: 'Código ya reclamado' };
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

        // 3. Transfer tRBTC (0.001)
        const rbtcTx = await merchantWallet.sendTransaction({
            to: userAddress,
            value: ethers.parseEther('0.001')
        });
        await rbtcTx.wait();
        txHashes.rbtc = rbtcTx.hash;

        // 4. Transfer RIF (2.5)
        const rifContract = new ethers.Contract(RIF_TOKEN, ERC20_ABI, merchantWallet);
        const rifTx = await rifContract.transfer(
            userAddress,
            ethers.parseEther('2.5')
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
        throw new Error('Usuario no es dueño del NFT');
    }

    // Burn NFT (only merchant can burn)
    const nftWithSigner = new ethers.Contract(NFT_CONTRACT, NFT_ABI, merchantWallet);
    const tx = await nftWithSigner.burn(nftId);
    await tx.wait();

    return {
        success: true,
        txHash: tx.hash,
        message: 'NFT quemado exitosamente'
    };
}
