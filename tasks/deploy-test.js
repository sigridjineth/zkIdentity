import { IncrementalMerkleTree } from "@zk-kit/incremental-merkle-tree";
import { poseidon } from "circomlibjs";
import { Contract } from "ethers";
import { task, types } from "hardhat/config";
// import identityCommitments from "../public/identityCommitments.json"
import { createIdentityCommitments } from "../test/identity-test";

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which q" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account address:", await deployer.getAddress())

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const VerifierContract = await ethers.getContractFactory("Verifier");
  const verifier = await VerifierContract.deploy();
  await verifier.deployed();
  console.log("Verifier address:", verifier.address);

  const MinterContract = await ethers.getContractFactory("AttestationMinter");

  const tree = new IncrementalMerkleTree(poseidon, 20, BigInt(0), 2);

  const identities = createIdentityCommitments()

  for (const identityCommitment of identities) {
    tree.insert(identityCommitment);
  }

  const minter = await MinterContract.deploy(tree.root, verifier.address);

  await minter.deployed();

  console.log(`AttestationMinter contract has been deployed to: ${minter.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
