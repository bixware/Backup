/**
 * Form Dialog
 */
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

function FormDialog() {
   const [open,setOpen] = useState(false);
   
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div>
         <Button variant="contained" className="btn-info text-white btn-block" onClick={handleClickOpen}>Open form dialog</Button>
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send
                  updates occationally.
               </DialogContentText>
               <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
            </DialogContent>
            <DialogActions>
               <Button variant="contained" onClick={handleClose} color="primary" className="text-white">
                  Cancel
               </Button>
               <Button variant="contained" onClick={handleClose} className="btn-info text-white">
                  Subscribe
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}

export default FormDialog 