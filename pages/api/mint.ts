import AttestationMinter from "artifacts/contracts/AttestationMinter.sol/AttestationMinter.json";
import { Contract, providers, utils, Wallet } from "ethers"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    console.log(">>> ", body)

    const correctMinter = JSON.parse(body)["correctMinter"]
    const nullifierHash = JSON.parse(body)["nullifierHash"]
    const solidityProof = JSON.parse(body)["solidityProof"]

    // const contractAddress = "0x556F664A59bFB2e432fA9fd5800752bC59116e58" // mumbai testnet
    const contractAddress = "0x0e49820ceed405f6560d724333b45586c49e6fb1" // kovan testnet
    const contract = new Contract(contractAddress, AttestationMinter.abi)
    const provider = new providers.JsonRpcProvider("https://ethereum-kovan-rpc.allthatnode.com/fV1yQSJuIz74RU8lfhew7xJKndczum36")
    const signer = new Wallet(`${process.env.PRIVATE_KEY_MINTER}`, provider);
    const contractOwner = contract.connect(signer)
    let txHash;

    try {
        let tx = await contractOwner.mint(
            utils.formatBytes32String(correctMinter.slice(0, 31)),
            nullifierHash,
            solidityProof,
        {
            gasLimit: 20000000
        }
        );
        await tx.wait();
        console.log("Record set" + tx.hash);

        res.status(200).send({
            "status_code": 200,
            "txHash": txHash
        })
    } catch (error: any) {
        res.status(500).send({
            "status_code": 500,
            "message": error.toString() || "Unknown error!"
        })
    }
}
