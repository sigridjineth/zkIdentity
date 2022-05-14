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
                    "0x4b540b79f3178e8eae3da55eabe05c65c28299b723aabca35d6ff8e6b2a492d37ef4cd06ae1e6573819ffa5f1ab85dee6547b9c21ce49b3cf99401d6b709fcb31c",
                    "17255530457257394875176377021288167427631990061268730519821747969551682432884",
                    [
                        "3320272635416613266953774442762054127309575074865044046833137369225272779213",
                        "20668138058572213310636602881933743145282235930024010727871472665041705741287",
                        "13628251602729504078250088021810498105147400206651286000568825933213111467637",
                        "13831038125464100448133355551433409456308587711066206453628687933914215480125",
                        "16545449522840763150087474988282514974375424849632172511510793373315412516448",
                        "4074197993912275337629038054969689671070237983279413028757007669014131224688",
                        "4529924247873463290643817459892712449771182208546214954312771770304711244475",
                        "5394951715729664003903543658329949633079059668968997770978216095995390875829"
                    ]
                )} className={styles.button}>
                    Mint a NFT
                </div>
            </main>
        </div>
    )
}
