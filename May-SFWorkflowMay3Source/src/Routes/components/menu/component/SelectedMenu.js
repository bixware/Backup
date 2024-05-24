/*======= Selected Menu =======*/
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Menu, MenuItem} from '@material-ui/core';

const options = [
  'Show some love to @material-ui/core',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function SelectedMenu(){
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedIndex, setSelectedIndex] = useState(1)

   const handleClickListItem = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div>
         <List component="nav">
            <ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="When device is locked"
            onClick={handleClickListItem} >
            <ListItemText 
               primary="When device is locked" 
               secondary={options[selectedIndex]} 
            />
            </ListItem>
         </List>
         <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {options.map((option, index) => (
               <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={event => handleMenuItemClick(event, index)}>
                  {option}
               </MenuItem>
            ))}
         </Menu>
      </div>
   );
}