/**
 * Simple Example
 */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function SimpleExample() {
   const [open,setState] = useState(false);
   
   const handleClickOpen = () => {
      setState(true);
   };

   const handleClose = () => {
      setState(false);
   };

   return (
      <div>
         <Button variant="contained" onClick={() => handleClickOpen()} color="primary" className="text-white">Open alert dialog</Button>
         <Dialog open={open} onClose={() => handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button variant="contained" onClick={() => handleClose()} className="btn-danger text-white"> Disagree </Button>
               <Button variant="contained" onClick={() => handleClose()} color="primary" className="text-white" autoFocus> Agree </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}

export default SimpleExample;
