import { ClassNames } from '@emotion/react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/Appbar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      with: `100%`,
    },
  };
});
const Appbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar}>
      <Toolbar>
        <Typography>Welcome to tradeFair</Typography>
        <Stack direction="row" spacing={2}>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">
            Home
          </Link>{' '}
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/OverviewEvents"
          >
            Events
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/Infos"
          >
            About
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/Login"
          >
            Login
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/Register"
          >
            Register
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
