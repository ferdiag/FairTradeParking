import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState, useRef } from 'react';
import axios from '../assets/api/axios';
import { handleChange } from '../assets/lib/handleChange';
import { Store } from '../stores/datastore';
import { Button, Paper } from '@mui/material';
import { handleBookingSlots } from '../assets/lib/handleBookingSlots';
import { handleCheckPassword } from '../assets/lib/handleCheckPassword';
import { handleSaveRegister } from '../assets/lib/handleSaveRegister';

const Form = () => {
  const { state, dispatch } = useContext(Store);

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

  const [inputData, setInputData] = useState(initData);
  const [target, setTarget] = useState(null);
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

  const formData = [
    { name: 'name', label: 'Nachname', ref: nameRef, length: 15 },
    { name: 'givenName', label: 'Vorname', ref: giveNameRef, length: 15 },
    { name: 'password', label: 'Password', ref: passwordRef, length: 15 },
    {
      name: 'passwordRepeat',
      label: 'Password',
      ref: passwordRepeatRef,
      length: 15,
    },
    {
      name: 'nameCompany',
      label: 'Name vom Unternehmen',
      ref: nameCompanyRef,
      length: 15,
    },
    { name: 'phone', label: 'Telefonnummer', ref: phoneRef, length: 15 },
    { name: 'eMail', label: 'E-Mail', ref: eMailRef, length: 15 },
    { name: 'street', label: 'Straße', ref: streetRef, length: 15 },
    { name: 'zip', label: 'Postleitzahl', ref: zipRef, length: 15 },
    { name: 'city', label: 'Stadt', ref: cityRef, length: 15 },
  ];

  const handleSave = async () => {
    if (target === 'bookingSlots') {
      const input = {
        state,
        inputData,
        dispatch,
      };
      handleBookingSlots(input);
    }
    if (target === 'Register') {
      const input = {
        dispatch,
        formData,
        handleCheckPassword,
        inputData,
      };

      const result = handleSaveRegister(input);

      if (result === 'success') {
        await axios.post('/register', inputData).then((res) => {
          if (res.data.result === 'success') {
            navigate('/Login');
          }
        });
      }
    }
  };
  useEffect(() => {
    const hReftoArray = window.location.href.split('/');
    const newTarget = hReftoArray[hReftoArray.length - 1];
    setTarget(newTarget);
  }, [setTarget]);
  return (
    <Paper>
      <Grid container spacing={2}>
        {formData.map((data, index) => {
          const style = { display: 'block' };
          if (
            (target != 'Register' && data.name === 'password') ||
            data.name === 'passwordRepeat'
          ) {
            style.display = 'none';
          }

          return (
            <Grid style={style} key={index} xs={12} item>
              <TextField
                required
                error={false}
                inputProps={{ maxLength: data.length }}
                inputRef={data.ref}
                label={data.label}
                name={data.name}
                onChange={(e) => {
                  handleChange(e, setInputData, data.length, dispatch);
                }}
                value={inputData[data.name]}
                variant="outlined"
              />
            </Grid>
          );
        })}
        <Grid xs={12} item>
          <Button
            style={{ backgroundColor: 'gray' }}
            onClick={(e) => handleSave(e)}
          >
            speichern
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Form;
