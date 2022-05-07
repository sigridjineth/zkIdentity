import { Strategy, ZkIdentity } from "@zk-kit/identity";

const accounts = [
  "0x0f75f25eb9bc68c8886d6d4828966c58aac3c232",
  "0x8459c6bebe2d53b4dcaa71499a1ae4274c0e4df9",
  "0x509c39f7a55666fdc2ac90b085b39b41d0f089a0",
  "0xc415040996590a6eb82ebb2b323b3fae84268e5d",
  "0xdcaf829700b68df3ddde26f27313b8328debd9cb",
];

// const arr = words.split("");
// console.log(arr);

function createIdentityCommitments() {
  let identityCommitments = [];

  for (let i = 0; i < accounts.length; i++) {
    identityCommitments.push(
      BigInt(
        new ZkIdentity(Strategy.MESSAGE, accounts[i]).genIdentityCommitment()
      ).toString()
    );
  }

  return identityCommitments;
}

export default createIdentityCommitments;

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
