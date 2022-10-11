import {
  Button,
  Checkbox,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../stores/datastore';

const ListOfSlotsOfADay = () => {
  const { state, dispatch } = useContext(Store);
  console.log(state);
  const [event, setEvent] = useState(
    //vorübergehend
    state.allEvents[state.indexOfSelectedEvent]
  );
  const [arrayOfSlots, setArrayOfSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (event === undefined || state.selectedDay === undefined) {
      navigate('/OverviewEvents');
      return;
    }
    //um Error nach einem refresh zu vermeiden

    const lengthOfSlot = event.lengthOfSlot;
    const arrayLengths = 1440 / lengthOfSlot;

    let newArray = [];
    let startingHour = 0;
    let startingMinutes = 0;
    let endHour = 0;
    let endMinutes = lengthOfSlot;
    for (let i = 0; i < arrayLengths; i++) {
      const isHighterthan60 = startingMinutes + lengthOfSlot;

      if (lengthOfSlot < 60) {
        if (isHighterthan60 >= 60) {
          endMinutes = startingMinutes + lengthOfSlot - 60;
          endHour += 1;
          newArray = [
            ...newArray,
            {
              startingHour,
              startingMinutes,
              endHour,
              endMinutes,
              isChecked: false,
              isBooked: false,
            },
          ];

          startingHour = startingHour + 1;
          startingMinutes = endMinutes;
        } else {
          endMinutes = startingMinutes + lengthOfSlot;
          newArray = [
            ...newArray,
            {
              startingHour,
              startingMinutes,
              endHour,
              endMinutes,
              isChecked: false,
              isBooked: false,
            },
          ];
          startingMinutes = endMinutes;
        }
      }
      if (lengthOfSlot >= 60) {
        newArray = [
          ...newArray,
          {
            startingHour: Math.floor(startingHour / 60),
            startingMinutes: startingHour % 60,
            endHour: Math.floor((startingHour + lengthOfSlot) / 60),
            endMinutes: (startingHour + lengthOfSlot) % 60,
            isChecked: false,
            isBooked: false,
          },
        ];

        startingHour = startingHour + lengthOfSlot;
      }
    }

    let updatedArray = [];

    for (let slot of newArray) {
      [...updatedArray] = [...updatedArray, slot];
      for (let bookedSlot of state.selectedDay.bookedSlots) {
        if (
          slot.startingHour === bookedSlot.startingHour &&
          slot.startingMinutes === bookedSlot.startingMinutes
        ) {
          updatedArray[updatedArray.length - 1] = {
            ...updatedArray[updatedArray.length - 1],
            isBooked: true,
            ownerOfSlot: bookedSlot.ownerOfSlot,
          };
        }
      }
    }

    setArrayOfSlots(updatedArray);
  }, []);

  const handleSale = () => {
    const orders = arrayOfSlots.filter((item) => item.isChecked === true);
    if (orders.length === 0) {
      console.log('Bitte wählen Sie einen Slot aus');
      return;
    }
    dispatch({ type: 'SET_ORDERS', payload: orders });
    navigate('/bookingSlots');
  };

  const handleIsChecked = (e, i) => {
    const copyArray = [...arrayOfSlots];
    if (copyArray[i].isChecked === true) {
      console.log('unchecking');
      copyArray[i] = { ...copyArray[i], isChecked: false };
    } else {
      console.log('checking');
      copyArray[i] = { ...copyArray[i], isChecked: true };
    }
    setArrayOfSlots(copyArray);
  };
  return (
    <Container style={{ marginTop: '60px' }}>
      {' '}
      <Button onClick={handleSale}>weiter zur Buchung</Button>
      <List>
        <Typography variant="h5">
          {state.selectedDay == undefined ? '' : state.selectedDay.date}
        </Typography>
        <Typography variant="h6">wählen sie einen Slot aus</Typography>
        {arrayOfSlots.map((slot, index) => {
          let stringOfStartingHour = slot.startingHour;
          let stringOfStartingMinutes = slot.startingMinutes;

          if (slot.startingHour < 10) {
            stringOfStartingHour = [0, slot.startingHour].join('');
          }
          if (slot.startingMinutes === 0) {
            stringOfStartingMinutes = [0, slot.startingMinutes].join('');
          }
          return (
            <ListItem
              key={index}
              style={
                slot.isBooked
                  ? { border: '1px solid red' }
                  : { border: '1px solid black' }
              }
            >
              {stringOfStartingHour}:{stringOfStartingMinutes}
              <div
                style={
                  slot.isBooked && !state.isLoggedIn
                    ? { display: 'block' }
                    : { display: 'none' }
                }
              >
                der Slot ist leider schon gebucht
              </div>
              {slot.ownerOfSlot && state.isLoggedIn && (
                <Grid>
                  <Grid xs={6} item>
                    Unternehmen:
                  </Grid>
                  <Grid xs={6} item>
                    {slot.ownerOfSlot.nameCompany}
                  </Grid>
                  <Grid xs={6} item>
                    Name Ansprechpartner:
                  </Grid>
                  <Grid xs={6} item>
                    {slot.ownerOfSlot.name}
                  </Grid>
                  <Grid xs={6} item>
                    Vorname:
                  </Grid>
                  <Grid xs={6} item>
                    {slot.ownerOfSlot.giveName}
                  </Grid>
                  <Grid xs={6} item>
                    Telefonnummer:
                  </Grid>
                  <Grid xs={6} item>
                    {slot.ownerOfSlot.phone}
                  </Grid>
                  <Grid xs={6} item>
                    Straße:
                  </Grid>
                  <Grid xs={6} item>
                    {slot.ownerOfSlot.street}
                  </Grid>
                  <Grid xs={6} item>
                    Email:
                  </Grid>
                  <Grid xs={6} item>
                    {slot.ownerOfSlot.eMail}
                  </Grid>
                </Grid>
              )}
              <Checkbox
                disabled={slot.isBooked ? true : false}
                edge="end"
                onChange={(e) => {
                  handleIsChecked(e, index);
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default ListOfSlotsOfADay;
