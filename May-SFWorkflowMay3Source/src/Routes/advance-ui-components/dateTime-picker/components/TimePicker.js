// Time Picker
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
   TimePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export default function TimePickers() {
   const [selectedDate, setSelectedDate] = useState(new Date());

   const handleDateChange = (date) => {
      setSelectedDate(date);
   };

   return (
      <div className="rct-picker">
         <div className="picker">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <TimePicker
                  label="12 hours"
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
               />
            </MuiPickersUtilsProvider>
         </div>
      </div>
   )
}
