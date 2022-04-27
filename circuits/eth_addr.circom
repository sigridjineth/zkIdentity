pragma circom 2.0.3;

include "./vocdoni/keccak.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

template FlattenPubkey(numBits, k) {
  signal input chunkedPubkey[2][k];

  signal output pubkeyBits[512];

  // must be able to hold entire pubkey in input
  assert(numBits*k >= 256);

  component chunks2BitsY[k];

  for (var chunk = 0; chunk < k; chunk++) {
    chunks2BitsY[chunk] = Num2Bits(numBits);
    chunks2BitsY[chunk].in <== chunkedPubkey[1][chunk];

    for (var bit = 0; bit < numBits; bit++) {
      var bitIndex = bit + numBits * chunk;
      if (bitIndex < 256) {
        pubkeyBits[bitIndex] <== chunks2BitsY[chunk].out[bit];
      }
    }
  }

  component chunks2BitsX[k];

  for (var chunk = 0; chunk < k; chunk++) {
    chunks2BitsX[chunk] = Num2Bits(numBits);
    chunks2BitsX[chunk].in <== chunkedPubkey[0][chunk];

    for (var bit = 0; bit < numBits; bit++) {
        var bitIndex = bit + 256 + (numBits * chunk);
        if(bitIndex < 512) {
          pubkeyBits[bitIndex] <== chunks2BitsX[chunk].out[bit];
        }
    }
  }
}

template PubkeyToAddress() {
    signal input pubkeyBits[512];

    signal output address;

    signal reverse[512];

    for (var i = 0; i < 512; i++) {
        reverse[i] <== pubkeyBits[511-i];
    }

    component keccak = Keccak(512, 256);
    for (var i = 0; i < 512 / 8; i += 1) {
       for (var j = 0; j < 8; j++) {
         keccak.in[8*i + j] <== reverse[8*i + (7-j)];
       }
    }

    // convert the last 160 bits (20 bytes) into the number corresponding to address
    component bits2Num = Bits2Num(160);
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 8; j++) {
        bits2Num.in[8*i + j] <== keccak.out[256 - 8*(i+1) + j];
      }
    }
    address <== bits2Num.out;
}