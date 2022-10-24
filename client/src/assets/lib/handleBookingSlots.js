import axios from '../api/axios';
import { v4 as uuid } from 'uuid';

export const handleBookingSlots = ({ state, inputData, dispatch }) => {
  const orderUpdated = state.orders.map((item) => {
    return {
      ...item,
      eventId: state.allEvents[state.indexOfSelectedEvent]._id,
      id: uuid(),
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
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: err.code ? err.code : err,
      });
    });
};
