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

// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ikea from "../../assets/images/ikea.png";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import {
  DashboardOutlined,
  TabletOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  ShopOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
  SnippetsOutlined,
  SendOutlined,
  FolderViewOutlined,
  GlobalOutlined,
  LaptopOutlined,
  EnvironmentOutlined,
  KeyOutlined,
  ClusterOutlined,
  FileProtectOutlined,
  MailOutlined,
  GroupOutlined,
} from "@ant-design/icons";

import { EditTwoTone } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Dashboard, Logout } from "@mui/icons-material";
import MenuItem from "antd/lib/menu/MenuItem";
import SubMenu from "antd/lib/menu/SubMenu";
import sanitizeHtml from 'sanitize-html';






const items = [
  { label: "Dashboard", key: "1", icon: <AiFillDatabase />, children: null },
  { label: "Table", key: "2", icon: <MailOutlined />, children: null },
  { label: "Billing", key: "3", icon: <MailOutlined />, children: null },
  { label: "Users", key: "4", icon: <MailOutlined />, children: null },
  {
    label: "Setup",
    key: "sub",
    icon: <DriveFileRenameOutlineOutlinedIcon />,
    children: [
      { label: "Store", key: "5", icon: <MailOutlined /> },
      { label: "Audit type", key: "6", icon: <MailOutlined /> },
      { label: "Audit entity", key: "7", icon: <MailOutlined /> },
    ],
  },

];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Location = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2rem"
    height="2rem"
    fill="currentColor"
    class="bi bi-geo-alt-fill"
    viewBox="0 0 1024 1024"
  >
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const HeartSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 1024 1024"
  >
    <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M924.8 385.6a446.7 446.7 0 0 0-96-142.4a446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96a446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 0 1 140 560c0-99.4 38.7-192.8 109-263c70.3-70.3 163.7-109 263-109c99.4 0 192.8 38.7 263 109c70.3 70.3 109 163.7 109 263c0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 0 0-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 0 0 0 79.2a55.95 55.95 0 0 0 79.2 0a55.87 55.87 0 0 0 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 0 0-11.3 0l-56.6 56.6a8.03 8.03 0 0 0 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 0 0-11.3 0l-31.1 31.1a8.03 8.03 0 0 0 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z"
    />
  </svg>
);

const MasterSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 24 24"
  >
    <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M20 13.01h-7V10h1c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h1v3.01H4V18H3v4h4v-4H6v-2.99h5V18h-1v4h4v-4h-1v-2.99h5V18h-1v4h4v-4h-1v-4.99zM10 8V4h4l.002 4H10z"
    />
  </svg>
);

const LocationSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 100 100"
  >
    <rect x="0" y="0" width="100" height="100" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="m68.913 48.908l-.048.126c.015-.038.027-.077.042-.115l.006-.011z"
      color="#ffdc01"
    />
    <path
      fill="#ffdc01"
      d="M50.002 0C33.524 0 20 13.48 20 29.922c0 6.372 2.04 12.31 5.48 17.174l-.123-.192l19.206 33.198l.097.127c.774 1.01 1.54 1.824 2.467 2.437c.927.613 2.114 1 3.28.883c2.33-.234 3.684-1.844 4.935-3.54l.078-.105L76.594 43.87l.017-.03c.507-.915.874-1.838 1.188-2.732A29.578 29.578 0 0 0 80 29.922C80 13.48 66.48 0 50.002 0zm0 5C63.756 5 75 16.218 75 29.922a24.55 24.55 0 0 1-1.84 9.332l-.025.062l-.022.065c-.263.757-.549 1.444-.879 2.04L51.275 77.087c-.927 1.221-1.575 1.51-1.367 1.488c.107-.01.206.074-.023-.078c-.219-.145-.666-.57-1.196-1.246L29.63 44.3l-.067-.093C26.69 40.147 25 35.23 25 29.922C25 16.219 36.248 5 50.002 5zm0 7.85c-9.462 0-17.115 7.626-17.115 17.072c0 9.446 7.654 17.072 17.115 17.072c9.461 0 17.111-7.627 17.111-17.072c0-9.446-7.65-17.072-17.111-17.072zm0 5c6.817 0 12.111 5.285 12.111 12.072c0 6.787-5.293 12.072-12.111 12.072c-6.818 0-12.115-5.286-12.115-12.072c0-6.787 5.298-12.072 12.115-12.072z"
      color="#ffdc01"
    />
    <path
      fill="#ffdc01"
      d="M34.006 69.057C19.88 71.053 10 75.828 10 82.857C10 92.325 26.508 100 50 100s40-7.675 40-17.143c0-7.029-9.879-11.804-24.004-13.8l-1.957 3.332C74.685 73.866 82 76.97 82 80.572c0 5.05-14.327 9.143-32 9.143c-17.673 0-32-4.093-32-9.143c-.001-3.59 7.266-6.691 17.945-8.174c-.645-1.114-1.294-2.226-1.94-3.341z"
      color="#ffdc01"
    />
  </svg>
);

const EntitySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <g fill="#ffdc01">
      <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </g>
  </svg>
);

const AuditTypeSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <g fill="#ffdc01">
      <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
    </g>
  </svg>
);

const CheckListSubTypeSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M19 18H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1v5l2-1.5L14 7V2h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2m-2 2v2H5a2 2 0 0 1-2-2V6h2v14h12Z"
    />
  </svg>
);

const QuestionSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <g fill="#ffdc01">
      <path d="M3 6.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v1H1V2a1 1 0 0 1 1-1h12zm1 3v10a1 1 0 0 1-1 1h-2V4h3zm-4 0v11H2a1 1 0 0 1-1-1V4h10z" />
    </g>
  </svg>
);
const ScoringSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="m13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057l3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
    />
  </svg>
);

const UserSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <g fill="#ffdc01">
      <path d="M12.5 16a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7Zm1.679-4.493l-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548l1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z" />
      <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025c.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
    </g>
  </svg>
);

const RoleMasterSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <g fill="#ffdc01">
      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
      <path d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1H3zm8-9a3 3 0 1 1-6 0a3 3 0 0 1 6 0z" />
    </g>
  </svg>
);

const EntityMainSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z"
    />
  </svg>
);

const SetupSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8L4.617 4.322zm.344 7.646l.087.065l-.087-.065z"
    />
  </svg>
);

const LocationTypeSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 100 100"
  >
    <rect x="0" y="0" width="100" height="100" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M57.889 0c-7.84.03-14.902 5.567-16.504 13.512A16.685 16.685 0 0 0 42.5 23.596l5.492 16.279h-9.445l2.05-9.918c.069-.379.092-.766.094-1.154a11.83 11.83 0 0 0-.607-4.54c-1.722-5.069-6.574-8.245-11.69-8.118c-1.18.029-2.375.234-3.548.632c-6.258 2.125-9.649 8.98-7.53 15.22a11.872 11.872 0 0 0 4.291 5.804l2.37 2.074H13v-23.75h8.518a13.113 13.113 0 0 1 2.877-1.303c5.145-1.733 11.19-.077 14.771 3.994a18.674 18.674 0 0 1 .95-8.193a3.492 3.492 0 0 0-2.866-1.498H9.5a3.5 3.5 0 0 0-3.5 3.5v27.25H3.5a3.5 3.5 0 0 0-3.469 3.973l6 43.998v.002c.008.05.016.101.026.152c.537 1.633 1.831 2.716 3.295 2.872h.001l.147.003h81c1.806-.061 3.105-1.603 3.469-3.027l6-44a3.5 3.5 0 0 0-3.469-3.973h-3.584c1.09-5.318-1.566-10.93-6.703-13.316a11.93 11.93 0 0 0-4.631-1.108c-4.68-.159-9.242 2.432-11.324 6.914a11.874 11.874 0 0 0-.906 7.162l.03.348h-9.366l11.101-12.4a9.58 9.58 0 0 0 .93-1.336a16.63 16.63 0 0 0 2.469-5.946C76.346 11.114 70.389 2.17 61.283.334A16.837 16.837 0 0 0 57.89 0Zm.011 7.89c.6 0 1.208.06 1.82.184c4.904.989 8.02 5.664 7.034 10.553c-.986 4.889-5.67 7.99-10.572 7.002c-4.903-.989-8.02-5.664-7.034-10.553A8.9 8.9 0 0 1 57.9 7.891Zm18.905 9.985c-.121 2.403-.69 4.782-1.733 6.96a14.05 14.05 0 0 1 5.418-1.372c5.31-.322 10.625 2.718 13.045 7.455c.17.314.322.635.465.96V21.376a3.5 3.5 0 0 0-3.5-3.5zM28.553 21.75a6.33 6.33 0 0 1 6.197 4.324c1.141 3.36-.63 6.944-4 8.088c-3.37 1.144-6.959-.619-8.1-3.978c-1.14-3.36.633-6.944 4.002-8.088a6.505 6.505 0 0 1 1.9-.346zm52.816 9.3c.83.033 1.67.23 2.477.604a6.333 6.333 0 0 1 3.209 8.221H75.273a6.312 6.312 0 0 1 .094-5.135a6.33 6.33 0 0 1 6.002-3.69zM7.51 46.876h84.98l-5.045 37h-74.89Z"
      color="#ffdc01"
    />
  </svg>
);

const ContentSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
    <g fill="#ffdc01">
      <path d="m.5 3l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
      <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
    </g>
  </svg>
);

const FoodSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 14 14"
  >
    <rect x="0" y="0" width="14" height="14" fill="none" stroke="none" />
    <path
      fill="none"
      stroke="#ffdc01"
      strokeLinecap="round"
      d="M2.5 13.5h9m1.93-10.1a2.49 2.49 0 0 0-4.09-1.26a2.49 2.49 0 0 0-4.68 0A2.49 2.49 0 0 0 .57 3.4A2.51 2.51 0 0 0 2.5 6.45V10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.45a2.51 2.51 0 0 0 1.93-3.05ZM2.5 8.5h9"
    />
  </svg>
);

const PropertySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="1 1 22 22"
  >
    <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
    <path
      fill="none"
      stroke="#ffdc01"
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    />
  </svg>
);

const CheckListSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5l1.5 1.5M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-.25.65-.56 1.26-.92 1.85a5.77 5.77 0 0 0-1.9-.73l.64-1.12a9.821 9.821 0 0 0-17.64 0A9.821 9.821 0 0 0 12 17.5l1.21-.07c-.14.5-.21 1.03-.21 1.57v.46l-1 .04c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5Z"
    />
  </svg>
);

const SecuritySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="5 2 38 38"
  >
    <rect x="0" y="0" width="48" height="48" fill="none" stroke="none" />
    <g fill="#ffdc01">
      <path d="M24 13a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z" />
      <path
        fillRule="evenodd"
        d="m23.816 6.017l-.008.002l-.023.004l-.083.016l-.31.062c-.266.054-.645.134-1.098.237c-.905.206-2.12.507-3.34.884c-1.208.373-2.473.837-3.454 1.38c-.488.27-.956.587-1.313.96c-.355.369-.687.886-.687 1.535c0 1.745.49 3.023 1.008 3.88c.255.422.514.737.718.953c.01.115.025.244.053.384c.101.526.354 1.196.934 1.847a8 8 0 1 0 15.575 0c.579-.651.832-1.32.933-1.847c.028-.14.044-.269.053-.384a5.64 5.64 0 0 0 .718-.953c.519-.857 1.008-2.135 1.008-3.88c0-.649-.332-1.166-.687-1.535c-.357-.373-.825-.69-1.313-.96c-.981-.543-2.246-1.007-3.455-1.38a46.633 46.633 0 0 0-3.339-.884a50.988 50.988 0 0 0-1.408-.3l-.083-.015l-.023-.004l-.008-.002L24 5.983l-.184.034ZM24 7l.184-.983L24 7Zm-.184-.983L24 7l-.184-.983ZM24 18.5c2.207 0 3.689-.286 4.68-.658c.839-.315 1.328-.691 1.61-1.008c.103-.115.184-.227.248-.334H17.462c.064.107.145.22.247.334c.284.317.772.693 1.61 1.008c.992.372 2.474.658 4.681.658Zm7.372-4H16.628a3.74 3.74 0 0 1-.409-.558c-.343-.567-.715-1.484-.719-2.824a.647.647 0 0 1 .13-.172c.162-.169.436-.372.839-.594c.8-.443 1.91-.859 3.076-1.22a44.638 44.638 0 0 1 3.192-.843A48.977 48.977 0 0 1 24 8.019c.057.01.127.025.208.041c.254.052.618.13 1.055.229c.876.199 2.037.487 3.192.844c1.166.36 2.276.776 3.076 1.219c.403.222.677.425.84.594c.09.095.12.151.129.172c-.004 1.34-.376 2.257-.72 2.824a3.688 3.688 0 0 1-.408.558ZM18 20c0-.18.008-.358.023-.534c1.338.627 3.254 1.034 5.977 1.034c2.345 0 4.089-.3 5.382-.785c.21-.078.408-.162.595-.25A6 6 0 1 1 18 20Zm-2.503-8.873v-.003v.003Z"
        clipRule="evenodd"
      />
      <path d="M33 34c.667.667 2 1.333 2 1.333S34.302 38 33 38s-2-2.667-2-2.667s1.333-.666 2-1.333Z" />
      <path
        fillRule="evenodd"
        d="M20.5 31a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.382a2 2 0 0 1-.873 1.652l.113.566l3.432-4.167a1 1 0 0 1 .974-.344c2.564.532 5.187 1.338 7.195 2.444C40.283 33.603 42 35.156 42 37.298V41a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3.702c0-2.13 1.75-3.673 3.692-4.734c2.016-1.103 4.64-1.915 7.173-2.454a1 1 0 0 1 .98.343l3.43 4.166l.108-.578a2 2 0 0 1-.883-1.66V31Zm4.02 2.696l.579 2.897L24 37.927l-1.064-1.292l.547-2.953a1 1 0 0 0-.536-1.077l-.447-.223V31h3v1.382l-.447.224a1 1 0 0 0-.534 1.09ZM24.883 40l6.444-7.825c2.26.506 4.427 1.217 6.048 2.11C39.204 35.292 40 36.333 40 37.298V40H24.884Zm-8.194-7.803L23.116 40H8v-2.702c0-.934.8-1.967 2.651-2.98c1.633-.893 3.804-1.608 6.04-2.121Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

const Reportsvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 2048 1536"
  >
    <rect x="0" y="0" width="2048" height="1536" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M2048 1408v128H0V0h128v1408h1920zM1920 160v435q0 21-19.5 29.5T1865 617l-121-121l-633 633q-10 10-23 10t-23-10L832 896l-416 416l-192-192l585-585q10-10 23-10t23 10l233 233l464-464l-121-121q-16-16-7.5-35.5T1453 128h435q14 0 23 9t9 23z"
    />
  </svg>
);
const MenuSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="2 2 20 20"
  >
    <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
    <path
      fill="#ffdc01"
      d="M4 4h4v4H4V4Zm0 6h4v4H4v-4Zm4 6H4v4h4v-4Zm2-12h4v4h-4V4Zm4 6h-4v4h4v-4Zm-4 6h4v4h-4v-4ZM20 4h-4v4h4V4Zm-4 6h4v4h-4v-4Zm4 6h-4v4h4v-4Z"
    />
  </svg>
);

const MenuIcon = (props) => <Icon component={MenuSvg} {...props} />;

