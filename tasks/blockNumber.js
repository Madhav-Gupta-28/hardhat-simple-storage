// const { ethers } = require("hardhat");
const { task } = require("hardhat/config");

task("block-number", "Print the current block Number").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();

    console.log(`Current Block Number is ${blockNumber}`);
  }
);

module.exports = {};
