/**
 * Form Dialog
 */
/* eslint-disable */
import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormControl, InputLabel, FormHelperText, Input, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
//Actions
import { onUpdateClient } from 'Store/Actions';

function UpdateClient(props){
   const [open,setOpen] = useState(false);
   const [name,setName] = useState('');
   const [phoneNumber,setPhoneNumber] = useState('');
   const [email, setEmail] = useState('');
   const [location, setLocation] = useState('');
   const [isValidname, setIsValidname] = useState(false);
   const [isValidphoneNumber, setIsValidphoneNumber] = useState(false);
   const [isValidemail, setIsValidemail] = useState(false);
   const [isValidlocation, setIsValidLocation] = useState(false);
   const dispatch = useDispatch();

   const handleClose = (event, res) => {
      if (disableBackdropClick && reason === "backdropClick") {
         return false;
       }
      setOpen(false);
      props.onCloseDialog(true);
   };
   
   useEffect(() =>{
      handleClickOpen();
   },[])

   const handleClickOpen = () =>{
      setOpen(true);
      getClientData();
   }
  
   // get client data
   const getClientData = () => {
      const { data } = props;
      setName(data.name);
      setPhoneNumber(data.phone_number);
      setEmail(data.e_mail);
      setLocation(data.country);
   }
   /**
   * Method to check update validation
   */
   const onPressUpdate = () => {
      setIsValidname(false);
      setIsValidphoneNumber(false);
      setIsValidemail(false);
      setIsValidLocation(false);
      if (name !== '' && phoneNumber !== '' && email !== '' && location !== '') {
         updateClient();
      }
      else {
         if (name === '') {
            setIsValidname(true)
         }
         if (phoneNumber === '') {
            setIsValidphoneNumber(true);
         }
         if (email === '') {
            setIsValidemail(true);
         }
         if (location === '') {
            setIsValidLocation(true);
         }
         if (name === '' && phoneNumber === '' && email === '' && location === '') {
            setIsValidname(true);
            setIsValidphoneNumber(true);
            setIsValidemail(true);
            setIsValidLocation(true);
         }
      }
   }
   //update client info
   const updateClient = () => {
      let ID = props.data.id;
      let clientObject = {
         name: name,
         phoneNumber: phoneNumber,
         email: email,
         location: location
      }
      
      dispatch(onUpdateClient((clientObject), ID));
      props.onCloseDialog(true);
      setOpen(false);
   }

   return (
      <div>
         <Button className="rounded-circle mr-5" onClick={handleClickOpen}>
            <i className="material-icons">edit</i>
         </Button>
         <Dialog 
         className="client-dialog" 
         open={open} 
         onClose={handleClose} 
         aria-labelledby="form-dialog-title"
         disableBackdropClick
         >
            <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
            <DialogContent>
               <div>
                  <form autoComplete="off">
                     <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                           <FormControl
                              required
                              error={isValidname}
                              aria-describedby="firstsname-text"
                              className="d-block"
                           >
                              <InputLabel htmlFor="name">Name</InputLabel>
                              <Input
                                 fullWidth
                                 id="name"
                                 type="text"
                                 value={name ? name : ''}
                                 onChange={(event) => setName(event.target.value)}
                              />
                              {isValidname &&
                                 <FormHelperText id="firstsname-text">
                                    <i className="zmdi zmdi-alert-circle mr-1"></i>
                                    This field should not be empty.
                                 </FormHelperText>
                              }
                           </FormControl>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                           <FormControl
                              required
                              error={isValidphoneNumber}
                              aria-describedby="phoneNumber-text"
                              className="d-block"
                           >
                              <InputLabel htmlFor="phoneNumber">Contact</InputLabel>
                              <Input
                                 fullWidth
                                 id="phoneNumber"
                                 type="text"
                                 value={phoneNumber ? phoneNumber : ''}
                                 onChange={(event) => setPhoneNumber(event.target.value)}
                              />
                              {isValidphoneNumber &&
                                 <FormHelperText id="phoneNumber-text">
                                    <i className="zmdi zmdi-alert-circle mr-1"></i>
                                    This field should not be empty.
                                 </FormHelperText>
                              }
                           </FormControl>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                           <FormControl
                              required
                              error={isValidemail}
                              aria-describedby="email-text"
                              className="d-block"
                           >
                              <InputLabel htmlFor="email">Email</InputLabel>
                              <Input
                                 fullWidth
                                 id="email"
                                 type="email"
                                 value={email}
                                 onChange={(event) => setEmail(event.target.value)}
                              />
                              {isValidemail &&
                                 <FormHelperText id="email-text">
                                    <i className="zmdi zmdi-alert-circle mr-1"></i>
                                    This field should not be empty.
                                 </FormHelperText>
                              }
                           </FormControl>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                           <FormControl
                              required
                              error={isValidlocation}
                              aria-describedby="location-text"
                              className="d-block"
                           >
                              <InputLabel htmlFor="location">Location</InputLabel>
                              <Input
                                 fullWidth
                                 id="location"
                                 type="text"
                                 value={location ? location : ''}
                                 onChange={(event) => setLocation(event.target.value)}
                              />
                              {isValidlocation &&
                                 <FormHelperText id="location-text">
                                    <i className="zmdi zmdi-alert-circle mr-1"></i>
                                    This field should not be empty.
                                 </FormHelperText>
                              }
                           </FormControl>
                        </div>
                     </div>
                     <div className="pt-25 text-right">
                        <Button variant="contained" onClick={handleClose} className="btn-danger mr-15 text-white">
                           Cancel
                        </Button>
                        <Button
                           className="btn-success text-white text-capitalize"
                           onClick={() => onPressUpdate()}
                        >
                           Submit
                        </Button>
                     </div>
                  </form>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
}

export default UpdateClient;
