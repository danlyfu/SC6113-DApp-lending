import React, { useState } from 'react';
import web3 from './web3';

function RequestLoan({ contract, account, setMessage }) {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState(5); // // Default interest rate is 5%
  const [duration, setDuration] = useState(30); //  Default duration is 30 days

  // Initiate a loan request
  const requestLoan = async () => {
    try {
      setMessage('Processing loan request...');

      // Convert amount to wei, convert duration to seconds
      const transaction = await contract.methods.requestLoan(
        web3.utils.toWei(amount, 'ether'),  // Convert ETH to wei
        interestRate,                       // Interest rate passed as integer, 5 means 5%
        duration * 24 * 60 * 60             // Convert days to seconds
      ).send({ from: account });

      setMessage(`Loan requested successfully!   Transaction Hash: ${transaction.transactionHash}`);
      console.log('Transaction Hash:', transaction.transactionHash);
    } catch (error) {
      setMessage('Error requesting loan. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Request Loan</h2>
      <div>
        <label>Loan Amount (ETH): </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter loan amount in ETH"
        />
      </div>

      <div>
        <label>Interest Rate (%): </label>
        <input
          type="text"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
        />
      </div>

      <div>
        <label>Duration (days): </label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration in days"
        />
      </div>

      <button onClick={requestLoan}>Request Loan</button>
    </div>
  );
}

export default RequestLoan;
