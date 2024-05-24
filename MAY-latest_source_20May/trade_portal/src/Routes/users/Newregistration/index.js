/**
 * User Management Page
 */
/* import React, { useEffect, useState, useRef } from "react"; */
import { Helmet } from "react-helmet";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "@material-ui/core";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { NotificationManager } from "react-notifications";
import Avatar from "@material-ui/core/Avatar";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { MultiComboInput } from 'smart-webcomponents-react/multicomboinput';
// api
import api from "Api";
import {
  apiPost,
  apiFormDatePost,
  setLoggedInuser,
} from "../../../Api/apiCommon";
// delete confirmation dialog
//import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
// add new user form
//import AddNewUserForm from "./AddNewUserForm";
// update user form
//import UpdateUserForm from "./UpdateUserForm";
// page title bar
//import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// intl messages
//import IntlMessages from "Util/IntlMessages";
// rct card box
//import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
// rct section loader
//import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


import React, { useState, useEffect } from "react";
//import Button from "@material-ui/core/Button";
/* import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material"; */
import { MenuItem, TextField, Select, } from "@mui/material";
import { Box } from "@mui/material";
//import { Route, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from '../../../baseurl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Bars } from "react-loader-spinner";
import { format } from 'date-fns';
/* import Grid from '@mui/material/Grid'; */
/* import Grid from '../node_modules/smart-webcomponents-react'; */
/* import SmartGrid from './SmartGrid'; */
import { Grid } from 'smart-webcomponents-react/grid';
//import { Button } from 'smart-webcomponents-react/button';
import 'smart-webcomponents-react/source/styles/smart.default.css';
// import { Input } from 'smart-webcomponents-react/input';
import "../../../style.css"
//import JSZip from 'jszip';
// //import ReactDOM from "react-dom";
// import {
//   Formik,
//   Form as FormikForm,
//   Field,
//   ErrorMessage,
//   useFormikContext,
//   useField,
//   useFormik
// } from 'formik';



