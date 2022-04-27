pragma circom 2.0.3;

include "./merkle.circom";
include "./ecdsa.circom";
include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/bitify.circom";
include "./eth_addr.circom";

template VerifyWinner(n, k, levels) {
  signal input r[k];
  signal input s[k];
  signal input msghash[k];

  signal input chunkedPubkey[2][k];

  signal input nullifier;

  signal input merklePathElements[levels];
  signal input merklePathIndices[levels];
  signal input merkleRoot;

  signal pubkeyBits[512];
  signal address;
  signal pubkeyBitRegisters[2][k];

  component sigVerify = ECDSAVerify(n, k);
  for (var i = 0; i < k; i++) {
    sigVerify.r[i] <== r[i];
    sigVerify.s[i] <== s[i];
    sigVerify.msghash[i] <== msghash[i];

    sigVerify.pubkey[0][i] <== chunkedPubkey[0][i];
    sigVerify.pubkey[1][i] <== chunkedPubkey[1][i];
  }
  sigVerify.result === 1;

  component flattenPubkey = FlattenPubkey(n, k);

  for (var i = 0; i < k; i++) {
    flattenPubkey.chunkedPubkey[0][i] <== chunkedPubkey[0][i];
    flattenPubkey.chunkedPubkey[1][i] <== chunkedPubkey[1][i];
  }

  for (var i = 0; i < 512; i++) {
    pubkeyBits[i] <== flattenPubkey.pubkeyBits[i];
  }

  component pubkeyToAddress = PubkeyToAddress();

  for (var i = 0; i < 512; i++) {
    pubkeyToAddress.pubkeyBits[i] <== pubkeyBits[i];
  }

  address <== pubkeyToAddress.address;

  component treeChecker = MerkleTreeChecker(levels);
  treeChecker.leaf <== address;
  treeChecker.root <== merkleRoot;
  for (var i = 0; i < levels; i++) {
    treeChecker.pathElements[i] <== merklePathElements[i];
    treeChecker.pathIndices[i] <== merklePathIndices[i];
  }

  component nullifierCheck = Poseidon(1);
  nullifierCheck.inputs[0] <== r[0];
  nullifierCheck.out === nullifier;
}
