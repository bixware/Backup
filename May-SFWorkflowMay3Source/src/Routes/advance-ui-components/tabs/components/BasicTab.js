/**
 * Basic Tab
 */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
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
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}


export default function SimpleTabs() {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.basicTab" />}
      >
         <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
               <Tab label="Item One" {...a11yProps(0)} />
               <Tab label="Item Two" {...a11yProps(1)} />
               <Tab label="Item Three" {...a11yProps(2)} />
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
      </RctCollapsibleCard>
   );
}