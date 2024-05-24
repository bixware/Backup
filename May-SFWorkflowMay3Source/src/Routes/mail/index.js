/**
 * Mail App
 */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, IconButton, Button, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { Helmet } from "react-helmet";
// actions
import { getEmails } from 'Store/Actions';

// components
import Folders from './components/Folders';
import EmailAppSidebar from './components/EmailAppSidebar';
import ComposeEmail from './components/ComposeEmail';
import EmailSearch from './components/EmailSearch';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      height: 'auto',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
   },
   appBar: {
      position: 'absolute',
      marginLeft: theme.direction !== 'rtl' ? drawerWidth : 0,
      marginRight: theme.direction === 'rtl' ? drawerWidth : 0,
      [theme.breakpoints.up('md')]: {
         width: `calc(100% - ${drawerWidth}px)`,
      }
   },
   navIconHide: {
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   toolbar: theme.mixins.toolbar,
   drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('md')]: {
         position: 'relative',
      },
      backgroundColor: 'transparent',
   },
   content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
   },
}));

const composeMailNavLink = React.forwardRef((props, ref) => (
   <NavLink innerRef={ref} to="/mail/compose" {...props} />
));

function MailApp(props) {
   const classes = useStyles();
   const [mobileOpen, setMobileOpen] = useState(false);
   const emailApp = useSelector(state => state.emailApp);
   const settings = useSelector(state => state.settings);

   const dispatch = useDispatch();

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   useEffect(() => {
      dispatch(getEmails());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   const { sendingEmail } = emailApp;
   const { match } = props
   const { rtlLayout } = settings
   const drawer = (
      <div className="mail-sidebar-wrap">
         <Helmet>
            <title>Reactify | Mail App</title>
            <meta name="description" content="Reactify Maps" />
         </Helmet>
         <div className="user-wrap d-flex justify-content-between">
            <div className="media align-items-center">
               <img
                  src={`${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg`}
                  alt="user-profile"
                  className="img-fluid rounded-circle mr-3"
                  width="60"
                  height="60"
               />
               <div className="media-body">
                  <h5 className="text-white mb-0">Braxton Hudson</h5>
                  <p className="text-white font-xs mb-0">braxton@example.com</p>
               </div>
            </div>
         </div>
         <div className="p-20">
            <Button
               // component={NavLink}
               component={composeMailNavLink}
               to={`${match.url}/compose`}
               variant="contained"
               className="bbbb btn-danger text-white btn-block font-weight-bold"
            >
               <i className="zmdi zmdi-edit mr-10 font-lg"></i>
               <IntlMessages id="widgets.composeMail" />
            </Button>
         </div>
         <EmailAppSidebar />
      </div>
   );
   return (
      <div className="rct-mail-wrapper">
         <div className={classes.root}>
            <AppBar className={classes.appBar}>
               <Toolbar className="d-flex justify-content-between">
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     onClick={handleDrawerToggle}
                     className={classes.navIconHide}>
                     <MenuIcon />
                  </IconButton>
                  <EmailSearch />
                  <div className="d-flex align-items-center">
                     <IconButton className="mx-1 btn-sm">
                        <i className="zmdi zmdi-arrow-left"></i>
                     </IconButton>
                     <IconButton className="mx-1 btn-sm">
                        <i className="zmdi zmdi-arrow-right"></i>
                     </IconButton>
                  </div>
               </Toolbar>
            </AppBar>
            <Hidden mdUp className="mail-list-wrap">
               <Drawer
                  variant="temporary"
                  anchor={rtlLayout === false ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                     paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                     keepMounted: true,
                  }}
               >
                  {drawer}
               </Drawer>
            </Hidden>
            <Hidden smDown implementation="css" className="mail-list-wrap">
               <Drawer
                  variant="permanent"
                  open
                  classes={{
                     paper: classes.drawerPaper,
                  }}
               >
                  {drawer}
               </Drawer>
            </Hidden>
            <div className={`bg-transparent ${classes.content}`}>
               <div className={classes.toolbar} />
               {sendingEmail &&
                  <div className="sending-email-loader d-flex justify-content-center">
                     <Card>
                        <CardBody>
                           <h5>Sending.....</h5>
                        </CardBody>
                     </Card>
                  </div>
               }
               <Switch>
                  <Redirect exact from={`${match.url}/`} to={`${match.url}/folder`} />
                  <Route path={`${match.url}/folder`} component={Folders} />
                  <Route path={`${match.url}/compose`} component={ComposeEmail} />
               </Switch>
            </div>
         </div>
      </div>
   );
}


export default MailApp;
