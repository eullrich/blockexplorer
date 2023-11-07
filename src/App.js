import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockTransactions, setBlockTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);

      // Call the function to get block transactions
      getBlockTransactions(blockNumber);
    }

    getBlockNumber();
  }, []);

  // New function to get block transactions
  async function getBlockTransactions(blockNumber) {
    try {
      const blockData = await alchemy.core.getBlockWithTransactions(blockNumber);

      // Extract the transactions from the block data
      const transactions = blockData.transactions;

      setBlockTransactions(transactions);
    } catch (error) {
      console.error('Error fetching block transactions:', error);
    }
  }

  return (
    <div className="App">
      <div>Block Number: {blockNumber}</div>
      <div>
        <h2>Block Transactions:</h2>
        <ul>
          {blockTransactions.map((transaction, index) => (
            <li key={index}>{transaction.hash}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;