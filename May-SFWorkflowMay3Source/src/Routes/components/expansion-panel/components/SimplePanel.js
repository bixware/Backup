/**
* Simple Panel
*/
import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography} from '@material-ui/core';

function SimplePanel(){
   return (
      <div>
         <Accordion>
            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
               <Typography>Expansion Panel 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
            </Typography>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
               <Typography>Expansion Panel 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
            </Typography>
            </AccordionDetails>
         </Accordion>
         <Accordion disabled>
            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
               <Typography>Disabled Expansion Panel</Typography>
            </AccordionSummary>
         </Accordion>
      </div>
   );
}

export default SimplePanel;
