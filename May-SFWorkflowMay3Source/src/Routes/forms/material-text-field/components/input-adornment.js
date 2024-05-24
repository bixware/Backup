import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function InputAdornments(props){
   const [amount, setAmount] = useState('');
   const [password, setPassword] = useState('');
   const [weight, setWeight] = useState('');
   const [showPassword, setShowPassword] = useState(false);
	
	const handleChange = (event,prop) => {
		props(event.target.value);
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleClickShowPasssword = () => {
      setShowPassword(!showPassword);
	};

   return (
      <form noValidate autoComplete="off">
         <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
               <FormControl fullWidth>
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <Input
                     id="adornment-amount"
                     value={amount}
                     onChange={(event) => handleChange(event,setAmount)}
                     startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
               </FormControl>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
               <FormControl aria-describedby="weight-helper-text" fullWidth>
                  <Input
                     id="adornment-weight"
                     value={weight}
                     onChange={(event) => handleChange(event,setWeight)}
                     endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  />
                  <FormHelperText id="weight-helper-text">Weight</FormHelperText>
               </FormControl>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
               <FormControl fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                     id="adornment-password"
                     type={showPassword ? 'text' : 'password'}
                     value={password}
                     onChange={(event) => handleChange(event,setPassword)}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={handleClickShowPasssword}
                              onMouseDown={handleMouseDownPassword}
                           >
                              {showPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </FormControl>
            </div>
         </div>
      </form>
   );
}
