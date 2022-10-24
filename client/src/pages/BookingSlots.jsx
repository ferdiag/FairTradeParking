import React from 'react';
import { Paper, Typography } from '@mui/material';
import Form from '../components/Form';

const BookingSlot = () => {
  return (
    <Paper>
      <Typography sx={{ marginTop: '5%', marginBottom: '2%' }} variant="h4">
        Slots buchen
      </Typography>
      <Form />
    </Paper>
  );
};

export default BookingSlot;
