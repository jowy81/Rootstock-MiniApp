import { useState } from 'react';
import './MerchantPanel.css';

interface MerchantPanelProps {
    onClose: () => void;
}

const MerchantPanel = ({ onClose }: MerchantPanelProps) => {
    const [userAddress, setUserAddress] = useState('');
    const [nftId, setNftId] = useState('');
    const [burning, setBurning] = useState(false);
    const [message, setMessage] = useState<{ type: string, text: string } | null>(null);

    const handleBurn = async () => {
        if (!userAddress.trim() || !nftId.trim()) {
            setMessage({ type: 'error', text: 'Please complete all fields' });
            return;
        }

        setBurning(true);
        setMessage(null);

        try {
            const res = await fetch('http://localhost:3000/api/merchant/burn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userAddress: userAddress.trim(),
                    nftId: parseInt(nftId)
                })
            });
            const result = await res.json();

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `NFT #${nftId} burned successfully. TX: ${result.txHash.substring(0, 10)}...`
                });
                setUserAddress('');
                setNftId('');
            } else {
                setMessage({ type: 'error', text: result.error || 'Error burning NFT' });
            }
        } catch (error) {
            console.error('Burn error:', error);
            setMessage({ type: 'error', text: 'Error connecting to server' });
        } finally {
            setBurning(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content merchant-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>🔥 Merchant Panel</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="merchant-section">
                        <h3>Burn User NFT</h3>
                        <p className="merchant-hint">
                            When the user presents their NFT to redeem the reward,
                            enter their address and the NFT ID to burn it.
                        </p>

                        <div className="form-group">
                            <label>User Address</label>
                            <input
                                type="text"
                                placeholder="0x..."
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                                className="merchant-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>NFT ID</label>
                            <input
                                type="number"
                                placeholder="1-5"
                                min="1"
                                max="5"
                                value={nftId}
                                onChange={(e) => setNftId(e.target.value)}
                                className="merchant-input"
                            />
                        </div>

                        <button
                            className="burn-btn"
                            onClick={handleBurn}
                            disabled={burning || !userAddress.trim() || !nftId.trim()}
                        >
                            {burning ? 'Burning...' : '🔥 Burn NFT'}
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

                        <div className="merchant-info">
                            <h4>ℹ️ Information</h4>
                            <ul>
                                <li>You can only burn NFTs that the user owns</li>
                                <li>The NFT will be permanently destroyed</li>
                                <li>This action cannot be reversed</li>
                                <li>User must show their NFT before burning</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchantPanel;
