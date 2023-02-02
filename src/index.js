import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles.scss";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { MetaMaskProvider } from "metamask-react";

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

var mountNode = document.getElementById("app");
ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </ApolloProvider>
  </Router>,
  mountNode
);
