//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Semaphore/IVerifier.sol";
import "./Semaphore/SemaphoreCore.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AttestationMinter is ERC721, SemaphoreCore, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewProofMade(address nowMinter);

    uint256 public treeRootHash;

    IVerifier public verifier;

    constructor(uint256 _treeRootHash, address _verifier)
        ERC721("Dark Forest Proof", "PROOF") {
            treeRootHash = _treeRootHash;
            verifier = IVerifier(_verifier);
    }

    function mint(
        bytes32 treeRoot,
        uint256 _nullifierHash,
        uint256[8] calldata _proof
    ) external _onlyOneNullifierHash(_nullifierHash) {
        _verifyProof(treeRoot, treeRootHash, _nullifierHash, treeRootHash, _proof, verifier);

        _saveNullifierHash(_nullifierHash);

        emit NewProofMade(msg.sender);

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
    }
}
