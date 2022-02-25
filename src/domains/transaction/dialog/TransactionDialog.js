import React, { useState, useEffect } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


// import {
//     InputLabel,
//     // MenuItem,
//     // FormControl,
//     // Select,
//     // Dialog,
//     // DialogActions,
//     // DialogContent,
//     // DialogContentText,
//     // DialogTitle,
//     // TextField,
//     // Button,
//     // SendIcon
// } from './MaterialUi';
import './TransactionDialog.css';

const TransactionDialog = (props) => {
    const { open, handleClose, transactionType, user } = props;
    const [amount, setAmount] = useState('');
    const [crypto, setCrypto] = useState('');
    const [buttonColor, setButtonColor] = useState('');

    const handleCryptoChange = (event) => {
        setCrypto(event.target.value);
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const onClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        handleClose();
    }

    const executeTransaction = () => {
        if (!amount || amount <= 0) {
            console.log('errorsadsdas')
        }
        console.log('amount', amount)
        console.log('crypto', crypto)
    }

    useEffect(() => {
        if (transactionType === 'send') setButtonColor('');
        if (transactionType === 'receive') setButtonColor('success');
    }, [transactionType])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {transactionType === 'send' && <div><b>Send</b> to {user?.name}</div>}
                {transactionType === 'receive' && <div><b>Receive</b> from {user?.name}</div>}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    To complete this transaction, input the amount and select an asset to {transactionType}.
                </DialogContentText>

                <div className="transaction__form">
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="asset-label">Asset</InputLabel>
                        <Select
                            autoFocus
                            labelId="asset-label"
                            id="demo-simple-select"
                            value={crypto}
                            label="crypto"
                            onChange={handleCryptoChange}
                        >
                            <MenuItem value="''">Select</MenuItem>
                            <MenuItem value='ETH'>ETH (Etherum)</MenuItem>
                            <MenuItem value='BTC'>BTC (Bitcoin)</MenuItem>
                            <MenuItem value='ADA'>ADA (Cardano)</MenuItem>
                            <MenuItem value='SOL'>SOL (Solana)</MenuItem>
                            <MenuItem value='DOGE'>DOGE (Dogecoin)</MenuItem>
                            <MenuItem value='CRO'>CRO (Crypto.com)</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: '50%' }}>
                        {/* <InputLabel id="demo-simple-select-label">Amount</InputLabel> */}
                        <TextField
                            id="name"
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={executeTransaction} className={`transaction__btn--${buttonColor}`}>
                    {transactionType === 'send' && 'Send'}
                    {transactionType === 'receive' && 'Receive'}
                    {transactionType === 'send' && <UploadIcon />}
                    {transactionType === 'receive' && <DownloadIcon />}
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default TransactionDialog;