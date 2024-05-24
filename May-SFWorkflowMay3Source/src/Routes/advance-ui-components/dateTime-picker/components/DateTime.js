// Date Time Picker
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
   DateTimePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers';
export default function DefaultDateAndTimePickers(){
   const [selectedDate, setSelectedDate] = useState(new Date());

   const handleDateChange = (date) => {
      setSelectedDate(date);
   };

   return (
      <div className="rct-picker">
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
               value={selectedDate}
               clearable
               label="Choose a date &amp; Time"
               onChange={handleDateChange}
               leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
               rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
               fullWidth
            />
         </MuiPickersUtilsProvider>
      </div>
   )
}
