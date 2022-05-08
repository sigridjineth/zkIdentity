import { groth16 } from "snarkjs";
import path from "path";

const zkeyPath = "./VerifyDfWinner_86-3-8_prod.0.zkey";
const wasmPath = "./VerifyDfWinner_86-3-8_prod.wasm";

export default function buildContractCallArgs(proof, merkleRoot, nullifier) {
  // the object returned by calculateProof needs to be massaged into a set of parameters the verifying contract
  // will accept
  return [
    proof.pi_a.slice(0, 2), // pi_a
    // calculateProof reverses values in the inner arrays of pi_b
    [proof.pi_b[0].slice(0).reverse(), proof.pi_b[1].slice(0).reverse()], // pi_b
    proof.pi_c.slice(0, 2), // pi_c
    merkleRoot,
    nullifier,
  ];
}
