/**
 * App Header
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import screenfull from "screenfull";
import MenuIcon from "@material-ui/icons/Menu";
import image from "../../Assets/img/logonew1.png";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Badge } from "reactstrap";
// actions
import { collapsedSidebarAction } from "Store/Actions";
// helpers
import { getAppLayout } from "Helpers/helpers";
// components
import Notifications from "./Notifications";
//import ChatSidebar from "./ChatSidebar";
//import DashboardOverlay from "../DashboardOverlay/DashboardOverlay";
import LanguageProvider from "./LanguageProvider";
import SearchForm from "./SearchForm";
import QuickLinks from "./QuickLinks";
import MobileSearchForm from "./MobileSearchForm";
//import Cart from "./Cart";
// intl messages
import IntlMessages from "Util/IntlMessages";
import { Person } from "@material-ui/icons";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { NotificationManager } from 'react-notifications';
// components
// import SupportPage from '../Support/Support';
// redux action
import { logoutUserFromFirebase } from "Store/Actions";
import imagenew from "../../Assets/img/profile.png";
import { useHistory } from "react-router-dom";
//import { pointer } from "@testing-library/user-event/dist/types/pointer";

function Header(props) {
  const [customizer, setCustomizer] = useState(false);
  const [isMobileSearchFormVisible, setIsMobileSearchFormVisible] =
    useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const settings = useSelector((state) => state.settings);

  // function to change the state of collapsed sidebar
  const onToggleNavCollapsed = (event) => {
    const val = settings.navCollapsed ? false : true;
    dispatch(collapsedSidebarAction(val));
  };

  // open dashboard overlay
  const openDashboardOverlay = (e) => {
    var el = document.getElementsByClassName("dashboard-overlay")[0];
    el.classList.toggle("d-none");
    el.classList.toggle("show");
    if (el.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    e.preventDefault();
  };

  // close dashboard overlay
  const closeDashboardOverlay = () => {
    var e = document.getElementsByClassName("dashboard-overlay")[0];
    e.classList.remove("show");
    e.classList.add("d-none");
    document.body.style.overflow = "";
  };

  // toggle screen full
  const toggleScreenFull = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  // mobile search form
  const openMobileSearchForm = () => {
    setIsMobileSearchFormVisible(true);
  };

  const [userDropdownMenu, setUserDropdownMenu] = useState(false);
  // const [isSupportModal, setIsSupportModal] = useState(false);

  /**
   * Logout User
   */
  const logoutUser = (e) => {
    e.preventDefault();
    history.push("/signin");
    dispatch(logoutUserFromFirebase());
  };

  /**
   * Toggle User Dropdown Menu
   */
  const toggleUserDropdownMenu = () => {
    setUserDropdownMenu(!userDropdownMenu);
  };

  //const userString = sessionStorage.getItem("bixware_user");
  //const user = JSON.parse(userString);
  //let roleUID = user.roleUID;

  const { horizontalMenu, agencyMenu, location } = props;

  /* const {styleForIcon} = {
    width: '120vw',
    height: '50vh'
  }; */
  return (
    <AppBar position="static" className="rct-header">
      <Toolbar className="d-flex justify-content-between w-100 pl-0">
        <div className="d-inline-flex align-items-center">
          {/* {(horizontalMenu || agencyMenu) && ( */}
          <div className="site-logo">
            <Link to="/signin" className="logo-mini">
              {/* <img
                  src={`${process.env.PUBLIC_URL}/assets/images/img/appLogo.png`}
                  className="mr-15"
                  alt="site logo"
                  width="35"
                  height="35"
                /> */}
            </Link>
            <Link to="creditdebit" className="logo-normal">
                {/* <img
                  src={image}
                  className="img-fluid"
                  alt="site-logo"
                  width="85"
                  height="10"
                /> */}
                
                <h1 style ={{ color : '#FFF', fontSize : '25px' , marginLeft : '5px'}}>ABFRL - TRADE PORTAL</h1>
              </Link>
            {/* {roleUID == 1 ? (
        
            ) : (
              <Link to="/corporate/manager/dashboard" className="logo-normal">
                <img
                  src={image}
                  className="img-fluid"
                  alt="site-logo"
                  width="110"
                  height="28"
                />
              </Link>
            )} */}
          </div>
        </div>
        <div className="top-sidebar">
          <div className="sidebar-user-block">
            <Dropdown
              isOpen={userDropdownMenu}
              toggle={() => toggleUserDropdownMenu()}
              className="rct-dropdown"
            >
              <DropdownToggle tag="div" className="d-flex align-items-center">
                <div className="user-profile" >
                  {/* <img
                    src={`${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg`}
                    alt="user profile"
                    className="img-fluid rounded-circle"
                    width="50"
                    height="100"
                  /> */}
                  {/*  <IconButton
                   ><AccountCircleIcon/></IconButton> */}
                   <img
                      src={imagenew}
                      alt="session-logo"
                      className="img-fluid"
                      width="50"
                      height="50vh"
                    />
                </div>
                <div className="user-info" style={{cursor:'pointer'}}>
                <span className="user-name ml-4">{localStorage.getItem('UserName')}</span>
                  {/* {roleUID == 1 ? (
                    <span className="user-name ml-4">Admin</span>
                  ) : (
                    <span className="user-name ml-4">Manager</span>
                  )} */}

                  <i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
                </div>
              </DropdownToggle>
              <DropdownMenu>
                <ul className="list-unstyled mb-0">
                  <li className="p-15 border-bottom user-profile-top bg rounded-top">
                  <a href="!#" onClick={(e) => logoutUser(e)}>
                      <i className="zmdi zmdi-power text-danger mr-3"></i>
                      <span>
                        <IntlMessages id="Logout" />
                      </span>
                  </a>
                  </li>

                  {/* <li className="border-top">
                    <a href="!#" onClick={(e) => logoutUser(e)}>
                      <i className="zmdi zmdi-power text-danger mr-3"></i>
                      <span>
                        <IntlMessages id="widgets.logOut" />
                      </span>
                    </a>
                  </li> */}
                </ul>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
