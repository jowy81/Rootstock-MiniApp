import { ethers } from "hardhat";

// Update this with the deployed contract address
const CONTRACT_ADDRESS = "0x01dB7E6AF3e890572a48423798c88cDe76d542AF";

async function main() {
    console.log("Minting 5 reward NFTs...");

    const CampaignNFT = await ethers.getContractFactory("CampaignNFT");
    const campaignNFT = CampaignNFT.attach(CONTRACT_ADDRESS);

    const [deployer] = await ethers.getSigners();
    console.log(`Minting to merchant address: ${deployer.address}`);

    const rewards = [
        { id: 1, name: "Café" },
        { id: 2, name: "Medialuna" },
        { id: 3, name: "Refresco" },
        { id: 4, name: "Magdalena" },
        { id: 5, name: "Tostado de queso" }
    ];

    for (const reward of rewards) {
        console.log(`\nMinting NFT #${reward.id}: ${reward.name}`);
        const tx = await campaignNFT.mint(deployer.address, reward.id);
        await tx.wait();
        console.log(`✓ NFT #${reward.id} minted successfully`);
    }

    console.log("\n✓ All 5 NFTs minted successfully!");
    console.log("\nMinted NFTs:");
    rewards.forEach(r => console.log(`  - Token ID ${r.id}: ${r.name}`));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
