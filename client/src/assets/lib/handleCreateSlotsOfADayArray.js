export const handleSlotsOfADayArray = (event, arrayOfBookedSlots) => {
  console.log(event, arrayOfBookedSlots);
  const lengthOfSlot = event.lengthOfSlot;
  const arrayLengths = 1440 / lengthOfSlot;

  let newArray = [];
  let startingHour = 0;
  let startingMinutes = 0;
  let endHour = 0;
  let endMinutes = lengthOfSlot;

  for (let i = 0; i < arrayLengths; i++) {
    const isHighterthan60 = startingMinutes + lengthOfSlot;

    if (lengthOfSlot < 60) {
      if (isHighterthan60 >= 60) {
        endMinutes = startingMinutes + lengthOfSlot - 60;
        endHour += 1;
        newArray = [
          ...newArray,
          {
            startingHour,
            startingMinutes,
            endHour,
            endMinutes,
          },
        ];

        startingHour = startingHour + 1;
        startingMinutes = endMinutes;
      } else {
        endMinutes = startingMinutes + lengthOfSlot;
        newArray = [
          ...newArray,
          {
            startingHour,
            startingMinutes,
            endHour,
            endMinutes,
            isChecked: false,
            isBooked: false,
          },
        ];
        startingMinutes = endMinutes;
      }
    }
    if (lengthOfSlot >= 60) {
      newArray = [
        ...newArray,
        {
          startingHour: Math.floor(startingHour / 60),
          startingMinutes: startingHour % 60,
          endHour: Math.floor((startingHour + lengthOfSlot) / 60),
          endMinutes: (startingHour + lengthOfSlot) % 60,
          isChecked: false,
          isBooked: false,
        },
      ];

      startingHour = startingHour + lengthOfSlot;
    }
  }
  let updatedArray = [];

  for (let slot of newArray) {
    [...updatedArray] = [...updatedArray, slot];
    for (let bookedSlot of arrayOfBookedSlots) {
      if (
        slot.startingHour === bookedSlot.startingHour &&
        slot.startingMinutes === bookedSlot.startingMinutes
      ) {
        updatedArray[updatedArray.length - 1] = {
          ...updatedArray[updatedArray.length - 1],
          isBooked: true,
          ownerOfSlot: bookedSlot.ownerOfSlot,
          id: bookedSlot.id,
        };
      }
    }
  }
  return updatedArray;
};
