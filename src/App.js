
import DataList from './components/data-list/DataList';
import Dashboard from './domains/dashboard/Dashboard';
import Header from './components/header/Header';
import Box from '@mui/material/Box';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Box className="account__container">
        <Dashboard />

        <div style={{ width: '80%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div className='dashboard__account-title'>Contact list</div>
          <DataList />
        </div>
      </Box>
    </div>
  );
}

export default App;
