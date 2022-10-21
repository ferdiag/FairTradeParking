import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../stores/datastore';

const Dashboards = () => {
  const { state, dispatch } = useContext(Store);
  console.log(state.userInfo);
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h2">
        Willkommen Herr {state.userInfo.name}
      </Typography>
      <Button onClick={() => navigate('/CreateEvent')}>Event erstellen</Button>
      <Button onClick={() => navigate('/OverviewEvents')}>Deine Events</Button>
    </div>
  );
};

export default Dashboards;
