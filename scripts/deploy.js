const { ethers, run, network } = require("hardhat");
const {
  TASK_COMPILE_SOLIDITY_HANDLE_COMPILATION_JOBS_FAILURES,
} = require("hardhat/builtin-tasks/task-names");

require("dotenv").config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log(`The Contract address is ${simpleStorage.address}`);
  //0x2aBAA29219d59aB442A678482d868449d5B3bc9e

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is ${currentValue}`);

  const transactionResponse = await simpleStorage.store(16);
  await transactionResponse.wait(1);

  console.log(` Now Current Value is ${await simpleStorage.retrieve()}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying Contract");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err) {
    console.log(err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
