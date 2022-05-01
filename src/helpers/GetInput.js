/*eslint-disable*/
/* global BigInt */
import { ethers } from "ethers";
// import { buildPoseidon } from 'circomlibjs';

const MESSAGE = "ZK Identity: Dark Forest Winners";

function bigint_to_array(n, k, x) {
    let idx;
    let mod = 1n
    for (idx = 0; idx < n; idx++) {
      mod = mod * 2n
    }
  
    let ret = []
    let x_temp = x;
    for (idx = 0; idx < k; idx++) {
      ret.push(x_temp % mod)
      x_temp = x_temp / mod
    }
    return ret
}

function calculateMod(str, mod) {
    var n = str.length;
    if (n <= 10) {
        return parseInt(str) % mod;
    }
    else {
        var first = str.substring(0, n - 10)
        var second = str.substring(n - 10)
        return (calculateMod(first, mod) * (Math.pow(10, 10) % mod) + parseInt(second) % mod) % mod;
    }
}

function split(pubkey_bigint) {
    const x_bigint = BigInt(BigInt(pubkey_bigint) / BigInt(2n ** 256n))
    const y_bigint = BigInt(BigInt(pubkey_bigint) % BigInt((2n ** 256n)))
    console.log("x_bigint", x_bigint, typeof x_bigint)
    console.log("y_bigint", y_bigint, typeof y_bigint)
    return [x_bigint, y_bigint]
}

export async function getInput(signer) {
    // const poseidon = await buildPoseidon();

    const sAddr = await signer.getAddress();
    console.log(sAddr);

    const msgHash = ethers.utils.hashMessage(MESSAGE);
    const msgHashBytes = ethers.utils.arrayify(msgHash);

    const flatSig = await signer.signMessage(MESSAGE);
    const sig = ethers.utils.splitSignature(flatSig);
    console.log("sig.r: " + sig.r)
    console.log("sig.s: " + sig.s)

    const pubKey = ethers.utils.recoverPublicKey(msgHashBytes, flatSig);
    console.log("pubKey: " + pubKey)

    // just to double check, this addr should match the sAddr above
    const addr = ethers.utils.computeAddress(ethers.utils.arrayify(pubKey));
    console.log(addr);

    const [x, y] = split(BigInt(pubKey))
    const chunkedX = bigint_to_array(86, 3, x)
    const chunkedY = bigint_to_array(86, 3, y)

    // TODO: nullifier
    // TODO: get merkleRoot, merklePathElements, and merklePathIndices

    return {
        r: bigint_to_array(86, 3, BigInt(sig.r)),
        s: bigint_to_array(86, 3, BigInt(sig.s)),
        msghash: bigint_to_array(86, 3, BigInt(msgHash)),
        chunkedPubkey: [
            chunkedX,
            chunkedY
        ],
        // nullifier: poseidon(r[0]),
        merklePathElements: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        merklePathIndices: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        merkleRoot: 1234
    }
}
/*eslint-disable*/