/**
 * Material Text Field
 */
import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Components from './components/componets-field';
import Layouts from './components/layouts';
import InputAdornments from './components/input-adornment';
import FormattedInputs from './components/formated-input';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function TextFields(props){
   const [name,setName] = useState('Cat in the Hat');
   const [age,setAge] = useState('');
   const [multiline, setMultiline] = useState('Controlled');
   const [currency, setCurrency] = useState('EUR');

   const handleChange = (event,prop) => {
      prop(event.target.value);
   };

   return (
      <div className="textfields-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.textField" />} match={props.match} />
         <RctCollapsibleCard heading="Simple Text Field">
            <form noValidate autoComplete="off">
            <div className="row">
               <div className="col-sm-6 col-md-6 col-xl-3">
                  <div className="form-group">
                     <TextField id="name" fullWidth label="Name" value={name} onChange={(event) => handleChange(event,setName)} />
                  </div>
                  <div className="form-group">
                  <TextField id="uncontrolled" fullWidth label="Uncontrolled" defaultValue="foo" />
                  </div>
                  <div className="form-group">
                  <TextField required id="required" fullWidth label="Required" defaultValue="Hello World" />
                  </div>
                  <div className="form-group">
                  <TextField error id="error" fullWidth label="Error" defaultValue="Hello World" />
                  </div>
                  <div className="form-group">
                  <TextField id="search" fullWidth label="Search field" type="search" />
                  </div>
               </div>
               <div className="col-sm-6 col-md-6 col-xl-3">
                  <div className="form-group">
                  <TextField id="helperText" fullWidth label="Helper text" defaultValue="Default Value" helperText="Some important text" />
                  </div>
                  <div className="form-group">
                  <TextField id="with-placeholder" fullWidth label="With placeholder" placeholder="Placeholder" />
                  </div>
                  <div className="form-group">
                  <TextField id="multiline-static" fullWidth label="Multiline" multiline minRows="4" defaultValue="Default Value" />
                  </div>
               </div>
               <div className="col-sm-6 col-md-6 col-xl-3">
                  <div className="form-group">
                  <TextField id="select-currency" select label="Select"
                     value={currency}
                     onChange={(event) => handleChange(event,setCurrency)}
                     SelectProps={{
                        MenuProps: {
                        },
                     }}
                     helperText="Please select your currency"
                     fullWidth>
                     {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
                  </div>
                  <div className="form-group">
                  <TextField id="select-currency-native" select label="Native select"
                     value={currency} onChange={(event) => handleChange(event,setCurrency)}
                     SelectProps={{
                        native: true,
                     }}
                     helperText="Please select your currency"
                     fullWidth>
                     {currencies.map(option => (
                        <option key={option.value} value={option.value}>
                           {option.label}
                        </option>
                     ))}
                  </TextField>
                  </div>
                  <div className="form-group">
                  <TextField
                     id="full-width"
                     label="Label"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     placeholder="Placeholder"
                     helperText="Full width!"
                     fullWidth
                  />
                  </div>
               </div>
               <div className="col-sm-6 col-md-6 col-xl-3">
                  <div className="form-group">
                  <TextField id="password" fullWidth label="Password" autoComplete="current-password" />
                  </div>
                  <div className="form-group">
                  <TextField id="multiline-flexible" fullWidth label="Multiline" multiline maxRows="4" value={multiline}
                     onChange={(event) => handleChange(event,setMultiline)}
                  />
                  </div>
                  <div className="form-group">
                  <TextField id="textarea" fullWidth label="With placeholder multiline" placeholder="Placeholder" multiline />
                  </div>
                  <div className="form-group">
                  <TextField id="number" fullWidth label="Number" value={age} onChange={(event) => handleChange(event,setAge)}
                     type="number"
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
                  </div>
               </div>
            </div>
            </form>
         </RctCollapsibleCard>
         <RctCollapsibleCard heading="Components">
            <Components />
         </RctCollapsibleCard>
         <RctCollapsibleCard heading="Layouts">
            <Layouts />
         </RctCollapsibleCard>
         <RctCollapsibleCard heading="Input Adornments">
            <InputAdornments />
         </RctCollapsibleCard>
         <RctCollapsibleCard heading="Formatted inputs">
            <FormattedInputs />
         </RctCollapsibleCard>
      </div>
   );
}
