import './App.css';
import { useEffect, useState } from "react";
import idl from "./idl.json";
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import {
  Program,
  web3,
  utils,
  BN
} from "@project-serum/anchor";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      /* Phantom wallet, when connected adds this solana object into your window object */
      /* Retrieves this object */
      const { solana } = window;
      /* Checks if object exists */
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          /* Checks if user is logged in */
          const response = await solana.connect({
            OnlyIfTrusted: true,
          });
          console.log(
            "Connected with public key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log(
        "Connected with publicKey:",
        response.publicKey.toString()
      );
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => {
    <button onClick={connectWallet}>Connect to wallet.</button>
  };
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return <div className='App'>{!walletAddress && renderNotConnectedContainer()}</div>;
};

export default App;
