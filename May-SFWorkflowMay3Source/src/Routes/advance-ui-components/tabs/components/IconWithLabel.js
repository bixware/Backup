/**
 * Icon With Label
 */
import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function IconWithLabel() {
   const [activeIndex, setActiveIndex] = useState(0)
   
   const handleChange = (value) => {
      setActiveIndex(value);
   }
   
   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.iconWithLabel" />}
      >
         <Tabs
            value={activeIndex}
            onChange={(e, value) => handleChange(value)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary">
            <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-phone"></i>} label="RECENTS" />
            <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-favorite"></i>} label="FAVORITES" />
            <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-account-add"></i>} label="NEARBY" />
         </Tabs>
      </RctCollapsibleCard>
   );
}

export default IconWithLabel;
