import { Grid, Paper } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import PriceCheckIcon from '@mui/icons-material/PriceChangeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { useAuth } from '../../services/context/AuthContext';
import './Dashboard.css';



const Dashboard = (params) => {
    const { assets, lastTransactions, trendingAssets } = params.props;
    const { user } = useAuth();

    return (
        <>
            <div className="dashboard__container">
                <div className="dashboard__account-title">Welcome, <b>{user?.username}</b></div>
                <Grid container className="dashboard__grid">
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

                                {trendingAssets.map((item) => (
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