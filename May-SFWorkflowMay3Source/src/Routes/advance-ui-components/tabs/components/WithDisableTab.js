/**
 * With Disable Tab
 */
import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function WithDisableTab() {

   const[activeIndex, setActiveIndex] = useState(0)
   const handleChange = (value) => {
      setActiveIndex(value);
   }

   return (
      <RctCollapsibleCard
            heading={<IntlMessages id="widgets.withDisableTabs" />}
      >
         <Tabs
            value={activeIndex}
            textColor="inherit"
            color="primary"
            onChange={(e, value) => handleChange(value)}>
            <Tab label="Active" />
            <Tab label="Disabled" disabled />
            <Tab label="Active" />
         </Tabs>
      </RctCollapsibleCard>
   );
}

export default WithDisableTab;
