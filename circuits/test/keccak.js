const path = require("path");
const chai = require("chai");
const circom_tester = require("circom_tester");

const assert = chai.assert;
const wasm_tester = circom_tester.wasm;

function bytesToBits(b) {
  const bits = [];
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < 8; j++) {
      if ((Number(b[i]) & (1 << j)) > 0) {
        // bits.push(Fr.e(1));
        bits.push(1);
      } else {
        // bits.push(Fr.e(0));
        bits.push(0);
      }
    }
  }
  return bits;
}

function bitsToBytes(a) {
  const b = [];

  for (let i = 0; i < a.length; i++) {
    const p = Math.floor(i / 8);
    if (b[p] == undefined) {
      b[p] = 0;
    }
    if (a[i] == 1) {
      b[p] |= 1 << i % 8;
    }
  }
  return b;
}

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join("");
}

describe("Keccak256 32 bytes input and output test", function () {
  this.timeout(100000);

  let circuit;

  before(async () => {
    circuit = await wasm_tester(
      path.join(__dirname, "circuits", "keccak_256_256.circom")
    );
    await circuit.loadConstraints();

    console.log("n_constraints", circuit.constraints.length);
  });

  it("testvector generated from go keccak 1 test", async () => {
    const input = [
      116, 101, 115, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    const expectedOut = [
      37, 17, 98, 135, 161, 178, 88, 97, 125, 150, 143, 65, 228, 211, 170, 133,
      153, 9, 88, 212, 4, 212, 175, 238, 249, 210, 214, 116, 170, 85, 45, 21,
    ];

    const inIn = bytesToBits(input);

    const witness = await circuit.calculateWitness(
      {
        in: inIn,
      },
      true
    );

    const stateOut = witness.slice(1, 1 + 32 * 8);
    const stateOutBytes = bitsToBytes(stateOut);

    assert.deepEqual(stateOutBytes, expectedOut);
  });
});

describe("keccak 64bytes input, 32bytes output which is PubKey to Address test", function () {
  this.timeout(100000);

  let circuit;

  before(async () => {
    circuit = await wasm_tester(
      path.join(__dirname, "circuits", "keccak_512_256.circom")
    );
    await circuit.loadConstraints();
  });

  it("should properly hashes an Ethereum public key to its keccak hash", async () => {
    // given
    const pubKey =
      "11f2b30c9479ccaa639962e943ca7cfd3498705258ddb49dfe25bba00a555e48cb35a79f3d084ce26dbac0e6bb887463774817cb80e89b20c0990bc47f9075d5";
    const address =
      "f2c712fa067b0bb7f35a89ecc2524c08e0166f6a3b8d9925f8864c8ee18cb729";

    // when
    const inBits = bytesToBits(hexToBytes(pubKey));
    const witness = await circuit.calculateWitness(
      {
        in: inBits,
      },
      true
    );

    console.log("inBits: ", inBits);
    console.log("witness: ", witness);

    const outBits = witness.slice(1, 1 + 32 * 8);
    const outHex = bytesToHex(bitsToBytes(outBits));

    console.log("outBits: ", outBits);
    console.log("outHex: ", outHex);

    // then
    assert.equal(outHex, address);
  });
});
