/**
* Controlled Panel
*/
import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography} from '@material-ui/core';

function ControlledPanel() {
   const [expanded,setExpanded] = useState(null);
   
   const handleChange = panel => (event, expanded) => {
      setExpanded(expanded ? panel : false);
   };

   return (
      <div>
         <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
            <Typography className="col-md-3">General settings</Typography>
            <Typography className="text-primary">I am an expansion panel</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
               Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
               maximus est, id dignissim quam.
               </Typography>
            </AccordionDetails>
         </Accordion>
         <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
            <Typography className="col-md-3">Users</Typography>
            <Typography className="text-primary">
               You are currently not an owner
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
               Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
               diam eros in elit. Pellentesque convallis laoreet laoreet.
               </Typography>
            </AccordionDetails>
         </Accordion>
         <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
            <Typography className="col-md-3">Advanced settings</Typography>
            <Typography className="text-primary">
               Filtering has been entirely disabled for whole web server
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
               Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
               eros, vitae egestas augue. Duis vel est augue.
               </Typography>
            </AccordionDetails>
         </Accordion>
      </div>
   );
}

export default ControlledPanel;
