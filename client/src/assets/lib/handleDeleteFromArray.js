const handleDeleteFromArray = (e, indexOfItemToDelete, array, setArray) => {
  const updatedArray = array.filter(
    (item, index) => indexOfItemToDelete !== index
  );
  setArray(updatedArray);
  console.log(updatedArray);
};

export { handleDeleteFromArray };
