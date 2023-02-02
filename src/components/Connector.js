import React from "react";

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

import { useWeb3React } from "@web3-react/core";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://hpbnode.com`,
  appName: "DAP Game",
  supportedChainIds: [269],
});

const WConnect = new WalletConnectConnector({
  rpcUrl: `https://hpbnode.com`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [269],
});

const refreshState = () => {
  setAccount();
  setChainId();
};

/*const disconnect = async () => {
  await web3Modal.clearCachedProvider();
  refreshState();
};
*/

function Connector() {
  const { activate, deactivate } = useWeb3React();
  const { active, account } = useWeb3React();

  return (
    <>
      <div className="connector">
        <div className="connector-input-container">
          <button
            className="submit-button-connect"
            onClick={() => {
              activate(CoinbaseWallet);
            }}
          >
            Coinbase Wallet
          </button>
        </div>
        <div>
          <button
            className="submit-button-connect"
            onClick={() => {
              activate(Injected);
            }}
          >
            Metamask
          </button>
        </div>

        <button
          className="submit-button-connect"
          onClick={() => {
            activate(WConnect);
          }}
        >
          Wallet Connect
        </button>

        <button onClick={deactivate}>Disconnect</button>
      </div>

      <div className="account-info">
        <span>Connection Status: {active}</span>
        <br />
        <span>Account: {account}</span>
      </div>
    </>
  );
}

export default Connector;
