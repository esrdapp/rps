import React from "react";
import { useWeb3React } from "@web3-react/core";

const AccountInfo = () => {
  const { active, account } = useWeb3React();

  return (
    <div className="account-info">
      <span>Connection Status: {active}</span>
      <br />
      <span>Account: {account}</span>
    </div>
  );
};

export default AccountInfo;
