// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC721Tradable.sol";

contract QXS is ERC721Tradable {
    constructor(
        address _proxyRegistryAddress
    ) ERC721Tradable('QXS ERC721 minter', 'QXS', _proxyRegistryAddress) {}

    function baseTokenURI() public pure override returns (string memory) {
        return "https://eth.iwahi.com/qxs/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://eth.iwahi.com/qxs/contract/";
    }
}
