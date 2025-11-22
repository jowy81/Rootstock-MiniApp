import { ethers } from "hardhat";

async function main() {
    console.log("Deploying enhanced CampaignNFT contract...");

    const CampaignNFT = await ethers.getContractFactory("CampaignNFT");
    const campaignNFT = await CampaignNFT.deploy();

    // Don't wait for deployment confirmation, just get the address
    const address = await campaignNFT.getAddress();
    console.log(`CampaignNFT deployment initiated at: ${address}`);
    console.log(`Waiting for deployment confirmation...`);

    try {
        // Wait with timeout
        await Promise.race([
            campaignNFT.waitForDeployment(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Deployment timeout')), 30000)
            )
        ]);
        console.log(`✓ Contract deployed successfully!`);
    } catch (error) {
        console.log(`Note: Deployment may still be processing. Check explorer.`);
    }

    // Set base token URI (pointing to IPFS metadata)
    const baseURI = "ipfs://QmXKkMpzckyFbB7e6gTX3kawCX9FnMRPhp6eG3Vsgnfa5k/";
    console.log(`\nSetting base token URI to: ${baseURI}`);

    try {
        const tx = await campaignNFT.setBaseTokenURI(baseURI);
        console.log(`Transaction sent: ${tx.hash}`);
        console.log(`Waiting for confirmation...`);

        await Promise.race([
            tx.wait(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Transaction timeout')), 30000)
            )
        ]);
        console.log("✓ Base token URI set successfully!");
    } catch (error) {
        console.log(`Note: Transaction may still be processing.`);
        console.log(`You can set the base URI manually later if needed.`);
    }

    console.log("\n=== DEPLOYMENT SUMMARY ===");
    console.log(`Contract Address: ${address}`);
    console.log(`Base URI: ${baseURI}`);
    console.log(`\nNext steps:`);
    console.log(`1. Verify deployment: https://explorer.testnet.rootstock.io/address/${address}`);
    console.log(`2. Update CONTRACT_ADDRESS in mint-rewards.ts to: ${address}`);
    console.log(`3. Update CONTRACT_ADDRESS in frontend/src/config/contractConfig.ts to: ${address}`);
    console.log(`4. Run: npx hardhat run scripts/mint-rewards.ts --network rootstockTestnet`);

    // Force exit to prevent hanging
    setTimeout(() => process.exit(0), 1000);
}

main()
    .then(() => {
        // Already handled in main
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
