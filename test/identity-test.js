import { Strategy, ZkIdentity } from "@zk-kit/identity";

const accounts = [
  "0x0f75f25eb9bc68c8886d6d4828966c58aac3c232",
  "0x8459c6bebe2d53b4dcaa71499a1ae4274c0e4df9",
  "0x509c39f7a55666fdc2ac90b085b39b41d0f089a0",
  "0xc415040996590a6eb82ebb2b323b3fae84268e5d",
  "0xdcaf829700b68df3ddde26f27313b8328debd9cb",
];

const message = [
  "0x4b540b79f3178e8eae3da55eabe05c65c28299b723aabca35d6ff8e6b2a492d37ef4cd06ae1e6573819ffa5f1ab85dee6547b9c21ce49b3cf99401d6b709fcb31c",
  "0x0830f316c982a7fd4ff050c8fdc1212a8fd92f6bb42b2337b839f2b4e156f05a359ef8f4acd0b57cdedec7874a865ee07076ab2c81dc9f9de28ced55228587f81c"
]

// const arr = words.split("");
// console.log(arr);

function createIdentityCommitments() {
  let identityCommitments = [];

  for (let i = 0; i < message.length; i++) {
    identityCommitments.push(
      BigInt(
        new ZkIdentity(Strategy.MESSAGE, message[i]).genIdentityCommitment()
      ).toString()
    );
  }

  return identityCommitments;
}

export { createIdentityCommitments, accounts } ;

// let identityCommitments = [];

// for (let i = 0; i < accounts.length; i++) {
//   identityCommitments.push(
//     BigInt(
//       new ZkIdentity(Strategy.MESSAGE, accounts[i]).genIdentityCommitment()
//     ).toString()
//   );
// }

// console.log(JSON.stringify(identityCommitments));
// console.log("Array length is", identityCommitments.length);