const CheckListSubTypeIcon = (props) => (
  <Icon component={CheckListSubTypeSvg} {...props} />
);

const ContentIcon = (props) => <Icon component={ContentSvg} {...props} />;
const LocationTypeIcon = (props) => (
  <Icon component={LocationTypeSvg} {...props} />
);
const SetupIcon = (props) => <Icon component={SetupSvg} {...props} />;
const AuditEntityIcon = (props) => (
  <Icon component={EntityMainSvg} {...props} />
);
const RoleMasterIcon = (props) => <Icon component={RoleMasterSvg} {...props} />;
const UserIcon = (props) => <Icon component={UserSvg} {...props} />;
const ScoringIcon = (props) => <Icon component={ScoringSvg} {...props} />;
const QuestionIcon = (props) => <Icon component={QuestionSvg} {...props} />;
const AuditTypeIcon = (props) => <Icon component={AuditTypeSvg} {...props} />;
const EntityIcon = (props) => <Icon component={EntitySvg} {...props} />;
const LocationMasterIcon = (props) => (
  <Icon component={LocationSvg} {...props} />
);
const MasterMenuIcon = (props) => <Icon component={MasterSvg} {...props} />;
const LocationIcon = (props) => <Icon component={HeartSvg} {...props} />;
const FoodIcon = (props) => <Icon component={FoodSvg} {...props} />;
const PropertyIcon = (props) => <Icon component={PropertySvg} {...props} />;
const CheckListIcon = (props) => <Icon component={CheckListSvg} {...props} />;
const SecurityIcon = (props) => <Icon component={SecuritySvg} {...props} />;
const ReportIcon = (props) => <Icon component={Reportsvg} {...props} />;
// const LocationTypeIcon = (props) => <Icon component={Location} {...props} />;

