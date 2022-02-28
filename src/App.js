import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import { Header, DataList } from './components';
import Dashboard from './domains/dashboard/Dashboard';

import * as api from './services/Api';
import { useAuth } from './services/context/AuthContext';
import './App.css';

const App = () => {
  const { user } = useAuth();
  const trendingCoins = api.getTrendingAssets();
  const assets = api.getAssets();
  const contactsList = api.getContacts();
  const [lastTransactions, setLastTransactions] = useState([]);

  const onSubmitTransaction = () => {
    const transactions = api.getLastTransactions(user.hash);
    const slicedArray = transactions.slice(0, 5);

    setLastTransactions(slicedArray);
  }

  useEffect(() => {
    setLastTransactions(api.getLastTransactions(user?.hash))
  }, [user])

  return (
    <div className="app">
      <Header />
      <Box className="account__container">
        <Dashboard assets={assets} trendingAssets={trendingCoins} lastTransactions={lastTransactions} />

        <div className="dashboard__list-container">
          <div className='dashboard__account-title'>Contact list</div>
          <DataList items={contactsList} onSubmitTransaction={onSubmitTransaction} />
        </div>
      </Box>
    </div>
  );
}

export default App;
