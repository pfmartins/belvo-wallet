
import DataList from './components/data-list/DataList';
import Dashboard from './domains/dashboard/Dashboard';
import Header from './components/header/Header';
import Box from '@mui/material/Box';
import * as api from './services/Api';

import './App.css';

const App = () => {
  const trendingCoins = api.getTrendingAssets();
  const assets = api.getAssets();
  const lastTransactions = api.getLastTransactions();
  const contactsList = api.getContacts();

  return (
    <div className="app">
      <Header />
      <Box className="account__container">
        <Dashboard props={{ assets, trendingAssets: trendingCoins, lastTransactions }} />

        <div style={{ width: '80%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div className='dashboard__account-title'>Contact list</div>
          <DataList items={contactsList} />
        </div>
      </Box>
    </div>
  );
}

export default App;
