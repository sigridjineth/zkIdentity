pragma circom 2.0.3;

include "./vocdoni/keccak.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

template FlattenPubkey(n, k) {
  signal input chunkedPubkey[2][k];

  signal output pubkeyBits[512];

  // must be able to hold entire pubkey in input
  assert(n*k >= 256);

  component chunks2Bits[2 * k];

  for (var coord = 0; coord < 2; coord++) {
    for (var reg = 0; reg < k; reg++) {
      var compIdx = (coord * k) + reg;
      chunks2Bits[compIdx] = Num2Bits(n);
      chunks2Bits[compIdx].in <== chunkedPubkey[coord][reg];

      for (var bit = 0; bit < n; bit++) {
        var bitIdx = (coord * k * n) + (reg * n) + bit;
        if (bitIdx < 512) {
          pubkeyBits[bitIdx] <== chunks2Bits[compIdx].out[bit];
        }
      }
    }
  }
}

template PubkeyToAddress() {
    signal input pubkeyBits[512];

    signal output address;

    component keccak = Keccak(512, 256);
    for (var i = 0; i < 512; i++) {
      keccak.in[i] <== pubkeyBits[i];
    }

    // convert the last 160 bits (20 bytes) into the number corresponding to address
    component bits2Num = Bits2Num(160);
    for (var i = 96; i < 256; i++) {
      bits2Num.in[i-96] <== pubkeyBits[i];
    }

    address <== bits2Num.out;
}