import React from "react";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header } from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

// Put your address here
const OWNER_ADDRESS = "0xaa55b756Cc30EebB2728Fe5d43d334625e0A0b4c";
const OFFSET_URL = "";

const amuletsToMint = [
  {
    title: "Karma",
    amulet: `WHAT GOES AROUND COMES AROUND`,
  },
  {
    title: "One",
    amulet: `"Oh please God help me" – Metallica`,
  },
  {
    title: "The customer is always right",
    amulet: `The customer is always right`,
  },
  {
    title: "Shakespeare",
    amulet: `Bloody thou art; bloody will be thy end.`,
  },
  {
    title: "The famous amulet",
    amulet: `The famous amulet.`,
  },
  {
    title: "The omnipresent amulet",
    amulet: `Omnipresent`,
  },
];

async function mintAmulets() {
  const provider = new Web3Provider(window.ethereum);
  const amulet = new Contract(addresses.amulet, abis.amulet, provider);

  const res = await amulet.mintAndRevealAll(
    amuletsToMint.map((data) => ({
      ...data,
      offsetURL: OFFSET_URL,
      owner: OWNER_ADDRESS,
    }))
  );

  console.log({ res });
}

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

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
