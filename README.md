# ZKU.one Final Project Proposal

* Proposal: Jin Hyung Park Sigrid Jin.

## zkIdentity: Private Identity Claim System with Zero-Knowledge for DarkForest.eth

### I. Background

Authenticating one's identity through public Ethereum Address severely restricts the privacy. Thus, crypto users might want to prove that they are eligible to join or partake in specific activities without revealing one's public address or public keys. Protocols are motivated to support the actions from user side since they might wawnt to distribute an airdrop through off-chain activities.

Imagine you request to get an airdrop, but it immediately leaks your previous financial history since it is associated with your public identity. You want to join DAO voting but someone prevents to do that since you had voted against the administrator of the DAO. Sounds crazy, right? Let us solve this problem by enabling users to claim airdrops anonymously while prove one's identity (i.e. one has a NFT) without revealing their public keys.

### II. Implementation

I am going to build a set of Ethereum contracts and web frontend that allows a user to prove that they were a previous `DarkForest.Eth` winner without revealing the recipent's Ethereum address. By doing so, one could claim the prize (i.e. NFT is minted) without the worries of doxxing one's financial history. One could play `DarkForest` game by creating new address, and claim the prize with existing wallet that you want to be claimed with.

### III. Technical Specifications

#### Phase 1: Merkle Tree Construction

* User, with `account 1`, signs a message to prove that one has a public key ownership or not.

* User create a `key` and `secret` and they concatenate them to create hash which is `committment`.

```
committment = hash(key + secret)
```

* The `committment` is transmitted across a public channel, and stored in a `MySQL` database, which is a off-chain in a Amazon Web Service instance - or local storage in a computer.
* Hashing a merkle tree recursively and publish merkle root hash to on-chain.

#### Phase 2: User submission

* Users, with another account without connection to previous account 1, can redeem with a zero-knowledge proof that validates they belongs in the Merkle tree without revealing which `commitment` is associated with their public key.
* When users enter an input with `key-secret pair`, it generates a `witness` that serves as an input to the proof generation algorithm.
* User submits merkle path proof to smart contract, and it verifies one's identity without revealing which `commitment` is associated with one's public key.
* Smart contract mints a NFT and sends to `account 2`

#### What we are going to prove?
* Let us know the following.
```
(sig, msg, pubKey, nullifier, nullifierHash, merkle_branch, merkle_root)
```
* such that...
```
sig == ecdsa_verify(r, s, msghash, pubkey)
merkle_verify(pubkey, merkleRoot, merklePathElements, merklePathIndices)
nullifier = poseidon(sig)
nullifierHash = poseidon(nullifier)
```

### IV. Product Roadmap

* Version 1: Allow users to verify that they are the ones who are in merkle-tree commitments and retrieve NFT, in `DarkForest.eth`.
* Version 2: Building a sociable prove system that one has its NFT without revealing one's Ethereum address.

## Reference

* https://hackmd.io/WjGvUIZzQwqxXVuSk1l1ZQ
* https://github.com/a16z/zkp-merkle-airdrop-contracts
* https://github.com/lsankar4033/zk-identity