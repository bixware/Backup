/**
 * ListItem Component
 */
import React, { useState} from 'react';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, Avatar} from '@material-ui/core';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// list item
const items = [
	{
		itemName: 'Line item 1',
		status: false,
      imageURL: `${process.env.PUBLIC_URL}/assets/images/img/user-5.jpg`
	},
	{
		itemName: 'Line item 2',
		status: false,
      imageURL: `${process.env.PUBLIC_URL}/assets/images/img/user-5.jpg`
	},
	{
		itemName: 'Line item 3',
		status: false,
      imageURL: `${process.env.PUBLIC_URL}/assets/images/img/user-5.jpg`
	},
	{
		itemName: 'Line item 4',
		status: false,
      imageURL: `${process.env.PUBLIC_URL}/assets/images/img/user-5.jpg`
	}
]

function ListItemWithImage(){
   const [listItems, setListItems] = useState(items);

	// hanlde toggle kist items
	const handleToggleListItems = (key)  => {
		let items = listItems;
      items[key].status = !items[key].status;
      setListItems(items);
	}

   return (
      <RctCollapsibleCard
         heading={<IntlMessages id="widgets.listItemWithImage" />}
      >
         <List className="p-0 list-divider">
            {listItems && listItems.map((data, key) => (
               <ListItem key={key} button onClick={() => handleToggleListItems(key)} >
                  <Avatar alt="Remy Sharp" className="img-fluid" src={data.imageURL} />
                  <ListItemText primary={data.itemName} />
                  <ListItemSecondaryAction>
                     <Checkbox
                        color="primary"
                        checked={data.status}
                        onChange={() => handleToggleListItems(key)}
                        disableRipple />
                  </ListItemSecondaryAction>
               </ListItem>
            ))}
         </List>
      </RctCollapsibleCard>
   );
}

export default ListItemWithImage;