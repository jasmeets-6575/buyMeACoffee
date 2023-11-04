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
  const [account, setAccount] = useState("none");

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

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log("Contract error is ", error);
      }
    };
    connectWallet();
  }, []);

  return (
    <main>
      <p>Connected Account - {account}</p>
      <Buy state={state} />
      <Memos state={state} />
    </main>
  );
}

export default App;
