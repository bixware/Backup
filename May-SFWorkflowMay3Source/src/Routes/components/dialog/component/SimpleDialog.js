/**
 * Simple Dialog
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Dialog, DialogTitle, Typography} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
   avatar: {
      backgroundColor: blue[100],
      color: blue[600],
   },
};

function SimpleDialog(props) {
   const handleClose = () => {
      props.onClose(props.selectedValue);
   };

   const handleListItemClick = value => {
      props.onClose(value);
   };

   const { classes, onClose, selectedValue, ...other } = props;
   
   return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
         <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
         <div>
            <List>
               {emails.map(email => (
                  <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                     <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                           <PersonIcon />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={email} />
                  </ListItem>
               ))}
               <ListItem button onClick={() => handleListItemClick('addAccount')}>
                  <ListItemAvatar>
                     <Avatar>
                        <AddIcon />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="add account" />
               </ListItem>
            </List>
         </div>
      </Dialog>
   )
}

SimpleDialog.propTypes = {
   classes: PropTypes.object.isRequired,
   onClose: PropTypes.func,
   selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

function SimpleDialogDemo() {
   const [open,setOpen] = useState(false);
   const [selectedValue, setSelectedValue] = useState(emails[1])

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = value => {
      setSelectedValue(value);
      setOpen(false);
   };

   return (
      <div>
         <Typography variant="h6">Selected: {selectedValue}</Typography>
         <br />
         <Button variant="contained" onClick={handleClickOpen} className="btn-success text-white btn-block">Open Simple dialog</Button>
         <SimpleDialogWrapped
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
         />
      </div>
   )
}

export default SimpleDialogDemo;
