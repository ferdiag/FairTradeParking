import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useContext } from 'react';
import { Store } from '../stores/datastore';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarError = ({ open, setOpen, errorMessage }) => {
  const { dispatch } = useContext(Store);

  const handleClose = (event, reason) => {
    dispatch({ type: 'SET_SNACKBAR_MESSAGE', payload: '' });
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarError;
