function handleChange(e, setState, length = 25, dispatch) {
  const { name, value } = e.target;

  if (e.target.value.length === length) {
    dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: 'Sie haben das Maximum an Zeichen erreicht',
    });
  }

  setState((prevVal) => ({
    ...prevVal,
    [name]: value.trim(),
  }));
}

export { handleChange };
