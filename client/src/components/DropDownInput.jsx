import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const DropDownInput = ({ lengthOfSlot, setLengthOfSlot }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="setSlotTime">Wählen Sie die Länge ihres Slots</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="slotTime"
        value={lengthOfSlot}
        onChange={(e) => setLengthOfSlot(e.target.value)}
        autoWidth
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={45}>45</MenuItem>
        <MenuItem value={60}>60</MenuItem>
        <MenuItem value={90}>90</MenuItem>
        <MenuItem value={180}>180</MenuItem>
        <MenuItem value={360}>360</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropDownInput;
