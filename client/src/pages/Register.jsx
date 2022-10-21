import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState, useRef, useReducer } from 'react';
import { useEffect } from 'react';
import { handleChange } from '../assets/lib/handleChange';
import axios from '../assets/api/axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../stores/datastore';
import { handleCheckPassword } from '../assets/lib/handleCheckPassword';

const Register = () => {
  const initData = {
    name: '',
    givenName: '',
    password: '',
    passwordRepeat: '',
    nameCompany: '',
    phone: '',
    eMail: '',
    street: '',
    zip: '',
    city: '',
  };
  const passwordRef = useRef(null);
  const passwordRepeatRef = useRef(null);
  const nameRef = useRef(null);
  const giveNameRef = useRef(null);
  const phoneRef = useRef(null);
  const eMailRef = useRef(null);
  const streetRef = useRef(null);
  const zipRef = useRef(null);
  const cityRef = useRef(null);
  const nameCompanyRef = useRef(null);

  const arrayOfRefs = [
    { name: 'name', ref: nameRef },
    { name: 'givenName', ref: giveNameRef },
    { name: 'password', ref: passwordRef },
    { name: 'passwordRepeat', ref: passwordRepeatRef },
    { name: 'nameCompany', ref: nameCompanyRef },
    { name: 'phone', ref: phoneRef },
    { name: 'eMail', ref: eMailRef },
    { name: 'street', ref: streetRef },
    { name: 'zip', ref: zipRef },
    { name: 'city', ref: cityRef },
  ];

  const maxLenghtName = 15;
  const maxLenghtGname = 15;
  const maxLenghtPassword = 15;
  const maxLenghtPhone = 15;
  const maxLenghtStreet = 15;
  const maxLenghtZip = 15;
  const maxLenghtCity = 15;
  const maxLenghtNameCompany = 15;

  const [inputData, setInputData] = useState(initData);

  const { state, dispatch } = useContext(Store);

  const navigate = useNavigate();

  const handleSave = async (e) => {
    let stringToShow = '';
    let emptyRefObject;
    let isMoreThenOneRefWithoutValue = 0;

    for (let refObject of arrayOfRefs) {
      if (emptyRefObject === undefined) {
        emptyRefObject = refObject;
      }
      if (refObject.ref.current.value.length === 0) {
        // refObject.ref.current.setAttribute('error', true);
        stringToShow = stringToShow.concat(', ', refObject.name);
        console.log('hallo');
        isMoreThenOneRefWithoutValue += 1;
      }
    }
    console.log(isMoreThenOneRefWithoutValue);
    if (stringToShow.length > 0) {
      if (isMoreThenOneRefWithoutValue === 1) {
        stringToShow = stringToShow.substring(2);
        const errorString = `das folgende Feld muss ausgefüllt werden: ${stringToShow}`;
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: errorString,
        });
      }
      if (isMoreThenOneRefWithoutValue > 1) {
        stringToShow = stringToShow.substring(2);
        const errorString = `die folgenden Felder müssen ausgefüllt werden: ${stringToShow} `;
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: errorString,
        });
      }
      emptyRefObject.ref.current.focus();
      return;
    }
    if (inputData.password != inputData.passwordRepeat) {
      const errorString =
        'die Felder Passwort und Passwortwiederholung müssen Übereinstimmen';
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: errorString,
      });
      return;
    }
    let errorMessage = handleCheckPassword(inputData.password);
    console.log(errorMessage);
    if (errorMessage.length > 0) {
      if (errorMessage[0] === ',') {
        errorMessage = errorMessage.substring(2);
      }
    }
    if (errorMessage.length > 0) {
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: errorMessage });
      return;
    }

    await axios.post('/register', inputData).then((res) => {
      if (res.data.result === 'success') {
        navigate('/Login');
      }
    });
  };

  return (
    <Paper>
      <Typography sx={{ marginTop: '5%', marginBottom: '2%' }} variant="h4">
        Registrierung
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
            inputRef={passwordRef}
            inputProps={{ maxLength: maxLenghtPassword }}
            label="Password"
            name="password"
            type="password"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtPassword, dispatch);
            }}
            value={inputData.password}
            variant="outlined"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            inputProps={{ maxLength: maxLenghtPassword }}
            required
            error={false}
            inputRef={passwordRepeatRef}
            label="Password wiederholen"
            name="passwordRepeat"
            type="password"
            onChange={(e) => {
              handleChange(e, setInputData, maxLenghtPassword, dispatch);
            }}
            value={inputData.passwordRepeat}
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
            onClick={(e) => handleSave(e)}
          >
            save
          </button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Register;
