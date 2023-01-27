import React, { useCallback, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TransactionContext } from './context';

function App() {
  const { connectWallet, connectedAcc, formData, setFormData, sendTransaction } = useContext(TransactionContext)

  const handleSubmit = () => {
    const { address, amount, keyword, message } = formData;
    if (!address || !amount || !keyword || !message) return;
    sendTransaction()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {!connectedAcc && <button onClick={() => connectWallet()} className='btnSend'>Connect Wallet</button>}
      <input onChange={(e) => setFormData({ ...formData, address: e.target.value })} className='inputHolder' placeholder='Address to' />
      <input onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className='inputHolder' type={"number"} placeholder='Amount (ETH)' />
      <input onChange={(e) => setFormData({ ...formData, keyword: e.target.value })} className='inputHolder' placeholder='Keyword' />
      {/* <input onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} className='inputHolder' placeholder='Twitter' /> */}
      <input onChange={(e) => setFormData({ ...formData, message: e.target.value })} className='inputHolder' placeholder='Message' />
      <button onClick={() => handleSubmit()} className='btnSend'>Send Now</button>
    </div>
  );
}

export default App;