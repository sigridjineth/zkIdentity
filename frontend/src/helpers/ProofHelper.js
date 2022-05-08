import builder from "./witness_calculator";
import { groth16 } from "snarkjs";
import path from "path";
import { modules } from "web3";

const zkeyPath = "./VerifyDfWinner_86-3-8_prod.0.zkey";
const wasmPath = "./VerifyDfWinner_86-3-8_prod.wasm";

export default async function calculateProof(input) {
  // fullProve like below does not work
  // other people also raised the issue in snarkjs repo
  // const { proof } = await groth16.fullProve(zkeyPath, wasmPath, null)
  console.log("wasmPath: ", wasmPath);
  let resp = await fetch(wasmPath);
  console.log("resp: ", resp);
  const wasmBuff = await resp.arrayBuffer();
  const wc = await builder(wasmBuff);
  const wtnsBuff = await wc.calculateWTNSBin(input, 0);
  console.log("wtnsBuff: ", wtnsBuff);
  const { proof } = await groth16.prove(zkeyPath, wtnsBuff, null);
  console.log("proof: ", proof);
  return proof;
}
