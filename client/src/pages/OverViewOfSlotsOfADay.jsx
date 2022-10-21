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
import { handleSlotsOfADayArray } from '../assets/lib/handleCreateSlotsOfADayArray';
import { Store } from '../stores/datastore';

const ListOfSlotsOfADay = () => {
  const { state, dispatch } = useContext(Store);
  const [startIndex, setStartIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [event, setEvent] = useState(
    //vorübergehend
    state.allEvents[state.indexOfSelectedEvent]
  );
  const [arrayOfSlots, setArrayOfSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //um Error nach einem refresh zu vermeiden
    if (event === undefined || state.selectedDay === undefined) {
      navigate('/OverviewEvents');
      return;
    }

    const newArray = handleSlotsOfADayArray(
      event,
      state.selectedDay.bookedSlots
    );

    setArrayOfSlots(newArray);
  }, [state]);

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
      copyArray[i] = { ...copyArray[i], isChecked: false };
    } else {
      copyArray[i] = { ...copyArray[i], isChecked: true };
    }
    setArrayOfSlots(copyArray);
  };

  const onDragEnd = () => {
    const copyArray = [...arrayOfSlots];
    const draggedItem = copyArray[startIndex];
    if (copyArray[targetIndex].isBooked === true) {
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: 'der Slot ist leider schon vergeben.',
      });
      return;
    }
    console.log(startIndex);
    const bookedSlotsSortedByTime = copyArray.filter(
      (slot) => slot.isBooked === true
    );
    const indexOfDraggedItem = bookedSlotsSortedByTime.findIndex(
      (slot) => draggedItem.id === slot.id
    );
    bookedSlotsSortedByTime[indexOfDraggedItem] = {
      ...bookedSlotsSortedByTime[indexOfDraggedItem],
      startingHour: copyArray[targetIndex].startingHour,
      startingMinutes: copyArray[targetIndex].startingMinutes,
      endHour: copyArray[targetIndex].endHour,
      endMinutes: copyArray[targetIndex].endMinutes,
    };

    const newArray = handleSlotsOfADayArray(event, bookedSlotsSortedByTime);

    setArrayOfSlots(newArray);

    setStartIndex(null);
    setTargetIndex(null);
  };

  return (
    <Container style={{ marginTop: '60px' }}>
      <Button onClick={handleSale}>weiter zur Buchung</Button>
      <List>
        <Typography variant="h5">
          {state.selectedDay == undefined ? '' : state.selectedDay.date}
        </Typography>
        <Typography variant="h6">wählen sie einen Slot aus</Typography>
        {arrayOfSlots.map((slot, i) => {
          let stringOfStartingHour = slot.startingHour;
          let stringOfStartingMinutes = slot.startingMinutes;

          //null zum Datum hinzufügen

          if (slot.startingHour < 10) {
            stringOfStartingHour = [0, slot.startingHour].join('');
          }
          if (slot.startingMinutes === 0) {
            stringOfStartingMinutes = [0, slot.startingMinutes].join('');
          }
          return (
            <ListItem
              draggable={state.isLoggedIn?'true':false}
              onDragStart={() => setStartIndex(i)}
              onDragEnter={() => {
                setTargetIndex(i),
                  console.log(startIndex, state.indexOfSelectedEvent);
              }}
              onDragEnd={onDragEnd}
              onDragOver={(e) => e.preventDefault()}
              key={i}
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
                  handleIsChecked(e, i);
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
