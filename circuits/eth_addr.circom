pragma circom 2.0.3;

include "./vocdoni/keccak256-circom/keccak.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

template PubkeyToAddress(n, k) {
    signal input pubkey[2][k];
    signal output address;
    signal pubkeyBits[2*k*n];

    // make sure we have enough width for an eth pubkey
    assert(2*k*n >= 512);

    // convert pubkey to a single bit array
    component chunks2Bits[2 * k];
    for (var coord = 0; coord < 2; coord++) {
      for (var reg = 0; reg < k; reg++) {
        var compIdx = (coord * k) + reg;
        chunks2Bits[compIdx] = Num2Bits(n);
        chunks2Bits[compIdx].in <== pubkey[coord][reg];

        for (var bit = 0; bit < n; bit++) {
          var bitIdx = (coord * k * n) + (reg * n) + bit;
          pubkeyBits[bitIdx] <== chunks2Bits[compIdx].out[bit];
        }
      }
    }

    // keccak pubkey
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