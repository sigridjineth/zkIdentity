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

  signal input pubkey[2][k];
  signal input address;

  signal input nullifier;

  signal input merklePathElements[levels];
  signal input merklePathIndices[levels];
  signal input merkleRoot;

  signal address;
  signal rNum;
  signal pubkeyBitRegisters[2][k];

  component sigVerify = ECDSAVerify(n, k);
  for (var i = 0; i < k; i++) {
    sigVerify.r[i] <== r[i];
    sigVerify.s[i] <== s[i];
    sigVerify.msghash[i] <== msghash[i];

    sigVerify.pubkey[0][i] <== pubkey[0][i];
    sigVerify.pubkey[1][i] <== pubkey[1][i];
  }
  sigVerify.result === 1;

  component pubkeyToAddress = PubkeyToAddress(n, k);
  for (var i = 0; i < k; i++) {
    pubkeyToAddress.pubkey[0][i] <== pubkey[0][i];
    pubkeyToAddress.pubkey[1][i] <== pubkey[1][i];
  }
  address <== pubkeyToAddress.address;

  component treeChecker = MerkleTreeChecker(levels);
  treeChecker.leaf <== address;
  treeChecker.root <== merkleRoot;
  for (var i = 0; i < levels; i++) {
    treeChecker.pathElements[i] <== merklePathElements[i];
    treeChecker.pathIndices[i] <== merklePathIndices[i];
  }

  component rToNum = Bits2Num(k);
  for (var i = 0; i < k; i++) {
    rToNum.in[i] <== r[i];
  }
  rNum <== rToNum.out;

  component nullifierCheck = Poseidon(1);
  nullifierCheck.inputs[0] <== rNum;
  nullifierCheck.out === nullifier;
}

component main = VerifyDfWinner(86, 3, 10);