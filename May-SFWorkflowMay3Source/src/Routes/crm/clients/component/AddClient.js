/**
 * Form Dialog
 */
/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
//Actions
import { addNewClient } from 'Store/Actions';

function AddClient() {
   const [open, setOpen] = useState(false);
   const [name,setName] = useState('');
   const [mobile,setMobile] = useState('');
   const [email,setEmail] = useState('');
   const [location,setLocation] = useState('');
   const [errors, setErrors] = useState({});
   const dispatch = useDispatch();

	const handleClickOpen = () => {
      setOpen(true);
      setErrors({});
      setName('');
      setMobile('');
      setEmail('');
      setLocation('');
	};

	const handleClose = () => {
      setOpen(false);
      setFields({});
      setErrors({
         name: false
      });
	};

	//handle form validation
	const handleValidation = () => {
		let errors = {};
		let formIsValid = true;

		//FName
      if (!name) {
			formIsValid = false;
			errors["name"] = "Cannot be empty";
		}

      if (typeof name !== "undefined") {
         if (!name.match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["name"] = "Only letters";
			}
		}

		//Email
      if (!email) {
			formIsValid = false;
			errors["email"] = "Cannot be empty";
		}

      if (typeof email !== "undefined") {
         let lastAtPos = email.lastIndexOf('@');
         let lastDotPos = email.lastIndexOf('.');

         if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
				formIsValid = false;
				errors["email"] = "Email is not valid";
			}
		}

		//mobile num.
		if (!mobile) {
			formIsValid = false;
			errors["mobile"] = "Cannot be empty";
		}

      if (typeof mobile !== "undefined") {
         if (!mobile.match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["mobile"] = "number is not valid";
			}
		}

		//country
      if (!location) {
			formIsValid = false;
			errors["location"] = "Cannot be empty";
		}

      if (typeof location !== "undefined") {
         if (!location.match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["location"] = "Only letters";
			}
		}
      setErrors(errors);
		return formIsValid;
	}

	//submit form data
	const onFormSubmit = (e) => {
		e.preventDefault();
		if (handleValidation()) {
         let fields = {
            name: name,
            location: location,
            mobile: mobile,
            email: email
         }  
         dispatch(addNewClient(fields));
         setOpen(false);
		} else {
			alert("Form has errors.")
		}
	}

   return (
      <div>
         <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add
            <i className="material-icons pl-10">add</i>
         </Button>
         <Dialog className="client-dialog" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
               <div>
                  <form onSubmit={onFormSubmit}>
                     <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                           <TextField
                              fullWidth
                              id="standard-name"
                              label="Name"
                              className="iron-form-input-wrap"
                              error={errors["name"] ? true : false}
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                           />
                           <span className="error">{errors["name"]}</span>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                           <TextField
                              fullWidth
                              id="standard-name"
                              label="Contact No"
                              className="iron-form-input-wrap"
                              error={errors["mobile"] ? true : false}
                              onChange={(e) => setMobile(e.target.value)}
                              value={mobile}
                           />
                           <span className="error">{errors["mobile"]}</span>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                           <TextField
                              fullWidth
                              id="standard-email"
                              label="email"
                              className="iron-form-input-wrap"
                              error={errors["email"] ? true : false}
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                           />
                           <span className="error">{errors["email"]}</span>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                           <TextField
                              fullWidth
                              id="standard-name"
                              label="location"
                              className="iron-form-input-wrap"
                              error={errors["location"] ? true : false}
                              onChange={(e) => setLocation(e.target.value)}
                              value={location}
                           />
                           <span className="error">{errors["location"]}</span>
                        </div>
                     </div>
                     <div className="pt-25 text-right">
                        <Button variant="contained" onClick={handleClose} className="btn-danger mr-15 text-white">
                           Cancel
                        </Button>
                        <Button className="btn-success text-white text-capitalize" type="submit">Submit</Button>
                     </div>
                  </form>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
}

export default AddClient;
