import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../config/contractConfig';
import type { NFT, NFTMetadata } from '../types/nft.types';
import './MyRewards.css';

interface MyRewardsProps {
    onClose: () => void;
    userAddress: string;
}

const MyRewards = ({ onClose, userAddress }: MyRewardsProps) => {
    const [claimCode, setClaimCode] = useState('');
    const [userNFTs, setUserNFTs] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        loadUserNFTs();
    }, [userAddress]);

    const loadUserNFTs = async () => {
        setLoading(true);
        try {
            const provider = new ethers.JsonRpcProvider(CONTRACT_CONFIG.NETWORK.rpcUrl);
            const contract = new ethers.Contract(
                CONTRACT_CONFIG.CAMPAIGN_NFT.address,
                CONTRACT_CONFIG.CAMPAIGN_NFT.abi,
                provider
            );

            const nfts: NFT[] = [];

            // Check each of the 5 NFTs
            for (let tokenId = 1; tokenId <= CONTRACT_CONFIG.REWARDS.TOTAL_NFTS; tokenId++) {
                try {
                    const owner = await contract.ownerOf(tokenId);
                    if (owner.toLowerCase() === userAddress.toLowerCase()) {
                        // Fetch metadata
                        const metadataUrl = `/rewards/${tokenId}.json`;
                        const response = await fetch(metadataUrl);
                        const metadata: NFTMetadata = await response.json();

                        nfts.push({
                            tokenId,
                            owner,
                            tokenURI: metadataUrl,
                            metadata
                        });
                    }
                } catch (error) {
                    // NFT doesn't exist or not owned by user
                    console.log(`NFT ${tokenId} not owned by user`);
                }
            }

            setUserNFTs(nfts);
        } catch (error) {
            console.error('Error loading NFTs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async () => {
        if (!claimCode.trim()) {
            setMessage({ type: 'error', text: 'Por favor ingresa un código' });
            return;
        }

        setClaiming(true);
        setMessage(null);

        try {
            // 1. Validate code
            const validateRes = await fetch('http://localhost:3000/api/claim/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: claimCode })
            });
            const validation = await validateRes.json();

            if (!validation.valid) {
                setMessage({ type: 'error', text: validation.message || 'Código inválido' });
                setClaiming(false);
                return;
            }

            // 2. Execute claim
            const executeRes = await fetch('http://localhost:3000/api/claim/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: claimCode, userAddress })
            });
            const result = await executeRes.json();

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `¡NFT #${result.nftId} reclamado! Recibiste: NFT, 0.001 tRBTC y 2.5 RIF`
                });
                setClaimCode('');
                // Reload NFTs and balances
                setTimeout(() => {
                    loadUserNFTs();
                    window.location.reload(); // Reload to update balances
                }, 2000);
            } else {
                setMessage({ type: 'error', text: result.error || 'Error al reclamar' });
            }
        } catch (error) {
            console.error('Claim error:', error);
            setMessage({ type: 'error', text: 'Error al conectar con el servidor' });
        } finally {
            setClaiming(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Mis Recompensas</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    {/* Claim Section */}
                    <div className="claim-section">
                        <h3>Reclamar Recompensa</h3>
                        <p className="claim-hint">Ingresa el código de tu recompensa</p>
                        <div className="claim-input-group">
                            <input
                                type="text"
                                placeholder="Ej: GIFT01"
                                value={claimCode}
                                onChange={(e) => setClaimCode(e.target.value.toUpperCase())}
                                className="claim-input"
                            />
                            <button
                                className="claim-btn"
                                onClick={handleClaim}
                                disabled={claiming || !claimCode.trim()}
                            >
                                {claiming ? 'Reclamando...' : 'Reclamar'}
                            </button>
                        </div>
                        {message && (
                            <div className={`message ${message.type}`}>
                                {message.text}
                            </div>
                        )}
                    </div>

                    {/* User NFTs Section */}
                    <div className="nfts-section">
                        <h3>Mis NFTs ({userNFTs.length})</h3>
                        {loading ? (
                            <p className="loading-text">Cargando NFTs...</p>
                        ) : userNFTs.length === 0 ? (
                            <p className="empty-text">No tienes NFTs aún. ¡Reclama tu primera recompensa!</p>
                        ) : (
                            <div className="nfts-grid">
                                {userNFTs.map((nft) => (
                                    <div key={nft.tokenId} className="nft-card">
                                        <img
                                            src={nft.metadata?.image}
                                            alt={nft.metadata?.name}
                                            className="nft-image"
                                        />
                                        <div className="nft-info">
                                            <h4>{nft.metadata?.name}</h4>
                                            <p className="nft-description">{nft.metadata?.description}</p>
                                            <span className="nft-id">Token ID: {nft.tokenId}</span>
                                        </div>
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
