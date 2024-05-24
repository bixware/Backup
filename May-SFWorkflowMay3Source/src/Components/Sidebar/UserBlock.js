/**
 * User Block Component
 */
import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Badge } from "reactstrap";
import logo from "../../Assets/img/sapphire-logo.png";
// import { NotificationManager } from 'react-notifications';
// components
// import SupportPage from '../Support/Support';
// redux action
import { logoutUserFromFirebase } from "Store/Actions";
// intl messages
import IntlMessages from "Util/IntlMessages";

function UserBlock() {
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const roleUID = User && User.roleUID;
  const [userDropdownMenu, setUserDropdownMenu] = useState(false);
  // const [isSupportModal, setIsSupportModal] = useState(false);
  const dispatch = useDispatch();
  /**
   * Logout User
   */
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logoutUserFromFirebase());
  };

  /**
   * Toggle User Dropdown Menu
   */
  const toggleUserDropdownMenu = () => {
    setUserDropdownMenu(!userDropdownMenu);
  };

  // /**
  //  * On Close Support Page
  //  */
  // const onCloseSupportPage = () => {
  //    setIsSupportModal(false);
  // }

  // /**
  //  * On Open Support Page
  //  */
  // const onOpenSupportPage = () => {
  //    setIsSupportModal(true);
  // }

  // /**
  //  * On Submit Support Page
  //  */
  // const onSubmitSupport = () => {
  //    setIsSupportModal(false);
  // 	NotificationManager.success('Message has been sent successfully!');
  // }

  return (
    <div className="top-sidebar">
      <div className="sidebar-user-block">
        <Dropdown
          isOpen={userDropdownMenu}
          toggle={() => toggleUserDropdownMenu()}
          className="rct-dropdown"
        >
          <DropdownToggle tag="div" className="d-flex align-items-center">
            <div className="user-profile">
              <img
                // src={`https://www.sapphirefoods.in/storage/app/media/sapphire-logo.png`}
                src={logo}
                alt="user profile"
                className="img-fluid rounded-circle"
                width="50"
                height="100"
              />
            </div>
            {roleUID == 1 ? (
              <div className="user-info">
                <span className="user-name ml-4">Admin</span>
                {/* <i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i> */}
              </div>
            ) : (
              <div className="user-info">
                <span className="user-name ml-4">{User.name}</span>
                {/* <i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i> */}
              </div>
            )}
          </DropdownToggle>
          <DropdownMenu>
            <ul className="list-unstyled mb-0">
              <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                <Link to={"/signin"}>
                  <i className="zmdi zmdi-power text-danger mr-3"></i>
                  <span>
                    <IntlMessages id="widgets.logOut" />
                  </span>
                </Link>
              </li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
      {/* <SupportPage
            isOpen={isSupportModal}
            onCloseSupportPage={() => onCloseSupportPage()}
            onSubmit={() => onSubmitSupport()}
         /> */}
    </div>
  );
}

export default UserBlock;
