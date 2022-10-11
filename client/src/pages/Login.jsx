import { Button, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../assets/api/axios';
import { handleChange } from '../assets/lib/handleChange';
import { Store } from '../stores/datastore';

const Login = () => {
  const { state, dispatch } = useContext(Store);
  const initData = {
    email: '',
    password: '',
  };

  const [inputData, setInputData] = useState(initData);

  const navigate = useNavigate();

  const handleSend = async () => {
    await axios
      .post('/login', inputData)
      .then((res, err) => {
        console.log(res);
        if (res.data === 'error') {
          throw Error('Password oder Benutzername sind incorrect');
        }

        if (res.data.result === 'success') {
          dispatch({ type: 'USER_LOGIN', payload: res.data.userData });
          console.log(res.data);
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: err.message });
      });
  };

  return (
    <Container>
      <Typography sx={{ marginTop: '5%', marginBottom: '2%' }} variant="h4">
        Login
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <TextField
            label="email"
            name="email"
            onChange={(e) => handleChange(e, setInputData)}
            value={inputData.email}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            label="Password"
            name="password"
            onChange={(e) => handleChange(e, setInputData)}
            value={inputData.password}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <Button onClick={handleSend}>login</Button>
        </Grid>{' '}
      </Grid>
    </Container>
  );
};

export default Login;
