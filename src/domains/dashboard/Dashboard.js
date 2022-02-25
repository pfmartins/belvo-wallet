import { Grid, Paper } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import PriceCheckIcon from '@mui/icons-material/PriceChangeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { useAuth } from '../../services/context/AuthContext';
import './Dashboard.css';

const trendingCoins = [
    { name: 'BTC (bitcoin)', currentValue: 44221.00, statusLast24Hours: '+15' },
    { name: 'MATIC (Polygon)', currentValue: 1.79, statusLast24Hours: '+9.94' },
    { name: 'JST (JUST)', currentValue: 0.005081, statusLast24Hours: '+2.5' },
    { name: 'KDA (Kadena)', currentValue: 8.48, statusLast24Hours: '+23' },
]

const lastTransactions = [
    { id: 123123123, to: 'Norma Oliveira dos Santos', type: 'Sent', asset: 'ETH', totalValue: 4800 },
    { id: 567657, to: 'Isabelle Marques', type: 'Receive', asset: 'BTC', totalValue: 1223 },
    { id: 5345123, to: 'Carlos Macedo', type: 'Send', asset: 'SHIBA', totalValue: 478 },
    { id: 12365456, to: 'Roger Oliveira', type: 'Receive', asset: 'DOGE', totalValue: 2490 },
]

const assets = [
    { name: 'BTC', currentValue: 44223, amount: 14 },
    { name: 'ETH', currentValue: 24.3, amount: 24.3 },
    { name: 'ADA', currentValue: 64.8, amount: 64.8 },
    { name: 'SOL', currentValue: 16.3, amount: 16.3 },
    { name: 'SHIB', currentValue: 1332389, amount: 1332389 },
    { name: 'MANA', currentValue: 24.3, amount: 77 },
]

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <>
            <div className="dashboard__container">
                <div className='dashboard__account-title'>Welcome, <b>{user?.username}</b></div>
                <Grid container sx={{ marginTop: '20px', marginBottom: '40px', gap: '25px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyContent: 'space-around' }}>
                    <Grid item>
                        <Paper elevation={3} className="dashboard__item">
                            <div className="dashboard__item-title">
                                my assets
                                <PieChartIcon />
                            </div>

                            <div className="dashboard__list">
                                <div className="dashboard__list-header">
                                    <div>Name</div>
                                    <div>Current value</div>
                                    <div>Amount</div>
                                </div>
                                {assets.map((item, index) => (
                                    <div key={index} className="dashboard__list-item">
                                        <div>{item.name}</div>
                                        <div>{`$${item.currentValue}`}</div>
                                        <div>{item.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={3} className="dashboard__item">
                            <div className="dashboard__item-title">
                                last transactions
                                <PriceCheckIcon />
                            </div>

                            <div className="dashboard__list">
                                <div className="dashboard__list-header dashboard__list-header--four-columns">
                                    <div >To</div>
                                    <div className="dashboard__list-item--align-right">Type</div>
                                    <div className="dashboard__list-item--align-right">Asset</div>
                                    <div className="dashboard__list-item--align-right">Total</div>
                                </div>

                                {lastTransactions.map((item) => (
                                    <div key={item.id} className="dashboard__list-item dashboard__list-item--four-columns">
                                        <div>{item.to}</div>
                                        <div className="dashboard__list-item--align-right">{item.type}</div>
                                        <div className="dashboard__list-item--align-right">{item.asset}</div>
                                        <div className="dashboard__list-item--align-right">{`$${item.totalValue}`}</div>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={3} className="dashboard__item">
                            <div className="dashboard__item-title">
                                trending
                                <TrendingUpIcon />
                            </div>

                            <div className="dashboard__list">
                                <div className="dashboard__list-header">
                                    <div>Name</div>
                                    <div className="dashboard__list-item--align-right">Price</div>
                                    <div className="dashboard__list-item--align-right">Last 24h</div>
                                </div>

                                {trendingCoins.map((item) => (
                                    <div key={item.name} className="dashboard__list-item">
                                        <div>{item.name}</div>
                                        <div className="dashboard__list-item--align-right"><span>$</span>{item.currentValue}</div>
                                        <div className="dashboard__list-item--align-right">{item.statusLast24Hours}%</div>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Dashboard;