import { ethers } from "hardhat";

async function main() {
    console.log("Deploying CampaignNFT to Rootstock Mainnet...");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);

    // Deploy contract
    const CampaignNFT = await ethers.getContractFactory("CampaignNFT");
    const campaignNFT = await CampaignNFT.deploy();
    await campaignNFT.waitForDeployment();

    const contractAddress = await campaignNFT.getAddress();
    console.log("✓ CampaignNFT deployed to:", contractAddress);

    // Set base URI for IPFS metadata
    const baseURI = "ipfs://QmXqNLyZdGPMzWQKjGZHELPbNKQcSQfSRcBbCMXqKQjqJL/";
    const tx1 = await campaignNFT.setBaseTokenURI(baseURI);
    await tx1.wait();
    console.log("✓ Base URI set to:", baseURI);

    // Mint 5 NFTs to deployer (merchant wallet)
    console.log("\nMinting 5 NFTs to merchant wallet...");
    for (let i = 1; i <= 5; i++) {
        const tx = await campaignNFT.mint(deployer.address, i);
        await tx.wait();
        console.log(`✓ Minted NFT #${i} to ${deployer.address}`);
    }

    console.log("\n=== Deployment Complete ===");
    console.log("Contract Address:", contractAddress);
    console.log("Merchant Wallet:", deployer.address);
    console.log("NFTs Minted: 1-5");
    console.log("\nUpdate these addresses in:");
    console.log("- backend/.env (NFT_CONTRACT)");
    console.log("- frontend/src/config/contractConfig.ts");

    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
