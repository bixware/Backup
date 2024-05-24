/**
 * Wrapped Labels
 */
import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';

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

function WrappedLabels() {

   const [activeTab, setActiveTab] = useState(0)
   const handleChange = (value) => {
      setActiveTab(value);
   }
   
   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.wrappedLabels" />}
      >
         <AppBar position="static" color="primary">
            <Tabs value={activeTab} onChange={(e, value) => handleChange(e, value)}>
               <Tab value={0} label="New Arrivals in the Longest Text of Nonfiction" />
               <Tab value={1} label="Item Two" />
               <Tab value={2} label="Item Three" />
            </Tabs>
         </AppBar>
         {activeTab === 0 && <TabContainer>Item One</TabContainer>}
         {activeTab === 1 && <TabContainer>Item Two</TabContainer>}
         {activeTab === 2 && <TabContainer>Item Three</TabContainer>}
      </RctCollapsibleCard>
   );
}

export default WrappedLabels;
