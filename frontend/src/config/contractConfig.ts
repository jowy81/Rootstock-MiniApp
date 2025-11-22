export const CONTRACT_CONFIG = {
    CAMPAIGN_NFT: {
        address: '0x74d5d5e304ac227cfeaec50b4b2959a5be37767d',
        abi: [
            'function mint(address to, uint256 tokenId) public',
            'function burn(uint256 tokenId) public',
            'function setBaseTokenURI(string memory baseURI) public',
            'function tokenURI(uint256 tokenId) public view returns (string memory)',
            'function getBaseTokenURI() public view returns (string memory)',
            'function ownerOf(uint256 tokenId) public view returns (address)',
            'function balanceOf(address owner) public view returns (uint256)',
            'event NFTMinted(address indexed to, uint256 indexed tokenId)',
            'event NFTBurned(uint256 indexed tokenId)'
        ],
    },
    NETWORK: {
        name: 'Rootstock Mainnet',
        rpcUrl: 'https://public-node.rsk.co',
        chainId: 30,
        explorer: 'https://explorer.rootstock.io',
    },
    RIF_TOKEN: {
        address: '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5',
        abi: [
            'function balanceOf(address account) view returns (uint256)',
            'function transfer(address to, uint256 amount) returns (bool)',
            'function approve(address spender, uint256 amount) returns (bool)',
        ],
    },
    STRIF_STAKING: {
        address: '0xe7039717c51c44652fb47be1794884a82634f08f',
        abi: [
            'function deposit(uint256 amount) public',
            'function withdraw(uint256 amount) public',
            'function balanceOf(address account) public view returns (uint256)',
        ],
    },
    REWARDS: {
        RBTC_AMOUNT: '0.000036', // ~$3 USD
        RIF_CLAIM_AMOUNT: '100',
        TOTAL_NFTS: 5,
    }
};

export const REWARD_NAMES = {
    1: 'Free Coffee',
    2: 'Free Croissant',
    3: 'Free Soda',
    4: 'Free Muffin',
    5: 'Free Cheese Toast'
};
