/**
* List Dividers
*/
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

const ListDivider = () => (
	<Scrollbars className="rct-scroll" autoHeight autoHide autoHeightMin={100} autoHeightMax={350}>
		<List className="p-0">
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-inbox zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Inbox (2)" />
			</ListItem>
			<Divider />
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-folder-star-alt zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Drafts" />
			</ListItem>
			<Divider />
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-mail-send zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Send" />
			</ListItem>
			<Divider />
			<ListItem button>
				<ListItemIcon><i className="zmdi zmdi-delete zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Trash" />
			</ListItem>
			<Divider />
			<ListItem button component="a" href="#simple-list">
				<ListItemIcon><i className="zmdi zmdi-folder-star zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Spam (5)" />
			</ListItem>
			<Divider />
			<ListItem button component="a">
				<ListItemIcon><i className="zmdi zmdi-archive zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Primary" />
			</ListItem>
			<Divider />
			<ListItem button component="a">
				<ListItemIcon><i className="zmdi zmdi-share zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Social" />
			</ListItem>
			<Divider />
			<ListItem button component="a">
				<ListItemIcon><i className="zmdi zmdi-lock zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Private" />
			</ListItem>
			<Divider />
			<ListItem button component="a">
				<ListItemIcon><i className="zmdi zmdi-folder-star-alt zmdi-hc-lg"></i></ListItemIcon>
				<ListItemText primary="Important" />
			</ListItem>
		</List>
	</Scrollbars>
);
export default ListDivider;
