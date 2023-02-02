import React, { useState } from "react";
import { Link } from "react-router-dom";
import Triangle from "../images/bg-triangle.svg";
import contract from "./contract";
import web3 from "./web3";

if (window.ethereum) {
  // Do something
} else {
  alert("install metamask extension!!");
}

window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
  // Return the address of the wallet
  console.log(res);
});

function Play({ myChoice, setMyChoice, account }) {
  const [result, setResult] = useState(null);
  const [playChoice, setPlayChoice] = useState("");
  const [state, setState] = useState("");
  const [selection, setSelection] = useState("");

  const setChoice = (e) => {
    // e.preventDefault();
    setMyChoice(e.target.dataset.id);
    setPlayChoice(e.target.dataset.id);
    console.log(`choice is ${e.target.dataset.id}`);
    callContract();
  };

  const callContract = () => {
    if (setPlayChoice == "rock") {
      callRock();
    } else if (setPlayChoice == "paper") {
      callPaper();
    } else if (setPlayChoice == "scissors") {
      callScissors();
    } else return;
  };

  const callRock = async () => {
    try {
      setState({ message: "Waiting on transaction success..." });
      const accounts = await web3.eth.getAccounts();
      await contract.methods.rock().send({
        from: accounts[0],
        value: web3.utils.toWei("1", "ether"),
      });
      setSelection({ message: "rock" });
    } catch (err) {
      setState({ errorMessage: err.message });
    }
  };

  const callPaper = async () => {
    setState({ message: "Waiting on transaction success..." });
    const accounts = await web3.eth.getAccounts();
    await contract.methods.paper().send({
      from: accounts[0],
      value: web3.utils.toWei("1", "ether"),
    });
    setState({ message: "paper" });
  };

  const callScissors = async () => {
    setState({ message: "Waiting on transaction success..." });
    const accounts = await web3.eth.getAccounts();
    await contract.methods.scissors().send({
      from: accounts[0],
      value: web3.utils.toWei("1", "ether"),
    });
    setState({ message: "scissors" });
  };

  contract.events.GameResult({}, (error, event) => {
    if (error) {
      console.error(error);
    } else {
      switch (event.returnValues.result) {
        case "0":
          setResult("You won!");
          break;
        case "1":
          setResult("You lost.");
          break;
        case "2":
          setResult("It's a draw!");
          break;
        default:
          break;
      }
    }
  });

  return (
    <div className="play">
      <span>{setState.errorMessage}</span>
      <img src={Triangle} alt="" className="triangle" />
      <div className="items">
        <Link to="/">
          <div
            data-id="paper"
            onClick={setChoice}
            className="icon icon--paper"
          ></div>
        </Link>
        <Link to="/">
          <div
            data-id="scissors"
            onClick={setChoice}
            className="icon icon--scissors"
          ></div>
        </Link>
        <Link to="/">
          <div
            data-id="rock"
            onClick={setChoice}
            className="icon icon--rock"
          ></div>
        </Link>
      </div>
    </div>
  );
}

export default Play;
