const path = require('path');
const chai = require('chai');
const circom_tester = require('circom_tester');
const {
    BigNumber: BN
} = require('ethers');
const utils = require('./utils');
const fs = require('fs')
const assert = chai.assert;
const wasm_tester = circom_tester.wasm;

const bigIntToArray = (n, k, x) => {
    let mod = 1n;
    for (let idx = 0; idx < n; idx++) {
        mod = mod * 2n;
    }

    let ret = [];
    let x_temp = x;
    for (let idx = 0; idx < n; idx++) {
        ret.push(x_temp % mod);
        x_temp = x_temp / mod;
    }

    return ret;
}

const split = (pubkey_bigint) => {
    const x_bigInt = (pubkey_bigint / 2n) ** 256n
    const y_bigInt = (pubkey_bigint % 2n) ** 256n

    return [x_bigInt, y_bigInt]
}

describe('verify darkforest winner', () => {
    this.timeout(100000)
    it('verifies df winner', async () => {
        const circuit = await wasm_tester(
            path.join(__dirname, 'circuits', 'verify_df_winner_86_3_10.circom')
        )

        const publicKey = BigInt(
            '0xfff49b58b83104ff16875452852466a46c7169ba4e368d11830c9170624e0a9509080a05a38c18841718ea4fc13483ac467d3e2d728d41ff16b73b9c943734f8'
        )

        const signedMsg = BigInt(
            '0xf86b808504a817c800825208942890228d4478e2c3b0ebf5a38479e3396c1d6074872386f26fc100008029a0520e5053c1b573d747f823a0b23d52e5a619298f46cd781d677d0e5e78fbc750a075be461137c2c2a5594beff76ecb11a215384c574a7e5b620dba5cc63b0a0f13'
        )

        const [x, y] = split(publicKey)
        const chunkedX = bigIntToArray(86, 3, x)
        const chunkedY = bigIntToArray(86, 3, y)

        console.log(chunkedX, chunkedY)

        const input = {
            r: [10, 10, 10],
            s: [10, 10, 10],
            msghash: [10, 10, 10],
            chunkedPubkey: [chunkedX, chunkedY],
            nullifier: 10,
            merklePathElements: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
            merklePathIndices: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            merkleRoot: 1234,
        }
    })
})