/**
 * User Management Page
 */
/* import React, { useEffect, useState, useRef } from "react"; */
import { Helmet } from "react-helmet";
import FormControlLabel from "@material-ui/core/FormControlLabel";
/* import Button from "@material-ui/core/Button"; */
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
import { Form, FormGroup, Label, Input, Row } from "reactstrap";
// api
import api from "Api";
import {
  apiPost,
  apiFormDatePost,
  setLoggedInuser,
} from "../../../Api/apiCommon";
import React, { useState, useEffect, useRef } from "react";
/* import { Form, FormGroup, Label, Row } from "reactstrap"; */
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/material";

import axios from "axios";
import baseURL from '../../../baseurl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { Grid } from 'smart-webcomponents-react/grid';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { Bars } from "react-loader-spinner";
import { MultiComboInput } from 'smart-webcomponents-react/multicomboinput';
import "../../../style.css"

export default function Invoice(props) {
  const [fromDate, setFromDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [CustomerList, setCustomerList] = useState([]);
  const [data, setData] = useState([]);
  const [custCode, setCustCode] = useState('');
  const [lrNo, setLrNo] = useState('');
  const [docNo, setDocNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');

  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" })

  const [validationMessage, setValidationMessage] = useState("")
  const multicomboinput = React.createRef();
  const gridRef = React.useRef();

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

  const initialValues = {
    customerName: "",
    lrNo: "",
    docNo: "",
    invoiceNo: "",
    fromDate: "",
    toDate: ""
  }

  const getFile = (name) => {
    async function fetchFile(fileName) {
      try {
        const returnapi = await axios.get(baseURL + "/api/downloadfile?fileName=" + fileName + "&filePath=Invoice_PDF", { responseType: 'arraybuffer' });
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
      } catch(err) {
        console.log(err);
      }
    }
    fetchFile(name);
  }

  const columns = [
    { label: 'Customer Code', dataField: 'CustomerCode', width: '10%' },
    { label: 'Customer Name', dataField: 'CustomerName', width: '20%' },
    { label: 'LR No', dataField: 'LRNo', width: '15%' },
    { label: 'Doc No', dataField: 'DocNo', width: '15%' },
    { label: 'Invoice No', dataField: 'invoiceNo', width: '20%' },
    { label: 'Invoice Date', dataField: 'invoiceDate', width: '10%' },
    {
      label: 'Download', dataField: 'BlobFileName', align: 'left', cellsAlign: 'left', width: '10%',
      template: (formatObject) => {
        const downloadButton = document.createElement('span');
        downloadButton.className = "downBtn";
        downloadButton.innerHTML = 'Download';
        const val = formatObject.value;
        downloadButton.addEventListener('click', () => {
          getFile(val);
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
          // Object.assign(obj, { value: name_id.CustCode, label: name_id.CustName });
          Object.assign(obj, { value: name_id.CustCode, label: name_id.CustCode + ' ' + name_id.CustName });
          array.push({ ...obj })
        }
        setCustomerList(array);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const customerCode = () => {
    if (localStorage.getItem('roleUID') !== '1' && localStorage.getItem('roleUID') !== '2') {
      return multicomboinput.current.selectedValues
    } else if (CustomerList.length > 0) {
      return [CustomerList[0].value]
    } else {
      return null
    }
  }

  const getDetails = () => {
    if (multicomboinput?.current?.selectedValues.length === 0) {
      setValidationMessage("customer name is required")
      setNorecordFound({ display: "block", marginTop: "5rem" })
      return
    } else {
      setIsgetRowData(true);
      async function fetchData() {
        try {
          const returnapi = await axios.post(`${baseURL}/api/getinvoice`, {
            customerCode: customerCode(),
            fromDate: fromDate,
            toDate: toDate,
            LRNO: lrNo,
            InvoiceNo: invoiceNo,
            DocNo: docNo,
            userUID: localStorage.getItem("userUID")
          });
          console.log(returnapi);
          if (returnapi?.data.data) {
            setGridData(returnapi?.data.data);
            setIsgetRowData(false)
            if (returnapi?.data.data.length === 0) {
              setNorecordFound({ display: "block", marginTop: "5rem" })
              setValidationMessage("No records found")
            }
          } else {
            setIsgetRowData(false)
            setGridData([])
            setValidationMessage("No records found")
            setNorecordFound({ display: "block", marginTop: "5rem" })
          }
        } catch (error) {
          setIsgetRowData(false)
          setValidationMessage("Try again later")
          setNorecordFound({ display: "none", marginTop: "5rem" })
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
      }}> Invoice Download</h3>
      <div className="top-filter clearfix p-5">
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Customer Name</Label>
          {localStorage.getItem('roleUID') !== '1' && localStorage.getItem('roleUID') !== '2' ? (<><MultiComboInput ref={multicomboinput} dataSource={CustomerList} dropDownButtonPosition="right" selectAll animation='advanced'
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
          <Label for="lrno">LR No</Label>
          <Input type="text" name="lrno" id="lrno" placeholder="Enter LR No" onChange={(e) => { setLrNo(e.target.value) }} />
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="docno">Doc No</Label>
          <Input type="text" name="docno" id="docno" placeholder="Enter Doc No" onChange={(e) => { setDocNo(e.target.value) }} />
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="invoiceno">Invoice No</Label>
          <Input type="text" name="invoiceno" id="invoiceno" placeholder="Enter Invoice No" onChange={(e) => { setInvoiceNo(e.target.value) }} />
        </FormGroup>
      </div>
      <div className="top-filter clearfix p-5">
        <FormGroup className="w-20 mb-5">
          <Label for="startDate">From Date</Label>
          <Input type="date" name="date" id="startDate"
            value={fromDate}
            onChange={(e) => {
              console.log((e.target.value));
              setFromDate((e.target.value));
            }} />
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="endDate">To Date</Label>
          <Input type="date" name="toDate" id="toDate"
            value={toDate}
            onChange={(e) => {
              console.log((e.target.value));
              setToDate((e.target.value));
            }} />
        </FormGroup>

        <FormGroup className="mb-5">
          <Label className="d-block">&nbsp;</Label>
          <Button className="btn-primary text-white" onClick={getDetails}>Get Details</Button>
        </FormGroup>
      </div>
      {/* <div style={{ height: "1px", width: "100%", backgroundColor: "#9f538675" }} /> */}
      <div className="top-filter clearfix p-5">
        {!isgetRowData ? (<>
          {gridData && gridData.length > 0 ? (<>    <Grid ref={gridRef}
            id="invoice_height"
            dataSource={gridData}
            columns={columns}
            behavior={behavior}
            sorting={sorting}

          >
          </Grid>
          </>) : (<><div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
            <h3 style={noRecordFound}>{validationMessage}</h3></div></>)}
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
      </div>
    </div>

  );
}
