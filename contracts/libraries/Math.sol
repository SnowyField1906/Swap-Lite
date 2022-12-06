pragma solidity ^0.8.4;

library FixedPoint {
    uint8 internal constant RESOLUTION = 96;
    uint256 internal constant Q96 = 0x1000000000000000000000000;
    uint256 internal constant Q128 = 0x100000000000000000000000000000000;
}

library Calculation {
    function div_roundingUp(uint256 x, uint256 y)
        internal
        pure
        returns (uint256 res)
    {
        assembly {
            res := add(div(x, y), gt(mod(x, y), 0))
        }
    }

    function mulDiv_roundingUp(
        uint256 x,
        uint256 y,
        uint256 z
    ) internal pure returns (uint256 res) {
        res = div_roundingUp(x * y, z);
        if (mulmod(x, y, z) > 0) {
            require(res < type(uint256).max);
            res++;
        }
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
