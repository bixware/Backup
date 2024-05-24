// Custom Picker
import React, {  useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
   DateTimePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

export default function CustomDateTimePicker(){
   const [selectedDate, setSelectedDate] = useState(new Date());
	
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

   return (
      <div className="rct-picker">
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
               fullWidth
               label="Choose a Date &amp; Time"
               clearable
               error
               autoOk
               showTabs={false}
               // autoSubmit={false}
               disableFuture
               value={selectedDate}
               onChange={handleDateChange}
               helperText="Required"
               leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
               rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end" className="date-picker-icon">
                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                     </InputAdornment>
                  ),
               }}
            />
         </MuiPickersUtilsProvider>
      </div>
   )
}
