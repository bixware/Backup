/**
* Advanced Panel
*/
import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, AccordionActions, Typography, Chip, Button, Divider} from '@material-ui/core';

function AdvancedPanel() {
   return (
      <div>
         <Accordion defaultExpanded className="bg-info text-white">
            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
               <div className="col-md-3">
                  <Typography className="text-white">Location</Typography>
               </div>
               <div className="col-md-3">
                  <Typography className="text-white">Select trip destination</Typography>
               </div>
            </AccordionSummary>
            <AccordionDetails>
               <div className="col-md-3" />
               <div className="col-md-3">
                  <Chip label="Barbados" className="bg-warning text-white" onDelete={() => { }} />
               </div>
               <div className="col-md-3">
                  <Typography type="caption">
                     Select your destination of choice<br />
                     <a href="!#" onClick={e => e.preventDefault()}>Learn more</a>
                  </Typography>
               </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
               <Button variant="contained" color="primary" className="text-white">Cancel</Button>
               <Button variant="contained" className="btn-danger text-white">Save</Button>
            </AccordionActions>
         </Accordion>
      </div>
   );
}

export default AdvancedPanel;
