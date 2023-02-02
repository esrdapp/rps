// Game.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import contract from "./contract";

const Game = ({ score, myChoice, setScore, accounts }) => {
  const [house, setHouse] = useState("");
  const [playerWin, setPlayerWin] = useState("");

  const [counter, setCounter] = useState(3);

  const [isMetaMask, setIsMetaMask] = useState(false);
  const [account, setAccount] = useState(null);

  const newHousePick = () => {
    const choices = ["rock", "paper", "scissors"];
    setHouse(choices[Math.floor(Math.random() * 3)]);
  };

  useEffect(() => {
    newHousePick();
  }, []);

  const Result = () => {
    if (myChoice === "rock" && house === "scissors") {
      setPlayerWin("win");
      setScore(score + 1);
    } else if (myChoice === "rock" && house === "paper") {
      setPlayerWin("lose");
      setScore(score - 1);
    } else if (myChoice === "scissors" && house === "paper") {
      setPlayerWin("win");
      setScore(score + 1);
    } else if (myChoice === "scissors" && house === "rock") {
      setPlayerWin("lose");
      setScore(score - 1);
    } else if (myChoice === "paper" && house === "rock") {
      setPlayerWin("win");
      setScore(score + 1);
    } else if (myChoice === "paper" && house === "scissors") {
      setPlayerWin("lose");
      setScore(score - 1);
    } else {
      setPlayerWin("draw");
    }
  };

  useEffect(() => {
    const timer =
      counter > 0
        ? setInterval(() => {
            setCounter(counter - 1);
          }, 1000)
        : Result();

    return () => {
      clearInterval(timer);
    };
  }, [counter, house]);

  // useEffect(() => {
  //   const checkMetaMask = async () => {
  //     if (typeof window.ethereum !== "undefined") {
  //       window.ethereum.autoRefreshOnNetworkChange = false;
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       web3.eth.defaultAccount = accounts[0];
  //       setAccount(accounts[0]);
  //       setIsMetaMask(true);
  //     } else {
  //       setIsMetaMask(false);
  //     }
  //   };
  //   checkMetaMask();
  // }, []);

  // useEffect(() => {
  //   play({ myChoice });
  // }, [myChoice]);

  // const [result, setResult] = useState("");

  // const play = async (myChoice) => {
  //   try {
  //     const accounts = await web3.eth.getAccounts();
  //     const res = await contract.methods[myChoice]().call({
  //       from: accounts[0],
  //     });
  //     setResult(res);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  /*

  const [result, setResult] = useState("");

  const handleClick = async (functionName) => {
    try {
      const functionToCall = contract.methods[functionName];
      await functionToCall().send({ from: account });
    } catch (err) {
      console.error(err);
    }
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

  */

  return (
    <div className="game">
      <div className="game__you">
        <span className="text">You Picked</span>
        <div
          className={`icon icon--${myChoice} ${
            playerWin == "win" ? `icon icon--${myChoice}--winner` : ""
          }`}
        ></div>
      </div>
      {playerWin == "win" && (
        <div className="game__play">
          <span className="text">You Win</span>
          <Link to="/" className="play-again" onClick={() => setHouse()}>
            Play Again
          </Link>
        </div>
      )}
      {playerWin == "lose" && (
        <div className="game__play">
          <span className="text">You Lose</span>
          <Link to="/" className="play-again" onClick={() => setHouse()}>
            Play Again
          </Link>
        </div>
      )}
      {playerWin == "draw" && (
        <div className="game__play">
          <span className="text">Draw</span>
          <Link to="/" className="play-again" onClick={() => setHouse()}>
            Play Again
          </Link>
        </div>
      )}

      <div className="game__house">
        <span className="text">The House Picked</span>
        {counter == 0 ? (
          <div
            className={`icon icon--${house} ${
              playerWin == "lose" ? `icon icon--${house}--winner` : ""
            }`}
          ></div>
        ) : (
          <div className="counter">{counter}</div>
        )}
      </div>
    </div>
  );
};

export default Game;

/*

    <div>
      <button onClick={() => handleClick("rock")}>Rock</button>
      <button onClick={() => handleClick("paper")}>Paper</button>
      <button onClick={() => handleClick("scissors")}>Scissors</button>
      <br />
      <br />
      <h2>{result}</h2>
    </div>

      );
};

*/
