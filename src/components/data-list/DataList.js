import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import Paper from '@mui/material/Paper';
import TransactionDialog from '../../domains/transaction/dialog/TransactionDialog';
import * as api from '../../services/Api';
import './DataList.css';

const transationTypes = {
    send: 'send',
    receive: 'receive'
}

export default function DataList({ items, onSubmitTransaction }) {
    const [open, setOpen] = useState(false);
    const [transactionType, setTransactionType] = useState(null);
    const [contactUser, setContactUser] = useState(null);

    const contactList = items;
    const assets = api.getAssets();

    const onTransact = (user, type = '') => {
        setContactUser(user);
        setTransactionType(type);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setContactUser(null);
    }

    const handleSubmitTransaction = () => {
        onSubmitTransaction();
        setOpen(false);
    }

    return (
        <>
            <TransactionDialog open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitTransaction}
                transactionType={transactionType}
                transactTo={contactUser}
                assets={assets} />
            <Paper elevation={3} className="dashboard__item">
                <List dense sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '10px' }}>
                    {contactList.map((user) => {
                        const labelId = `checkbox-list-secondary-label-${user.uuid}`;

                        return (
                            <ListItem
                                key={user.uuid}
                                className="data-list__item">
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${user.uuid + 1}`}
                                        src={`/static/images/avatar/${user.uuid + 1}.jpg`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${user.name}`} />

                                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                    <Button color="success" onClick={() => onTransact(user, transationTypes.receive)}>
                                        Receive
                                        <DownloadIcon />
                                    </Button>
                                    <Button onClick={() => onTransact(user, transationTypes.send)}>
                                        Send
                                        <UploadIcon />
                                    </Button>
                                </ButtonGroup>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </>
    );
}