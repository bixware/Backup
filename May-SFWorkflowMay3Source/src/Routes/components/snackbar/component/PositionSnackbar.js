/*======= Positioned Snackbar ======*/
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

function PositionedSnackbar() {
   const [open,setOpen] = useState(false);
   const [vertical,setVertical] = useState('top');
   const [horizontal,setHorizontal] = useState('center');

   const handleClick = (ver,hori) => {
      setOpen(true);
      setVertical(ver);
      setHorizontal(hori);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div>
         <Button variant="contained" className="mr-15 mb-10 btn-primary text-white" onClick={() => handleClick('top','center')}>
            Top-Center
         </Button>
         <Button variant="contained" className="mr-15 mb-10 btn-danger text-white" onClick={() => handleClick('top','right')}>
            Top-Right
         </Button>
         <Button variant="contained" className="mr-15 mb-10 btn-success text-white" onClick={() => handleClick('bottom','right' )}>
            Bottom-Right
         </Button>
         <Button variant="contained" className="mr-15 mb-10 btn-warning text-white" onClick={() => handleClick('bottom','center')}>
            Bottom-Center
            </Button>
         <Button variant="contained" className="mr-15 mb-10 btn-info text-white" onClick={() => handleClick('bottom','left')}>
            Bottom-Left
         </Button>
         <Button variant="contained" className="mr-15 mb-10 btn-secondary text-white" onClick={() => handleClick('top','left')}>
            Top-Left
         </Button>
         <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            ContentProps={{
               'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">I love snacks</span>}
         />
      </div>
   );
}

export default PositionedSnackbar;
