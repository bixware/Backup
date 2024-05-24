/*======= Change Transition Menu =======*/
import React, { useState } from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';

export default function ChangeTransition(){
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null)
   };

   return (
      <div>
         <Button
            variant="contained"
            aria-owns={anchorEl ? 'fade-menu' : null}
            aria-haspopup="true"
            onClick={handleClick}
            className="btn-danger text-white">
            Open with fade transition
         </Button>
         <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
         </Menu>
      </div>
   );
}
