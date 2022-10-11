import { useEffect, useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Appbar from './components/Appbar';
import Scanner from './components/Scanner';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/reactRouterOutlets/RequireAuth';
import BookingSlots from './pages/BookingSlots';
import CreateEvent from './components/CreateEvent';
import OverviewEvents from './pages/OverviewEvents';
import OverviewDaysOfEvent from './pages/OverviewDaysOfEvent';
import ListOfSlotsOfADay from './pages/OverViewOfSlotsOfADay';
import axios from './assets/api/axios';
import SnackbarError from './components/SnackbarError';
import { Store } from './stores/datastore';
import { Container } from '@mui/material';
import Infos from './pages/Infos';

function App() {
  const [open, setOpen] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    axios
      .get('/')
      .then((res) => {
        setLoadingError(false),
          dispatch({ type: 'EVENTS_UPDATE', payload: res.data.allEvents });
      })
      .catch(() => setLoadingError(true));
  }, []);

  useEffect(() => {
    if (state.errorMessage.length > 0) {
      setOpen(true);
    }
  }, [state, setOpen]);
  return (
    <div className="App">
      <Appbar />
      <div height={{ height: '60px' }}></div>
      <SnackbarError
        open={open}
        setOpen={setOpen}
        errorMessage={state.errorMessage}
      />
      {!loadingError ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/BookingSlots" element={<BookingSlots />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/OverviewEvents" element={<OverviewEvents />} />
          <Route path="/BookingSlots" element={<BookingSlots />} />{' '}
          <Route path="/CreateEvent" element={<CreateEvent />} />
          <Route path="/Infos" element={<Infos />} />
          <Route path="OverviewEvents/:_id" element={<OverviewDaysOfEvent />} />
          <Route
            path="OverviewEvents/:id/:date"
            element={<ListOfSlotsOfADay />}
          />
          <Route element={<RequireAuth />}>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      ) : (
        'leider ist etwas beim Laden der  Daten Schief gelaufen, bitte versuchen Sie es später nochm einmal'
      )}
    </div>
  );
}

export default App;
