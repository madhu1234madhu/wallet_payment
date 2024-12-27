import React, { useEffect, useState } from "react";
import { fetchBalance, makeTransaction } from "../services/api";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactionData, setTransactionData] = useState({ sender: "", receiver: "", amount: "" });

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const response = await fetchBalance();
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    loadBalance();
  }, []);

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await makeTransaction(transactionData);
      alert("Transaction successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Current Balance: ₹{balance}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="sender" placeholder="Sender" onChange={handleChange} />
        <input type="text" name="receiver" placeholder="Receiver" onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
        <button type="submit">Make Transaction</button>
      </form>
    </div>
  );
};

export default Dashboard;
