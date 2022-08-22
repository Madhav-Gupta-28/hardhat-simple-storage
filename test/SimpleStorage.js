const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favourite number 0 ", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should Update the value when we call store function", async function () {
    const transactionResponse = await simpleStorage.store(5);
    await transactionResponse.wait(1);

    const updatedValue = await simpleStorage.retrieve();

    expectedValuie = "5";

    assert.equal(updatedValue.toString(), expectedValuie);
  });
});
