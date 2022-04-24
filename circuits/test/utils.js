var EC = require('elliptic').ec
var BN = require('bn.js')

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

const numToBits = (num, numBits) => {
  const bits = (num >>> 0).toString(2);
  const padding = numBits - bits.length;
  const paddedBits = padding > 0 ? bits.padStart(numBits, 0) : bits;

  if (numBits < bits.length) {
    throw new Error("Not enough bits");
  }

  return paddedBits.split("");
};

const generatePublicKey = () => {
  const ec = new EC('secp256k1');

  const G = ec.g; // Generator point
  const pk = new BN('1'); // private key as big number
  const pubPoint = G.mul(pk); // EC multiplication to determine public point

  const x = pubPoint.getX().toBuffer(); //32 bit x co-ordinate of public point
  const y = pubPoint.getY().toBuffer(); //32 bit y co-ordinate of public point

  const publicKey = Buffer.concat([x, y]);

  console.log('pubPoint', pubPoint);
  console.log('x', pubPoint.getX().toBuffer());

  console.log('pub key::' + publicKey.toString('hex'));
  return publicKey;
}

module.exports = {
  bytesToBits,
  bitsToBytes,
  hexToBytes,
  bytesToHex,
  numToBits,
  generatePublicKey
};
