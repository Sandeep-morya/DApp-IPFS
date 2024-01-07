// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Upload {
    // address payable public owner;
    address public owner;

    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) public values;
    mapping(address => Access[]) public accessList;
    mapping(address => mapping(address => bool)) public ownership;

    // event Withdrawal(uint amount, uint when);

    constructor() payable {
        // owner = payable(msg.sender);
        owner = msg.sender;
    }

    // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
    // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

    function addImageURL(string memory token) public {
        values[msg.sender].push(token);
    }

    function showImages() external view returns (string[] memory) {
        return values[msg.sender];
    }

    function updateOwnership(
        address owners,
        address user,
        bool status
    ) private {
        uint maxLength = accessList[owners].length;
        for (uint i = 0; i < maxLength; i++) {
            if (accessList[owner][i].user == user) {
                accessList[owner][i].access = status;
                break;
            }
        }
    }

    function giveAccess(address user) public {
        if (ownership[msg.sender][user]) {
            updateOwnership(msg.sender, user, true);
        } else {
            accessList[msg.sender].push(Access(user, true));
            ownership[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        updateOwnership(msg.sender, user, false);
    }

    function showAccessList(
        address user
    ) public view returns (Access[] memory) {
        require(msg.sender == user || ownership[msg.sender][user]);
        return accessList[user];
    }
}