export default function CreditDebit(props) {
  const [fromDate, setFromDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [CustomerList, setCustomerList] = useState([]);
  const [data, setData] = useState([]);
  const [custCode, setCustCode] = useState('');
  const [reqType, setReqType] = useState('');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" })
  const multicomboinput = React.createRef();
  const gridRef = React.useRef();
  const [validationMessage, setValidationMessage] = useState("")
  /* const gridRef = useRef(); */

  /* const handleXlsxBtnClick = () => {
    gridRef.current.exportData('xlsx')
  }; */

  /* const handleXlsxBtnClick = () => {
    if (gridRef.current && typeof gridRef.current.exportData === 'function') {
        gridRef.current.exportData('xlsx');
    } else {
        console.error("gridRef or exportData is undefined");
    } 
    if (gridRef.current) {
      gridRef.current.exportData('pdf');
  } else {
      console.error("gridRef is undefined");
  }
}; */

  const initialValues = {
    customerCode: "",
    fromDate: "",
    toDate: "",
    reqType: ""
  }


  useEffect(() => {
    // window.menuFunctionVariable.init();
    // window.addEventListener("resize", async function () {
    //   var innerWidth = window.innerWidth ? window.innerWidth : null;
    //   if (innerWidth != null) {
    //     if (innerWidth >= 992) {
    //       document.getElementById("navigation").style.display = "block";
    //     } else if (innerWidth <= 990) {
    //       document.getElementById("navigation").style.display = "none";
    //     }
    //   }
    // });
    getCustomerList();
    /* const that = this;
    var result = that.getDetails();
    result.subscribe(response => {
      that.dataSource = new Smart.DataAdapter({
        dataSource: response.data.data
      });
    }); */
    //getDetails();
    // registration();,
  }, []);

  const reqTypeValues = [
    {
      label: "Credit",
      value: 0,
    },
    {
      label: "Debit",
      value: 1,
    },

  ];

  const getFile = (name, type) => {
    async function fetchFile(fileName, fileType) {
      const returnapi = await axios.get(baseURL + "/api/downloadfile?fileName=" + fileName + "&filePath=" + fileType, { responseType: 'arraybuffer' });
      const file = new File([returnapi.data], fileName, {
        type: 'application/pdf'
      });
      function download() {
        if (file.size == 0) {
          alert("Sorry, file not present to download !")
        } else {
          const link = document.createElement('a')
          const url = window.URL.createObjectURL(file)
          link.href = url
          link.download = file.name
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }
      }
      download();
    }
    fetchFile(name, type);
  }

  const columns = [
    { label: 'Customer Code', dataField: 'CustCode', width: '15%' },
    { label: 'Customer Name', dataField: 'CustomerName', width: '20%' },
    { label: 'Credit/Debit No', dataField: 'CrNoteNo', width: '20%' },
    { label: 'Credit/Debit Date', dataField: 'creditDebitDate', width: '15%' },
    { label: 'Doc Ref', dataField: 'DocReference', width: '15%' },
    { label: 'Type', dataField: 'type', width: '5%' },
    {
      label: 'Download', dataField: 'BlobFileName', align: 'left', cellsAlign: 'left', width: '10%',
      template: (formatObject) => {
        const downloadButton = document.createElement('span');
        downloadButton.className = "downBtn";
        downloadButton.innerHTML = 'Download';
        const val = formatObject.value;
        const type = (formatObject.row.data['type'] == 'C') ? 'CNotes' : 'DNotes';
        downloadButton.addEventListener('click', () => {
          getFile(val, type);
        });
        const template = document.createElement('div');
        template.style.marginLeft = "30px";
        template.appendChild(downloadButton);
        formatObject.template = template;
      }
    }
  ]

  const getCustomerList = async () => {
    try {
      const returnapi = await axios.post(`${baseURL}/api/getcustomerlist`, { userUID: localStorage.getItem('userUID') });
      if (!returnapi.data.error) {
        let array = []
        let obj = {}
        for (var name_id of returnapi.data.data) {
          Object.assign(obj, { value: name_id.CustCode, label: name_id.CustCode + ' ' + name_id.CustName });
          // Object.assign(obj, { value: name_id.CustCode, label: name_id.CustCode + name_id.CustName });
          array.push({ ...obj })
        }
        console.log(array)
        setCustomerList(array);
      }

    } catch (error) {
      console.log(error);
    }
  };
  const customerCode = () => {
    if (localStorage.getItem('roleUID') !== '1') {
      return multicomboinput.current.selectedValues
    } else if (CustomerList.length > 0) {
      return [CustomerList[0].value]
    } else {
      return null
    }
  }
  const getDetails = () => {
    if (multicomboinput?.current?.selectedValues.length === 0) {
      setNorecordFound({ display: "block", marginTop: "5rem" })
      setValidationMessage("customer name is required")
      return
    } else if (reqType === "") {
      setValidationMessage("Type is required")
      setNorecordFound({ display: "block", marginTop: "5rem" })
      return
    } else {
      setIsgetRowData(true);
      console.log(fromDate);
      async function fetchData() {
        try {
          const returnapi = await axios.post(`${baseURL}/api/getcreditdebitnote`, {
            customerCode: customerCode(),
            fromDate: fromDate,
            toDate: toDate,
            reqType: reqType,
            userUID: localStorage.getItem("userUID")
          });
          console.log(returnapi);
          if (returnapi?.data.data) {
            setGridData(returnapi?.data.data);
            setIsgetRowData(false)
            if (returnapi?.data.data.length == 0) {
              setValidationMessage("No records found")
              setNorecordFound({ display: "block", marginTop: "5rem" })
            }
          } else {
            setGridData([])
            setIsgetRowData(false)
            setNorecordFound({ display: "block", marginTop: "5rem" })
          }
        } catch (error) {
          setNorecordFound({ display: "none", marginTop: "5rem" })
          setIsgetRowData(false)
          console.log("Error", error);
        }
      }
      fetchData();
    }
  }
  const behavior = {
    columnResizeMode: 'growAndShrink'
  }
  const sorting = {
    enabled: true
  }
  return (
    <div className="user-management">
      <h3 style={{
        marginTop: "-20px",
        padding: "5px 5px 0px 5px",
        borderRadius: "5px"
      }}> Credit & Debit Notes</h3>
      <div className="top-filter clearfix p-5">
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Customer Name</Label>
          {localStorage.getItem('roleUID') !== '1' ? (<><MultiComboInput ref={multicomboinput} dataSource={CustomerList} dropDownButtonPosition="right" selectAll animation='advanced'
            placeholder="Select / Search customer name"
            inputTagsMode="one"
            inputPurpose="on"
            filterable
          ></MultiComboInput></>) : (<><Input type="select" name="select">
            {CustomerList.map((option, i) => (
              <option key={i} value={option.value}>{option.label}</option>
            ))}
          </Input>
          </>)}

        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="startDate">From Date</Label>
          <Input type="date" name="fromDate" id="fromDate"
            value={fromDate}
            onChange={(e) => {
              console.log((e.target.value));
              setFromDate((e.target.value));
            }} />
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="toDate">To Date</Label>
          <Input type="date" name="toDate" id="toDate"
            value={toDate}
            onChange={(e) => {
              console.log((e.target.value));
              setToDate((e.target.value));
            }} />
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Type</Label>
          <div className="app-selectbox-sm">
            <Input type="select" name="select" id="Select-2" onChange={(e) => {
              setGridData([])
              setReqType(e.target.value);
              console.log(e.target.value)
            }}>
              <option value={0}>Select Type</option>
              {reqTypeValues.map((option) => (
                <option key={option.value} value={option.label}>{option.label}</option>

              ))}
            </Input>
          </div>
        </FormGroup>
        <FormGroup className="mb-5">
          <Label className="d-block">&nbsp;</Label>
          <Button className="btn-primary text-white" onClick={getDetails}>Get Details</Button>
        </FormGroup>
      </div>
      {/* <div style={{ height: "1px", width: "100%", backgroundColor: "#9f538675" }} /> */}
      <div className="top-filter clearfix p-6">
        {!isgetRowData ? (<>
          {gridData && gridData.length > 0 ? (<>    <Grid ref={gridRef}
            // style={{
            //   height: "15.5rem",
            //   width: "100%",
            //   overflowX: "auto"
            // }}
            dataSource={gridData}
            columns={columns}
            behavior={behavior}
            sorting={sorting}
            id="creditBeditGrid"
          >
          </Grid>
          </>) : (<div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
            <h3 style={noRecordFound}>{validationMessage}</h3></div>)}
        </>) : <div className="spinner_SVG"> <Bars
          className="spinner_position"
          height="5vh"
          width="5vw"
          color="#1197f2"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div>}
        {/*  <div className="option">
					<i id="pdfBtn" className="zmdi zmdi-widgets" onClick={handleXlsxBtnClick}>Export to Excel</i>
				</div> */}
      </div>
    </div>
  );
}
