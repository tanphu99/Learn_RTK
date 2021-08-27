import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { login, selectIsLogging } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(3),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectIsLogging);

  const handleLogin = () => {
    dispatch(login({ username: '', password: '' }));
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
