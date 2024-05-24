/**
 * Simple Menu
 */
import React, { useState } from 'react';
import { Menu, MenuItem, Button} from '@material-ui/core';

export default function SimpleMenu(){
   const [anchorEl, setAnchorEl] = useState(null);   
     
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };

   return (
      <div>
         <Button variant="contained" color="primary" className="text-white" aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={handleClick} >
            Open Menu
         </Button>
         <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
         </Menu>
      </div>
   );
}
