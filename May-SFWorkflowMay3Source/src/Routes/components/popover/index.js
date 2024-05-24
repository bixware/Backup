/**
 * Popover
 */
import React, { useState } from 'react';
import { Button, IconButton, Tooltip, Avatar} from '@material-ui/core';
// components
import AnchorPopover from './components/AnchorPopover';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function PopoverTooltip(props){
   const [open, setOpen] = useState(false);

   // For Controlled Tooltip
   const handleTooltipClose = () => {
      setOpen(false);
   };
   const handleTooltipOpen = () => {
      setOpen(true);
   };

   return (
      <div className="popover-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.popover" />} match={props.match} />
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.anchorPlayGround" />}
         >
            <AnchorPopover />
         </RctCollapsibleCard>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.tooltip" />}
         >
            <div className="row">
               <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-md-6 col-xl-3">
                  <h5 className="mb-20">Button Tooltip</h5>
                  <Tooltip id="tooltip-fab" title="Add">
                     <Button color="primary" variant="contained" className="text-white" aria-label="Add">
                        <i className="zmdi zmdi-plus zmdi-hc-lg"></i>
                     </Button>
                  </Tooltip>
               </RctCollapsibleCard>
               <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-md-6 col-xl-3">
                  <h5 className="mb-20">Icon Tooltip</h5>
                  <Tooltip id="tooltip-icon" title="User Icon">
                     <IconButton>
                        <i className="zmdi zmdi-account-circle zmdi-hc-lg"></i>
                     </IconButton>
                  </Tooltip>
               </RctCollapsibleCard>
               <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-md-6 col-xl-3">
                  <h5 className="mb-20">Avatar Tooltip</h5>
                  <Tooltip id="tooltip-icon" title="User Icon">
                     <Avatar alt="User Image" className="img-fluid d-inline-block" src={`${process.env.PUBLIC_URL}/assets/images/img/user-5.jpg`} />
                  </Tooltip>
               </RctCollapsibleCard>
               <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-md-6 col-xl-3">
                  <h5 className="mb-20">Controlled Tooltips</h5>
                  <Tooltip id="tooltip-controlled" title="Delete" onClose={handleTooltipClose} enterDelay={300} leaveDelay={300}
                     onOpen={handleTooltipOpen} open={open} placement="top">
                     <IconButton>
                        <i className="zmdi zmdi-delete zmdi-hc-lg"></i>
                     </IconButton>
                  </Tooltip>
               </RctCollapsibleCard>
            </div>
         </RctCollapsibleCard>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.positionedToolTips" />}
         >
            <Tooltip id="tooltip-top-start" title="Top Start" placement="top-start">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">top start</Button>
            </Tooltip>
            <Tooltip id="tooltip-top" title="Top" placement="top">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">top</Button>
            </Tooltip>
            <Tooltip id="tooltip-top-end" title="Top End" placement="top-end">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">top-end</Button>
            </Tooltip>
            <Tooltip id="tooltip-left-start" title="Left Start" placement="left-start">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">left-start</Button>
            </Tooltip>
            <Tooltip id="tooltip-left" title="Left" placement="left">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">left</Button>
            </Tooltip>
            <Tooltip id="tooltip-left-end" title="Left End" placement="left-end">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">left-end</Button>
            </Tooltip>
            <Tooltip id="tooltip-right-start" title="Right Start" placement="right-start">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">right-start</Button>
            </Tooltip>
            <Tooltip id="tooltip-right" title="Right" placement="right">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">right</Button>
            </Tooltip>
            <Tooltip id="tooltip-right-end" title="Right End" placement="right-end">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">right-end</Button>
            </Tooltip>
            <Tooltip id="tooltip-bottom-start" title="Bottom Start" placement="bottom-start">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">bottom-start</Button>
            </Tooltip>
            <Tooltip id="tooltip-bottom" title="Bottom" placement="bottom">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">bottom</Button>
            </Tooltip>
            <Tooltip id="tooltip-bottom-end" title="Bottom End" placement="bottom-end">
               <Button color="primary" variant="contained" className="text-white mb-10 mr-10">bottom-end</Button>
            </Tooltip>
         </RctCollapsibleCard>
      </div>
   );
}

export default PopoverTooltip;
