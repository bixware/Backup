/*======= Fade Snackbar ======*/
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function FadeSnackbar() {
   const [open, setOpen] = useState(false);
   
   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div className="d-inline-block">
         <Button variant="contained" color="primary" className="text-white mb-10" onClick={handleClick}>Open with Fade Transition</Button>
         <Snackbar
            open={open}
            onClose={handleClose}
            message={<span id="message-id">I love snacks</span>}
         />
      </div>
   );
}
