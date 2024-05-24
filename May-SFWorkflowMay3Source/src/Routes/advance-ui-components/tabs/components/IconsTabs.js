import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


export default function IconTabs() {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.iconsTabs" />}
      >
         <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
         >
            <Tab icon={<PhoneIcon />} aria-label="phone" />
            <Tab icon={<FavoriteIcon />} aria-label="favorite" />
            <Tab icon={<PersonPinIcon />} aria-label="person" />
         </Tabs>
      </RctCollapsibleCard>
   );
}
