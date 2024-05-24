/**
 * Switch List Component
 */
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Switch } from '@material-ui/core';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
const items = [
	{
		name: 'Wi-Fi',
		status: false,
		icon: 'zmdi zmdi-wifi-alt zmdi-hc-lg'
	},
	{
		name: 'bluetooth',
		status: false,
		icon: 'zmdi zmdi-bluetooth-setting zmdi-hc-lg'
	},
	{
		name: 'dark-mode',
		status: false,
		icon: 'zmdi zmdi-tonality zmdi-hc-lg'
	},
	{
		name: 'brightness',
		status: false,
		icon: 'zmdi zmdi-brightness-7 zmdi-hc-lg'
	}
]

function SwitchListComponent(){
   // Interactive State
   const [listItems,setListItems] = useState(items);
	  
	const handleToggle = (key) => {
      let items = listItems;
      items[key].status = !items[key].status;
      setListItems(items);
	}

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.switchLists" />}
      >
         <List subheader={<ListSubheader>Settings</ListSubheader>}>
            {listItems && listItems.map((data, key) => (
               <ListItem key={key}>
                  <ListItemIcon><i className={data.icon}></i></ListItemIcon>
                  <ListItemText primary={data.name} />
                  <ListItemSecondaryAction>
                     <Switch onChange={() => handleToggle(key)} checked={data.status} />
                  </ListItemSecondaryAction>
               </ListItem>
            ))}
         </List>
      </RctCollapsibleCard>
   );
}

export default SwitchListComponent;