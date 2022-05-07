import { Strategy, ZkIdentity } from "@zk-kit/identity"

const words = "abcdefghijklmnopqrstuvwxyz";
const arr = words.split("");
// console.log(arr);

let identityCommitments = [];
for (let i = 0; i < arr.length; i++) {
  identityCommitments.push(
    BigInt(
      new ZkIdentity(Strategy.MESSAGE, arr[i]).genIdentityCommitment()
    ).toString()
  );
}

console.log(JSON.stringify(identityCommitments));
console.log("Array length is", identityCommitments.length);
