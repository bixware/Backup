/**
 * Agency Menu
 */
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { withRouter, Link } from "react-router-dom";

//Intl Meassages
import IntlMessages from "Util/IntlMessages";

import navLinks from "./NavLinks";
import NavMenuItem from "./NavMenuItem";
//import Sidebar from "Components/Sidebar";

//Component
import SearchForm from "Components/Header/SearchForm";
import MobileSearchForm from "Components/Header/MobileSearchForm";

function AgencyMenu() {
  const [isMobileSearchFormVisible, setIsMobileSearchFormVisible] =
    useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // mobile search form
  const openMobileSearchForm = () => {
    setIsMobileSearchFormVisible(true);
  };

  return (
    <div className="horizontal-menu agency-menu justify-content-between align-items-center">
      <ul className="list-unstyled nav">
        {/* <li className="nav-item">
          <Link to={"/admin/dashboard"}>
            <i className="zmdi zmdi-view-dashboard"></i>
            <span className="menu-title">
              <IntlMessages id="Dashboard" />
            </span>
          </Link>
        </li> */}
        {localStorage.getItem("roleUID") != 2 && localStorage.getItem("roleUID") != 3 ? (
        <li className="nav-item" >
          <Link to={"/admin/creditdebit"}>
            {/* <i className="zmdi zmdi-widgets"></i> */}
            <span className="menu-title">
              <IntlMessages id="Credit/Debit Notes" className="credit_debit" />
            </span>
          </Link>
        </li>
        ) : (null)}
        {localStorage.getItem("roleUID") != 3 ? (
        <li className="nav-item">
          <Link to={"/admin/invoice"}>
            {/* <i className="zmdi zmdi-view-carousel"></i> */}
            <span className="menu-title">
              <IntlMessages id="Invoice Download" />
            </span>
          </Link>
        </li>
        ) : (null)}
        {localStorage.getItem("roleUID") != 2 && localStorage.getItem("roleUID") != 3 ? (
        <li className="nav-item">
          <Link to={"/admin/customers"}>
            {/* <i className="zmdi zmdi-view-carousel"></i> */}
            <span className="menu-title">
              <IntlMessages id="Customers" />
            </span>
          </Link>
        </li>
         ) : (null)}
        {/* <li className="nav-item">
          <Link to={"/admin/orderstatus"}>
            <i className="zmdi zmdi-view-carousel"></i>
            <span className="menu-title">
              <IntlMessages id="Order Status" />
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/admin/customer"}>
            <i className="zmdi zmdi-view-carousel"></i>
            <span className="menu-title">
              <IntlMessages id="Customer" />
            </span>
          </Link>
        </li> */}
          {localStorage.getItem("roleUID") != 1 && localStorage.getItem("roleUID") != 2 && localStorage.getItem("roleUID") != 3 ? (
          <li className="nav-item">
            <Link to={"/admin/schemeworking"}>
              {/* <i className="zmdi zmdi-view-carousel"></i> */}
              <span className="menu-title">
                <IntlMessages id="Scheme Working" />
              </span>
            </Link>
          </li>
          ) : (null)}
        {localStorage.getItem("roleUID") != 2 ? (
        <li className="nav-item">
          <a href="!#" onClick={e => e.preventDefault()}>
            {/* <i className="zmdi zmdi-widgets"></i> */}
            <span className="menu-title"><IntlMessages id="Reports" /></span>
          </a>
          <ul className="list-unstyled sub-menu">
            {navLinks.category2.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
              />
            ))}
          </ul>
        </li>
        ) : (null)}

        {/*  <li className="nav-item">
               <a href="!#" onClick={e => e.preventDefault()}>
                  <i className="zmdi zmdi-widgets"></i>
                  <span className="menu-title"><IntlMessages id="Finance" /></span>
               </a>
               <ul className="list-unstyled sub-menu">
                  {navLinks.category4.map((menu, key) => (
                     <NavMenuItem
                        menu={menu}
                        key={key}
                     />
                  ))}
               </ul>
        </li> */}
        {/* <li className="nav-item">
          <Link to={"/corporate/admin/newregistration"}>
            <i className="zmdi zmdi-view-carousel"></i>
            <span className="menu-title">
              <IntlMessages id="Newreg" />
            </span>
          </Link>
        </li> */}
      </ul>
      {/* <IconButton
        className="hamburger-icon"
        color="inherit"
        aria-label="Menu"
        onClick={() => setMobileMenu(true)}
      >
        <MenuIcon />
      </IconButton> */}
      {/* <div className="search-icon">
        <SearchForm />
        <IconButton
          mini="true"
          className="search-icon-btn"
          onClick={openMobileSearchForm}
        >
          <i className="zmdi zmdi-search"></i>
        </IconButton>
        <MobileSearchForm
          isOpen={isMobileSearchFormVisible}
          onClose={() => setIsMobileSearchFormVisible(false)}
        />
        <Drawer open={mobileMenu} onClose={() => setMobileMenu(false)}>
          <Sidebar agencySidebar />
        </Drawer>
      </div> */}
    </div>
  );
}
export default withRouter(AgencyMenu);
