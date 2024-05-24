/**
 * Full Screen Dialog
 */
import React, { useState } from 'react';
import { Button, Dialog, List, ListItem, ListItemText, Divider, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
   const [open,setOpen] = useState(false);
	
	const handleClickOpen = () => {
      setOpen(true);
	};

	const handleClose = () => {
      setOpen(false);
	};

   return (
      <div>
         <Button variant="contained" className="btn-danger text-white btn-block" onClick={handleClickOpen}>Open full-screen dialog</Button>
         <Dialog fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}>
            <AppBar className="bg-primary">
               <Toolbar>
                  <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                     <CloseIcon />
                  </IconButton>
                  <h5 className="w-100 mb-0">Sound</h5>
                  <Button color="inherit" onClick={handleClose}>save</Button>
               </Toolbar>
            </AppBar>
            <List>
               <ListItem button>
                  <ListItemText primary="Phone ringtone" secondary="Titania" />
               </ListItem>
               <Divider />
               <ListItem button>
                  <ListItemText primary="Default notification ringtone" secondary="Tethys" />
               </ListItem>
            </List>
         </Dialog>
      </div>
   );
}
