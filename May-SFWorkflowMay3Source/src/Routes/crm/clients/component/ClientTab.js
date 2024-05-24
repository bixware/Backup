/**
 * Clients tab section
 */
/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab, Typography, Button } from '@material-ui/core';

import UpdateClient from './UpdateClient';
import ConfirmationDialog from './ConfirmationDialog';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

//Actions
import { deleteClient } from 'Store/Actions';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

function ClientTab(props) {
   const confirmationDialog = useRef();
   const [value, setValue] = useState(0);
   const [favClients, setFavClients] = useState([]);
   const [recentClients, setRecentClients] = useState(null);
   const [data, setData] = useState(null);
   const [isUpdated, setIsUpdated] = useState(false);
   const dispatch = useDispatch();
   const CrmReducer = useSelector(state => state.CrmReducer);
   const {clientsData} = CrmReducer
   useEffect(() => {
      getFavClient();
      getRecentClient();
   },[]);

   // get favourite client data
   const getFavClient = () => {
      let newArray = [];
      let data = clientsData;
      if (data !== null) {
         for (let Item of data) {
            if (Item.type === 'favourite') {
               newArray.push(Item)
            }
         }
         setFavClients(newArray);
         setIsUpdated(false);
      }
   }

   // get recent client data
   const getRecentClient = () => {
      let newArray = [];
      let data = clientsData;
      if (data !== null) {
         for (let Item of data) {
            if (Item.type === 'recently_added') {
               newArray.push(Item)
            }
         }
         setRecentClients(newArray);
         setIsUpdated(false);
      }
   }

   const handleChange = (event, value) => {
      setValue(value);
   };

   const ondeleteClient = (data) => {
      setData(data);
      confirmationDialog.current.openDialog();
   }

   const deleteClientPermanent = (popupResponse) => {
      if (popupResponse){
         dispatch(deleteClient(data));
         setData("");
      }
   }

   const handleClickEdit = (data) => {
      setData(data);
      setIsUpdated(true);
   }

   const onCloseDialog = (popupResponse) => {
      setData(null);
      setIsUpdated(false);
   }

   const { theme, } = props;
   return (
      <div className="client-tab-wrap p-15 Tab-wrap">
         { (isUpdated && data) &&
            <UpdateClient data={data} onCloseDialog={onCloseDialog} />
         }
         <AppBar position="static" color="default">
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="primary"
               textColor="primary"
            >
               <Tab label="All Client" />
               <Tab label="Favourite" />
               <Tab label="Recently Added" />
            </Tabs>
         </AppBar>
         <div>
            <SwipeableViews
               //animateHeight
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={value}>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                        <div className="row">
                           {clientsData && clientsData.map((data, index) => {
                              return (
                                 <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                    <RctCard>
                                       <RctCardContent>
                                          <div className="client-post text-center">
                                             <div className="client-thumb mb-20">
                                                <img
                                                   className="rounded"
                                                   src={`${process.env.PUBLIC_URL}/assets/images/avatars/${data.image}`}
                                                   alt="client"
                                                   width="95"
                                                   height="95"
                                                />
                                             </div>
                                             <div className="client-content">
                                                <h4 className="fw-bold text-capitalize text-primary">{data.name}</h4>
                                                <span className="d-block">
                                                   <a href="!#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">{data.e_mail}</a>
                                                </span>
                                                <span className="d-block">
                                                   <a href="!#" tel="+1 207-589-4752" className="text-dark text-capitalize">{data.phone_number}</a>
                                                </span>
                                                <span className="d-block text-dark text-capitalize">{data.country}</span>
                                             </div>
                                             <div className="client-action d-flex">
                                                <Button className="rounded-circle mr-5" onClick={() => handleClickEdit(data)}>
                                                      <i className="material-icons">edit</i>
                                                </Button>
                                                <Button
                                                   className="rounded-circle"
                                                   onClick={() => ondeleteClient(data)}
                                                >
                                                   <i className="material-icons">delete</i>
                                                </Button>
                                             </div>
                                          </div>
                                       </RctCardContent>
                                    </RctCard>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                        <div className="row">
                           {favClients && favClients.map((data, index) => {
                              return (
                                 <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                    <RctCard>
                                       <RctCardContent>
                                          <div className="client-post text-center">
                                             <div className="client-thumb mb-20">
                                                <img
                                                   className="rounded"
                                                   src={`${process.env.PUBLIC_URL}/assets/images/avatars/${data.image}`}
                                                   alt="client"
                                                   width="95"
                                                   height="95"
                                                />
                                             </div>
                                             <div className="client-content">
                                                <h4 className="fw-bold text-capitalize text-primary">{data.name}</h4>
                                                <span className="d-block">
                                                   <a href="!#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">{data.e_mail}</a>
                                                </span>
                                                <span className="d-block">
                                                   <a href="!#" tel="+1 207-589-4752" className="text-dark text-capitalize">{data.phone_number}</a>
                                                </span>
                                                <span className="d-block text-dark text-capitalize">{data.country}</span>
                                             </div>
                                             <div className="client-action d-flex">
                                                <Button className="rounded-circle mr-5" onClick={() => handleClickEdit(data)}>
                                                      <i className="material-icons">edit</i>
                                                </Button>
                                                <Button
                                                   className="rounded-circle"
                                                   onClick={() => ondeleteClient(data)}
                                                >
                                                   <i className="material-icons">delete</i>
                                                </Button>
                                             </div>
                                          </div>
                                       </RctCardContent>
                                    </RctCard>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                        <div className="row">
                           {recentClients && recentClients.map((data, index) => {
                              return (
                                 <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                    <RctCard>
                                       <RctCardContent>
                                          <div className="client-post text-center">
                                             <div className="client-thumb mb-20">
                                                <img
                                                   className="rounded"
                                                   src={`${process.env.PUBLIC_URL}/assets/images/avatars/${data.image}`}
                                                   alt="client"
                                                   width="95"
                                                   height="95"
                                                />
                                             </div>
                                             <div className="client-content">
                                                <h4 className="fw-bold text-capitalize text-primary">{data.name}</h4>
                                                <span className="d-block">
                                                   <a href="!#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">{data.e_mail}</a>
                                                </span>
                                                <span className="d-block">
                                                   <a href="!#" tel="+1 207-589-4752" className="text-dark text-capitalize">{data.phone_number}</a>
                                                </span>
                                                <span className="d-block text-dark text-capitalize">{data.country}</span>
                                             </div>
                                             <div className="client-action d-flex">
                                                <Button className="rounded-circle mr-5" onClick={() => handleClickEdit(data)}>
                                                      <i className="material-icons">edit</i>
                                                </Button>
                                                <Button
                                                   className="rounded-circle"
                                                   onClick={() => ondeleteClient(data)}
                                                >
                                                   <i className="material-icons">delete</i>
                                                </Button>
                                             </div>
                                          </div>
                                       </RctCardContent>
                                    </RctCard>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  </TabContainer>
               </div>
            </SwipeableViews>
         </div>
         <ConfirmationDialog
            ref={confirmationDialog}
            onConfirm={(res) => deleteClientPermanent(res)}
         />
      </div>
   );
}


export default (withStyles(null, { withTheme: true })(ClientTab));