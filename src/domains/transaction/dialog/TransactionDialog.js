import React, { useState, useEffect } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';
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
import * as api from '../../../services/Api';
import { useAuth } from '../../../services/context/AuthContext';

import './TransactionDialog.css';

const TransactionDialog = (props) => {
    const { open, handleClose, handleSubmit, transactionType, transactTo, assets } = props;
    const { user } = useAuth();
    const isReceive = transactionType === 'receive';
    const infoAmountDefault = !isReceive ? 'Please select asset to check availability.' : '';
    const [amount, setAmount] = useState('');
    const [selectedAsset, setSelectedAsset] = useState({});
    const [buttonColor, setButtonColor] = useState('');
    const [error, setError] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [amountInfo, setAmountInfo] = useState(infoAmountDefault);
    const [assetError, setAssetError] = useState('');

    const handleCryptoChange = (event) => {
        const asset = event.target.value;
        if (!isReceive) setAmountInfo(`You have ${asset.amount} ${asset.name} available.`);

        setAssetError('');
        setSelectedAsset(asset);
    }

    const handleAmountChange = (event) => {
        const amountSelected = event.target.value;
        if (!isReceive) setAmountInfo(`You have ${selectedAsset.amount} ${selectedAsset.name} available.`)

        setError('');
        if (selectedAsset.amount < amountSelected && !isReceive) {
            setAmountInfo('');
            setDisableSubmit(true);
            setError(`You don't have amount of asset available. Available amount for this asset is ${selectedAsset.amount}.`);
        } else {
            setDisableSubmit(false);
        }

        setAmount(amountSelected);
    }

    const onClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        handleClose();
    }

    const executeTransaction = () => {
        setLoading(true);

        if (!amount || amount <= 0) {
            setError('Please, set a valid amount.');
            return;
        }

        if (!selectedAsset?.name) {
            setAssetError('Please, set a valid asset.');
            return;
        }

        const formData = {
            id: Math.random().toString(36).substr(2, 9),
            to: transactTo,
            type: transactionType,
            from: user.hash,
            asset: selectedAsset.name,
            currentDate: new Date(),
            totalTransaction: (selectedAsset.currentValue * amount).toFixed(2)
        }

        /** Simulate api call */
        setTimeout(() => {
            api.updateLastTransactions(formData);
            handleSubmit();
            setLoading(false);
        }, 2000)
    }

    const resetForm = () => {
        setError('');
        setAmount('');
        setAmountInfo('');
        setSelectedAsset({});
        setLoading(false);
    }

    useEffect(() => {
        isReceive ? setButtonColor('success') : setButtonColor('');
        if (open) resetForm();
    }, [isReceive, open])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {!isReceive && <div><b>Send</b> to {transactTo?.name}</div>}
                {isReceive && <div><b>Receive</b> from {transactTo?.name}</div>}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    To complete this transaction, input the amount and select an asset to {transactionType}.
                </DialogContentText>

                {loading && <div className="form__loader"><CircularProgress size={25} thickness={4} color="inherit" /></div>}
                {!loading &&
                    <div className="transaction__form">
                        <FormControl sx={{ width: '50%' }}>
                            <InputLabel id="asset-label">Asset</InputLabel>
                            <Select
                                autoFocus
                                labelId="asset-label"
                                id="demo-simple-select"
                                value={selectedAsset}
                                label="crypto"
                                onChange={(e) => handleCryptoChange(e)}
                            >
                                <MenuItem value="''">Select</MenuItem>
                                {assets.map((asset, index) => {
                                    return (
                                        <MenuItem key={index} value={asset}>{asset.name}</MenuItem>
                                    )
                                })}
                            </Select>
                            {assetError && <div className='label--error'>{assetError}</div>}
                        </FormControl>

                        <FormControl sx={{ width: '50%' }}>
                            <TextField
                                id="name"
                                label="Amount"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={amount}
                                onChange={handleAmountChange}
                            />
                            {error && <div className='label--error'>{error}</div>}
                            {amountInfo && <div className='label--info'>{amountInfo}</div>}
                        </FormControl>
                    </div>}
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} variant="outlined" startIcon={<CloseIcon />} onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" disabled={disableSubmit || !amount || loading} onClick={executeTransaction} className={`transaction__btn--${buttonColor}`}>
                    {!isReceive && 'Send'}
                    {!isReceive && <UploadIcon />}
                    {isReceive && 'Receive'}
                    {isReceive && <DownloadIcon />}
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default TransactionDialog;