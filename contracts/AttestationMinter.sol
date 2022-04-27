// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../circuits/verifier.sol";

interface IVerifier {
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) external view returns (bool r);
}

// is Verifier, ERC721Mintable
contract AttestationMinter is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(bytes => bool) public nullifiers;
    IVerifier public verifier;

    constructor(address _verifier) ERC721("DF Winner Proof", "DFPROOF") {
        verifier = IVerifier(_verifier);
    }

    function mint(
        uint256[2] memory _a,
        uint256[2][2] memory _b,
        uint256[2] memory _c,
        uint256 _merkleRoot,
        uint256 _nullifier
    ) external {
        
        require(nullifiers[_nullifier] == false, "nullifier has been already used.");
        require(verifier.verifyProof(
                _a, _b, _c, [_merkleRoot, _nullifier]
        ), "AttestationMinter: invalid proof");
        nullifiers[_nullifier] = true;

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
    }
}