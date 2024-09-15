//  /src/web3.js - used to setup web3.js

import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
  console.log("MetaMask not detected");
}

const getTransactionReceipt = async(txHash) =>{
  const receipt = await web3.the.getTransactionReceipt(txHash);
  console.log('Transaction Receipt:',receipt);
};

export default web3;
