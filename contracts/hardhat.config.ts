import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    networks: {
        rootstockTestnet: {
            url: process.env.ROOTSTOCK_RPC_URL || "https://public-node.testnet.rsk.co/",
            chainId: 31,
            accounts: process.env.PRIVATE_KEY_DEPLOYER ? [process.env.PRIVATE_KEY_DEPLOYER] : [],
        },
        rootstockMainnet: {
            url: "https://public-node.rsk.co",
            chainId: 30,
            accounts: process.env.PRIVATE_KEY_DEPLOYER ? [process.env.PRIVATE_KEY_DEPLOYER] : [],
        },
    },
};

export default config;
