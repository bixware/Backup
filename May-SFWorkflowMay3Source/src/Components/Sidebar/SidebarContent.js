/**
 * Sidebar Content
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, ListSubheader } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import NavMenuItem from "./NavMenuItem";
// redux actions
import { onToggleMenu } from "Store/Actions";

function SidebarContent() {
  const userString = sessionStorage.getItem("bixware_user");
  const user = JSON.parse(userString);
  const userData = user.get_work_flow_statge_user[0];
  let roleUID = user.roleUID;
  let email = user.email;
  const [secondStage, setSecondStage] = useState(0);
  useEffect(() => {
    if (user.get_work_flow_statge_user.length > 1) {
      setSecondStage(parseInt(user.get_work_flow_statge_user[1].stageNo));
    }
  }, []);

  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  console.log(sidebar);
  const { sidebarMenus } = sidebar;

  const toggleMenu = (menu, stateCategory) => {
    let data = { menu, stateCategory };
    dispatch(onToggleMenu(data));
  };

  function getCategory() {
    if (parseInt(roleUID) === 1) {
      return sidebarMenus.category1.map((menu, key) => (
        <NavMenuItem
          menu={menu}
          key={key}
          onToggleMenu={() => toggleMenu(menu, "category1")}
        />
      ));
    } else {
      let workflowUsers = user.get_work_flow_statge_user;
      let initiator = false;
      let approval = false;
      let dataEntry = false;
      workflowUsers.forEach((item, i) => {
        if (parseInt(item.stageNo) === 1) {
          initiator = true;
        }
        if (
          parseInt(item.stageNo) < parseInt(item.work_flow.noOfStage) - 1 &&
          parseInt(item.stageNo) !== 1
        ) {
          approval = true;
        }
        if (parseInt(item.stageNo) === parseInt(item.work_flow.noOfStage) - 1) {
          dataEntry = true;
        }
      });
      if (initiator === true && approval !== true && dataEntry !== true) {
        return sidebarMenus.category2.map((menu, key) => (
          <NavMenuItem
            menu={menu}
            key={key}
            onToggleMenu={() => toggleMenu(menu, "category2")}
          />
        ));
      } else if (
        initiator !== true &&
        approval === true &&
        dataEntry !== true
      ) {
        return sidebarMenus.category3.map((menu, key) => (
          <NavMenuItem
            menu={menu}
            key={key}
            onToggleMenu={() => toggleMenu(menu, "category3")}
          />
        ));
      } else if (
        initiator !== true &&
        approval !== true &&
        dataEntry === true
      ) {
        return sidebarMenus.category4.map((menu, key) => (
          <NavMenuItem
            menu={menu}
            key={key}
            onToggleMenu={() => toggleMenu(menu, "category4")}
          />
        ));
      }
    }
  }

  return (
    <div className="rct-sidebar-nav">
      <nav className="navigation">
        <List
          className="rct-mainMenu p-0 m-0 list-unstyled"
          subheader={
            <ListSubheader className="side-title" component="li">
              {/* <IntlMessages id="sidebar.general" /> */}
            </ListSubheader>
          }
        >
          {getCategory()}
          {/* {parseInt(roleUID) === 1
            ? sidebarMenus.category1.map((menu, key) => (
                <NavMenuItem
                  menu={menu}
                  key={key}
                  onToggleMenu={() => toggleMenu(menu, "category1")}
                />
              ))
            : email === "scm1@sapphirefoods.in"
            ? sidebarMenus.category2.map((menu, key) => (
                <NavMenuItem
                  menu={menu}
                  key={key}
                  onToggleMenu={() => toggleMenu(menu, "category2")}
                />
              ))
            : sidebarMenus.category3.map((menu, key) => (
                <NavMenuItem
                  menu={menu}
                  key={key}
                  onToggleMenu={() => toggleMenu(menu, "category3")}
                />
              ))} */}
        </List>
        {/* Other lists commented out for brevity */}
      </nav>
    </div>
  );
}

export default withRouter(SidebarContent);
