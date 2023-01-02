import './App.css';
import { useEffect ,useState } from "react";
import { set } from '@project-serum/anchor/dist/cjs/utils/features';

const App = () => {
  const {walletAdress, setWalletAdress} = useState(null);
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
          setWalletAdress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const connectWallet = async () => { };

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
  return <div className='App'>{renderNotConnectedContainer()}</div>;
};

export default App;
