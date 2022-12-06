// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./libraries/Math.sol";

contract SwapLite {
    uint160 currentPrice = 5000;
    uint160 lowerPrice = 4545;
    uint160 upperPrice = 5500;

    function price() public view returns (int24) {
        return Price.toTick(currentPrice);
    }
}
