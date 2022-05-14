import AttestationMinter from "artifacts/contracts/AttestationMinter.sol/AttestationMinter.json";
import { Contract, providers, utils, Wallet } from "ethers"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    console.log(">>> ", body)

    const correctMinter = JSON.parse(body)["correctMinter"]
    const nullifierHash = JSON.parse(body)["nullifierHash"]
    const solidityProof = JSON.parse(body)["solidityProof"]

    const contractAddress = "0x556F664A59bFB2e432fA9fd5800752bC59116e58"

    const contract = new Contract(contractAddress, AttestationMinter.abi) // mumbai
    const provider = new providers.JsonRpcProvider(`${process.env.MUMBAI_URI}`)
    const signer = new Wallet(`${process.env.PRIVATE_KEY}`, provider);
    const contractOwner = contract.connect(signer)
    let txHash;

    try {
        await contractOwner.mint(
            utils.formatBytes32String(correctMinter.slice(0, 31)), nullifierHash, solidityProof,
            {
                gasLimit: 20000000
            }
        ).then((log: any) => {
            console.log("TXHASH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", log)
            txHash = log.hash;
        })
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
