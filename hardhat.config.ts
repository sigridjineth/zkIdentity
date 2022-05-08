import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan";
// import * as dotenv from "dotenv"
import "hardhat-gas-reporter"
import "hardhat-dependency-compiler"
import { HardhatUserConfig } from "hardhat/config"
import "./tasks/deploy"

// dotenv.config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: "0.8.4",
    dependencyCompiler: {
        paths: ["@appliedzkp/semaphore-contracts/base/Verifier.sol"]
    },
    networks: {
        mumbai: {
            url: process.env.MUMBAI_URL,
            accounts: [process.env.PRIVATE_KEY_HASHCREATOR!, process.env.PRIVATE_KEY_MINTER!],
            gas: 5000000,
            gasPrice: 8000000000
        }
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD"
    },
    etherscan: {
        apiKey: {
            polygonMumbai: process.env.polygonMumbai
        }
    }
}

export default config
