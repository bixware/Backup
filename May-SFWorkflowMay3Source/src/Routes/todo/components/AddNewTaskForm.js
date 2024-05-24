import React, { Component } from 'react';
import { TextField, FormControl, Input, InputLabel, Select, MenuItem, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';

const labels = [
	'Frontend',
	'Backend',
	'Api',
	'Issue'
];

function AddNewTaskForm(porps) {
   return (
      <Dialog
         open={props.visible}
         onClose={props.closeModal}
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
         <DialogContent>
            <DialogContentText>
               To add new task add the following details in this section.
               </DialogContentText>
            <TextField
               margin="dense"
               id="task-name"
               label="Task Name"
               type="text"
               fullWidth
            />
            <FormControl>
               <InputLabel htmlFor="select-multiple-chip">Name</InputLabel>
               <Select
                  multiple
                  value={props.labels}
                  onChange={props.onSelectLabel}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                     <div>
                        {selected.map(value => <Chip key={value} label={value} />)}
                     </div>
                  )}
               >
                  {labels.map(name => (
                     <MenuItem
                        key={name}
                        value={name}
                     >
                        {name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </DialogContent>
         <DialogActions>
            <Button onClick={props.closeModal} color="primary">
               Cancel
            </Button>
            <Button onClick={props.closeModal} color="primary">
               Add
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default AddNewTaskForm;
