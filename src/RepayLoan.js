// RepayLoan.js
import React, { useState } from 'react';
import web3 from './web3';

function RepayLoan({ contract, account, setMessage }) {
  const [loanId, setLoanId] = useState('');
  const [amount, setAmount] = useState('');

  // 借款人还款
  const repayLoan = async () => {
    try {
      setMessage('Processing repayment...');
      await contract.methods.repayLoan(loanId).send({
        from: account,
        value: web3.utils.toWei(amount, 'ether'),
      });
      setMessage('Loan repaid successfully!');
    } catch (error) {
      setMessage('Error repaying loan. Please try again.');
    }
  };

  return (
    <div>
      <h2>Repay Loan</h2>
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
        placeholder="Repayment Amount (ETH)"
      />
      <button onClick={repayLoan}>Repay Loan</button>
    </div>
  );
}

export default RepayLoan;
