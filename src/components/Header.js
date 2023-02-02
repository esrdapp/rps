import React from "react";
import { useWeb3React } from "@web3-react/core";

const Header = ({ score }) => {
  const { active, account } = useWeb3React();

  return (
    <div className="header">
      <div className="text">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
      </div>
      <div className="score-box">
        <span>ETH</span>
        <div className="score-box__score">{score}</div>
      </div>
    </div>
  );
};

export default Header;
