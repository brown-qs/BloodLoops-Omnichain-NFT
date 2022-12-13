// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.0;

import "./LZ-libraries/ONFT1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title Interface of the UniversalONFT standard
contract BLS_NFT is ONFT1155 {
    string public name = "BloodLoops";
    string public symbol = "BLS_NFT";

    string public baseTokenURI;  // "ipfs://QmTkA2ue7mqfe7zYSNE4BYoanm6bcSM5WHz2S5LDuvjxbz/";

    //@notice Support for ERC2981
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    //@notice Royalty Variables
    address private _royaltyAddress;
    uint256 private _royaltyPercentage;

    constructor(
        address _layerZeroEndpoint
    ) ONFT1155("", _layerZeroEndpoint) {
    }

    //@notice Migrates a oldContract token to current
    function mint(uint256[] memory tokenIds, uint256[] memory amounts) external {
        _mintBatch(msg.sender, tokenIds, amounts, "");
    }

    //@notice Update royalty percentage
    //@param percentage to edit
    function editRoyaltyFee(address user, uint256 bps) external onlyOwner {
        _royaltyPercentage = bps;
        _royaltyAddress = user;
    }

    //@notice View royalty info for tokens
    function royaltyInfo(uint256, uint256 value) external view returns (address, uint256) {
        return (_royaltyAddress, (value * _royaltyPercentage) / 10000);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        // Tokens minted above the supply cap will not have associated metadata.

        return string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId), ".json"));
    }

    function setURI(string memory newURI) external onlyOwner {
        baseTokenURI = newURI;
    }
}
