# ZKU.one Final Proposal: zkIdentity
### Private Identity Claim System with Zero-Knowledge for DarkForest.eth

### Introduction

1. GitHub:
- circom circuits: https://github.com/jypthemiracle/zkIdentity/tree/circuits
- frontend: https://github.com/jypthemiracle/zkIdentity/tree/snoop (highly appreciates to my friend, [@realsnoopso](https://github.com/realsnoopso), who did pair programming an hour for every day) 

2. Deployed Address: https://abit.ly/zkiden_ver1
3. Demo Video: https://www.youtube.com/watch?v=RDqRJ6Rjzic
4. Contract Address which is on Polygon Network
* Verifier address: 0xe162f60a32130596D56D31b1d2A562E3a8161be9
* AttestationMinter address: 0x16BA61441Ae1345Dbb17d476f8295b0d6517CDbB

### Note & Further plan till late submission
* The circom circuits branch is clone coding of https://github.com/jefflau/zk-identity for learning circom. only minor changes, no major changes made by me. I focused on learning circom library during testnet launch.
* However, due to the difficulty of circom library, I changed my frameworks from circom to semaphore.
- now working on here: https://github.com/jypthemiracle/zkIdentity/tree/main
- the repo is based on semaphore boilerplate. https://github.com/semaphore-protocol/boilerplate
* plans to complete a dedicated full feature til the late submission (May 22)

#### I. Background

Authenticating one's identity through public Ethereum Address severely restricts the privacy. Thus, crypto users might want to prove that they are eligible to join or partake in specific activities without revealing one's public address or public keys. Protocols are motivated to support the actions from user side since they might wawnt to distribute an airdrop through off-chain activities.

Imagine you request to get an airdrop, but it immediately leaks your previous financial history since it is associated with your public identity. You want to join DAO voting but someone prevents to do that since you had voted against the administrator of the DAO. Sounds crazy, right? Let us solve this problem by enabling users to claim airdrops anonymously while prove one's identity (i.e. one has a NFT) without revealing their public keys.

#### II. Implementation

I am going to build a set of Ethereum contracts and web frontend that allows a user to prove that they were a previous `DarkForest.Eth` winner without revealing the recipent's Ethereum address. By doing so, one could claim the prize (i.e. NFT is minted) without the worries of doxxing one's financial history. One could play `DarkForest` game by creating new address, and claim the prize with existing wallet that you want to be claimed with.

#### III. Technical Specifications

##### Phase 1: Merkle Tree Construction

* User, with `account 1`, signs a message to prove that one has a public key ownership or not.

* User create a `key` and `secret` and they concatenate them to create hash which is `committment`.

```
committment = hash(key + secret)
```

* The `committment` is transmitted across a public channel, and stored in a `MySQL` database, which is a off-chain in a Amazon Web Service instance - or local storage in a computer.
* Hashing a merkle tree recursively and publish merkle root hash to on-chain.

##### Phase 2: User submission

* Users, with another account without connection to previous account 1, can redeem with a zero-knowledge proof that validates they belongs in the Merkle tree without revealing which `commitment` is associated with their public key.
* When users enter an input with `key-secret pair`, it generates a `witness` that serves as an input to the proof generation algorithm.
* User submits merkle path proof to smart contract, and it verifies one's identity without revealing which `commitment` is associated with one's public key.
* Smart contract mints a NFT and sends to `account 2`

#### IV. Product Roadmap

* Version 1: Allow users to verify that they are the ones who are in merkle-tree commitments and retrieve NFT, in `DarkForest.eth`, using `Semaphore` library.
* Version 2: Building a sociable prove system that one has its NFT without revealing one's Ethereum address, using `circom`.
