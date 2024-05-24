/*====== Max Height Menu =====*/
import React,{ useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

export default function MAxHeightMenu() {
   const [anchorEl, setAnchorEl] = useState(null);
   
   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div>
         <IconButton aria-label="More" aria-owns={anchorEl ? 'long-menu' : null} aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon />
         </IconButton>
         <Menu id="long-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
               style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
               },
            }}>
            {options.map(option => (
               <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                  {option}
               </MenuItem>
            ))}
         </Menu>
      </div>
   )
}
