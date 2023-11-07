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
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    async function getBlockNumber() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);

      // Call the function to get block transactions
      getBlockTransactions(blockNumber);
    }

    getBlockNumber();
  }, []);

  async function getBlockTransactions(blockNumber) {
    try {
      const blockData = await alchemy.core.getBlockWithTransactions(blockNumber);
      const transactions = blockData.transactions;
      setBlockTransactions(transactions);
    } catch (error) {
      console.error('Error fetching block transactions:', error);
    }
  }

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="App">
      <div>Block Number: {blockNumber}</div>
      <div>
        <h2>Block Transactions:</h2>
        <ul>
          {blockTransactions.map((transaction, index) => (
            <li key={index}>
              <button onClick={() => handleTransactionClick(transaction)}>
                View Transaction {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedTransaction && (
        <div>
          <h2>Selected Transaction Details:</h2>
          <pre>{JSON.stringify(selectedTransaction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
