import AttestationMinter from "artifacts/contracts/AttestationMinter.sol/AttestationMinter.json";
import { Contract, providers, utils, Wallet } from "ethers"
import type { NextApiRequest, NextApiResponse } from "next"

// This API can represent a backend.
// However they will not be aware of the identity of the users generating the proofs.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { correctMinter, nullifierHash, solidityProof } = req.body

    const contractAddress = "0x556F664A59bFB2e432fA9fd5800752bC59116e58"

    const contract = new Contract(contractAddress, AttestationMinter.abi) // mumbai
    const provider = new providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
    const signer = new Wallet(`${process.env.PRIVATE_KEY}`, provider);
    // console.log("SIGNER >>>>>>>>>>>>>>>>>>>>>>>>> ", signer)
    const contractOwner = contract.connect(signer)
    let txHash;

    try {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", utils.formatBytes32String(correctMinter.slice(0, 31)))
        await contractOwner.mint(
            utils.formatBytes32String(correctMinter.slice(0, 31)), nullifierHash, solidityProof,
            {
                gasLimit: 9000000
            }
        ).then((log: any) => {
            console.log("TXHASH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", log)
            txHash = log.hash;
        })
        // await contractOwner.mint(utils.formatBytes32String(correctMinter), nullifierHash, solidityProof)
        // console.log("RECEIPT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", receipt)
        res.status(200).send({
            "status_code": 200,
            "txHash": txHash
        })
    } catch (error: any) {
        // console.log("error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", error)
        // const { message } = error.body
        // const reason = message.substring(message.indexOf("'") + 1, message.lastIndexOf("'"))

        res.status(500).send(error.toString() || "Unknown error!")
    }
}
