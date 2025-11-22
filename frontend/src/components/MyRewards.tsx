import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './MyRewards.css';
import { CONTRACT_CONFIG, REWARD_NAMES } from '../config/contractConfig';

interface MyRewardsProps {
    onClose: () => void;
    userAddress: string;
}

const MyRewards = ({ onClose, userAddress }: MyRewardsProps) => {
    const [claimCode, setClaimCode] = useState('');
    const [claiming, setClaiming] = useState(false);
    const [message, setMessage] = useState<{ type: string, text: string } | null>(null);
    const [ownedNFTs, setOwnedNFTs] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNFTs();
    }, [userAddress]);

    const loadNFTs = async () => {
        try {
            const provider = new ethers.JsonRpcProvider(CONTRACT_CONFIG.NETWORK.rpcUrl);
            const nftContract = new ethers.Contract(
                CONTRACT_CONFIG.CAMPAIGN_NFT.address,
                CONTRACT_CONFIG.CAMPAIGN_NFT.abi,
                provider
            );

            const balance = await nftContract.balanceOf(userAddress);
            const owned: number[] = [];

            for (let i = 1; i <= CONTRACT_CONFIG.REWARDS.TOTAL_NFTS; i++) {
                try {
                    const owner = await nftContract.ownerOf(i);
                    if (owner.toLowerCase() === userAddress.toLowerCase()) {
                        owned.push(i);
                    }
                } catch (e) {
                    // NFT doesn't exist or is burned
                }
            }

            setOwnedNFTs(owned);
        } catch (error) {
            console.error('Error loading NFTs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async () => {
        if (!claimCode.trim()) {
            setMessage({ type: 'error', text: 'Please enter a claim code' });
            return;
        }

        setClaiming(true);
        setMessage(null);

        try {
            // 1. Validate code
            const validateRes = await fetch('http://localhost:3000/api/claim/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: claimCode.trim(), userAddress })
            });
            const validation = await validateRes.json();

            if (!validation.valid) {
                setMessage({ type: 'error', text: validation.error || 'Invalid claim code' });
                setClaiming(false);
                return;
            }

            // 2. Execute claim
            const executeRes = await fetch('http://localhost:3000/api/claim/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: claimCode.trim(), userAddress })
            });
            const result = await executeRes.json();

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `✓ Reward claimed! You received NFT #${result.nftId}, 100 RIF, and rBTC for gas fees`
                });
                setClaimCode('');
                setTimeout(() => {
                    loadNFTs();
                    window.location.reload();
                }, 2000);
            } else {
                setMessage({ type: 'error', text: result.error || 'Failed to claim reward' });
            }
        } catch (error: any) {
            console.error('Claim error:', error);
            setMessage({ type: 'error', text: `Failed to execute claim: ${error.message}` });
        } finally {
            setClaiming(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>My Rewards</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="claim-section">
                        <h3>Claim Reward</h3>
                        <p className="claim-hint">Enter your reward code</p>
                        <input
                            type="text"
                            placeholder="e.g., GIFT01"
                            value={claimCode}
                            onChange={(e) => setClaimCode(e.target.value.toUpperCase())}
                            className="claim-input"
                            disabled={claiming}
                        />
                        <button
                            className="claim-btn"
                            onClick={handleClaim}
                            disabled={claiming || !claimCode.trim()}
                        >
                            {claiming ? 'Claiming...' : 'Claim'}
                        </button>

                        {message && (
                            <div className={`message ${message.type}`} style={{
                                padding: '12px',
                                marginTop: '16px',
                                borderRadius: '8px',
                                backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                                color: message.type === 'success' ? '#155724' : '#721c24',
                                textAlign: 'center'
                            }}>
                                {message.text}
                            </div>
                        )}
                    </div>

                    <div className="nfts-section">
                        <h3>My NFTs ({ownedNFTs.length})</h3>
                        {loading ? (
                            <p className="loading-text">Loading...</p>
                        ) : ownedNFTs.length === 0 ? (
                            <p className="empty-text">You don't have any NFTs yet. Claim your first reward!</p>
                        ) : (
                            <div className="nfts-grid">
                                {ownedNFTs.map((nftId) => (
                                    <div key={nftId} className="nft-card">
                                        <div className="nft-id">#{nftId}</div>
                                        <div className="nft-name">{REWARD_NAMES[nftId as keyof typeof REWARD_NAMES]}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRewards;
