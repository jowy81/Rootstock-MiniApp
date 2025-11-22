import { ethers } from "hardhat";

async function main() {
    const CampaignNFT = await ethers.getContractFactory("CampaignNFT");
    const campaignNFT = await CampaignNFT.deploy();

    await campaignNFT.waitForDeployment();

    console.log("CampaignNFT deployed to:", await campaignNFT.getAddress());
    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
