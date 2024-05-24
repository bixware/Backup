/**
 * Inset List
 */
import React from 'react';
import { List, ListItem, ListItemText, Avatar} from '@material-ui/core';
// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const InsetList = () => (
    <RctCollapsibleCard
        heading={<IntlMessages id="widgets.insetLists" />}
    >
        <List className="m-0 list-divider">
            <ListItem button>
                <Avatar className="bg-warning"><i className="zmdi zmdi-star zmdi-hc-lg"></i></Avatar>
                <ListItemText inset primary="Chelsea Otakan" />
            </ListItem>
            <ListItem button>
                <Avatar className="bg-primary"><i className="zmdi zmdi-account-circle zmdi-hc-lg"></i></Avatar>
                <ListItemText inset primary="Jhon Otakan" />
            </ListItem>
            <ListItem button>
                <ListItemText inset primary="Eric Hoffman" />
            </ListItem>
            <ListItem button>
                <Avatar className="bg-danger"><i className="zmdi zmdi-attachment-alt zmdi-hc-lg"></i></Avatar>
                <ListItemText inset primary="Roze Smith" />
            </ListItem>
        </List>
    </RctCollapsibleCard>
);

export default InsetList;
