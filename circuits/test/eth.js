const path = require('path')

const chai = require('chai')
const circom_tester = require('circom_tester')
const ethers = require('ethers')

const utils = require('./utils')

const assert = chai.assert
const wasm_tester = circom_tester.wasm

function numToBits(num, numBits) {
  // TODO: n-bit precision for a single num
  const bits = (num >>> 0).toString(2)
  const padding = numBits - bits.length
  const paddedBits = padding > 0 ? bits.padStart(numBits, 0) : bits
  if (numBits < bits.length) throw 'Not enough bits'
  return paddedBits.split('')
}

function flattenPubkey(x, y, n) {
  // flatten x and y into a single bit array. x and y represented as arrays of n-bit numbers
  const xBitArray = x.map(
    (num) => numToBits(num, n).reverse() //.map(parseInt)
  )
  const yBitArray = y.map(
    (num) => numToBits(num, n).reverse() //.map(parseInt)
  )
  // utils.numToBits for each num in x, y
  // flatten bit arrays and concat
  const bitArray = [
    ...xBitArray.flat().slice(0, 256),
    ...yBitArray.flat().slice(0, 256),
  ]
  return bitArray
}

describe('FlattenPubkey tests', function () {
  this.timeout(100000)

  it('flattens properly when pubkey is a perfect fit in registers', async function () {
    const circuit = await wasm_tester(
      path.join(__dirname, 'circuits', 'flatten_pubkey_64_4.circom')
    )
    await circuit.loadConstraints()

    const inX = [100, 27, 32, 144]
    const inY = [200, 31, 42, 1]
    const expectedOut = flattenPubkey(inX, inY, 64)

    const witness = await circuit.calculateWitness({
      chunkedPubkey: [inX, inY],
    })

    witness.shift()
    assert.deepEqual(witness.join(''), expectedOut.join(''))
  })

  it("flattens properly when there is 'extra space' in the last register", async function () {
    const circuit = await wasm_tester(
      path.join(__dirname, 'circuits', 'flatten_pubkey_86_3.circom')
    )
    await circuit.loadConstraints()

    const inX = [100, 27, 27]
    const inY = [27, 27, 42]

    const expectedOut = flattenPubkey(inX, inY, 86)

    const witness = await circuit.calculateWitness({
      chunkedPubkey: [inX, inY],
    })
    const output = witness.slice(1, 513)
    assert.deepEqual(output.join(''), expectedOut.join(''))
  })
})

describe('Public key to address', function () {
  it("Turns a flat public key into an address", async function () {
  }
})

// TODO: test pubkey_to_address