/**
 * Address Page
 */
import React, { useRef, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
	FormGroup,
	Form,
	Label,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
import { Collapse } from 'reactstrap';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationManager } from 'react-notifications';
// edit address from
import EditAddressForm from './EditAddressForm';
// intl messages
import IntlMessages from 'Util/IntlMessages';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
// user addresses
import userAddresses from '../data/userAddresses';

export default function Address() {
   const deleteConfirmationDialog = useRef();
   const [collapse, setCollapse] = useState(false);
   const [loading,setLoading] = useState(false);
   const [addresses, setAddresses] = useState(userAddresses);
   const [addNewAddressDetail, setAddNewAddressDetail] = useState({
      id: null,
      name: 'Admin',
      city: '',
      country: '',
      zipCode: '',
      state: '',
      addressLine1: '',
      addressLine2: '',
      apt: '',
      phone: '',
      altPhone: '',
      email: '',
      isDefault: false
   });
   const [deleteAddress, setDeleteAddress] = useState(null);
   const [editAddressModal, setEditAddressModal] = useState(false);
   const [selectedAddress, setSelectedAddress] = useState(null);
  
	const toggle = () => {
      setCollapse(!collapse);
	}

	/**
	 * Add New Address Hanlder
	 */
	const addNewAddress = () => {
		const { city, country, state, addressLine2, addressLine1 } = addNewAddressDetail;
		if (city !== '' && country !== '' && state !== '' && addressLine1 !== '' && addressLine2 !== '') {
			let newAddress = {
				...addNewAddressDetail,
				id: new Date().getTime()
			}
			let address = addresses;
			if (newAddress.isDefault) {
				for (const add of address) {
               if (add.isDefault) {
                  add.isDefault = false
					}
				}
			}
			address.push(newAddress);
         setLoading(true)
			setTimeout(() => {
            setLoading(false);
            setAddresses(address);
            setCollapse(false);
            setAddNewAddressDetail({
               id: null,
               name: 'Admin',
               city: '',
               country: '',
               zipCode: '',
               state: '',
               addressLine1: '',
               addressLine2: '',
               apt: '',
               phone: '',
               altPhone: '',
               email: '',
               isDefault: false
            })
			});
		}
	}

	/**
	 * Hanlde Change Default Address
	 */
	const handleChangeDefaultAddress = () => {
      setSelectedAddress({
         ...selectedAddress,
         isDefault: !selectedAddress.isDefault
      })
	}

	/**
	 * On Delete Address
	 */
	const onDeleteAddress = (address) => {
      deleteConfirmationDialog.current.open();
      setDeleteAddress(address);
	}

	/**
	 * Delete Address
	 */
   const onAddressDelete = () => {
		let address = addresses;
		let indexOfDeleteAddress = address.indexOf(deleteAddress);
		address.splice(indexOfDeleteAddress, 1);
		deleteConfirmationDialog.current.close();
      setLoading(true)
		setTimeout(() => {
         setLoading(false)
         setAddresses(address);
			NotificationManager.success('Address Deleted!');
		}, 2000);
	}

	/**
	 * Edit Address
	 */
	const onEditAddress = (address) => {
      setEditAddressModal(true);
      setSelectedAddress(address);
	}

	/**
	 * Toggle Edit Address Modal
	 */
	const toggleEditAddressModal =() => {
      setEditAddressModal(false);
	}

	/**
	 * On Update Edit Address
	 */
	const onUpdateEditAddressModal = (key, value) => {
      setSelectedAddress({
         ...selectedAddress,
         [key]: value
      })		
	}

	/**
	 * On Update Address
	 */
	const updateEditAddressModal = () => {
		let address = addresses;
		let indexOfUpdateAddress;
		for (let i = 0; i < addresses.length; i++) {
			const address = addresses[i];
			if (selectedAddress.isDefault) {
				address.isDefault = false
			}
			if (address.id === selectedAddress.id) {
				indexOfUpdateAddress = i;
			}
		}
      address[indexOfUpdateAddress] = selectedAddress;
      setLoading(true);
      setEditAddressModal(false);
		setTimeout(() => {
         setLoading(false);
         setAddresses(address);
         
		}, 2000);
	}

   return (
      <div className="address-wrapper">
         <h2 className="heading"><IntlMessages id="widgets.selectADefaultAddress" /></h2>
         <div className="row row-eq-height">
            {addresses && addresses.map((address, key) => (
               <div className="col-sm-6 col-md-4 col-lg-3" key={key}>
                  <div className={classnames("card-base", { 'border-primary': address.isDefault })}>
                     <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">{address.name}</h5>
                        <div className="list-action">
                           <button type="button" className="rct-link-btn" onClick={() => onEditAddress(address)}><i className="ti-pencil"></i></button>
                           <button type="button" className="rct-link-btn" onClick={() => onDeleteAddress(address)}><i className="ti-close"></i></button>
                        </div>
                     </div>
                     <address>
                        <span>{address.addressLine1}</span>
                        <span>{address.apt !== '' ? `${address.apt}, ` : ''}{address.addressLine2 !== '' ? `${address.addressLine2}, ` : ''} {address.city}</span>
                        <span>{address.state !== '' ? `${address.state}, ` : ''}{address.country}</span>
                     </address>
                     <FormControlLabel
                        control={
                           <Checkbox
                              checked={address.isDefault}
                              // onChange={() => this.handleChangeDefaultAddress(address)}
                              disabled
                              color="primary"
                           />
                        }
                        label="Default"
                     />
                  </div>
               </div>
            ))}
         </div>
         <Button variant="contained" color="primary" className="text-white" onClick={toggle}>Add New Address</Button>
         <div className="py-50 w-50">
            <Collapse isOpen={collapse}>
               <div className="mb-20">
                  <h2 className="heading mb-5">Add a new address</h2>
                  <span>Be sure to click "Deliver to this address" when you have finished. </span>
               </div>
               <Form>
                  <div className="row">
                     <div className="col-md-6">
                        <FormGroup>
                           <Label className="col-form-label" for="city">City</Label>
                           <Input
                              type="text"
                              name="city"
                              id="city"
                              className="input-lg"
                              value={addNewAddressDetail.city}
                              onChange={(e) => setAddNewAddressDetail({...addNewAddressDetail,
                                 city: e.target.value})}
                           />
                        </FormGroup>
                        <FormGroup>
                           <Label className="col-form-label" for="country">Country</Label>
                           <Input
                              type="text"
                              name="country"
                              id="country"
                              className="input-lg"
                              value={addNewAddressDetail.country}
                              onChange={(e) => setAddNewAddressDetail({
                                    ...addNewAddressDetail,
                                    country: e.target.value
                              })
                              }
                           />
                        </FormGroup>
                     </div>
                     <div className="col-md-6">
                        <FormGroup>
                           <Label className="col-form-label" for="zipcode">Zip Code</Label>
                           <Input
                              type="text"
                              name="zipcode"
                              id="zipcode"
                              className="input-lg"
                              value={addNewAddressDetail.zipCode}
                              onChange={(e) => setAddNewAddressDetail({
                                    ...addNewAddressDetail,
                                    zipCode: e.target.value
                                 })}
                           />
                        </FormGroup>
                        <FormGroup>
                           <Label className="col-form-label" for="state">State</Label>
                           <Input
                              type="text"
                              name="state"
                              id="state"
                              className="input-lg"
                              value={addNewAddressDetail.state}
                              onChange={(e) => setAddNewAddressDetail({
                                    ...addNewAddressDetail,
                                    state: e.target.value
                                 })}
                           />
                        </FormGroup>
                     </div>
                  </div>
                  <FormGroup>
                     <Label className="col-form-label" for="address1">Address Line 1</Label>
                     <Input
                        type="text"
                        name="address1"
                        id="address1"
                        className="input-lg"
                        value={addNewAddressDetail.addressLine1}
                        onChange={(e) => setAddNewAddressDetail({
                              ...addNewAddressDetail,
                              addressLine1: e.target.value
                        })}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Label className="col-form-label" for="address2">Address Line 2</Label>
                     <Input
                        type="text"
                        name="address2"
                        id="address2"
                        className="input-lg"
                        value={addNewAddressDetail.addressLine2}
                        onChange={(e) => setAddNewAddressDetail({
                              ...addNewAddressDetail,
                              addressLine2: e.target.value
                           })}
                     />
                  </FormGroup>
                  <div className="row">
                     <div className="col-md-6">
                        <FormGroup>
                           <Label className="col-form-label" for="apt">Apt.</Label>
                           <Input
                              type="text"
                              name="apt"
                              id="apt"
                              className="input-lg"
                              value={addNewAddressDetail.apt}
                              onChange={(e) => setAddNewAddressDetail({
                                 ...addNewAddressDetail,
                                 apt: e.target.value
                              })}
                           />
                        </FormGroup>
                     </div>
                  </div>
                  <FormGroup>
                     <Label className="col-form-label" for="phone">Phone No.</Label>
                     <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="input-lg"
                        value={addNewAddressDetail.phone}
                        onChange={(e) => setAddNewAddressDetail({
                              ...addNewAddressDetail,
                              phone: e.target.value
                        })}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Label className="col-form-label" for="altphone">Alt Phone No.</Label>
                     <Input
                        type="tel"
                        name="altphone"
                        id="altphone"
                        className="input-lg"
                        value={addNewAddressDetail.altPhone}
                        onChange={(e) => setAddNewAddressDetail({
                              ...addNewAddressDetail,
                              altPhone: e.target.value
                        })}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Label className="col-form-label" for="email">Email Address</Label>
                     <Input
                        type="email"
                        name="email"
                        id="email"
                        className="input-lg"
                        value={addNewAddressDetail.emailAddress}
                        onChange={(e) => setAddNewAddressDetail({
                              ...addNewAddressDetail,
                              emailAddress: e.target.value
                           })}
                     />
                  </FormGroup>
                  <FormGroup>
                     <FormControlLabel
                        control={
                           <Checkbox
                              checked={addNewAddressDetail.isDefault}
                              color="primary"
                              onChange={(e) => setAddNewAddressDetail({
                                    ...addNewAddressDetail,
                                    isDefault: !addNewAddressDetail.isDefault
                              })}
                           />
                        }
                        label="Make Default Address"
                     />
                  </FormGroup>
                  <Button variant="contained" color="primary" className="text-white" onClick={() => addNewAddress()}>Save</Button>
               </Form>
            </Collapse>
         </div>
         <DeleteConfirmationDialog
            title="Are You Sure Want To Delete?"
            message="This will delete your address permanently."
            onConfirm={() => onAddressDelete()}
            ref={deleteConfirmationDialog}
         />
         <Modal isOpen={editAddressModal} toggle={() => toggleEditAddressModal()}>
            <ModalHeader toggle={() => toggleEditAddressModal()}>Edit Address</ModalHeader>
            <ModalBody>
               <EditAddressForm
                  selectedAddress={selectedAddress}
                  onUpdate={onUpdateEditAddressModal}
                  handleChangeDefaultAddress={() => handleChangeDefaultAddress()}
               />
            </ModalBody>
            <ModalFooter>
               <Button variant="contained" className="text-white btn-success" onClick={() => updateEditAddressModal()}>Update</Button>{' '}
               <Button variant="contained" className="text-white btn-danger" onClick={() => toggleEditAddressModal()}>Cancel</Button>
            </ModalFooter>
         </Modal>
         {loading &&
            <div className="d-flex justify-content-center loader-overlay">
               <CircularProgress />
            </div>
         }
      </div>
   );
}
