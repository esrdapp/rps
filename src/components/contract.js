// contract.js
import web3 from "./web3";

const address = "0xa20C4cED36417a0ec1Ddb648f30972bfa2084fa8"; // Replace with the address of the deployed contract
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum RockPaperScissors.Result",
        name: "result",
        type: "uint8",
      },
    ],
    name: "GameResult",
    type: "event",
  },
  {
    inputs: [],
    name: "paper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "scissors",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;
