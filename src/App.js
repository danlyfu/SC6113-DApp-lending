import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom'; 
import web3 from './web3';
import './App.css';
import contractABI from './abis/DecentralizedLendingABI.json';
import RequestLoan from './RequestLoan';
import RepayLoan from './RepayLoan';
import FundLoan from './FundLoan';

const contractAddress = "0x67f4c10C2C1101AAD8F7b02E2284deC633A93d7A";  //v1
const contract = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const [account, setAccount] = useState('');
  const [role, setRole] = useState(''); // choose a role: borrower or lender
  const [message, setMessage] = useState('');

  // MetaMask login functionality
  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);  // store user account in state 
        setMessage('Login successful.');
      } catch (error) {
        console.error(error);
        setMessage('Failed to login. Please try again.');
      }
    } else {
      setMessage('MetaMask is not installed.');
    }
  };

  // Logout functionality with navigation to login page
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setAccount(''); // clear account information 
    setRole('');    // Clear role 
    setMessage('Logged out successfully.');
    navigate('/');  // Navigate back to login page
  };

  return (
    <div className="container">
      <h1>P2P Lending on Sepolia</h1>
      <p>Connected Account: {account || 'Not connected'}</p>

     {/* Login button - shown if the user is not logged in */}
      {!account && (
        <button onClick={handleLogin} className="login-button">
          Log In with MetaMask
        </button>
      )}

       {/* Logout button - shown if the user is logged in */}
      {account && (
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      )}

      {/* Choose a role */}
      {account && (
        <div>
          <button onClick={() => setRole('borrower')}>I am a Borrower</button>
          <button onClick={() => setRole('lender')}>I am a Lender</button>
        </div>
      )}

      {/* Borrower actions */}
      {role === 'borrower' && (
        <div className="borrower-actions">
          <h2>Borrower Actions</h2>
          <ul>
            <li><Link to="/request-loan">Request Loan</Link></li>
            <li><Link to="/repay-loan">Repay Loan</Link></li>
          </ul>
        </div>
      )}

      {/* Lender actions */}
      {role === 'lender' && (
        <div className="lender-actions">
          <h2>Lender Actions</h2>
          <Link to="/fund-loan">Fund Loan</Link>
        </div>
      )}

      {/* Route configuration */}
      <Routes>  
        <Route path="/request-loan" element={<RequestLoan contract={contract} account={account} setMessage={setMessage} />} />
        <Route path="/repay-loan" element={<RepayLoan contract={contract} account={account} setMessage={setMessage} />} />
        <Route path="/fund-loan" element={<FundLoan contract={contract} account={account} setMessage={setMessage} />} />
      </Routes>

      {message && <p>{message}</p>}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
