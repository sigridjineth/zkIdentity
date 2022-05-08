//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Semaphore/IVerifier.sol";
import "./Semaphore/SemaphoreCore.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Greeters contract.
/// @dev The following code is just a example to show how Semaphore con be used.
contract AttestationMinter is ERC721, SemaphoreCore, Ownable {
    // ERC721 tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // A new greeting is published every time a user's proof is validated.
    event NewProofMade(address nowMinter);

    // Greeters are identified by a Merkle root.
    // The offchain Merkle tree contains the greeters' identity commitments.
    uint256 public treeRootHash;

    // The external verifier used to verify Semaphore proofs.
    IVerifier public verifier;

    constructor(uint256 _treeRootHash, address _verifier)
        ERC721("Dark Forest Proof", "PROOF") {
            treeRootHash = _treeRootHash;
            verifier = IVerifier(_verifier);
        }

    // Only users who create valid proofs can greet.
    // The contract owner must only send the transaction and they will not know anything
    // about the identity of the greeters.
    // The external nullifier is in this example the root of the Merkle tree.
    function mint(
        bytes32 _greeting,
        uint256 _nullifierHash,
        uint256[8] calldata _proof
    ) external _onlyOneNullifierHash(_nullifierHash) {
        _verifyProof(_greeting, treeRootHash, _nullifierHash, treeRootHash, _proof, verifier);

        // Prevent double-greeting (nullifierHash = hash(root + identityNullifier)).
        // Every user can greet once.
        _saveNullifierHash(_nullifierHash);

        emit NewProofMade(msg.sender);

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
    }
}
