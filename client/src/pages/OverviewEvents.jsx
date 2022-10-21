import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../stores/datastore';

const OverviewEvents = () => {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const [isAllEvents, setIsAllEvents] = useState(false);
  const [eventToDisplay, setEventToDisplay] = useState(state.allEvents);
  const handleClick = (e, index) => {
    navigate(`${state.allEvents[index]._id}`);
    dispatch({ type: 'EVENT_SELECTED', payload: index });
  };
  const handleEventToDisplay = () => {
    setIsAllEvents((currentState) => !currentState);
    if (!isAllEvents) {
      const eventsOfUser = state.allEvents.filter(
        (event) => event.emailOfCreator === state.userInfo.eMail
      );
      console.log(eventsOfUser);
      setEventToDisplay(eventsOfUser);
    }
  };
  return (
    <Container>
      <Typography variant="h4"></Typography>
      {state.isLoggedIn === true && (
        <Button onClick={handleEventToDisplay}>
          {isAllEvents ? 'Deine Events' : 'alle Events'}
        </Button>
      )}
      <List>
        {eventToDisplay.map((event, index) => (
          <ListItem key={index} onClick={(e) => handleClick(e, index)}>
            <Grid container spacing={2} style={{ boarder: '1px solid black' }}>
              <Grid xs={12} item>
                {' '}
                {event.name}
              </Grid>
              <Grid xs={6} item>
                {event.dateStart}
              </Grid>
              <Grid xs={6} item>
                {event.dateEnd}
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OverviewEvents;
