import { useState, useEffect, useCallback } from 'react';
import { CONTRACT_ADDRESS } from "./utils/constants";
import { ethers, Contract } from 'ethers';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from './components/FileUpload';
import Display from './components/Display';


const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const initialize = useCallback(async () => {
    let provider = new ethers.BrowserProvider(window.ethereum);
    if (provider) {
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
      setContract(new Contract(CONTRACT_ADDRESS, Upload.abi, signer))
    } else {
      console.log("Provider Empty")
    }
    setProvider(provider);
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      initialize();
      window.ethereum.on("chainChanged", initialize);
      window.ethereum.on("accountsChanged", initialize);
    } else {
      console.log("MetaMask not installed; using read-only defaults")
      // const provider = ethers.getDefaultProvider();
    }
  }, [initialize])

  console.log(account, contract, provider)

  return (
    <main >
      <header className='flex justify-between px-24 items-center py-4 bg-white/5 backdrop-blur-sm shadow'>
        <h1 className='font-semibold tracking-wide text-2xl'>Web 3.0</h1>
        <nav>{account || "Not Connected"}</nav>
      </header>
      <FileUpload {...{ account, contract }} />
      <Display {...{ contract }} />
    </main>
  )
}

export default App