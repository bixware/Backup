import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default function CenteredTabs() {

   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.centeredLabels" />}
      >
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="primary"
               textColor="primary"
               centered
            >
               <Tab label="Item One" />
               <Tab label="Item Two" />
               <Tab label="Item Three" />
            </Tabs>
      </RctCollapsibleCard>
   );
}
