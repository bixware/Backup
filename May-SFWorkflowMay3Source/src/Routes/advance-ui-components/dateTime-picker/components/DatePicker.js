// Date Picker
import React, { useState, Fragment } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
   DatePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function DatePickers (){
   const [selectedDate, setSelectedDate] = useState(new Date());
   
   const handleDateChange = (date) => {
		setSelectedDate(date);
	};

   return (
      <Fragment>
         <div className="rct-picker">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <DatePicker
                  label="Choose a date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling={false}
                  leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                  rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  fullWidth
               />
            </MuiPickersUtilsProvider>
         </div>
      </Fragment>
   )
}

export default DatePickers 
