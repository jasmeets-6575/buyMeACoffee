import abi from "./contracts/Chai.json";
import { ethers } from "hardhat";
import { useState, useEffect } from "react";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {
        console.log("Contract error is ", error);
      }
    };
    connectWallet();
  }, []);

  return (
    <main>
      <Buy state={state} />
      <Memos state={state} />
    </main>
  );
}

export default App;
