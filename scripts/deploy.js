const hardhat = require("hardhat");
(async () => {
    try {
        const uploadContract = await hardhat.ethers.deployContract("Upload")
        await uploadContract.waitForDeployment();
        console.log(`Uplaod.sol is deployed to ${uploadContract.target}`);
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
})();
