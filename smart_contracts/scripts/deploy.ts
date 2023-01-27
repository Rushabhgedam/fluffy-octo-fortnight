import {ethers} from "hardhat";

const main = async () => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const Transaction = await ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();
  await transaction.deployed();
  console.log(`Transaction with 1 ETH and unlock timestamp ${unlockTime} deployed to ${transaction.address}`);
}


const runMain = async () => {
  try {
    await main();
    process.exit(0)
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}


runMain()