function Sidenav({ color }) {

  const [openKeys, setOpenKeys] = React.useState([]);

  const [subMenuKeys, setSubMenuKeys] = React.useState("");
  const { pathname } = useLocation();
  const history = useHistory();
  const page = pathname.replace("/", "");
  const [current, setCurrent] = React.useState("dashboard");
  const [DynamicMenu, setDynamicMenu] = React.useState([])
  const [roleMenu1, setRoleMenu] = useState(
    sessionStorage.getItem("Role_Menu")
  );
  const menuData1 = roleMenu1.replace(/\\/g, "");
  const menuData2 = menuData1.substring(16, menuData1.length - 3);
  const menuData3 = "[" + menuData2 + "]";
  const menuData4 = JSON.parse(menuData3);
  //console.log(menuData4)


  // const menus = [
  //   "Dashboard",
  //   "Master",
  //   "Location",
  //   "Entity content",
  //   "Check list type",
  //   "Check list sub type",
  //   "Questions",
  //   "Scoring",
  //   "User",
  //   "Setup",
  //   "Role master",
  //   "Check list entity",
  //   "Menu",
  //   "Location type",
  //   "Content",
  //   "Reports",
  //   "Food entity",
  //   "Property entity",
  //   "DM check list entity",
  //   "Security entity",
  // ];

  // function checkRole(value) {
  //   let isRolePresent = menus.find((item) => item === value);
  //   if (isRolePresent) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const Logoutfunc = () => {
    sessionStorage.removeItem("Audit_user");
    sessionStorage.removeItem("Token");
    history.push("/");
  };

  const { SubMenu } = Menu;
  // console.log(items);
  const dashboard = [
    <svg
      width="30"
      height="25"
      viewBox="1 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
      // fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
      // fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
      // fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="30"
      height="25"
      viewBox="1 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="30"
      height="25"
      viewBox="1 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const userMaster = [
    <svg
      width="30"
      height="25"
      viewBox="1 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
      />
    </svg>,
  ];
  const Store = [
    <svg
      width="30"
      height="25"
      viewBox="1 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"
      />
    </svg>,
  ];
  const AuditEntity = [
    <svg
      width="30"
      height="25"
      viewBox="1 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
      />
      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
    </svg>,
  ];
  const Audittype = [
    <svg
      width="30"
      height="25"
      viewBox="1 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
      />
      <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
    </svg>,
  ];

  const iconStyle = {
    marginTop: "5px",
    marginLeft: "5px",
    fontSize: "30px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",

  };


  const iconDashBoardStyle = {
    marginTop: "5px",
    marginLeft: "15px",
    fontSize: "30px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",
  };

  const iconSubStyle = {
    marginLeft: "5px",
    fontSize: "20px",
    backgroundColor: "#064785",
    borderRadius: "5px",
    padding: "2px",
  };

  // const data = [
  //   {
  //     menu: {name:"Dashboard", link:"/admin/dashboard",icon:AppstoreOutlined}
  //   },
  //   {
  //     menu: {name:"Setup",link:"/admin/store", icon:AppstoreOutlined},
  //     submenu1: {name:"Store",link:"/admin/store", icon:AppstoreOutlined},
  //     submenu2: {name:"Audit type",link:"/admin/auditentity", icon:AppstoreOutlined},
  //     submenu3: {name:"Audit entity",link:"/admin/audittype", icon:AppstoreOutlined}
  //   },
  //   {
  //     menu: {name:"Tables", link:"/admin/tables",icon:AppstoreOutlined}
  //   },
  //   {
  //     menu: {name:"Billing",link:"/admin/billing", icon:AppstoreOutlined}
  //   },
  //   {
  //     menu: {name:"Users",link:"/admin/user", icon:AppstoreOutlined}
  //   },
  // ]

  // const rtl = [
  //   <svg
  //     width="20"
  //     height="20"
  //     viewBox="0 0 20 20"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     key={0}
  //   >
  //     <path
  //       fillRule="evenodd"
  //       clipRule="evenodd"
  //       d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z"
  //       fill={color}
  //     ></path>
  //   </svg>,
  // ];

  // const profile = [
  //   <svg
  //     width="20"
  //     height="20"
  //     viewBox="0 0 20 20"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     key={0}
  //   >
  //     <path
  //       fillRule="evenodd"
  //       clipRule="evenodd"
  //       d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
  //       fill={color}
  //     ></path>
  //   </svg>,
  // ];

  // const signin = [
  //   <svg
  //     width="20"
  //     height="20"
  //     viewBox="0 0 20 20"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     key={0}
  //   >
  //     <path
  //       fillRule="evenodd"
  //       clipRule="evenodd"
  //       d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
  //       fill={color}
  //     ></path>
  //   </svg>,
  // ];

  // const signup = [
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="14"
  //     height="14"
  //     viewBox="0 0 14 14"
  //     key={0}
  //   >
  //     <path
  //       d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
  //       transform="translate(4 4)"
  //       fill={color}
  //     />
  //     <path
  //       d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
  //       fill={color}
  //     />
  //   </svg>,
  // ]
  // useEffect(() => {
  //   if (menus.find((items) => items === "Dashboard")) {
  //     history.push("/admin/dashboard");
  //   } else if (menus.find((items) => items === "Master")) {
  //     history.push("/admin/location");
  //   } else if (menus.find((items) => items === "Setup")) {
  //     history.push("/admin/role_master");
  //   } else if (menus.find((items) => items === "Reports")) {
  //     history.push("/admin/food_entity");
  //   } else {
  //     history.push("/admin/dashboard");
  //   }
  // }, []);

  const handleclick = (e) => {

    setSubMenuKeys(e.keyPath[0])
    routeSwitch(e.key, e.keyPath[0])
    // routeSwitch()
    // switch (e.key) {
    //   case "dashboard":
    //     history.push("/admin/dashboard");
    //     routeSwitch(e.key)
    //     break;
    //   case "location":
    //     history.push("/admin/location");
    //     break;
    //   case "check_list_type":
    //     history.push("/admin/check_list_type");
    //     break;
    //   case "check_list_sub_type":
    //     history.push("/admin/check_list_sub_type");
    //     break;
    //   case "questions":
    //     history.push("/admin/questions");
    //     break;
    //   case "scoring":
    //     history.push("/admin/scoring");
    //     break;
    //   case "user":
    //     history.push("/admin/user");
    //     break;
    //   case "role_master":
    //     history.push("/admin/role_master");
    //     break;
    //   case "check_list_entity":
    //     history.push("/admin/check_list_entity");
    //     break;
    //   case "menu":
    //     history.push("/admin/menu");
    //     break;
    //   case "location_type":
    //     history.push("/admin/location_type");
    //     break;
    //   case "content":
    //     history.push("/admin/content");
    //     break;
    //   case "entity_content":
    //     history.push("/admin/entity_content");
    //     break;
    //   case "food_entity":
    //     history.push("/admin/food_entity");
    //     break;
    //   case "property_entity":
    //     history.push("/admin/property_entity");
    //     break;
    //   case "dm_check_list_entity":
    //     history.push("/admin/dm_check_list_entity");
    //     break;
    //   case "security_entity":
    //     history.push("/admin/security_entity");
    //     break;
    //   default:
    //     break;
    // }
  };

  const routeSwitch = (route, mainRoute) => {
    const userString = sessionStorage.getItem("Audit_user");
    const user = JSON.parse(userString);
    //  console.log(history);
    if (mainRoute !== "master" && mainRoute !== "setup" && mainRoute !== "reports") {
      // switch (user.roleUID) {
      //   case "1":
      //     {
      //       if (mainRoute === "master") {
      //         history.push("/admin/master/location");
      //       } else if (mainRoute === "setup") {
      //         history.push("/admin/master/entity_content");
      //       } else {
      //         history.push("/admin/master/food_entity");
      //       }
      //       break;
      //     }

      //   case "8":
      //     {
      //       if (mainRoute === "master") {
      //         history.push("/admin/master/location");
      //       } else if (mainRoute === "setup") {
      //         history.push("/admin/master/entity_content");
      //       } else {
      //         history.push("/admin/master/food_entity");
      //       }
      //       break;
      //     }
      //   case "9":
      //     {
      //       if (mainRoute === "master") {
      //         history.push("/admin/master/location");
      //       } else if (mainRoute === "setup") {
      //         history.push("/admin/master/entity_content");
      //       } else {
      //         history.push("/admin/master/property_entity");
      //       }
      //       break;
      //     }
      //   case "10":
      //     {
      //       if (mainRoute === "master") {
      //         history.push("/admin/master/location");
      //       } else if (mainRoute === "setup") {
      //         history.push("/admin/master/entity_content");
      //       } else {
      //         history.push("/admin/master/dm_check_list_entity");
      //       }
      //       break;
      //     }
      //   case "11":
      //     {
      //       if (mainRoute === "master") {
      //         history.push("/admin/master/location");
      //       } else if (mainRoute === "setup") {
      //         history.push("/admin/master/entity_content");
      //       } else {
      //         history.push("/admin/master/security_entity");
      //       }
      //       break;
      //     }
      //   default:
      //     break;
      // }
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

  // setRoleUser(user)

  return (
    <>
      <div className="brand">
        <img
          src={ikea}
          alt=""
          style={{
            height: "60px",
            // borderRadius: "20px",
            // boxShadow: "0px 2px 5px 2px",
            // boxShadow: "0px -5px 10px 0px rgba(0, 0, 0, 0.5)"
          }}
        />
      </div>
      <hr />
      <div
        style={{
          width: 200,
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
            >
              {q?.subMenu.length === 0 && (
                <>

                  {/* <div className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} /> */}
                  <MenuItem style={{
                    fontSize: "23px",
                    bottom: "5px",
                    position: "relative",
                    color: "black",
                    marginLeft: "10px"
                  }} key={q.menuLink}
                  //  icon={< a className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} />}
                  ><Icon dangerouslySetInnerHTML={{ __html: q.menuIcon }} style={iconDashBoardStyle} theme="outlined" /> {q.menuName}</MenuItem>
                </>
              )}
              {q?.subMenu.length !== 0 && (
                <>


                  <SubMenu
                    key={q.menuLink}
                    title={
                      <MenuItem style={{
                        fontSize: "23px",
                        bottom: "5px",
                        position: "relative",
                        color: "black",
                      }}
                      ><Icon dangerouslySetInnerHTML={{ __html: q.menuIcon }} style={iconStyle} theme="outlined" /> {q.menuName}</MenuItem>
                    }
                  >
                    {q.subMenu.map((e, t) => (

                      // <>

                      //   <div dangerouslySetInnerHTML={{ __html: e.menuIcon }} />
                      //   <MenuItem key={e.menuLink}>{e.menuName}</MenuItem>
                      // </>
                      <>

                        {/* <div className="icons" dangerouslySetInnerHTML={{ __html: q.menuIcon }} /> */}
                        < MenuItem style={{
                          fontSize: "19px",
                          bottom: "5px",
                          position: "relative",
                          color: "black",
                          left: "5px",
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
      {/* <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/admin/dashboard">
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/admin/tables">
            <span className="label">Tables</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/admin/tables">
            <Menu theme="light" mode="vertical">
              <Menu.Item key="s-1">
                <NavLink to="/admin/tables">
                  <span className="label">audit 1</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="s-2">
                <NavLink to="/admin/tables">
                  <span className="label">audit 2</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </NavLink>
        </Menu.Item>
      </Menu> */}
    </>
  );
}
{
  /* <Menu mode="inline" style={{ width: 256 }}>
      {data.map((each) => (
        <SubMenu  key={each.menu.name} icon={<each.menu.icon/>} title={each.menu.name}>
          {Object.entries(each).length !== 1 ? (Object.entries(each).map(
            ([key, value]) =>
              key !== "menu" ? (
                <Menu.Item
                  onClick={() => console.log(value)}
                  key={each.menu.name + "-" + key}
                >
                       {<value.icon/>}{value.name}
                </Menu.Item>
              ):null
          )):null}
        </SubMenu>
      ))}
    </Menu> */
}
{
  /* <div className="brand">
        <img src={ikea} alt="" style={{
          height: "110px", borderRadius: "20px",
          boxShadow: "0px 2px 5px 2px"
        }} />
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/admin/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/admin/tables">
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Tables</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/admin/billing">
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Billing</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/admin/user">
            <span
              className="icon"
              style={{
                background: page === "userMaster" ? color : "",
              }}
            >
              {userMaster}
            </span>
            <span className="label">User Master</span>
          </NavLink>
        </Menu.Item> */
}
{
  /* <Menu.Item key="5">
          <NavLink to="/admin/store">
            <span
              className="icon"
              style={{
                background: page === "Store" ? color : "",
              }}
            >
              {Store}
            </span>
            <span className="label">Store Master</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/admin/auditentity">
            <span
              className="icon"
              style={{
                background: page === "auditentity" ? color : "",
              }}
            >
              {AuditEntity}
            </span>
            <span className="label">Auditentity Master</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/admin/audittype">
            <span
              className="icon"
              style={{
                background: page === "audittype" ? color : "",
              }}
            >
              {Audittype}
            </span>
            <span className="label">Audittype Master</span>
          </NavLink>
        </Menu.Item> */
}
{
  /* <Menu.Item key="4">
          <NavLink to="/rtl">
            <span
              className="icon"
              style={{
                background: page === "rtl" ? color : "",
              }}
            >
              {rtl}
            </span>
            <span className="label">RTL</span>
          </NavLink>
        </Menu.Item> */
}
{
  /* <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item> */
}
{
  /* <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/sign-in">
            <span className="icon">{signin}</span>
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/sign-up">
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */
}
{
  /* </Menu> */
}
//     </>
//   );
// }

export default Sidenav;
