const handleDeleteFromArray = (e, indexOfItemToDelete, array, setArray) => {
  const updatedArray = array.filter(
    (item, index) => indexOfItemToDelete !== index
  );
  setArray(updatedArray);
};

export { handleDeleteFromArray };
