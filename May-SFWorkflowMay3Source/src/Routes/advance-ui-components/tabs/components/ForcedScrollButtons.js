import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`scrollable-force-tabpanel-${index}`}
         aria-labelledby={`scrollable-force-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
   };
}

export default function ScrollableTabsButtonForce() {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.forcedScrolledButtons" />}
      >
         <AppBar position="static" color="default">
            <Tabs
               value={value}
               onChange={handleChange}
               variant="scrollable"
               scrollButtons="on"
               indicatorColor="primary"
               textColor="primary"
               aria-label="scrollable force tabs example"
            >
               <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
               <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
               <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
               <Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
               <Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
               <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
               <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} />
            </Tabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            Item One
      </TabPanel>
         <TabPanel value={value} index={1}>
            Item Two
      </TabPanel>
         <TabPanel value={value} index={2}>
            Item Three
      </TabPanel>
         <TabPanel value={value} index={3}>
            Item Four
      </TabPanel>
         <TabPanel value={value} index={4}>
            Item Five
      </TabPanel>
         <TabPanel value={value} index={5}>
            Item Six
      </TabPanel>
         <TabPanel value={value} index={6}>
            Item Seven
      </TabPanel>
      </RctCollapsibleCard>
   );
}
