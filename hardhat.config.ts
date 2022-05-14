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
            url: process.env.MUMBAI_URI,
            accounts: [process.env.PRIVATE_KEY_HASHCREATOR!, process.env.PRIVATE_KEY_MINTER!],
            gasPrice: 20000000000,
            gas: 6000000,
        },
        kovan: {
            url: "https://ethereum-kovan-rpc.allthatnode.com/fV1yQSJuIz74RU8lfhew7xJKndczum36",
            accounts: [process.env.PRIVATE_KEY_HASHCREATOR!, process.env.PRIVATE_KEY_MINTER!]
        }
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD"
    },
    etherscan: {
        apiKey: {
            polygonMumbai: process.env.polygonMumbai,
            kovan: "PJK14BKYG3HJ4VQXMNS4J6GSU361V58VNI"
        }
    }
}

export default config
