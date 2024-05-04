import React, {FormEvent, useState} from 'react';
import {LoginMutation} from '../../types';
import {Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {loginUser} from './usersThunks.ts';
import { selectLoginError } from './userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);

    const [user, setUser] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();

        await dispatch(loginUser(user)).unwrap();
        navigate('/');
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOpenIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
                            {error.error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={formSubmitHandler} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Username"
                                    name="username"
                                    value={user.username}
                                    onChange={inputChangeHandler}
                                    autoComplete="current-username"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={user.password}
                                    onChange={inputChangeHandler}
                                    autoComplete="new-password"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign in
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    Or sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Login;