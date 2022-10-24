import { Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateQrCode from '../components/CreateQrCode';
import Scanner from '../components/Scanner';

const Home = () => {
  const navigate = useNavigate();
  const [isCameraRunning, setIsCameraRunning] = useState(false);

  return (
    <Container>
      <Paper sx={{ padding: '50px' }}>
        <Typography variant="h3">Herzlich Wilkommen bei Fairtrade</Typography>
        <Typography>
          Sie planen ein Event und brauchen ein Parksystem, welches Sie auf Ihre
          Bedürfnisse abstimmen können?
        </Typography>
        <Button onClick={() => navigate('/infos')}>
          Hier erfahren sie mehr
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;
