import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useContext } from 'react';
import { useState, useRef } from 'react';
import axios from '../assets/api/axios';
import { handleChange } from '../assets/lib/handleChange';
import { Store } from '../stores/datastore';
import { Paper, Typography } from '@mui/material';

const BookingSlot = () => {
  const { state, dispatch } = useContext(Store);
  const initData = {
    name: '',
    givenName: '',
    password: '',
    phone: '',
    eMail: '',
    street: '',
    zip: '',
    city: '',
  };

  const nameRef = useRef(null);
  const giveNameRef = useRef(null);
  const phoneRef = useRef(null);
  const eMailRef = useRef(null);
  const streetRef = useRef(null);
  const zipRef = useRef(null);
  const cityRef = useRef(null);
  const nameCompanyRef = useRef(null);

  const maxLenghtName = 15;
  const maxLenghtGname = 15;
  const maxLenghtPhone = 15;
  const maxLenghtStreet = 15;
  const maxLenghtZip = 15;
  const maxLenghtCity = 15;
  const maxLenghtNameCompany = 15;

  const [inputData, setInputData] = useState(initData);

  const handleBooking = () => {
    const orderUpdated = state.orders.map((item) => {
      return {
        ...item,
        _id: state.allEvents[state.indexOfSelectedEvent]._id,
        selectedDay: state.selectedDay.date,
        name: state.allEvents[state.indexOfSelectedEvent].name,
        ownerOfSlot: inputData,
      };
    });

    axios
      .post('/bookingSlots', {
        orders: orderUpdated,
      })
      .then((data) => {
        if (data.result === 'error') {
          throw (Error =
            'Leider hat etwas nicht gestimmt, versuchen Sie es später noch einmal');
        }
        dispatch({
          type: 'SET_SNACKBAR_MESSAGE',
          payload: 'Buchung erfolgreich',
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: err.code ? err.code : err,
        });
      });
  };
  return (
    <Paper>
      <Typography sx={{ marginTop: '5%', marginBottom: '2%' }} variant="h4">
        Slots buchen
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <TextField
            error={false}
            required
            inputProps={{ maxLength: maxLenghtName }}
            inputRef={nameRef}
            label="Name"
            name="name"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtName, dispatch);
            }}
            value={inputData.name}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            required
            error={false}
            inputProps={{ maxLength: maxLenghtGname }}
            inputRef={giveNameRef}
            label="Vorname"
            name="givenName"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtGname, dispatch);
            }}
            value={inputData.givenName}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            required
            error={false}
            inputProps={{ maxLength: maxLenghtNameCompany }}
            inputRef={nameCompanyRef}
            label="Name vom Unternehmen"
            name="nameCompany"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtNameCompany, dispatch);
            }}
            value={inputData.nameCompany}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            required
            error={false}
            inputProps={{ maxLength: maxLenghtPhone }}
            inputRef={phoneRef}
            label="Telefon"
            name="phone"
            onChange={(e) => {
              const lastCharacter = e.target.value.charAt(
                e.target.value.length - 1
              );
              if (isNaN(lastCharacter) === true) {
                dispatch({
                  type: 'SET_ERROR_MESSAGE',
                  payload: 'es sind nur Nummer erlaubt',
                });
                return;
              }
              handleChange(e, setInputData, maxLenghtPhone, dispatch);
            }}
            value={inputData.phone}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            required
            error={false}
            inputProps={{ maxLength: maxLenghtName }}
            inputRef={eMailRef}
            label="eMail"
            name="eMail"
            type="email"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtName, dispatch);
            }}
            value={inputData.eMail}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            required
            error={false}
            inputProps={{ maxLength: maxLenghtStreet }}
            inputRef={streetRef}
            label="Straße"
            name="street"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtStreet, dispatch);
            }}
            value={inputData.street}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            required
            error={false}
            inputProps={{ maxLength: maxLenghtZip }}
            inputRef={zipRef}
            label="Postleitzahl"
            name="zip"
            onChange={(e) => {
              const lastCharacter = e.target.value.charAt(
                e.target.value.length - 1
              );
              if (isNaN(lastCharacter) === true) {
                dispatch({
                  type: 'SET_ERROR_MESSAGE',
                  payload: 'Es sind nur Nummer erlaubt',
                });
                return;
              }
              handleChange(e, setInputData, maxLenghtZip, dispatch);
            }}
            value={inputData.zip}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            required
            error={false}
            inputProps={{ maxLength: maxLenghtCity }}
            inputRef={cityRef}
            label="Stradt"
            name="city"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtCity, dispatch);
            }}
            value={inputData.city}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <button
            style={{ backgroundColor: 'gray' }}
            onClick={(e) => handleBooking(e)}
          >
            Slot buchen
          </button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookingSlot;
