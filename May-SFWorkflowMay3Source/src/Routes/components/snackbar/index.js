/**
 * Snackbar
 */
import React, { useState } from 'react';
import {Button, Snackbar, IconButton, SnackbarContent} from '@material-ui/core';
//Componets
import PositionedSnackbar from './component/PositionSnackbar';
import DirectionSnackbar from './component/DirectionSnackbar';
import FadeSnackbar from './component/FadeSnackbar';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default function SnackbarComponent(props) {
   // Simple Snackbar
   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };

   return (
      <div className="snackbar-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.snackbar" />} match={props.match} />
         <div className="row">
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-12 col-xl-6"
               heading={<IntlMessages id="widgets.transitionControlDirection" />}
            >
               <DirectionSnackbar />
            </RctCollapsibleCard>
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-12 col-xl-6"
               heading={<IntlMessages id="widgets.simpleSnackbar" />}
            >
               <Button variant="contained" color="primary" className="text-white mr-10 mb-10 d-inline-block" onClick={handleClick}>simple snackbar</Button>
               <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message={<span id="message-id">Note archived</span>}
                  action={[
                     <Button variant="contained" key="undo" className="btn-danger btn-sm text-white" dense="true" onClick={handleClose}> UNDO </Button>,
                     <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose} >
                        <i className="zmdi zmdi-close"></i>
                     </IconButton>,
                  ]}
               />
               <FadeSnackbar />
            </RctCollapsibleCard>
         </div>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.positionedSnackbar" />}
         >
            <PositionedSnackbar />
         </RctCollapsibleCard>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.contexualColoredSnackbars" />}
         >
            <div className="row">
               <div className="col-sm-12 col-md-12 col-xl-6">
                  <SnackbarContent className="bg-primary mb-15" message="I Love Reactify Admin Theme." />
                  <SnackbarContent className="bg-success mb-15" message="I Love Reactify Admin Theme." />
                  <SnackbarContent className="bg-danger mb-15" message="I Love Reactify Admin Theme." />
               </div>
               <div className="col-sm-12 col-md-12 col-xl-6">
                  <SnackbarContent className="bg-warning mb-15" message="I Love Reactify Admin Theme." />
                  <SnackbarContent className="bg-secondary mb-15" message="I Love Reactify Admin Theme." />
                  <SnackbarContent className="bg-info mb-15" message="I Love Reactify Admin Theme." />
               </div>
            </div>
         </RctCollapsibleCard>
      </div>
   );
}
