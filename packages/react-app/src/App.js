import React from "react";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { WalletButton } from "./components/WalletButton";
import { Body, Button, Header } from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";

// Put your address here
const OWNER_ADDRESS = "";
const OFFSET_URL = "";

const amuletsToMint = [
  {
    title: "",
    amulet: "",
  },
];

async function mintAmulets() {
  const provider = new Web3Provider(window.ethereum);
  const amulet = new Contract(addresses.amulet, abis.amulet, provider.getSigner());

  const res = await amulet.mintAndRevealAll(
    amuletsToMint.map((data) => ({
      ...data,
      offsetURL: OFFSET_URL,
      owner: OWNER_ADDRESS,
    }))
  );

  console.log({ res });
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <Button onClick={() => mintAmulets()}>Mint amulets</Button>
      </Body>
    </div>
  );
}

export default App;
