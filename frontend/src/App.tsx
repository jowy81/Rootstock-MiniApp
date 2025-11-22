import { useState } from 'react';
import './App.css';
import WalletInfo from './components/WalletInfo';
import MyRewards from './components/MyRewards';
import MerchantPanel from './components/MerchantPanel';

function App() {
    const [showMyRewards, setShowMyRewards] = useState(false);
    const [showMerchantPanel, setShowMerchantPanel] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: string, text: string } | null>(null);
    const [isMerchantMode, setIsMerchantMode] = useState(false);

    // Get RIF handler - DISABLED
    const handleGetRIF = async () => {
        if (!userAddress) {
            alert('Please wait for your wallet to load');
            return;
        }
    };

    const handleMintRENS = () => {
        alert('rENS minting coming soon!');
    };

    // Claim RIF handler - DISABLED
    const handleClaimRIF = async () => {
        if (!userAddress) {
            alert('Please wait for your wallet to load');
            return;
        }
    };

    const handleRIFStake = () => {
        alert('RIF Staking coming soon!');
    };

    // User buttons
    const buttons = [
        { id: 1, label: 'My Rewards', disabled: false, onClick: () => setShowMyRewards(true) },
        { id: 2, label: 'Scan QR', disabled: true, onClick: undefined },
        { id: 7, label: 'Get RIF', disabled: true, onClick: handleGetRIF },
        { id: 8, label: 'Mint rENS (x402)', disabled: false, onClick: handleMintRENS },
        { id: 3, label: 'Offers', disabled: true, onClick: undefined },
        { id: 4, label: 'Profile', disabled: true, onClick: undefined },
        { id: 9, label: 'Claim RIF', disabled: true, onClick: handleClaimRIF },
        { id: 10, label: 'RIF Stake', disabled: false, onClick: handleRIFStake },
        { id: 5, label: 'History', disabled: true, onClick: undefined },
        { id: 6, label: 'Settings', disabled: true, onClick: undefined },
    ];

    // Merchant buttons
    const merchantButtons = [
        { id: 1, label: '🔥 Burn NFT', disabled: false, onClick: () => setShowMerchantPanel(true) },
        { id: 2, label: 'View Claims', disabled: true, onClick: undefined },
        { id: 3, label: 'Statistics', disabled: true, onClick: undefined },
        { id: 4, label: 'Settings', disabled: true, onClick: undefined },
    ];

    return (
        <div className="app-container">
            <main className="user-section">
                <h1 className="title">{isMerchantMode ? 'Merchant Dashboard' : 'User Dashboard'}</h1>

                <WalletInfo onAddressLoaded={setUserAddress} />

                {message && (
                    <div className={`message ${message.type}`} style={{
                        padding: '12px',
                        margin: '16px 0',
                        borderRadius: '8px',
                        backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: message.type === 'success' ? '#155724' : '#721c24',
                        textAlign: 'center'
                    }}>
                        {message.text}
                    </div>
                )}

                <div className="button-grid">
                    {(isMerchantMode ? merchantButtons : buttons).map((btn) => (
                        <button
                            key={btn.id}
                            className="action-button"
                            disabled={btn.disabled}
                            onClick={btn.onClick}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </main>

            <footer className="app-footer">
                <div className="toggle-container">
                    <span className="toggle-label">Merch</span>
                    <div
                        className={`toggle-switch ${isMerchantMode ? 'on' : 'off'}`}
                        onClick={() => setIsMerchantMode(!isMerchantMode)}
                    >
                        <div className="toggle-knob"></div>
                    </div>
                </div>
            </footer>

            {showMyRewards && userAddress && (
                <MyRewards
                    onClose={() => setShowMyRewards(false)}
                    userAddress={userAddress}
                />
            )}

            {showMerchantPanel && (
                <MerchantPanel
                    onClose={() => setShowMerchantPanel(false)}
                />
            )}
        </div>
    );
}

export default App;
