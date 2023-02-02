import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Play from "./components/Play";
import Game from "./components/Game";
import Footer from "./components/Footer";
import SliderInput from "./components/SliderInput";
import { useMetaMask } from "metamask-react";

if (window.ethereum) {
  // Do something
} else {
  alert("install metamask extension!!");
}

window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
  // Return the address of the wallet
  console.log(res);
});

function App() {
  function WrongNetwork() {
    const { switchChain } = useMetaMask();
    // Request a switch to Ethereum Mainnet
    return (
      <button onClick={() => switchChain("0x1")}>
        Switch to Ethereum Mainnet
      </button>
    );
  }

  const [myChoice, setMyChoice] = useState("");
  const [score, setScore] = useState(0);

  const {
    status,
    connect,
    account,
    chainId,
    chainName,
    ethereum,
  } = useMetaMask();

  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available :(</div>;

  if (status === "notConnected")
    return <button onClick={connect}>Connect to MetaMask</button>;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected")
    return (
      <>
        <div className="container">
          <Header score={score} />
          <div className="account-info">
            <br />
            <span>Account: {account}</span>
          </div>
          <SliderInput />
          <Switch>
            <Route exact path="/">
              <Play setMyChoice={setMyChoice} />
            </Route>
            <Route path="/game">
              <Game myChoice={myChoice} score={score} setScore={setScore} />
            </Route>
          </Switch>
        </div>

        <Footer />
      </>
    );
}

export default App;
