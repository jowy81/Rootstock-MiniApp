import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../config/contractConfig';

interface WalletInfoProps {
    onAddressLoaded?: (address: string) => void;
}

const WalletInfo = ({ onAddressLoaded }: WalletInfoProps) => {
    const [address, setAddress] = useState<string>('');
    const [rbtcBalance, setRbtcBalance] = useState<string>('0.000000');
    const [rifBalance, setRifBalance] = useState<string>('0.000000');
    const [stRifBalance, setStRifBalance] = useState<string>('0.000000');
    const [loading, setLoading] = useState<boolean>(true);
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        const loadWallet = async () => {
            try {
                const provider = new ethers.JsonRpcProvider(CONTRACT_CONFIG.NETWORK.rpcUrl);

                let wallet;
                const storedPrivateKey = localStorage.getItem('demo_wallet_pk');

                if (storedPrivateKey) {
                    wallet = new ethers.Wallet(storedPrivateKey, provider);
                } else {
                    wallet = ethers.Wallet.createRandom().connect(provider);
                    localStorage.setItem('demo_wallet_pk', wallet.privateKey);
                }

                setAddress(wallet.address);
                onAddressLoaded?.(wallet.address);

                const balance = await provider.getBalance(wallet.address);
                const rbtcFormatted = parseFloat(ethers.formatEther(balance)).toFixed(6);
                setRbtcBalance(rbtcFormatted);

                const rifAbi = ['function balanceOf(address owner) view returns (uint256)'];
                const rifContract = new ethers.Contract(CONTRACT_CONFIG.RIF_TOKEN.address, rifAbi, provider);
                const rifBal = await rifContract.balanceOf(wallet.address);
                const rifFormatted = parseFloat(ethers.formatEther(rifBal)).toFixed(6);
                setRifBalance(rifFormatted);

                const stRifContract = new ethers.Contract(
                    CONTRACT_CONFIG.STRIF_STAKING.address,
                    CONTRACT_CONFIG.STRIF_STAKING.abi,
                    provider
                );
                const stRifBal = await stRifContract.balanceOf(wallet.address);
                const stRifFormatted = parseFloat(ethers.formatEther(stRifBal)).toFixed(6);
                setStRifBalance(stRifFormatted);

            } catch (error) {
                console.error('Error loading wallet info:', error);
            } finally {
                setLoading(false);
            }
        };

        loadWallet();
    }, [onAddressLoaded]);

    const copyToClipboard = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const showQRCode = () => {
        alert(`Your wallet address:\n\n${address}\n\nCopy this address to receive funds.`);
    };

    return (
        <div className="wallet-card">
            <div className="wallet-header">
                <span className="wallet-label">My Wallet</span>
                <div className="address-container">
                    <span className="wallet-address">
                        {loading ? 'Loading...' : `${address.slice(0, 6)}...${address.slice(-4)}`}
                    </span>
                    {!loading && (
                        <>
                            <button className="copy-btn" onClick={copyToClipboard} title="Copy Address">
                                {copied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                )}
                            </button>
                            <button className="copy-btn" onClick={showQRCode} title="Show QR Code">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="balance-grid">
                <div className="balance-item">
                    <span className="token-amount">{loading ? '-' : rbtcBalance}</span>
                    <span className="token-symbol">rBTC</span>
                </div>
                <div className="balance-item">
                    <span className="token-amount">{loading ? '-' : rifBalance}</span>
                    <span className="token-symbol">RIF</span>
                </div>
                <div className="balance-item">
                    <span className="token-amount">{loading ? '-' : stRifBalance}</span>
                    <span className="token-symbol">stRIF</span>
                </div>
            </div>
        </div>
    );
};

export default WalletInfo;
