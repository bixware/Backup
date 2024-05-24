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

import {
  Card,
  Col,
  Row,
  Typography,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../components/chart/EChart";
// import LineChart from "../components/chart/LineChart";

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";
import card from "../assets/images/info-card-1.jpg";
import { apiPost } from "../api/apiCommon";
import config from "../config";
import { useState, useEffect, useRef } from "react";
import baseURl from "../base";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { apiPost } from "../../api/apiCommon"
// import config from "../../config"
// import { useState, useEffect } from 'react';
// import baseURl from "../../base"
// import { Button } from 'antd';
// import { Col, Row } from "reactstrap";
// import { Col, Menu, Row } from 'antd';
// import EditOutlined from "@ant-design/icons"
import { Modal } from "antd";
// import { Checkbox, Form, Input } from 'antd';
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
import Switch from "@mui/material/Switch";
// import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteSweepSharpIcon from "@mui/icons-material/DeleteSweepSharp";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { TextField,Select} from '@mui/material';
import { MenuItem, TextField, Select } from "@mui/material";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { BarChart, CartesianGrid, Bar } from "recharts";
import Tooltip from '@mui/material/Tooltip';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from "react-to-print";
import {
  PieChart, Pie, Legend, Cell, ResponsiveContainer, Label
} from "recharts";
import moment from "moment";
import { useCallback } from "react";
import Chart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { login } from '../Features/UserGlobe'
import "../Style.css";

// import { Card } from 'antd';
toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});

