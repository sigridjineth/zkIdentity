import { Strategy, ZkIdentity } from '@zk-kit/identity'
import {
  generateMerkleProof,
  Semaphore,
  SemaphoreSolidityProof,
} from '@zk-kit/protocols'
import { expect } from 'chai'
import { Contract, Signer } from 'ethers'
import { ethers, run } from 'hardhat'
// import identityCommitments from "../public/identityCommitments.json"
import { createIdentityCommitments } from '../test/identity-test'

describe('AttestationMinter', function () {
  let contract: Contract
  let contractOwner: Signer
  let solidityProof: SemaphoreSolidityProof
  let correctMinter: string
  let testHash: BigInt
  let NFTMinter: Signer

  before(async () => {
    contract = await run('deploy', { logs: false })

    // // when mumbai
    // contract = await (
    //   await ethers.getContractFactory('AttestationMinter')
    // ).attach('0x29F37C0AeEb1810062D1C3989c3A10E657319Cb7')

    const signers = await ethers.getSigners()
    contractOwner = signers[0]
    NFTMinter = signers[1]
  })

  describe('# Rendering Hash and NFTs', () => {
    const wasmFilePath = '../public/semaphore.wasm'
    const finalZkeyPath = '../public/semaphore_final.zkey'

    it('should issue proof', async () => {
      const message = await contractOwner.signMessage(
        (await contractOwner.getAddress()).toString(),
      )

      console.log('message', message)

      const identity = new ZkIdentity(Strategy.MESSAGE, message)
      const identityCommitment = BigInt(
        identity.genIdentityCommitment(),
      ).toString()
      const nowMintingWinner = message.slice(0, 31)
      correctMinter = ethers.utils.formatBytes32String(nowMintingWinner)

      const identityCommitments = createIdentityCommitments()

      const merkleProof = generateMerkleProof(
        20,
        BigInt(0),
        identityCommitments,
        identityCommitment,
      )
      const witness = Semaphore.genWitness(
        identity.getTrapdoor(),
        identity.getNullifier(),
        merkleProof,
        merkleProof.root,
        nowMintingWinner,
      )

      const fullProof = await Semaphore.genProof(
        witness,
        wasmFilePath,
        finalZkeyPath,
      )
      solidityProof = Semaphore.packToSolidityProof(fullProof.proof)

      const nullifierHash = Semaphore.genNullifierHash(
        merkleProof.root,
        identity.getNullifier(),
      )

      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>> nullifierHash', nullifierHash)

      // local
    //   testHash = 8256506138774881883855200333341341504380758576372696209204233687827671036315n

      // deploy mumbai
      testHash = 17255530457257394875176377021288167427631990061268730519821747969551682432884n;

    //   console.log(nullifierHash === testHash)

      expect(nullifierHash).to.equal(testHash)
    }),

      it('should mint', async () => {
        const NFTMinterAddress = await NFTMinter.getAddress()

        // console.log(">>>>>>>>>>>>>>>>>>>>>", NFTMinterAddress)

        const transaction = await contract
          .connect(NFTMinter)
          .mint(correctMinter, testHash, solidityProof)

        await expect(transaction)
          .to.emit(contract, 'NewProofMade')
          .withArgs(NFTMinterAddress)

        // minting NFTs?
        expect(await contract.balanceOf(NFTMinter.getAddress())).to.equal(1)
      }),
      it('should revert when trying to reuse the nullifier', async () => {
        const failedMint = contract
          .connect(NFTMinter)
          .mint(correctMinter, testHash, solidityProof)
        await expect(failedMint).to.be.reverted
      })
  })
})
