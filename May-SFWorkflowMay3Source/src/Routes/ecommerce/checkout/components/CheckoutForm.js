/**
 * Checkout Form Component
 */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//Component
import PaymentInfo from './Payment';
import BillingForm from './BillingForm';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

function CheckoutForm() {
   const [value,setValue] = useState(0);
   
   const handleChange = (event, value) => {
      setValue(0);
   };

   return (
      <div className="checkout-form-wrap">
         <div>
            <AppBar position="static" color="default">
               <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
               >
                  <Tab
                     disabled
                     label={<IntlMessages id="components.billingAddress" />}
                  />
                  <Tab
                     disabled
                     label={<IntlMessages id="components.payment" />}
                  />
               </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><BillingForm onComplete={() => setValue(1)} /></TabContainer>}
            {value === 1 && <TabContainer><PaymentInfo onChangeInfo={() => setValue(0)} /></TabContainer>}
         </div>
      </div>
   );
}

export default withStyles(null, { withTheme: true })(CheckoutForm);
