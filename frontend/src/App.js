import './App.css';
import { useEffect } from "react";

const App = () => {
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
        }
      } else {
        alert("Solana object not found!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [])
}

export default App;
