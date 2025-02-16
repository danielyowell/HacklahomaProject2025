// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YesContract {
    function isYes(string memory _input) public pure returns (bool) {
        bytes memory inputBytes = bytes(_input);
        bytes memory yesBytes = bytes("YES");

        if (inputBytes.length != yesBytes.length) {
            return false;
        }

        for (uint i = 0; i < inputBytes.length; i++) {
            if (inputBytes[i] != yesBytes[i] && inputBytes[i] != yesBytes[i] + 32) {
                return false;
            }
        }

        return true;
    }
}
