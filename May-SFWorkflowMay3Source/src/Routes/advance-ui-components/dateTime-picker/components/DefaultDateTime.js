// Default Date Time Picker
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
   DateTimePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export default function DateAndTimePickers(){
   const[selectedDate, setSelectedDate] = useState(new Date());

   const handleDateChange = (date) => {
      setSelectedDate(date);
   };

   return (
      <div className="rct-picker">
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
               fullWidth
               clearable
               label="Choose a Date &amp; Time"
               value={selectedDate}
               showTabs={false}
               onChange={handleDateChange}
               leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
               rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
            />
         </MuiPickersUtilsProvider>
      </div>
   )
}
