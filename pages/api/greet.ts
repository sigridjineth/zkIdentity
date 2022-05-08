import AttestationMinter from "artifacts/contracts/AttestationMinter.sol/AttestationMinter.json";
import { Contract, providers, utils, Wallet } from "ethers"
import type { NextApiRequest, NextApiResponse } from "next"

// This API can represent a backend.
// The contract owner is the only account that can call the `greet` function,
// However they will not be aware of the identity of the users generating the proofs.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { correctMinter, nullifierHash, solidityProof } = req.body

    const contract = new Contract("0x227F65B7bD0e4E96bd7f5C09aCE995B237EA8857", AttestationMinter.abi) // mumbai
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
