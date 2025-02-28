/**
 * Multiple Tabs
 */
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function TabContainer({ children }) {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

function MultipleTabs(){

   const [activeIndex, setActiveIndex] = useState(0)
   const handleChange = (value) => {
      setActiveIndex(value);
   }

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.multipleTabs" />}
      >
         <AppBar position="static" color="default">
            <Tabs
               value={activeIndex}
               onChange={(e, value) => handleChange(e, value)}
               textColor="primary"
               indicatorColor="primary"
               variant="scrollable"
               scrollButtons="auto">
               <Tab label="Item One" />
               <Tab label="Item Two" />
               <Tab label="Item Three" />
               <Tab label="Item Four" />
               <Tab label="Item Five" />
               <Tab label="Item Six" />
               <Tab label="Item Seven" />
            </Tabs>
         </AppBar>
         {activeIndex === 0 && <TabContainer>Item One</TabContainer>}
         {activeIndex === 1 && <TabContainer>Item Two</TabContainer>}
         {activeIndex === 2 && <TabContainer>Item Three</TabContainer>}
         {activeIndex === 3 && <TabContainer>Item Four</TabContainer>}
         {activeIndex === 4 && <TabContainer>Item Five</TabContainer>}
         {activeIndex === 5 && <TabContainer>Item Six</TabContainer>}
         {activeIndex === 6 && <TabContainer>Item Seven</TabContainer>}
      </RctCollapsibleCard>
   );
}

export default MultipleTabs;
