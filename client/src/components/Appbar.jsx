import { ClassNames } from '@emotion/react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/Appbar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../stores/datastore';

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      with: `100%`,
    },
  };
});

const pages = [
  { to: '/', name: 'Home', linkName: 'Home' },
  { to: '/OverviewEvents', name: 'events', linkName: 'Veranstaltungen' },
  { to: '/Infos', name: 'About', linkName: 'Über Uns' },
  { to: '/Login', name: 'Login', linkName: 'Login' },
  { to: '/Logout', name: 'Logout', linkName: 'Logout' },
  { to: '/Register', name: 'Register', linkName: 'Registrierung' },
];

const Appbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  return (
    <AppBar className={classes.appbar}>
      <Toolbar>
        <Typography>Welcome to tradeFair</Typography>
        <Stack direction="row" spacing={2}>
          {pages.map((page, index) => {
            const style = {
              display: 'block',
              color: 'inherit',
              textDecoration: 'none',
            };
            if (page.name === 'Logout' && state.isLoggedIn === false) {
              style.display = 'none';
            }
            const handleChangeActivePage = (e) => {
              if (e.target.name === 'Logout' && state.isLoggedIn === true) {
                dispatch({ type: 'USER_LOGOUT' });
                navigate('/Login');
                return;
              }

              dispatch({ type: 'SET_ACTIVE_PAGE', payload: e.target.name });
            };
            return (
              <Link
                onClick={(e) => handleChangeActivePage(e)}
                name={page.name}
                key={index}
                style={style}
                to={page.to}
              >
                {page.linkName}
              </Link>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