function Dashboard() {
  const dispatch = useDispatch()
  const { Title, Text } = Typography;
  const gridRef = useRef();
  // const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);
  const [gridApi, setgridApi] = useState(null);
  const [rowData, setrowData] = useState(null);
  const [allContent, setAllContent] = useState([]);
  const userString = sessionStorage.getItem("Audit_user");
  const user = JSON.parse(userString);
  const [totalAudits, setTotalAudits] = useState([]);
  const [totalLocations, setTotalLocations] = useState([]);
  const [totalAuditEntity, setTotalAuditEntity] = useState([]);
  const [totalAuditors, setTotalAuditors] = useState([]);
  const [totalStoreList, setTotalStoreList] = useState([]);
  const [yAxisMaxNumber, setyAxisMaxNumber] = useState(0);

  const propertyChartOptions = {
    // Define your chart options here
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },
    series: [
      {
        name: "Total Audits",
        type: "column",
        data: totalAudits
      },
      // {
      //   name: "Total Locations",
      //   type: "column",
      //   data: totalLocations
      // },
      {
        name: "Total Audit Entity",
        type: "column",
        data: totalAuditEntity
      },
      {
        name: "Total Auditors",
        type: "column",
        data: totalAuditors
      }
    ],
    xaxis: {
      labels: {
        rotate: -45,
        show: true,
        trim: true,
        rotateAlways: true,
        offsetY: 5,
      },
      categories: totalStoreList,
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8
      }
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: yAxisMaxNumber
    }
  };

  const storeAuditPieChartOptions = {
    series: totalAudits,
    options: {
      // chart: {
      //   width: '100%',
      //   type: 'pie',
      // },
      labels: totalStoreList,
      // theme: {
      //   monochrome: {
      //     enabled: true
      //   }
      // },
      // plotOptions: {
      //   pie: {
      //     dataLabels: {
      //       offset: -5
      //     }
      //   },
      //   dataLabels: {
      //     formatter(val, opts) {
      //       const name = opts.w.globals.labels[opts.seriesIndex]
      //       return [name, val.toFixed(1) + '%']
      //     }
      //   },
      //   legend: {
      //     show: false
      //   }
      // },


    }
  }



  async function GetAllContentList() {
    let data = {
      userUID: user.userUID,
    };
    const response = await apiPost(baseURl + config.GetAllContent, data);
    try {
      if (response.data.status === true) {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      let errorMessage = []
      errorMessage = Promise.resolve(error)
      // console.log(errorMessage)
      return errorMessage
    }
  }


  const gridStyle = {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#dadada",
    // color: "grey",
  };

  const gridStyle2 = {
    width: "50%",
    backgroundColor: "#dadada",
    justifyContent: "center",
    display: "flex"
    // color: "grey",
  };
  const gridStyle3 = {
    width: "100%",
    backgroundColor: "#dadada",
    justifyContent: "center",
    display: "flex"
    // color: "grey",
  };


  useEffect(() => {

    (async () => {
      let data = {
        userUID: user.userUID,
      };
      const response = await apiPost(baseURl + config.Getdashboardchart, data);
      // console.log(response.data)
      if (response?.data?.data.length > 0) {
        let totalAuditsArr = [];
        let totalAuditorsArr = [];
        let totalLocationsArr = [];
        let totalAuditEntityArr = [];
        let totalStoreArr = [];
        let largestNumber = 0;
        response?.data?.data?.forEach((store, i) => {
          totalAuditsArr.push(parseInt(store.auditDetails[0].TotalAudits));
          totalAuditorsArr.push(parseInt(store.auditDetails[0].TotalAuditors));
          totalLocationsArr.push(parseInt(store.auditDetails[0].TotalLocations));
          totalAuditEntityArr.push(parseInt(store.auditDetails[0].TotalAuditEntity));
          totalStoreArr.push(store.storeName);
          largestNumber = Math.max(largestNumber, parseInt(store.auditDetails[0].TotalAudits), parseInt(store.auditDetails[0].TotalAuditors), parseInt(store.auditDetails[0].TotalLocations), parseInt(store.auditDetails[0].TotalAuditEntity))
        })
        // console.log(totalStoreArr)
        setTotalAudits(totalAuditsArr);
        setTotalAuditors(totalAuditorsArr);
        setTotalAuditEntity(totalAuditEntityArr);
        setTotalLocations(totalLocationsArr);
        setTotalStoreList(totalStoreArr);
        setyAxisMaxNumber(largestNumber + 5);

      }


    })();

    (async () => {
      const newData = await GetAllContentList();
      // console.log(newData)
      setAllContent(newData.data);
      setrowData(newData.data.recentAuditDetails);
    })();
  }, []);

  const onGridReady = (params) => {
    setgridApi(params.api);
    params.api.sizeColumnsToFit();
  };
  const [columnDef, setcolumnDef] = useState([
    {
      headerName: "Country",
      field: "country",
      minWidth: 90,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Store Name",
      field: "storeName",
      minWidth: 90,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Check list  Status",
      field: "auditStatus",
      minWidth: 90,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "First Name",
      field: "firstName",
      minWidth: 90,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Last Name",
      field: "lastName",
      minWidth: 50,
      cellStyle: { textAlign: "left" },
    },

  ]);
  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Today’s Users",
      title: "3,200",
      persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      icon: cart,
      bnb: "bnb2",
    },
  ];

  const list = [
    {
      img: ava1,
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava2,
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava3,
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava4,
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava5,
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },

    {
      img: ava6,
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      ),
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  // line chart
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };

  const data = [];

  const rand = 300;
  for (let i = 0; i < 7; i++) {
    let d = {
      year: 2000 + i,
      value: Math.random() * (rand + 50) + 100
    };

    data.push(d);
  }
  // bar chart
  const chartData = [
    { x: 5, y: 1508 },
    { x: 6, y: 107 },
    { x: 7, y: 325 },
    { x: 8, y: 439 },
    { x: 9, y: 982 },
    { x: 10, y: 1562 },
    { x: 11, y: 50 }
  ];

  const Label = props => {
    const { x, y, value } = props;

    return (
      <text
        x={x}
        y={y}
        dx={"2%"}
        dy={"-1%"}
        fontSize="15"
        fontWeight="bold"
        fill={"#181818"}
        textAnchor="left"
      >
        {value}
      </text>
    );
  };

  // pie chart
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // const data01 = [
  //   { name: "Active Campagins", value: 90 },
  //   { name: "Inactive Campagins", value: 25 },
  //   { name: "ICPs with no campagins", value: 10 }
  // ];

  // const Bullet = ({ backgroundColor, size }) => {
  //   return (
  //     <div
  //       className="CirecleBullet"
  //       style={{
  //         backgroundColor,
  //         width: size,
  //         height: size
  //       }}
  //     ></div>
  //   );
  // };

  // const CustomizedLegend = (props) => {
  //   const { payload } = props;
  //   return (
  //     <ul className="LegendList">
  //       {payload.map((entry, index) => (
  //         <li key={`item-${index}`}>
  //           <div className="BulletLabel">
  //             <Bullet backgroundColor={entry.payload.fill} size="10px" />
  //             <div className="BulletLabelText">{entry.value}</div>
  //           </div>
  //           <div style={{ marginLeft: "20px" }}>{entry.payload.value}</div>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  // const CustomLabel = ({ viewBox, labelText, value }) => {
  //   const { cx, cy } = viewBox;
  //   return (
  //     <g>
  //       <text
  //         x={cx}
  //         y={cy}
  //         className="recharts-text recharts-label"
  //         textAnchor="middle"
  //         dominantBaseline="central"
  //         alignmentBaseline="middle"
  //         fontSize="15"
  //       >
  //         {labelText}
  //       </text>
  //       <text
  //         x={cx}
  //         y={cy + 20}
  //         className="recharts-text recharts-label"
  //         textAnchor="middle"
  //         dominantBaseline="central"
  //         alignmentBaseline="middle"
  //         fill="#0088FE"
  //         fontSize="26"
  //         fontWeight="600"
  //       >
  //         {value}
  //       </text>
  //     </g>
  //   );
  // };

  const data01 = [
    {
      name: "Liquide Vermogen",
      value: 6000,
      fill: "#3333FF"
    },
    {
      name: "Pensioenopbouw",
      value: 4000,
      fill: "#FF9933"
    },
    {
      name: "Onroerend",
      value: 10000,
      fill: "#FF3333"
    },
    {
      name: "Zakelijk",
      value: 12000,
      fill: "#00FF00"
    }
  ];

  const renderLabel = useCallback((piePiece) => {
    return piePiece.name;
  }, []);

  // dual line chart

  const data1 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];


  const adminChartData = [
    {
      "storeName": "Muscat",
      "auditDetails": [
        {
          "TotalAudits": "0",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Mall of Arabia",
      "auditDetails": [
        {
          "TotalAudits": "0",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Cairo Festival City",
      "auditDetails": [
        {
          "TotalAudits": "1",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "1",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Doha Festival City",
      "auditDetails": [
        {
          "TotalAudits": "5",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "3",
          "revrequestedAudits": "2",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Central Unit",
      "auditDetails": [
        {
          "TotalAudits": "0",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Al Wahda",
      "auditDetails": [
        {
          "TotalAudits": "0",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Al Ain",
      "auditDetails": [
        {
          "TotalAudits": "0",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Abu Dhabi",
      "auditDetails": [
        {
          "TotalAudits": "0",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Jebali Ali",
      "auditDetails": [
        {
          "TotalAudits": "0",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "0",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    },
    {
      "storeName": "Dubai Festival City",
      "auditDetails": [
        {
          "TotalAudits": "1",
          "TotalLocations": "10",
          "TotalAuditEntity": "1",
          "TotalAuditors": "4",
          "inprogressAudits": "1",
          "revrequestedAudits": "0",
          "offlineAudits": null,
          "onlineAudits": null,
          "revCompletedAudits": "0",
          "completedAudits": "0"
        }
      ]
    }
  ]

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);


  const reactToPrintContent = React.useCallback(() => {
    return gridRef.current;
  }, [gridRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Score",
    removeAfterPrint: true
  });

  return (
    <>
      <div className="layout-content" style={{ marginTop: "5px" }}>
        <Card>

          <Card.Grid style={gridStyle}>
            {/* <BarChart width={500} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                tick={{ fontSize: 8 }}
                dataKey="x"
                type="number"
                domain={[4.5, 13.5]}
                ticks={[5, 6, 7, 8, 9, 10, 11, 12, 13]}
              />
              <YAxis />
              <Bar dataKey="y" label={<Label />} fill="#8884d8" />
            </BarChart> */}
            <label style={{ color: "black" }}>Store based total reports</label>
            <Chart
              options={propertyChartOptions}
              series={propertyChartOptions.series}
              type="line"
              height={300}
            />
          </Card.Grid>

          <Card.Grid style={gridStyle3}>
            {/* <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    innerRadius={80}
                    outerRadius={100}
                  >
                    {data01.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    <Label
                      content={<CustomLabel labelText="ICPs" value={15} />}
                      position="center"
                    />
                  </Pie>
                  <Legend content={<CustomizedLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div> */}
            {/* <span>Total check list Entity </span> {allContent.TotalAuditEntity}{" "} */}
            {/* <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart style={{ cursor: "pointer" }}>
                  <Pie
                    dataKey="value"
                    data={data01}
                    label={renderLabel}
                    cx="50%"
                    cy="50%"
                    outerRadius={"75%"}
                    nameKey="name"
                  // activeShape={(props) => renderActiveShape(props, showSubchart)}
                  // onMouseEnter={onMouseOver}
                  // onMouseLeave={onMouseLeave}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div> */}
            <label style={{ color: "black" }}>Store based total check list reports</label>

            <Chart
              options={{
                labels: totalStoreList,
                chart: { sparkline: { enabled: false } }
              }}
              series={storeAuditPieChartOptions.series}
              type="pie"
              width={500}
            />
          </Card.Grid>
          {/* <Card.Grid style={gridStyle2}>
            <LineChart
              width={500}
              height={300}
              data={data1}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </Card.Grid>
          <Card.Grid style={gridStyle2}>
            <div style={styles}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="value" stroke="white" dot={false} />
                <XAxis dataKey="year" />
                <YAxis />
              </LineChart>
            </div>
          </Card.Grid> */}
        </Card>
        {/* <Row className="rowgap-vbox" gutter={[24, 0]}> */}

        {/* <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} bodyStyle={{backgroundColor: '#0257a7', border: 0,borderRadius:'12px' }} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>Total Audits</span>
                      <Title level={3}>
                       <small>{allContent.TotalAudits}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col> */}
        {/* <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} bodyStyle={{backgroundColor: '#0257a7', border: 0,borderRadius:'12px' }} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>Total Locations</span>
                      <Title level={3}>
                        <small>{allContent.TotalLocations}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">icon</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col> */}
        {/* <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} bodyStyle={{backgroundColor: '#0257a7', border: 0,borderRadius:'12px' }} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>Total Audit Entity</span>
                      <Title level={3}>
                        <small>{allContent.TotalAuditEntity}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">icon</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col> */}
        {/* <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>today</span>
                      <Title level={3}>
                        title<small>persent</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">icon</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col> */}
        {/* </Row> */}
        <div className="form-group" style={{ paddingTop: "6px" }}>
          <Row style={{
            justifyContent: "end",
            display: "flex"
          }}>
            <Col>
              <Tooltip title="Print">
                <IconButton onClick={handlePrint}>
                  <PrintIcon sx={{ color: "#2196f3", fontSize: '33px' }} />
                </IconButton>
              </Tooltip>
              <Button style={{ fontSize: "12px" }}
                type="button" onClick={onBtnExport}>Export as CSV</Button>
            </Col>
          </Row>

        </div>
        <div className="ag-theme-alpine" id="aggridheight">
          <AgGridReact
            ref={gridRef}
            defaultColDef={{
              editable: false,
              // enableRowGroup: true,
              // enablePivot: true,
              enableValue: true,
              sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              filter: "agTextColumnFilter",
              // minWidth: 100,
              cellStyle: { textAlign: "left" },
            }}
            // suppressRowClickSelection={true}
            // groupSelectsChildren={true}
            // debug={true}
            // rowSelection={'multiple'}
            // /*  rowGroupPanelShow={'always'} */
            // pivotPanelShow={'always'}
            // enableRangeSelection={true}
            pagination={true}
            onGridReady={onGridReady}
            columnDefs={columnDef}
            rowData={rowData}
          />
        </div>

        {/* 
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row> */}
        {/* 
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Projects</Title>
                  <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>COMPANIES</th>
                      <th>MEMBERS</th>
                      <th>BUDGET</th>
                      <th>COMPLETION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="uploadfile shadow-none">
                <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to Upload</span>
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                {/* <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline> */}
        {/* <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row> */}

        {/* <Row gutter={[24, 0]}>
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Built by developers</Text>
                      <Title level={5}>Muse Dashboard for Ant Design</Title>
                      <Paragraph className="lastweek mb-36">
                        From colors, cards, typography to complex elements, you
                        will find the full documentation.
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>Work with the best</Title>
                  <p>
                    Wealth creation is an evolutionarily recent positive-sum
                    game. It is all about who take the opportunity first.
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="#pablo">
                    Read More
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;
