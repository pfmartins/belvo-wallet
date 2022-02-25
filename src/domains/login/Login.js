import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../../assets/belvo.svg';
import { useAuth } from '../../services/context/AuthContext';

const theme = createTheme();

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <a href="https://belvo.com/" target="blank" className="app-header__link">
                Belvo's Wallet
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Login = () => {
    const navigate = useNavigate();
    const { signed, signIn } = useAuth();
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    console.log('signed login', signed)
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginError('');
        setLoading(true);

        const data = new FormData(event.currentTarget);
        const userEmail = data.get('email');
        const userPassword = data.get('password');

        signIn(userEmail, userPassword).then((response) => {
            setLoading(false);

            if (response.detail) {
                setLoginError(response.detail);
                return;
            }

            navigate('/dashboard');
        }).catch((error) => {
            throw error;
        });
    };


    useEffect(() => {
        if (signed) navigate('/dashboard');
    }, [navigate, signed])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" className="login__container">
                <CssBaseline />

                <div className="login__logo"><img src={logo} alt="Logo" width="250" /></div>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Avatar sx={{ m: 1, bgcolor: "#1F72FA" }}>
                        <LockOutlinedIcon fontSize="small" />
                    </Avatar>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <div className="login__alert">{loginError && <div className="login__error-label">{loginError}</div>}</div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="app__btn"
                            sx={{ mt: 3, mb: 2, bgcolor: '#1F72FA' }}
                        >
                            {loading && <div className="login__loader"><CircularProgress size={25} thickness={4} color="inherit" /></div>}
                            {!loading && 'Sign In'}
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 10, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Login;