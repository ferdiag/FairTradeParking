import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { arrayOfMonths } from '../assets/date/arrayOfMonths';
import { Container, List, ListItemButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Store } from '../stores/datastore';

const OverviewDaysOfEvent = () => {
  const { state, dispatch } = useContext(Store);
  const [event, setEvent] = useState(0);

  const [arrayOfDays, setArrayOfDays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //um Error nach einem refresh zu vermeiden
    if (event === undefined) {
      navigate('/OverviewEvents');
      return;
    }

    setEvent(state.allEvents[state.indexOfSelectedEvent]);
    let array = [];
    let currentDate = event.dateStart;

    for (let i = 0; i < event.duration; i++) {
      var day = new Date(currentDate);
      var nextDay = new Date(day);

      nextDay.setDate(day.getDate() + 1);
      currentDate = nextDay;
      array = [...array, { date: day.toDateString() }];
    }

    setArrayOfDays(array);
  }, [setArrayOfDays, event]);

  const handleShowSlotsOfADay = (e, i) => {
    const bookedSlotsOfDay =
      event.bookedSlots &&
      event.bookedSlots.filter(
        (date) => date.selectedDay === arrayOfDays[i].date
      );

    const payload = {
      date: arrayOfDays[i].date,
      lengthOfSlot: event.lengthOfSlot,
      bookedSlots: bookedSlotsOfDay ? bookedSlotsOfDay : [],
    };
    console.log(event);
    dispatch({ type: 'DAY_SELECTED', payload });
    navigate(`${arrayOfDays[i].date}`);
  };

  return (
    <Container>
      <Typography>Bitte wählen Sie einen Tag aus</Typography>
      <List>
        {arrayOfDays.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={(e) => handleShowSlotsOfADay(e, index)}
          >
            {item.date}
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};

export default OverviewDaysOfEvent;
