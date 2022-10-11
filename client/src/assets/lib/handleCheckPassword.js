export const handleCheckPassword = (password) => {
  const array = password.split('');
  let errorMessage = '';

  const includesNumber = array.filter((character) => {
    const isTrue = isNaN(character);
    if (!isTrue) return character;
  });

  if (includesNumber.length === 0) {
    const noNumber = 'Das Password muss eine Zahl beinhalten';
    errorMessage = noNumber;
  }
  const includesLowerCase = array.filter(
    (character) =>
      character.toLowerCase() === character && isNaN(character) === true
  );
  if (includesLowerCase.length === 0) {
    const noLowerCase = 'Das Password muss einen kleinen Buchstaben beinhalten';
    errorMessage = errorMessage.concat(', ', noLowerCase);
  }
  const includesUperCase = array.filter(
    (character) =>
      character.toUpperCase() === character && isNaN(character) === true
  );
  if (includesUperCase.length === 0) {
    errorMessage = errorMessage.concat(
      ', ',
      'Das Password muss einen großen Buchstaben beinhalten'
    );
    return errorMessage;
  }
};
