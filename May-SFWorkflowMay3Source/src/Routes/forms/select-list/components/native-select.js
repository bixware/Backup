import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

export default function NativeSelect(){
   const [age,setAge] = useState('');
   const [name,setName] = useState('hai');
	
	const handleChange = (event,name) => {
      name(event.target.value);
	};

   return (
      <form autoComplete="off">
         <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
                  <FormControl fullWidth>
                     <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                     <Select native value={age} onChange={(event) => handleChange(event,setAge)}
                        inputProps={{ id: 'age-native-simple', }}>
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                     </Select>
                  </FormControl>
               </div>
               <div className="form-group">
                  <FormControl fullWidth>
                     <InputLabel htmlFor="age-native-helper">Age</InputLabel>
                     <Select native value={age} onChange={(event) => handleChange(event,setAge)}
                        input={<Input id="age-native-helper" />} >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                     </Select>
                     <FormHelperText>Some important helper text</FormHelperText>
                  </FormControl>
               </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
                  <FormControl disabled fullWidth>
                     <InputLabel htmlFor="name-native-disabled">Name</InputLabel>
                     <Select native value={name}
                        onChange={(event) => handleChange(event, setName)}
                        input={<Input id="name-native-disabled" />} >
                        <option value="" />
                        <optgroup label="Author">
                           <option value="hai">Hai</option>
                        </optgroup>
                        <optgroup label="Contributors">
                           <option value="olivier">Olivier</option>
                           <option value="kevin">Kevin</option>
                        </optgroup>
                     </Select>
                     <FormHelperText>Disabled</FormHelperText>
                  </FormControl>
               </div>
               <div className="form-group">
                  <FormControl error fullWidth>
                     <InputLabel htmlFor="name-native-error">Name</InputLabel>
                     <Select native value={name}
                        onChange={(event) => handleChange(event,setName)}
                        input={<Input id="name-native-error" />}>
                        <option value="" />
                        <optgroup label="Author">
                           <option value="hai">Hai</option>
                        </optgroup>
                        <optgroup label="Contributors">
                           <option value="olivier">Olivier</option>
                           <option value="kevin">Kevin</option>
                        </optgroup>
                     </Select>
                     <FormHelperText>Error</FormHelperText>
                  </FormControl>
               </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
                  <FormControl fullWidth>
                     <InputLabel htmlFor="name-input">Name</InputLabel>
                     <Input id="name-input" />
                     <FormHelperText>Alignment with an input</FormHelperText>
                  </FormControl>
               </div>
               <div className="form-group">
                  <FormControl fullWidth>
                     <Select native value={age} onChange={(event) => handleChange(event,setAge)}>
                        <option value="">None</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                     </Select>
                     <FormHelperText>Without label</FormHelperText>
                  </FormControl>
               </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
                  <FormControl fullWidth>
                     <InputLabel htmlFor="uncontrolled-native">Name</InputLabel>
                     <Select native defaultValue={30} input={<Input id="uncontrolled-native" />}>
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                     </Select>
                     <FormHelperText>Uncontrolled</FormHelperText>
                  </FormControl>
               </div>
            </div>
         </div>
      </form>
   )
}
