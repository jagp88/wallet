import React, { useState } from 'react';
import './Navbar.css';
import blockchainImage from './blockchain.png';

export default function Navbar(props) {
  const [accountInfoVisible, setAccountInfoVisible] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const conectarWallet = () => {
    props.conectarWallet();
    setAccountInfoVisible(true);
    setWalletConnected(true); // Cambiar el estado cuando se conecta la wallet
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <img src={blockchainImage} alt="Blockchainverse" className="brand-image" />
        <h1 className="brand-title">Blockchainverse</h1>
      </div>
      <ul className="navbar-options-left">
        <li className="navbar-option">Inicio</li>
        <li className="navbar-option">NTFs</li>
        <li className="navbar-option">Servicios</li>
      </ul>
      {accountInfoVisible && props.account && props.balance && (
        <div className="account-info">
          <p><strong>Dirección de la cuenta:</strong> {props.account}</p>
          <p><strong>Saldo de la cuenta:</strong> {props.balance} ETH</p>
        </div>
      )}
      <button className="connect-button" onClick={conectarWallet}>
        {walletConnected ? 'Wallet Conectada' : 'Conectar Wallet'}
      </button>      
    </nav>
  );
}