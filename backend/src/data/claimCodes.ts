export interface ClaimCode {
    code: string;
    nftTokenId: number;
    claimed: boolean;
    claimedBy?: string;
    claimedAt?: Date;
}

export const claimCodes: ClaimCode[] = [
    { code: 'GIFT01', nftTokenId: 1, claimed: false },
    { code: 'GIFT02', nftTokenId: 2, claimed: false },
    { code: 'GIFT03', nftTokenId: 3, claimed: false },
    { code: 'GIFT04', nftTokenId: 4, claimed: false },
    { code: 'GIFT05', nftTokenId: 5, claimed: false }
];

export function getClaimCode(code: string): ClaimCode | undefined {
    return claimCodes.find(c => c.code === code);
}

export function markAsClaimed(code: string, userAddress: string): void {
    const claim = getClaimCode(code);
    if (claim) {
        claim.claimed = true;
        claim.claimedBy = userAddress;
        claim.claimedAt = new Date();
    }
}
