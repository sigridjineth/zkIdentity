import { Strategy, ZkIdentity } from "@zk-kit/identity"
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols"
import { expect } from "chai"
import { Contract, Signer } from "ethers"
import { ethers, run } from "hardhat"
// import identityCommitments from "../public/identityCommitments.json"
import { createIdentityCommitments } from "../test/identity-test"

describe("AttestationMinter", function () {
    let contract: Contract
    let contractOwner: Signer
    // let dontSure: Signer

    before(async () => {
        contract = await run("deploy", { logs: false })

        const signers = await ethers.getSigners()
        contractOwner = signers[0]
        // dontSure = signers[1]
    })

    describe("# greet", () => {
        const wasmFilePath = "../public/semaphore.wasm"
        const finalZkeyPath = "../public/semaphore_final.zkey"

        it("Should greet", async () => {
            // const message = await contractOwner.signMessage("Sign this message to create your identity!")
            const message = "0x0f75f25eb9bc68c8886d6d4828966c58aac3c232";

            const identity = new ZkIdentity(Strategy.MESSAGE, message)
            const identityCommitment = BigInt(identity.genIdentityCommitment()).toString();
            const greeting = "Hello world"
            const bytes32Greeting = ethers.utils.formatBytes32String(greeting)

            const identityCommitments = createIdentityCommitments();

            const merkleProof = generateMerkleProof(20, BigInt(0), identityCommitments, identityCommitment)
            const witness = Semaphore.genWitness(
                identity.getTrapdoor(),
                identity.getNullifier(),
                merkleProof,
                merkleProof.root,
                greeting
            )

            // const witness2 = Semaphore.genWitness(
            //     identity.getTrapdoor() + 1n,
            //     identity.getNullifier() + 1n,
            //     merkleProof,
            //     merkleProof.root,
            //     greeting
            // )

            const fullProof = await Semaphore.genProof(witness, wasmFilePath, finalZkeyPath)
            const solidityProof = Semaphore.packToSolidityProof(fullProof.proof)

            // const fullProof2 = await Semaphore.genProof(witness2, wasmFilePath, finalZkeyPath)
            // const solidityProof2 = Semaphore.packToSolidityProof(fullProof2.proof)

            const nullifierHash = Semaphore.genNullifierHash(merkleProof.root, identity.getNullifier())

            // const transaction2 = contract.greet(bytes32Greeting, nullifierHash, solidityProof2)

            // await expect(transaction2).to.emit(contract, "NewGreeting").withArgs(bytes32Greeting)

            console.log("nullifierHash", nullifierHash);

            const testHash = 12369641887381720728228481080453068802864453634826283733139048263356723130563n;

            const transaction = contract.greet(bytes32Greeting, testHash, solidityProof)
            await expect(transaction).to.emit(contract, "NewGreeting").withArgs(bytes32Greeting)

            // minting NFTs?
            expect(await contract.balanceOf(contractOwner.getAddress())).to.equal(1);
        })
    })
})
