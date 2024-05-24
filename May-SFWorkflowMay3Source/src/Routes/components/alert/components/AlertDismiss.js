/**
 * Alert Dismiss
 */
import React, { useState } from 'react';
import { Alert } from 'reactstrap';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function AlertDismiss() {
   const [visible,setVisible] = useState(true);
   const [visible2, setVisible2] = useState(true);
   const [visible3, setVisible3] = useState(true);

   const onDismiss = (key) => {
      key(false);
   }

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.alertDismiss" />}
      >
         <Alert color="primary" isOpen={visible} toggle={() => onDismiss(setVisible)}>
            I am an alert and I can be dismissed!
         </Alert>
         <Alert color="info" isOpen={visible2} toggle={() => onDismiss(setVisible2)}>
            I am an alert and I can be dismissed!
         </Alert>
         <Alert color="danger" isOpen={visible3} toggle={() => onDismiss(setVisible3)}>
            I am an alert and I can be dismissed!
         </Alert>
      </RctCollapsibleCard>
   );
}

export default AlertDismiss;
