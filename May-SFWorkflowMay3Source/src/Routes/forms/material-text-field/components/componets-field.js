import React, { useState } from 'react';
import { Input, InputLabel, FormControl, FormHelperText} from '@material-ui/core';

export default function Components() {
   const [name, setName] = useState('Composed TextField');
   
	const handleChange = event => {
      setName(event.target.value)
	};

   return (
      <form noValidate autoComplete="off">
         <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
               <FormControl fullWidth>
                  <InputLabel htmlFor="name-simple">Name</InputLabel>
                  <Input id="name-simple" value={name} onChange={handleChange} />
               </FormControl>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
               <FormControl fullWidth aria-describedby="name-helper-text">
                  <InputLabel htmlFor="name-helper">Name</InputLabel>
                  <Input id="name-helper" value={name} onChange={handleChange} />
                  <FormHelperText id="name-helper-text">Some important helper text</FormHelperText>
               </FormControl>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
               <FormControl disabled fullWidth>
                  <InputLabel htmlFor="name-disabled">Name</InputLabel>
                  <Input id="name-disabled" value={name} onChange={handleChange} />
                  <FormHelperText>Disabled</FormHelperText>
               </FormControl>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
               <FormControl error aria-describedby="name-error-text" fullWidth>
                  <InputLabel htmlFor="name-error">Name</InputLabel>
                  <Input id="name-error" value={name} onChange={handleChange} />
                  <FormHelperText id="name-error-text">Error</FormHelperText>
               </FormControl>
            </div>
         </div>
      </form>
   );
}
