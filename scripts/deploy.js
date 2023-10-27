const hre = require("hardhat");
const { ethers } = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalance(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const { timestamp, name, from, message } = memo;
    console.log(timestamp, name, from, message);
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const coffee = await hre.ethers.getContractFactory("main");
  const contract = await coffee.deploy(); // instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [owner.address, from1.address];
  console.log("Before buying Coffee");

  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buyCoffee("from1", "Very nice Coffee", amount);
  await contract.connect(from2).buyCoffee("from2", "Very nice Coffee", amount);
  await contract.connect(from3).buyCoffee("from3", "Very nice Coffee", amount);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
