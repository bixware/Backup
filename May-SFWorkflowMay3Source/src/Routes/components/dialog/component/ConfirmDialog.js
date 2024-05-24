import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

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
];

function ConfirmationDialog(props) {
  const [value, setValue] = useState(undefined);
  const radioGroup = useRef();

  useEffect(() => {
    setValue(props.value);
  }, [props]);

  const handleEntering = () => {
    radioGroup.current.focus();
  };

  const handleCancel = () => {
    props.onClose(props.value);
  };

  const handleOk = () => {
    props.onClose(value);
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleBackdropClick = (event, reason) => {
    // Check if the click target is the backdrop element
      event.preventDefault();
  };

  const { ...other } = props;

  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="sm"
      TransitionProps={{ onEntering: handleEntering }}
      aria-labelledby="confirmation-dialog-title"
      {...other}
      onClose={handleBackdropClick}
    >
      <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
      <DialogContent>
        <RadioGroup
          ref={radioGroup}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          onClick={handleCancel}
          className="btn-danger text-white"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleOk}
          color="primary"
          className="text-white"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

function ConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <div>
      <List>
        <ListItem button divider disabled>
          <ListItemText primary="Interruptions" />
        </ListItem>
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="Phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Phone ringtone" secondary={value} />
        </ListItem>
        <ListItem button divider disabled>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
        <ConfirmationDialog
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </div>
  );
}

export default ConfirmDialog;
