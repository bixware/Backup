/**
 * Anchor Popover
 */
import React, { useState, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Grid, Typography, Button, Popover, Input, InputLabel}  from '@material-ui/core';

function AnchorPopover() {
   const button = useRef();
   const [open, setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(false)
   const [anchorOriginVertical, setAnchorOriginVertical] = useState('bottom');
   const [anchorOriginHorizontal, setAnchorOriginHorizontal] = useState('center');
   const [transformOriginVertical, setTransformOriginVertical] = useState('top');
   const [transformOriginHorizontal, setTransformOriginHorizontal] = useState('center');
   const [positionTop, setPositionTop] = useState(300);
   const [positionLeft, setPositionLeft] = useState(800);
   const [anchorReference, setAnchorReference] = useState('anchorEl');
   
   const handleChange = (key, event) => {
      key(event.target.value)
   };

   const handleNumberInputChange = (key, event) => {
      key(parseInt(event.target.value))
   };

   const handleClickButton = () => {
      setOpen(true);
      setAnchorEl(findDOMNode(button.current));
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div className="popover-wrapper animated fadeInUp">
         <Button ref={button}
            variant="contained" color="primary" className="text-white mb-30" onClick={handleClickButton} >
            Open Popover
            </Button>
         <Popover open={open} anchorEl={anchorEl} anchorReference={anchorReference} anchorPosition={{ top: positionTop, left: positionLeft }}
            onClose={handleClose}
            anchorOrigin={{ vertical: anchorOriginVertical, horizontal: anchorOriginHorizontal, }}
            transformOrigin={{ vertical: transformOriginVertical, horizontal: transformOriginHorizontal, }} >
            <Typography className="p-15">The content of the Popover.</Typography>
         </Popover>
         <Grid container>
            <Grid item xs={12} sm={6}>
               <FormControl component="fieldset">
                  <FormLabel component="legend">anchorReference</FormLabel>
                  <RadioGroup row aria-label="anchorReference" name="anchorReference" value={anchorReference} onChange={(event) => handleChange(setAnchorReference, event)} >
                     <FormControlLabel color="primary" value="anchorEl" control={<Radio />} label="anchorEl" />
                     <FormControlLabel color="primary" value="anchorPosition" control={<Radio />} label="anchorPosition" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControl>
                  <InputLabel htmlFor="position-top">anchorPosition.top</InputLabel>
                  <Input id="position-top" type="number" value={positionTop} onChange={(event) => handleNumberInputChange(setPositionTop,event)} />
               </FormControl>
               &nbsp;
            <FormControl>
                  <InputLabel htmlFor="position-left">anchorPosition.left</InputLabel>
                  <Input id="position-left" type="number" value={positionLeft} onChange={(event) => handleNumberInputChange(setPositionLeft,event)} />
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControl component="fieldset">
                  <FormLabel component="legend">anchorOrigin.vertical</FormLabel>
                  <RadioGroup row aria-label="anchorOriginVertical" name="anchorOriginVertical" value={anchorOriginVertical} onChange={(event) => handleChange(setAnchorOriginVertical,event)} >
                     <FormControlLabel color="primary" value="top" control={<Radio />} label="Top" />
                     <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                     <FormControlLabel color="primary" value="bottom" control={<Radio />} label="Bottom" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControl component="fieldset">
                  <FormLabel component="legend">transformOrigin.vertical</FormLabel>
                  <RadioGroup row aria-label="transformOriginVertical" name="transformOriginVertical" value={transformOriginVertical} onChange={(event) => handleChange(setTransformOriginVertical, event)} >
                     <FormControlLabel color="primary" value="top" control={<Radio />} label="Top" />
                     <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                     <FormControlLabel color="primary" value="bottom" control={<Radio />} label="Bottom" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControl component="fieldset">
                  <FormLabel component="legend">anchorOrigin.horizontal</FormLabel>
                  <RadioGroup row aria-label="anchorOriginHorizontal" name="anchorOriginHorizontal" value={anchorOriginHorizontal} onChange={(event) => handleChange(setAnchorOriginHorizontal,event)} >
                     <FormControlLabel color="primary" value="left" control={<Radio />} label="Left" />
                     <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                     <FormControlLabel color="primary" value="right" control={<Radio />} label="Right" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControl component="fieldset">
                  <FormLabel component="legend">transformOrigin.horizontal</FormLabel>
                  <RadioGroup row aria-label="transformOriginHorizontal" name="transformOriginHorizontal" value={transformOriginHorizontal} onChange={(event) => handleChange(setTransformOriginHorizontal,event)} >
                     <FormControlLabel color="primary" value="left" control={<Radio />} label="Left" />
                     <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                     <FormControlLabel color="primary" value="right" control={<Radio />} label="Right" />
                  </RadioGroup>
               </FormControl>
            </Grid>
         </Grid>
      </div>
   )
}

export default AnchorPopover;
