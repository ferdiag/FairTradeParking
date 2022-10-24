export const handleSaveRegister = ({
  dispatch,
  formData,
  handleCheckPassword,
  inputData,
}) => {
  let stringToShow = '';
  let emptyRefObject;
  let isMoreThenOneRefWithoutValue = 0;

  for (let refObject of formData) {
    if (emptyRefObject === undefined) {
      emptyRefObject = refObject;
    }
    if (refObject.ref.current.value.length === 0) {
      // refObject.ref.current.setAttribute('error', true);
      stringToShow = stringToShow.concat(', ', refObject.name);

      isMoreThenOneRefWithoutValue += 1;
    }
  }

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

  if (errorMessage.length > 0) {
    if (errorMessage[0] === ',') {
      errorMessage = errorMessage.substring(2);
    }
  }
  if (errorMessage.length > 0) {
    dispatch({ type: 'SET_ERROR_MESSAGE', payload: errorMessage });
    return;
  }
  return 'success';
};
