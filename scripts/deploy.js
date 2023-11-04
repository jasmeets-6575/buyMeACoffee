const { ethers } = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
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
  const [owner, from1, from2, from3] = await ethers.getSigners();
  const coffee = await ethers.getContractFactory("Chai");
  const contract = await ethers.deployContract("Chai"); // instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before buying Coffee");

  await consoleBalances(addresses);

  const amount = { value: ethers.parseEther("1") };
  await contract.connect(from1).buyCoffee("from1", "Very nice Coffee", amount);
  await contract.connect(from2).buyCoffee("from2", "Very nice Coffee", amount);
  await contract.connect(from3).buyCoffee("from3", "Very nice Coffee", amount);

  console.log("after buying Coffee");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
