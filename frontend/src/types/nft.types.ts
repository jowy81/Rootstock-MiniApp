export interface NFT {
    tokenId: number;
    owner: string;
    tokenURI?: string;
    metadata?: NFTMetadata;
}

export interface NFTMetadata {
    name: string;
    description: string;
    image: string;
    attributes?: Array<{ trait_type: string; value: string }>;
}

export interface ClaimCode {
    code: string;
    nftId: number;
    claimed: boolean;
    claimedBy?: string;
    claimedAt?: Date;
}
