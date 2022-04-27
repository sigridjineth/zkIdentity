// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { saveFrontendFiles } = require("./saveFrontendFiles");
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Verifier = await hre.ethers.getContractFactory("Verifier")
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("Verifier (Verify logic for zkp) address:", verifier.address);

  const AttestationMinterFactory = await hre.ethers.getContractFactory("AttestationMinter");
  console.log("ADDR", verifier.address);
  const minter = await AttestationMinterFactory.deploy(verifier.address);
  await minter.deployed();
  console.log("AttestationMinter (NFT Minter) address:", minter.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(minter);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
