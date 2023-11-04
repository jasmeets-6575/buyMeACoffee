import { ethers } from "hardhat";

const Buy = ({ state }) => {
  const handleBuyCoffee = async (e) => {
    e.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;

    const amount = { value: ethers.parseEther("0.00001") };
    const transaction = await contract.buyCoffee(name, message, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };

  return (
    <>
      <form onSubmit={handleBuyCoffee}>
        <label htmlFor="">Name</label>
        <input type="text" id="name" placeholder="Enter Your Name" />

        <label htmlFor="">Message</label>
        <input type="text" id="message" placeholder="Enter Your Message" />

        <button type="submit">Pay</button>
      </form>
    </>
  );
};
export default Buy;
