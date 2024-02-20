// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";

contract OMP is ERC721A {
    uint256 private maxSupply;
    uint256 private startTimestamp;

    constructor(string memory name, string memory symbol, uint256 _maxSupply, uint256 _startTimestamp) ERC721A(name, symbol) {
        maxSupply = _maxSupply;
        startTimestamp = _startTimestamp;
    }

    function mint(uint256 quantity) external payable {
        require(block.timestamp >= startTimestamp, "Minting has not started yet");
        require(totalSupply() + quantity <= maxSupply, "Exceeds max supply");
        _mint(msg.sender, quantity);
    }

    function getStartTimestamp() external view returns (uint256) {
        return startTimestamp;
    }
    
    function getMaxSupply() external view returns (uint256) {
        return maxSupply;
    }
}