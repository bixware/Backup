/**
 * Nested List Component
 */
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse} from '@material-ui/core';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function NestedListComponent(){
   const [open,setOpen] = useState(false);
   
   return (
      <RctCollapsibleCard
            heading={<IntlMessages id="widgets.nestedLists" />}
      >
         <List className="nested-list" subheader={<ListSubheader>Nested List Items</ListSubheader>}>
            <ListItem button>
               <ListItemIcon><i className="zmdi zmdi-mail-send"></i></ListItemIcon>
               <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
               <ListItemIcon>
                     <i className="zmdi zmdi-email-open zmdi-hc-lg"></i>
               </ListItemIcon>
               <ListItemText inset primary="Drafts" />
            </ListItem>
            <ListItem button onClick={() => setOpen(!open)}>
               <ListItemIcon>
                     <i className="zmdi zmdi-inbox zmdi-hc-lg"></i>
               </ListItemIcon>
               <ListItemText inset primary="Inbox" />
               {open ? <i className="zmdi zmdi-chevron-down zmdi-hc-lg"></i> : <i className="zmdi zmdi-chevron-up zmdi-hc-lg"></i>}
            </ListItem>
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
               <List disablePadding>
                     <ListItem button>
                        <ListItemIcon>
                           <i className="zmdi zmdi-star zmdi-hc-lg"></i>
                        </ListItemIcon>
                        <ListItemText inset primary="Starred" />
                     </ListItem>
               </List>
            </Collapse>
         </List>
      </RctCollapsibleCard>
   )
}

export default NestedListComponent;