import React from "react";
import { useWeb3React } from "@web3-react/core";
import { getDefaultProvider } from "@ethersproject/providers";
import useWeb3Modal from "../hooks/useWeb3Modal";

const WalletButtonProvider = () => {
  function WalletButton() {
    const [account, setAccount] = useState("");
    const [rendered, setRendered] = useState("");

    const { loading, error, data } = useQuery(GET_TRANSFERS);
    const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

    useEffect(() => {
      if (!loading && !error && data && data.transfers) {
        console.log({ transfers: data.transfers });
      }
    }, [loading, error, data]);

    useEffect(() => {
      async function fetchAccount() {
        try {
          if (!provider) {
            return;
          }

          // Load the user's accounts.
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);

          // Resolve the ENS name for the first account.
          const name = await provider.lookupAddress(accounts[0]);

          // Render either the ENS name or the shortened account address.
          if (name) {
            setRendered(name);
          } else {
            setRendered(
              account.substring(0, 6) + "..." + account.substring(36)
            );
          }
        } catch (err) {
          setAccount("");
          setRendered("");
          console.error(err);
        }
      }
      fetchAccount();
    }, [account, provider, setAccount, setRendered]);

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
        {rendered === "" && "Connect Wallet"}
        {rendered !== "" && rendered}
      </Button>
    );
  }

  return (
    <div>
      <WalletButton
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
    </div>
  );
};

export default WalletButtonProvider;
