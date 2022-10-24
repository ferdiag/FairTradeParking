import { Grid, Paper, Typography } from '@mui/material';
import React, { useState, useRef, useReducer } from 'react';
import Form from '../components/Form';

const Register = () => {
  return (
    <Paper>
      <Typography sx={{ marginTop: '5%', marginBottom: '2%' }} variant="h4">
        Registrierung
      </Typography>
      <Grid container spacing={2}>
        <Form />
      </Grid>
    </Paper>
  );
};

export default Register;
