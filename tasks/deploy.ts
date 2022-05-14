import { IncrementalMerkleTree } from "@zk-kit/incremental-merkle-tree"
import { poseidon } from "circomlibjs"
import { Contract } from "ethers"
import { task, types } from "hardhat/config"
// import identityCommitments from "../public/identityCommitments.json"
import createIdentityCommitments from "../test/identity-test"

task("deploy", "Deploy a Verify contract")
    .addOptionalParam<boolean>("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs }, { ethers }): Promise<Contract> => {
        const VerifierContract = await ethers.getContractFactory("Verifier")
        const verifier = await VerifierContract.deploy()

        await verifier.deployed()

        logs && console.log(`Verifier contract has been deployed to: ${verifier.address}`)

        const AttestationMinterContract = await ethers.getContractFactory("AttestationMinter")

        const tree = new IncrementalMerkleTree(poseidon, 20, BigInt(0), 2)

        for (const identityCommitment of createIdentityCommitments()) {
            tree.insert(identityCommitment)
        }

        console.log("TREE ROOT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", tree.root)

        const minters = await AttestationMinterContract.deploy(tree.root, verifier.address)

        await minters.deployed()

        logs && console.log(`Greeters contract has been deployed to: ${minters.address}`)

        return minters
    })
