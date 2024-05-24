/**
 * Responsive Dialog
 */
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog } from '@material-ui/core';

export default function ResponsiveDialog(props) {
   const [open,setOpen] = useState(false);
   
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const { fullScreen } = props;
   return (
      <div>
         <Button variant="contained" className="btn-secondary text-white btn-block" onClick={handleClickOpen}>Open responsive dialog</Button>
         <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
         >
            <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Let Google help apps determine location. This means sending anonymous location data to
                  Google, even when no apps are running.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button variant="contained" onClick={handleClose} className="btn-secondary text-white">
                  Disagree
               </Button>
               <Button variant="contained" onClick={handleClose} color="primary" className="text-white" autoFocus>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
withMobileDialog();
