import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  Tooltip,
  Grid,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import screenfull from "screenfull";
import MenuIcon from "@material-ui/icons/Menu";
// actions
import { collapsedSidebarAction } from "Store/Actions";
// helpers
import { getAppLayout } from "Helpers/helpers";
// components
import Notifications from "./Notifications";
import ChatSidebar from "./ChatSidebar";
import DashboardOverlay from "../DashboardOverlay/DashboardOverlay";
import LanguageProvider from "./LanguageProvider";
import SearchForm from "./SearchForm";
import QuickLinks from "./QuickLinks";
import MobileSearchForm from "./MobileSearchForm";
import Cart from "./Cart";
import logout from "../../.././src/Assets/img/logout.png";
// intl messages
import IntlMessages from "Util/IntlMessages";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "reactstrap";
import { NotificationManager } from "react-notifications";
import TextField from "@mui/material/TextField";
import { apiPost } from "Api/apiCommon";
import { Button, Menu, MenuItem, Avatar } from "@mui/material";

import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";

function Header(props) {
  const [customizer, setCustomizer] = useState(false);
  const [isMobileSearchFormVisible, setIsMobileSearchFormVisible] =
    useState(false);

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  // function to change the state of collapsed sidebar
  const onToggleNavCollapsed = (event) => {
    const val = settings.navCollapsed ? false : true;
    dispatch(collapsedSidebarAction(val));
  };
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
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

  const { horizontalMenu, agencyMenu, location } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const handleClose1 = () => {
    history.push({
      pathname: "/signin",
    });
    setAnchorEl(null);
  };

  const [open1, setOpen1] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose2 = () => {
    setOpen1(false);
  };

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const resetForm = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setOpen1(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      NotificationManager.error(
        "New Password and Confirm Password do not match."
      );
      return;
    }

    try {
      let role = User.roleUID === "1" ? "admin" : "user";
      const response = await apiPost(`${role}/changepassword`, formData);

      if (response) {
        if (response.data.data.user) {
          // Successful API call
          NotificationManager.success("Password changed successfully!");
          // history.goBack();
          history.push({
            pathname: "/signin",
          });
          setOpen1(false);
        } else {
          NotificationManager.error(response.data.data.error);
          // history.goBack();
          history.push({
            pathname: "/signin",
          });
          setOpen1(false);
        }

        // You can redirect the user to a different page or perform other actions upon success
      } else {

        console.error("Error adding server:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const [avatarEl, setAvatarEl] = React.useState(null);
  const [notifyEl, setNotifyEl] = React.useState(null);
  const [invisible, setInvisible] = React.useState(false);

  const handleNotifyOpen = (e) => {
    setNotifyEl(e.currentTarget);
    if (!invisible) {
      handleBadgeVisibility();
    }
  };
  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  const handleAvatarClick = (e) => {
    setAvatarEl(e.currentTarget);
  };
  const handleAvatarClose = () => {
    setAvatarEl(null);
  };
  const open = Boolean(avatarEl);
  const id = open ? "simpe-popover" : undefined;
  const notifyOpen = Boolean(notifyEl);
  const notifyId = notifyOpen ? "simpe-notify" : undefined;
  return (
    <AppBar position="static" className="rct-header">
      <Toolbar className="d-flex justify-content-between w-100 pl-0">
        <div className="d-inline-flex align-items-center">
          {(horizontalMenu || agencyMenu) && (
            <div className="site-logo">
              <Link to="/" className="logo-mini">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/img/appLogo.png`}
                  className="mr-15"
                  alt="site logo"
                  width="35"
                  height="35"
                />
              </Link>
              <Link to="/" className="logo-normal">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/img/appLogoText.png`}
                  className="img-fluid"
                  alt="site-logo"
                  width="67"
                  height="17"
                />
              </Link>
            </div>
          )}
          {!agencyMenu && (
            <ul className="list-inline mb-0 navbar-left">
              {!horizontalMenu ? (
                <li
                  className="list-inline-item"
                  onClick={(e) => onToggleNavCollapsed(e)}
                >
                  <Tooltip title="Sidebar Toggle" placement="bottom">
                    <IconButton
                      color="inherit"
                      mini="true"
                      aria-label="Menu"
                      className="humburger p-0"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                </li>
              ) : (
                <li className="list-inline-item">
                  <Tooltip title="Sidebar Toggle" placement="bottom">
                    <IconButton
                      color="inherit"
                      aria-label="Menu"
                      className="humburger p-0"
                      component={Link}
                      to="/"
                    >
                      <i className="ti-layout-sidebar-left"></i>
                    </IconButton>
                  </Tooltip>
                </li>
              )}
              {!horizontalMenu && <QuickLinks />}
              <li className="list-inline-item search-icon d-inline-block">
                <SearchForm />
                <IconButton
                  mini="true"
                  className="search-icon-btn"
                  onClick={() => openMobileSearchForm()}
                >
                  <i className="zmdi zmdi-search"></i>
                </IconButton>
                <MobileSearchForm
                  isOpen={isMobileSearchFormVisible}
                  onClose={() => setIsMobileSearchFormVisible(false)}
                />
              </li>
            </ul>
          )}
        </div>
        <ul className="navbar-right list-inline mb-0">
          <li className="list-inline-item summary-icon">
            {/* <Tooltip title="Summary" placement="bottom">
              <a
                href="!#"
                className="header-icon tour-step-3"
                onClick={(e) => openDashboardOverlay(e)}
              >
                <i className="zmdi zmdi-info-outline"></i>
              </a>
            </Tooltip> */}
          </li>
          {!horizontalMenu && (
            <li className="list-inline-item">
              {/* <Tooltip title="Upgrade" placement="bottom">
                <Button
                  component={Link}
                  to={`/${getAppLayout(location)}/pages/pricing`}
                  variant="contained"
                  className="upgrade-btn tour-step-4 text-white"
                  color="primary"
                >
                  <IntlMessages id="widgets.upgrade" />
                </Button>
              </Tooltip> */}
            </li>
          )}
          <LanguageProvider />
          <Notifications />
          <Cart />
          <li className="list-inline-item setting-icon">
            {/* <Tooltip title="Chat" placement="bottom">
              <IconButton
                aria-label="settings"
                onClick={() => setCustomizer(true)}
              >
                <i className="zmdi zmdi-comment"></i>
              </IconButton>
            </Tooltip> */}
          </li>
          <li className="list-inline-item">
            {/* <Tooltip title="Full Screen" placement="bottom">
              <IconButton
                aria-label="settings"
                onClick={() => toggleScreenFull()}
              >
                <i className="zmdi zmdi-crop-free"></i>
              </IconButton>
            </Tooltip> */}
          </li>
          <li className="list-inline-item">
            {/* <div className="dropdown-container"> */}
            {/* <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar alt="Remy Sharp" src={""} />
            </Button> */}
            {/* <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                ".MuiList-root": {
                  listStyle: "none !important",
                  margin: "0 !important",
                  padding: "0 !important",
                  position: "relative !important",
                  paddingTop: "8px !important",
                  paddingBottom: "8px !important",
                  outline: "0 !important",
                },
              }}
              sx={{
                "& .MuiList-root .MuiMenu-list": {
                  listStyle: "none !important",
                  margin: "0 !important",
                  padding: "0 !important",
                  position: "relative !important",
                  paddingTop: "8px !important",
                  paddingBottom: "8px !important",
                  outline: "0 !important",
                },
                "& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper": {
                  backgroundColor: "#fff !important",
                  color: "rgba(0, 0, 0, 0.87) !important",
                  webkitTransition:
                    "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
                  transition:
                    "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
                  borderRadius: "4px !important",
                  boxShadow:
                    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12) !important",
                  position: "absolute !important",
                  overflowY: "auto !important",
                  overflowX: "hidden !important",
                  minWidth: "16px !important",
                  minHeight: "16px !important",
                  maxWidth: "calc(100% - 32px) !important",
                  maxHeight: "calc(100% - 32px) !important",
                  outline: "0 !important",
                  maxHeight: "calc(100% - 96px) !important",
                },
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Grid container>
                    <MenuItem
                      sx={{
                        "& .MuiList-root .MuiMenu-list": {
                          listStyle: "none !important",
                          margin: "0 !important",
                          padding: "0 !important",
                          position: "relative !important",
                          paddingTop: "8px !important",
                          paddingBottom: "8px !important",
                          outline: "0 !important",
                        },
                      }}
                      onClick={handleClickOpen}
                    >
                      Change Password
                    </MenuItem>
                  </Grid>
                  <Grid container>
                    <MenuItem onClick={handleClose1}>Logout</MenuItem>
                  </Grid>
                </Grid>
              </Grid>
            </Menu> */}
            {/* </div> */}
            <Button aria-describedby={id} onClick={handleAvatarClick}>
              <Avatar alt="Remy Sharp" src={""} />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={avatarEl}
              onClose={handleAvatarClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      onClick={handleClickOpen}
                      primary="Change Password"
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText onClick={handleClose1} primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
          </li>
        </ul>
        <Drawer
          anchor={"right"}
          open={customizer}
          onClose={() => setCustomizer(false)}
        >
          <ChatSidebar />
        </Drawer>
      </Toolbar>
      <DashboardOverlay onClose={() => closeDashboardOverlay()} />

      <Dialog
        open={open1}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <i
            className="zmdi zmdi-close-circle"
            onClick={handleClose2}
            style={{ margin: "1%", float: "right" }}
          ></i>
          Change Password
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <DialogContent fullWidth>
            <DialogContentText id="alert-dialog-description" fullWidth>
              <TextField
                label="Old Password"
                variant="outlined"
                type="password"
                size="medium"
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter Old Password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />

              <TextField

                label="New Password"
                variant="outlined"
                type="password"
                size="medium"
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
                inputProps={{ minLength: 8 }}
              />

              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                size="medium"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
                inputProps={{ minLength: 8 }}
                error={
                  formData.confirmPassword &&
                  formData.newPassword !== formData.confirmPassword
                }
                helperText={
                  formData.confirmPassword &&
                    formData.newPassword !== formData.confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              class="btn btn-danger btn-sm"
              style={{ margin: "1%", float: "right" }}
              type="submit"
            // disabled={
            //   !formData.currentPassword ||
            //   !formData.newPassword ||
            //   !formData.confirmPassword ||
            //   formData.newPassword !== formData.confirmPassword
            // }
            >
              Submit
            </Button>
            <Button
              class="btn btn-warning btn-sm"
              style={{ margin: "1%", float: "right" }}
              onClick={resetForm}
            >
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </AppBar>
  );
}

export default withRouter(Header);
