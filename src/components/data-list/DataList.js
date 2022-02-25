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
import './DataList.css';

export default function CheckboxListSecondary() {
    const [checked, setChecked] = useState([1]);
    const [open, setOpen] = useState(false);
    const [transactionType, setTransactionType] = useState(null);
    const [contactUser, setContactUser] = useState(null);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const contactList = [
        {
            uuid: '23423423234',
            name: 'Paulo Martins',
        },
        {
            uuid: '21223423234',
            name: 'Marcos Tito',
        },
        {
            uuid: '566523423234',
            name: 'Roger Oliveira',
        }
    ]

    const onTransact = (user, type = '') => {
        setContactUser(user);
        setTransactionType(type);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setContactUser(null);
    }

    return (
        <>

            <TransactionDialog open={open} transactionType={transactionType} user={contactUser} handleClose={handleClose} />
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
                                    <Button color="success" onClick={() => onTransact(user, 'receive')}>
                                        Receive
                                        <DownloadIcon />
                                    </Button>
                                    <Button onClick={() => onTransact(user, 'send')}>
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