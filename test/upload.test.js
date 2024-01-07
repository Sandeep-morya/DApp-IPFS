const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Testing upload.sol", function () {
    let uploadContract;
    let accounts;
    this.beforeAll(async () => {
        accounts = await ethers.getSigners();
        uploadContract = await (await ethers.getContractFactory("Upload")).deploy();
    });

    it("Contract is deployed and initialized owner", async () => {
        const owner = await uploadContract.owner();
        expect(owner).to.be.equal("dfsf")
    });

});