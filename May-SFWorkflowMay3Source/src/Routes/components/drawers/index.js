/**
 * Drawers
 */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

//Components
import PermanentDrawer from './component/PermanentDrawer';
import PersistentDrawer from './component/PersistentDrawer';
import { mailFolderListItems, otherMailFolderListItems } from './component/tileData';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

const useStyles = makeStyles((theme) => ({
   list: {
      width: 300,
   },
   listFull: {
      width: 'auto',
   },
}));

function DrawerComponent(props) {
   const [top,setTop] = useState(false);
   const [left, setLeft] = useState(false);
   const [bottom, setBottom] = useState(false);
   const [right, setRight] = useState(false);
   const classes = useStyles();
   const toggleDrawer = (side, open) => () => {
      side(open)
      
   };

   const sideList = (
      <div className={classes.list}>
         <List>{mailFolderListItems}</List>
         <Divider />
         <List>{otherMailFolderListItems}</List>
      </div>
   );

   const fullList = (
      <div className={classes.listFull}>
         <List>{mailFolderListItems}</List>
         <Divider />
         <List>{otherMailFolderListItems}</List>
      </div>
   );
   return (
      <div className="drawer-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.drawers" />} match={props.match} />
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.temporaryDrawers" />}
         >
            <Button color="primary" className="text-white mr-10 mb-10" variant="contained" onClick={toggleDrawer(setLeft, true)}>Open Left</Button>
            <Button color="primary" className="text-white mr-10 mb-10" variant="contained" onClick={toggleDrawer(setRight, true)}>Open Right</Button>
            <Button color="primary" className="text-white mr-10 mb-10" variant="contained" onClick={toggleDrawer(setTop, true)}>Open Top</Button>
            <Button color="primary" className="text-white mr-10 mb-10" variant="contained" onClick={toggleDrawer(setBottom, true)}>Open Bottom</Button>

            <Drawer open={left} onClose={toggleDrawer(setLeft, false)}>
               <div tabIndex={0} role="button" onClick={toggleDrawer(setLeft, false)}
                  onKeyDown={toggleDrawer(setLeft, false)} >
                  {sideList}
               </div>
            </Drawer>

            <Drawer anchor="top" open={top} onClose={toggleDrawer(setTop, false)}>
               <div tabIndex={0} role="button"
                  onClick={toggleDrawer(setTop, false)}
                  onKeyDown={toggleDrawer(setTop, false)}>
                  {fullList}
               </div>
            </Drawer>

            <Drawer
               anchor="bottom"
               open={bottom}
               onClose={toggleDrawer(setBottom, false)}>
               <div tabIndex={0} role="button" onClick={toggleDrawer(setBottom, false)}
                  onKeyDown={toggleDrawer(setBottom, false)}>
                  {fullList}
               </div>
            </Drawer>

            <Drawer anchor="right" open={right} onClose={toggleDrawer(setRight, false)}>
               <div tabIndex={0} role="button" onClick={toggleDrawer(setRight, false)}
                  onKeyDown={toggleDrawer(setRight, false)}>
                  {sideList}
               </div>
            </Drawer>
         </RctCollapsibleCard>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.permanentDrawers" />}
         >
            <PermanentDrawer />
         </RctCollapsibleCard>
         <RctCollapsibleCard
            heading={<IntlMessages id="components.persistentDrawer" />}
         >
            <PersistentDrawer />
         </RctCollapsibleCard>
      </div>
   );
}

export default DrawerComponent;
