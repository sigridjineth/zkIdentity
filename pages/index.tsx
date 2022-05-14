import detectEthereumProvider from "@metamask/detect-provider"
import { Strategy, ZkIdentity } from "@zk-kit/identity"
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols"
import { providers, ethers } from "ethers"
import Head from "next/head"
import React from "react"
import styles from "../styles/Home.module.css"
// import createIdentityCommitments from "../test/identity-test";
import createIdentityCommitments from '../test/identity-test'

export default function Home() {
    const [logs, setLogs] = React.useState("Connect your wallet and MINT YOUR NFT!")

    // async function sign() {
    //     return;
    // }

    async function sign() {
        setLogs("Creating your Semaphore identity...")

        const provider = (await detectEthereumProvider()) as any

        await provider.request({ method: "eth_requestAccounts" })

        const ethersProvider = new providers.Web3Provider(provider)
        const signer = ethersProvider.getSigner()
        const address = await signer.getAddress()
        const message = await signer.signMessage(address)

        console.log("MESSAGE", message)

        const identity = new ZkIdentity(Strategy.MESSAGE, message)
        const identityCommitment = identity.genIdentityCommitment()
        console.log(">>>>>>>>>>>>>>>>>>> ", identityCommitment)
        const identityCommitments = createIdentityCommitments()

        const merkleProof = generateMerkleProof(20,
            BigInt(0),
            identityCommitments,
            identityCommitment
        )

        let correctMinter;

        setLogs("Creating your Semaphore proof...")

        const nowMintingWinner = message.slice(0, 31)
        correctMinter = ethers.utils.formatBytes32String(nowMintingWinner)

        const witness = Semaphore.genWitness(
            identity.getTrapdoor(),
            identity.getNullifier(),
            merkleProof,
            merkleProof.root,
            nowMintingWinner
        )

        const { proof, publicSignals } = await Semaphore.genProof(witness, "./semaphore.wasm", "./semaphore_final.zkey")
        const solidityProof = Semaphore.packToSolidityProof(proof)

        console.log(
            "correctMinter: ", correctMinter,
            "nullifierHash: ", publicSignals.nullifierHash,
            "solidityProof: ", solidityProof
        )

        setLogs("Created your Semaphore proof. Check your console.")
    }

    async function mint(correctMinter: any, nullifierHash: any, solidityProof: any) {
        const response = await fetch("/api/mint", {
            method: "POST",
            body: JSON.stringify({
                "correctMinter": correctMinter,
                "nullifierHash": nullifierHash,
                "solidityProof": solidityProof
            })
        })

        const body = await response.json();
        console.log("body: ", body);

        if (response.status === 500) {
            const errorMessage = await response.text()

            setLogs(errorMessage)
        } else {
            setLogs("Your anonymous greeting is onchain :)")
        }
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div className={styles.container}>
            <Head>
                <title>zk-Identity: Dark Forest</title>
                <meta name="description" content="Welcome to zk-Identity: Prove yourself and Mint NFT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>zk-Identity: Dark Forest</h1>

                <p className={styles.description}>Prove your identity that is already registered on smart contract, then mint your NFT. Built with Semaphore.</p>

                <div className={styles.logs}>{logs}</div>

                <div onClick={() => sign()} className={styles.button} style={{padding:"10px"}}>
                    Get a Proof
                </div>

                <div onClick={() => mint(
                    "0x3078323232653938626230643664323034623439356333353031316262376300",
                    BigInt("19364924581644938554042321953268896304489083661064590990805515411364831972598").toString(),
                    [
                        '19944727118031786532356592526382862105436326992331941169253117351149342337964',
                        '16532118260547205324863302723793920544186046169386304774759589734521373212906',
                        '12397051814284659943226804835542709661775199938259338020734834320537214352132',
                        '21641601984711226059407834425921413339003422262534692838417667237351043863720',
                        '5776004897003867210989044918359083516926228633393069900058107128854036705876',
                        '20486030019158972518814696674632267591247321086316177327535029482988810479209',
                        '16180289542872999849568193942144299459801627979425712004951809360529674588052',
                        '10102584646454252605989798021543884850064917311529165629418207434753306937832'
                    ]
                )} className={styles.button}>
                    Mint a NFT
                </div>
            </main>
        </div>
    )
}
