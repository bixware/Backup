/**
 * Payment Component
 */

import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import Button from '@material-ui/core/Button';
import MaskedInput from 'react-text-mask'
import { NotificationManager } from 'react-notifications';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function PaymentInfo(props) {
   const [number, setNumber] = useState();
   const [name, setName] = useState();
   const [expiry, setExpiry] = useState();
   const [cvc, setCvc] = useState();
   const [focused, setFocused] = useState();
   const [formValid, setFormValid] = useState();
   
   const handleInputFocus = ({ target }) => {
      setFocused(target.name);
   };

   const handleInputChange = ({ target }) => {
      if (name !== '' && number !== '' && expiry !== '' && cvc !== '') {
         setFormValid(true);
      } else {
         setFormValid(false);
      }

      if (target.name === 'number') {
         setNumber(target.value.replace(/ /g, ''));
      }
      else if (target.name === 'expiry') {
         setExpiry(target.value.replace(/ |\//g, ''));
      }
      else if (target.name === 'cvc') {
         setCvc(target.value.replace(/ |\//g, ''));
      }
      else {
         setName(target.value)
      }
   };

   /**
    * on confirm payment
    */
   const confirmPayment = () => {
      if (formValid) {
         NotificationManager.success('Payment Confirmed!')
      }
   }

   return (
      <div className="payment-wrap">
         <div className="p-30 mb-30">
            <Cards
               number={number}
               name={name}
               expiry={expiry}
               cvc={cvc}
               focused={focused}
               preview={true}
            />
         </div>
         <div className="w-80 mx-auto">
            <Form>
               <FormGroup>
                  <Label for="cardNumber"><IntlMessages id="components.cardNumber" /></Label>
                  <MaskedInput
                     type="text"
                     name="number"
                     className="form-control"
                     id="cardNumber"
                     onKeyUp={handleInputChange}
                     onFocus={handleInputFocus}
                     mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                  />
               </FormGroup>
               <div className="d-flex justify-content-between">
                  <FormGroup className="w-50 mr-10">
                     <Label for="expiryDate"><IntlMessages id="components.expiryDate" /></Label>
                     <MaskedInput
                        type="text"
                        name="expiry"
                        className="form-control"
                        id="expiryDate"
                        placeholder="MM/YY"
                        onKeyUp={handleInputChange}
                        onFocus={handleInputFocus}
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                     />
                  </FormGroup>
                  <FormGroup className="w-50 ml-10">
                     <Label for="cvvNumber"><IntlMessages id="components.cvv" /></Label>
                     <Input
                        type="text"
                        name="cvc"
                        id="cvvNumber"
                        onKeyUp={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={4}
                     />
                  </FormGroup>
               </div>
               <FormGroup>
                  <Label for="name"><IntlMessages id="components.nameOnCard" /></Label>
                  <Input
                     type="text"
                     name="name"
                     id="name"
                     onKeyUp={handleInputChange}
                     onFocus={handleInputFocus}
                  />
               </FormGroup>
            </Form>
            <div className="d-flex justify-content-between">
               <Button onClick={props.onChangeInfo} color="secondary" className="text-white" variant="contained">
                  <IntlMessages id="button.back" />
               </Button>
               <Button disabled={!formValid} color="primary" variant="contained" onClick={() => confirmPayment()}><IntlMessages id="components.confirmPayment" /></Button>
            </div>
         </div>
      </div>
   )
}

export default PaymentInfo;
