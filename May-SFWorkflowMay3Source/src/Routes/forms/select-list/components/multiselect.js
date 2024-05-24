import React, { useState } from 'react';
import { Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Chip } from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function MultiSelect() {
   const [name, setName] = useState([]);
   const handleChange = event => {
      setName(event.target.value);
   };

   return (
      <form autoComplete="off">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-xl-4">
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple">Name</InputLabel>
                <Select multiple value={name} onChange={handleChange}
                  input={<Input id="select-multiple" />}
                  MenuProps={MenuProps} >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-4">
            <div className="form-group">
               <FormControl fullWidth>
                  <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                  <Select multiple value={name}
                     onChange={handleChange}
                     input={<Input id="select-multiple-checkbox" />}
                     renderValue={selected => selected.join(', ')}
                     MenuProps={MenuProps}>
                     {names.map(item => (
                        <MenuItem key={item} value={name}>
                           <Checkbox color="primary" checked={item === name} />
                           <ListItemText primary={item} />
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-4">
            <div className="form-group">
               <FormControl fullWidth>
                  <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                  <Select
                     multiple
                     value={name}
                     onChange={handleChange}
                     input={<Input id="select-multiple-chip" />}
                     renderValue={selected => (
                     <div>
                        {selected.map(value => <Chip key={value} label={value} />)}
                     </div>
                     )} MenuProps={MenuProps}>
                     {names.map(name => (
                     <MenuItem key={name} value={name}>
                        {name}
                     </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>
          </div>
        </div>
      </form>
   );
}