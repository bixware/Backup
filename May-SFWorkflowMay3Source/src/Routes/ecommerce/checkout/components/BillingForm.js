/**
 * Billing Form Component
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Col, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function BillingForm(props) {
   const [billingInformation, setBillingInformation] = useState({
      firstName: '',
      lastName: '',
      emailId: '',
      mobileNumber: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      zipCode: '',
      state: ''
   })
  
	/**
	 * On Change Billing Information
	 */
   const onChangeBillingInformation = (key, value) => {
      let billingInfo = {
            ...billingInformation,
      [key]: value
      }
      setBillingInformation(billingInfo)
   }

	/**
	 * Function To Check Either The Form Is Valid Or Not
	 * Return Boolean
	 */
   const isFormValid = () => {
      const { firstName, emailId, mobileNumber, addressLine1, zipCode, country, state } = billingInformation;
      if (firstName !== '' && emailId !== '' && addressLine1 !== '' && mobileNumber !== '' && zipCode !== '' && country !== '' && state !== '') {
         return true
      } else {
         return false
      }
   }

   return (
      <div className="billing-form-warp py-4">
         <Form>
            <FormGroup row>
               <Col sm={6}>
                  <Label for="firstName"><IntlMessages id="components.firstName" /><span className="text-danger">*</span></Label>
                  <Input
                     type="text"
                     name="first name"
                     id="firstName"
                     className="mb-4 mb-sm-0"
                     onChange={(e) => onChangeBillingInformation('firstName', e.target.value)}
                  />
               </Col>
               <Col sm={6}>
                  <Label for="lastName"><IntlMessages id="components.lastName" /></Label>
                  <Input
                     type="text"
                     name="last name"
                     id="lastName"
                     onChange={(e) => onChangeBillingInformation('lastName', e.target.value)}
                  />
               </Col>
            </FormGroup>
            <FormGroup row>
               <Col sm={6}>
                  <Label for="emailId"><IntlMessages id="components.email" /><span className="text-danger">*</span></Label>
                  <Input
                     type="email"
                     name="mail"
                     id="emailId"
                     className="mb-4 mb-sm-0"
                     onChange={(e) => onChangeBillingInformation('emailId', e.target.value)}
                  />
               </Col>
               <Col sm={6}>
                  <Label for="contactNumber"><IntlMessages id="components.mobileNumber" /><span className="text-danger">*</span></Label>
                  <Input
                     type="tel"
                     name="number"
                     id="contactNumber"
                     onChange={(e) => onChangeBillingInformation('mobileNumber', e.target.value)}
                  />
               </Col>
            </FormGroup>
            <FormGroup row>
               <Col sm={12}>
                  <Label for="address1"><IntlMessages id="components.address" />1<span className="text-danger">*</span></Label>
                  <Input
                     type="textarea"
                     name="address"
                     id="address1"
                     onChange={(e) => onChangeBillingInformation('addressLine1', e.target.value)}
                  />
               </Col>
            </FormGroup>
            <FormGroup row>
               <Col sm={12}>
                  <Label for="address2"><IntlMessages id="components.address2Optional" /></Label>
                  <Input
                     type="textarea"
                     name="address"
                     id="address2"
                     onChange={(e) => onChangeBillingInformation('addressLine2', e.target.value)}
                  />
               </Col>
            </FormGroup>
            <FormGroup row>
               <Col sm={4}>
                  <Label for="countryName"><IntlMessages id="components.country" /><span className="text-danger">*</span></Label>
                  <Input
                     type="text"
                     name="country"
                     id="countryName"
                     className="mb-4 mb-sm-0"
                     onChange={(e) => onChangeBillingInformation('country', e.target.value)}
                  />
               </Col>
               <Col sm={4}>
                  <Label for="stateName"><IntlMessages id="components.state" /><span className="text-danger">*</span></Label>
                  <Input
                     type="text"
                     name="state"
                     id="stateName"
                     className="mb-4 mb-sm-0"
                     onChange={(e) => onChangeBillingInformation('state', e.target.value)}
                  />
               </Col>
               <Col sm={4}>
                  <Label for="zip"><IntlMessages id="components.zip" /><span className="text-danger">*</span></Label>
                  <Input
                     type="number"
                     name="zip"
                     id="zip"
                     onChange={(e) => onChangeBillingInformation('zipCode', e.target.value)}
                  />
               </Col>
            </FormGroup>
            <FormGroup row className="mb-0">
               <Col sm={12}>
                  <Label className="ml-4">
                     <Input type="checkbox" /><IntlMessages id="components.ShippingAddressText" />
                  </Label>
               </Col>
            </FormGroup>
            <FormText color="danger">All fields marked with an asterisk (*) are required</FormText>
         </Form>
         <div className="d-flex justify-content-end">
            <Button disabled={!isFormValid()} onClick={props.onComplete} color="primary" variant="contained">
               <IntlMessages id="components.saveContinue" />
            </Button>
         </div>
      </div>
   )
}
export default BillingForm;