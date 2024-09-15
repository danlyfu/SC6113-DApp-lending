// FundLoan.js
import React, { useState } from 'react';
import web3 from './web3';

function FundLoan({ contract, account, setMessage }) {
  const [loanId, setLoanId] = useState('');
  const [amount, setAmount] = useState('');

  const fundLoan = async () => {
    try {
      setMessage('Processing funding...');
      await contract.methods.fundLoan(loanId).send({
        from: account,
        value: web3.utils.toWei(amount, 'ether'),
      });
      setMessage('Loan funded successfully!');
    } catch (error) {
      setMessage('Error funding loan. Please try again.');
    }
  };

  return (
    <div>
      <h2>Fund Loan</h2>
      <input
        type="text"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        placeholder="Loan ID"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Funding Amount (ETH)"
      />
      <button onClick={fundLoan}>Fund Loan</button>
    </div>
  );
}

export default FundLoan;
