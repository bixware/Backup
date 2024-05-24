/**
 * Simple List Component
 */
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const SimpleListComponent = () => (
	<RctCollapsibleCard
		heading={<IntlMessages id="widgets.simpleLists" />}
	>
		<List className="p-0">
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-inbox zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Inbox (2)" />
			</ListItem>
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-folder-star-alt zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Drafts" />
			</ListItem>
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-mail-send zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Send" />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-delete zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Trash" />
			</ListItem>
			<ListItem button component="a" href="!#" onClick={e => e.preventDefault()}>
				<ListItemIcon><i className="zmdi zmdi-folder-star zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Spam (5)" />
			</ListItem>
		</List>
	</RctCollapsibleCard>
);

export default SimpleListComponent;
