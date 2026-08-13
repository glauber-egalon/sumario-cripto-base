// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SumarioCriptoNFT is ERC721 {

    uint256 public proximoTokenId;

    constructor() ERC721("Sumario Cripto Builder", "SCB") {}

    function mint() public {
        uint256 tokenId = proximoTokenId;

        proximoTokenId++;

        _safeMint(msg.sender, tokenId);
    }
}
