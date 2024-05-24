/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
  Input,
  Drawer,
  Typography,
  Switch,
  Menu,
} from "antd";

import {
  SearchOutlined,
  StarOutlined,
  TwitterOutlined,
  FacebookFilled,
  LogoutOutlined
} from "@ant-design/icons";

import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import avtar from "../../assets/images/logout-icon.jpg";
import Icon from "@ant-design/icons/lib/components/Icon";
import Sidenav from "./Sidenav";
import MenuItem from "antd/lib/menu/MenuItem";
import SubMenu from "antd/lib/menu/SubMenu";
import sanitizeHtml from 'sanitize-html';
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ikea from "../../assets/images/ikea.png";
import { useHistory } from "react-router-dom";
import '../../../src/Style.css'
import { grey } from "@mui/material/colors";


const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0px;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #1890ff;
  }
`;

const bell = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
      fill="#111827"
    ></path>
    <path
      d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
      fill="#111827"
    ></path>
  </svg>,
];

const wifi = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 107 107"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="logo-spotify" fill="#2EBD59" fillRule="nonzero">
        <path
          d="M53.5,0 C23.9517912,0 0,23.9517912 0,53.5 C0,83.0482088 23.9517912,107 53.5,107 C83.0482088,107 107,83.0482088 107,53.5 C107,23.9554418 83.0482088,0.00365063118 53.5,0 Z M78.0358922,77.1597407 C77.0757762,78.7368134 75.0204708,79.2296486 73.4506994,78.2695326 C60.8888775,70.5922552 45.0743432,68.8582054 26.4524736,73.1111907 C24.656363,73.523712 22.8675537,72.3993176 22.458683,70.6032071 C22.0461617,68.8070966 23.1669055,67.0182873 24.9666667,66.6094166 C45.3444899,61.9548618 62.8273627,63.9590583 76.9297509,72.5745479 C78.4995223,73.5419652 78.9996588,75.5899693 78.0358922,77.1597407 L78.0358922,77.1597407 Z M84.5814739,62.5973729 C83.373115,64.5614125 80.8030706,65.1747185 78.8426817,63.9700102 C64.4664961,55.1318321 42.5408052,52.5727397 25.5325145,57.7347322 C23.3275333,58.4027977 20.9984306,57.1579324 20.3267144,54.9566018 C19.6622996,52.7516206 20.9071648,50.4261685 23.1084954,49.7544524 C42.5371546,43.858683 66.6933811,46.7134766 83.2051859,56.8622313 C85.1692255,58.0705902 85.7898328,60.636984 84.5814739,62.5973729 Z M85.1436711,47.4253497 C67.8980894,37.1853292 39.4523712,36.2434664 22.9880246,41.2375299 C20.3449676,42.0406687 17.5485841,40.5475606 16.7490959,37.9045036 C15.9496076,35.2614466 17.4390652,32.4650631 20.0857728,31.6619243 C38.9850904,25.9267827 70.3987718,27.0329239 90.2509041,38.8171614 C92.627465,40.2299556 93.4087001,43.3001365 91.9995565,45.6730467 C90.5940635,48.0532583 87.5165814,48.838144 85.1436711,47.4253497 Z"
          id="Shape"
        ></path>
      </g>
    </g>
  </svg>,
];

const credit = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fill="#1890FF"
      d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
    ></path>
    <path
      fill="#1890FF"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
    ></path>
  </svg>,
];

const clockicon = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z"
      fill="#111827"
    ></path>
  </svg>,
];

const logouticon = [
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="#0257a7" d="M5.8 10C5.4 8.8 4.3 8 3 8c-1.7 0-3 1.3-3 3s1.3 3 3 3c1.3 0 2.4-.8 2.8-2H7v2h2v-2h2v-2H5.8M3 12c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m13-8c-2.2 0-4 1.8-4 4s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 6.1c-1.2 0-2.1-.9-2.1-2.1c0-1.2.9-2.1 2.1-2.1c1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1m0 2.9c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4m6.1 5.1H9.9V17c0-.6 3.1-2.1 6.1-2.1c3 0 6.1 1.5 6.1 2.1v1.1Z" />
  </svg>
]

const data = [

  {
    title: "Log out",
    // description: <>{logouticon}</>,

    avatar: avtar,
  },
  // {
  //   title: "New album by Travis Scott",
  //   description: <>{clockicon} 2 days ago</>,

  //   avatar: <Avatar shape="square">{wifi}</Avatar>,
  // },
  // {
  //   title: "Payment completed",
  //   description: <>{clockicon} 2 days ago</>,
  //   avatar: <Avatar shape="square">{credit}</Avatar>,
  // },
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown "
    itemLayout="horizontal"
    dataSource={data}
    // onClick={handleClick}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);



const UserSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 16 16"><rect x="44" y="34" width="1024" height="1024" fill="" stroke="none" /><g fill="#ffdc01"><path d="M12.5 16a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7Zm1.679-4.493l-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548l1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z" /><path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025c.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" /></g></svg>
)

const UserIcon = (props) => <Icon component={UserSvg}{...props} />;
const logsetting = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
      fill="#111827"
    ></path>
  </svg>,
];

const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

const Setting = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
      fill="#111827"
    ></path>
  </svg>,
];
function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const { Title, Text } = Typography;
  const [openKeys, setOpenKeys] = useState([]);
  const [subMenuKeys, setSubMenuKeys] = useState("");
  const [visible, setVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [roleNameTitle, setRoleNameTitle] = useState("");
  const [sidenavType, setSidenavType] = useState("transparent");
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);
  const [roleMenu1, setRoleMenu] = useState(
    sessionStorage.getItem("Role_Menu")
  );
  const menuData1 = roleMenu1.replace(/\\/g, "");
  const menuData2 = menuData1.substring(16, menuData1.length - 3);
  const menuData3 = "[" + menuData2 + "]";
  const menuData4 = JSON.parse(menuData3);

  useEffect(() => window.scrollTo(0, 0));
  useEffect(() => {
    let title = "";
    let temp = name.split("/")
    title = (temp[2].replaceAll("_", " "))
    let finalTitle = title.charAt(0).toUpperCase() + title.slice(1);
    setPageTitle(finalTitle)



    if (user.roleUID == "1") {
      setRoleNameTitle("Master Admin")
    } if (user.roleUID == "8") {
      setRoleNameTitle("Admin food audit")
    } if (user.roleUID == "9") {
      setRoleNameTitle("Admin property audit")
    } if (user.roleUID == "10") {
      setRoleNameTitle("Admin dm check list audit")
    } if (user.roleUID == "11") {
      setRoleNameTitle("Admin security audit")
    } if (user.roleUID == "13") {
      setRoleNameTitle("Super admin")
    }
  });

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);
  const history = useHistory();

  const logoutfunction = (e) => {
    // console.log(e)
    // console.log(e.target)
    // sessionStorage.removeItem("Audit_user")
    // sessionStorage.removeItem("Token")

    // history.push('/')
  }

  const Setting = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
        fill="#111827"
      ></path>
    </svg>,
  ];

  const handleClicklogout = () => {
    sessionStorage.removeItem("Audit_user")
    sessionStorage.removeItem("Token")
    sessionStorage.removeItem("Role_Menu")
    history.push('/')
    setRoleNameTitle("")
  }

  const LogoutIconOUT = {
    height: "20px",
    width: "20px",
    color: "#0257a7"
  }

  const logoutSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="#0257a7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" /><path d="M9 12h12l-3-3m0 6l3-3" /></g></svg>
  )
  const LogOutIconsvg = (props) => <Icon component={logoutSvg}{...props} />;

  const userMenu = (

    <Menu>
      <Row>
        <Col lg={24} md={24}>
          <Menu.Item >
            <span style={{ justifyContent: 'start', display: 'flex', marginLeft: "10px", marginRight: "10px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" fill="none" stroke="none" /><circle cx="12" cy="6" r="4" fill="#0253a0" /><path fill="#0253a0" fill-rule="evenodd" d="M16.5 22c-1.65 0-2.475 0-2.987-.513C13 20.975 13 20.15 13 18.5c0-1.65 0-2.475.513-2.987C14.025 15 14.85 15 16.5 15c1.65 0 2.475 0 2.987.513C20 16.025 20 16.85 20 18.5c0 1.65 0 2.475-.513 2.987C18.975 22 18.15 22 16.5 22m1.968-4.254a.583.583 0 1 0-.825-.825l-1.92 1.92l-.366-.365a.583.583 0 1 0-.825.825l.778.778a.583.583 0 0 0 .825 0z" clip-rule="evenodd" /><path fill="#0253a0" d="M15.415 13.507A11.288 11.288 0 0 0 12 13c-3.866 0-7 1.79-7 4c0 2.14 2.942 3.888 6.642 3.995a4.87 4.87 0 0 1-.064-.375c-.078-.578-.078-1.283-.078-2.034v-.172c0-.75 0-1.456.078-2.034c.086-.643.293-1.347.874-1.928c.581-.582 1.285-.788 1.928-.875a9.635 9.635 0 0 1 1.035-.07" /></svg> <h4 style={{ marginLeft: "8px" }}> {user?.userName.length > 20 ? user.userName.slice(0, 20) : user.userName}</h4>
            </span>
          </Menu.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={24} md={24}>
          <Menu.Item style={{ justifyContent: 'start', display: 'flex', marginLeft: "10px", marginRight: "10px" }} onClick={() => handleClicklogout()}> <LogOutIconsvg
          /><span>Logout</span></Menu.Item>
        </Col>
      </Row>

    </Menu>
  );

  const handleclick = (e) => {
    setSubMenuKeys(e.keyPath[0])
    routeSwitch(e.key, e.keyPath[0])
  };


  const routeSwitch = (route, mainRoute) => {
    const userString = sessionStorage.getItem("Audit_user");
    const user = JSON.parse(userString);
    //  console.log(history);
    if (mainRoute !== "master" && mainRoute !== "setup" && mainRoute !== "reports") {
      switch (user.roleUID) {
        case "1":
          history.push("/admin/master/" + route);
          break;
        case "8":
          history.push("/admin/food/" + route);
          break;
        case "9":
          history.push("/admin/property/" + route);
          break;
        case "10":
          history.push("/admin/dm/" + route);
          break;
        case "11":
          history.push("/admin/security/" + route);
          break;
        case "13":
          history.push("/admin/superadmin/" + route);
          break;
        default:
          break;
      }
    }

  }

  const rootSubmenuKeys = ["Master", "Setup", "Reports"];

  const onOpenChange = (keys) => {
    //console.log(keys)
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      // setOpenKeys(keys);
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    } else {
      setOpenKeys(keys);
      // setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const iconStyle = {
    marginTop: "5px",
    marginLeft: "5px",
    fontSize: "30px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",

  };


  const iconDashBoardStyle = {
    // marginTop: "5px",
    // marginLeft: "15px",
    marginLeft: "7px",
    marginBottom: "5px",
    fontSize: "30px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",
    paddingLeft: "2px"
  };

  const iconSubStyle = {
    marginLeft: "5px",
    fontSize: "20px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",
  };





  return (
    <>
      <Row>
        <Col lg={8} md={8}>
          <Breadcrumb items={[{ title: name.replace("/", "") }]} style={{
            // fontWeight: "300",
            fontSize: "x-large", marginLeft: "30px",
          }}>
            <Breadcrumb.Item style={{
              // fontWeight: "600",
              fontSize: "x-large", color: "#ffdc01",
            }}>
              {pageTitle}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col lg={15} md={13} style={{ justifyContent: 'end', display: 'flex' }}>
          <Breadcrumb>
            <Breadcrumb.Item style={{
              // fontWeight: "600",
              fontSize: "22px", color: "#ffdc01",
              marginTop: "10px"
            }}>
              {roleNameTitle}
            </Breadcrumb.Item>
          </Breadcrumb>
          {/* <Button type="link" className="toggler-tabletview" onClick={showDrawer} >
            {toggler}
          </Button> */}
        </Col>

        <Col lg={1} md={2} style={{ justifyContent: "center", display: "flex" }} className="header-control">
          <Dropdown

            overlay={userMenu}
            trigger={["click"]}
            placement="bottomLeft"
          >
            <div>
              <Avatar size="large" icon={<UserIcon />} />
            </div>
          </Dropdown>
          <Drawer
            className="settings-drawer"
            mask={true}
            width={200}
            onClose={hideDrawer}
            placement={placement}
            visible={visible}
          >
            <div className="brand-withdraw">
              <img
                src={ikea}
                alt="ikea"
                style={{
                  top: "10px",
                  position: "relative",
                  height: "91px",
                  // boxShadow: "0px 2px 5px 2px",
                  // boxShadow: "0px -5px 10px 0px rgba(0, 0, 0, 0.5)"
                }}
              />
            </div>
            <hr />
            <div
              style={{

                width: 169,
                backgroundColor: "#dadada",
                top: "28px",
                position: "relative"
              }}
            >
              {menuData4.map((q, i) => {
                return (
                  <Menu
                    key={i}
                    mode="inline"
                    theme="light"
                    onClick={(event) => handleclick(event)}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    className="menuName-style"
                  >
                    {q?.subMenu.length === 0 && (
                      <>
                        <MenuItem key={q.menuLink}
                          style={{
                            backgroundColor: "#dadada",
                            margin: "0px",
                            padding: "0px",
                            border: "none",
                            borderColor: "grey",
                            color: "black",
                            borderRight: "3px solid #1890ff00"

                          }}

                        ><Icon dangerouslySetInnerHTML={{ __html: q.menuIcon }} style={iconDashBoardStyle} theme="outlined" /> {q.menuName}</MenuItem>
                      </>
                    )}
                    {q?.subMenu.length !== 0 && (
                      <>
                        <SubMenu
                          style={{
                            backgroundColor: "#dadada",
                            margin: "0px",
                            padding: "2px",
                            border: "none",
                            borderColor: "grey",
                            color: "black",
                            borderRight: "3px solid #1890ff00"
                          }}
                          key={q.menuLink}
                          title={

                            <MenuItem
                              style={{
                                backgroundColor: "#dadada",
                                margin: "0px",
                                padding: "2px",
                                border: "none",
                                borderColor: "grey",
                                color: "black",
                                borderRight: "3px solid #1890ff00"
                              }}
                            ><Icon dangerouslySetInnerHTML={{ __html: q.menuIcon }} style={iconStyle} theme="outlined" /> {q.menuName}</MenuItem>
                          }
                        >
                          {q.subMenu.map((e, t) => (
                            <>
                              < MenuItem className="submenu-items"
                                style={{
                                  marginLeft: "10px",
                                  backgroundColor: "#dadada",
                                  margin: "0px",
                                  padding: "2px",
                                  border: "none",
                                  borderColor: "grey",
                                  color: "black",
                                  borderRight: "3px solid #1890ff00"
                                }}
                                key={e.menuLink}
                              //  icon={< a className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} />}
                              > <Icon dangerouslySetInnerHTML={{ __html: e.menuIcon }} style={iconSubStyle} theme="outlined" /> {e.menuName}</MenuItem>
                            </>
                          ))}
                        </SubMenu>
                      </>
                    )}
                  </Menu>
                );
              })}
            </div>

            {/* <div layout="vertical">
              <div className="header-top">
                <Title level={4}>
                  Configurator
                  <Text className="subtitle">See our dashboard options.</Text>
                </Title>
              </div>

              <div className="sidebar-color">
                <Title level={5}>Sidebar Color</Title>
                <div className="theme-color mb-2">
                  <ButtonContainer>
                    <Button
                      type="primary"
                      onClick={() => handleSidenavColor("#1890ff")}
                    >
                      1
                    </Button>
                    <Button
                      type="success"
                      onClick={() => handleSidenavColor("#52c41a")}
                    >
                      1
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleSidenavColor("#d9363e")}
                    >
                      1
                    </Button>
                    <Button
                      type="yellow"
                      onClick={() => handleSidenavColor("#fadb14")}
                    >
                      1
                    </Button>

                    <Button
                      type="black"
                      onClick={() => handleSidenavColor("#111")}
                    >
                      1
                    </Button>
                  </ButtonContainer>
                </div>

                <div className="sidebarnav-color mb-2">
                  <Title level={5}>Sidenav Type</Title>
                  <Text>Choose between 2 different sidenav types.</Text>
                  <ButtonContainer className="trans">
                    <Button
                      type={sidenavType === "transparent" ? "primary" : "white"}
                      onClick={() => {
                        handleSidenavType("transparent");
                        setSidenavType("transparent");
                      }}
                    >
                      TRANSPARENT
                    </Button>
                    <Button
                      type={sidenavType === "white" ? "primary" : "white"}
                      onClick={() => {
                        handleSidenavType("#fff");
                        setSidenavType("white");
                      }}
                    >
                      WHITE
                    </Button>
                  </ButtonContainer>
                </div>
                <div className="fixed-nav mb-2">
                  <Title level={5}>Navbar Fixed </Title>
                  <Switch onChange={(e) => handleFixedNavbar(e)} />
                </div>
                <div className="ant-docment">
                  <ButtonContainer>
                    <Button type="black" size="large">
                      FREE DOWNLOAD
                    </Button>
                    <Button size="large">VIEW DOCUMENTATION</Button>
                  </ButtonContainer>
                </div>
                <div className="viewstar">
                  <a href="#pablo">{<StarOutlined />} Star</a>
                  <a href="#pablo"> 190</a>
                </div>

                <div className="ant-thank">
                  <Title level={5} className="mb-2">
                    Thank you for sharing!
                  </Title>
                  <ButtonContainer className="social">
                    <Button type="black">{<TwitterOutlined />}TWEET</Button>
                    <Button type="black">{<FacebookFilled />}SHARE</Button>
                  </ButtonContainer>
                </div>
              </div>
            </div> */}
          </Drawer>
        </Col>
        <Col md={1} style={{ justifyContent: "end", display: "flex" }}>
          <Button type="link" style={{ bottom: "3px", position: "relative" }} className="toggler-tabletview" onClick={showDrawer} >
            {toggler}
          </Button>
        </Col>
      </Row >
    </>
  );
}

export default Header;
