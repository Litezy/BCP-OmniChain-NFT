// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@layerzerolabs/solidity-examples/contracts/token/onft721/ONFT721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OmnichainNFT is ONFT721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 minGasToTransfer,
        address lzEndpoint
    ) ONFT721(name_, symbol_, minGasToTransfer, lzEndpoint) {}

    function mint() external {
        uint256 newId = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(msg.sender, newId);
    }
}
