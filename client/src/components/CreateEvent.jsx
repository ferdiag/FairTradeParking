import { Button, Grid, Stack, TextField } from '@mui/material';

import React from 'react';
import { useState } from 'react';
import DropDownInput from './DropDownInput';
import { arrayOfMonths } from '../assets/date/arrayOfMonths';
import axios from '../assets/api/axios';
import { useContext } from 'react';
import { Store } from '../stores/datastore';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [lengthOfSlot, setLengthOfSlot] = useState('');
  const { state, dispatch } = useContext(Store);

  const handleSave = (e) => {
    e.preventDefault();
    let currentDay = dateStart;
    let duration = 1;

    while (currentDay != dateEnd) {
      const day = new Date(currentDay);
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      currentDay = nextDay.toISOString().split('T')[0]; //Formatierung vom Datum
      duration++;
    }
    const eMail = state.userInfo.eMail;
    console.log(eMail);
    const payload = {
      name,
      dateStart,
      dateEnd,
      lengthOfSlot,
      duration,
      email: eMail,
    };

    axios
      .post('/createEvent', payload)
      .then((data) => {
        console.log(data.data.event);
        const eventsUpdated = [...state.allEvents, data.data.event];
        dispatch({
          type: 'EVENTS_UPDATE',
          payload: eventsUpdated,
        });
      })
      .catch(() =>
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload:
            'das Event wurde nicht erstellt, bitte versuchen Sie es später noch einmal',
        })
      );
  };

  return (
    <Stack spacing={3}>
      <h3>Hier kannst du dein Event kreieren</h3>
      <TextField
        required
        id="outlined-basic"
        label="name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        variant="outlined"
      />
      <TextField
        required
        id="date"
        name="starEvent"
        onChange={(e) => setDateStart(e.target.value)}
        label="Start Event"
        type="date"
        defaultValue="yyyy-mm-dd"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        required
        id="date"
        name="endOfEvent"
        onChange={(e) => setDateEnd(e.target.value)}
        label="Ende vom Event"
        type="date"
        defaultValue="yyyy-mm-dd"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <DropDownInput
        lengthOfSlot={lengthOfSlot}
        setLengthOfSlot={setLengthOfSlot}
      />
      <Button onClick={handleSave}>Event speichern</Button>
    </Stack>
  );
};

export default CreateEvent;
