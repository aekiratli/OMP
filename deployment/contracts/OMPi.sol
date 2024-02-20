// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@charged-particles/erc721i/contracts/ERC721i.sol";

contract OMPi is ERC721i {
  constructor(string memory name, string memory symbol, uint256 maxSupply)
    ERC721i(name, symbol, _msgSender(), maxSupply) {}

  function preMint() external {
    _preMint();
  }

  function purchase(uint256 amount) external payable virtual returns (uint256 amountTransferred) {
    uint256 index = _lastPurchasedTokenId.current();
    if (index + amount > _maxSupply) {
        amount = _maxSupply - index;
    }

    uint256[] memory tokenIds = new uint256[](amount);
    for (uint256 i = 0; i < amount; i++) {
      _lastPurchasedTokenId.increment();
      tokenIds[i] = _lastPurchasedTokenId.current();
    }
    amountTransferred = _batchTransfer(owner(), _msgSender(), tokenIds);
  }

    function _batchTransfer(
    address from,
    address to,
    uint256[] memory tokenIds
  )
    internal
    virtual
    returns (uint256 amountTransferred)
  {
    uint256 count = tokenIds.length;

    for (uint256 i = 0; i < count; i++) {
      uint256 tokenId = tokenIds[i];

      // Skip invalid tokens; no need to cancel the whole tx for 1 failure
      // These are the exact same "require" checks performed in ERC721.sol for standard transfers.
      if (
        (ownerOf(tokenId) != from) ||
        (!_isApprovedOrOwner(from, tokenId)) ||
        (to == address(0))
      ) { continue; }

      _beforeTokenTransfer(from, to, tokenId);

      // Clear approvals from the previous owner
      _approve(address(0), tokenId);

      amountTransferred += 1;
      _owners[tokenId] = to;

      emit Transfer(from, to, tokenId);

      _afterTokenTransfer(from, to, tokenId);
    }

    // We can save a bit of gas here by updating these state-vars atthe end
    _balances[from] -= amountTransferred;
    _balances[to] += amountTransferred;
  }

}