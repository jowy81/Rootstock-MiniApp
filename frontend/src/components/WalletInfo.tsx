import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../config/contractConfig';

interface WalletInfoProps {
    onAddressLoaded?: (address: string) => void;
}

const WalletInfo = ({ onAddressLoaded }: WalletInfoProps) => {
    const [address, setAddress] = useState<string>('');
    <span className="wallet-address">
        {loading ? 'Loading...' : `${address.slice(0, 6)}...${address.slice(-4)}`}
    </span>
    {
        !loading && (
            <>
                <button className="copy-btn" onClick={copyToClipboard} title="Copy Address">
                    {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 0 0 1-2-2V4a2 0 0 1 2-2h9a2 0 0 1 2 2v1"></path></svg>
                    )}
                </button>
                <button className="copy-btn" onClick={showQRCode} title="Show QR Code">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </button>
                import {useState, useEffect} from 'react';
                import {ethers} from 'ethers';
                import {CONTRACT_CONFIG} from '../config/contractConfig';

                interface WalletInfoProps {
                    onAddressLoaded ?: (address: string) => void;
}

                const WalletInfo = ({onAddressLoaded}: WalletInfoProps) => {
    const [address, setAddress] = useState<string>('');
                    <span className="wallet-address">
                        {loading ? 'Loading...' : `${address.slice(0, 6)}...${address.slice(-4)}`}
                    </span>
                    {
                        !loading && (
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
                        )
                    }
                </div >
            </div >

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

        {
            showQR && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }} onClick={() => setShowQR(false)}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '16px',
                        textAlign: 'center',
                        maxWidth: '400px'
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ color: '#333', marginBottom: '20px' }}>Wallet Address</h3>
                        <div style={{
                            background: '#f5f5f5',
                            padding: '20px',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                fontSize: '48px',
                                lineHeight: '1.2',
                                fontFamily: 'monospace',
                                color: '#333',
                                wordBreak: 'break-all'
                            }}>
                                {address.split('').map((char, i) => (
                                    <span key={i} style={{ display: 'inline-block', width: '0.6em', textAlign: 'center' }}>
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p style={{
                            color: '#666',
                            fontSize: '12px',
                            fontFamily: 'monospace',
                            wordBreak: 'break-all',
                            marginBottom: '20px'
                        }}>{address}</p>
                        <button
                            onClick={() => setShowQR(false)}
                            style={{
                                background: '#646cff',
                                color: 'white',
                                border: 'none',
                                padding: '10px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )
        }
        </div >
    );
};

export default WalletInfo;
