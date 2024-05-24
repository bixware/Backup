/**
 * News Dashboard
 */
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import axios from "axios";
import baseURL from '../../../baseurl';
import { Table } from 'smart-webcomponents-react/table';
import { format } from 'date-fns';
import Button from "@material-ui/core/Button";
import { Grid } from 'smart-webcomponents-react/grid';
import { MultiComboInput } from 'smart-webcomponents-react/multicomboinput';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import { PanoramaSharp } from "@material-ui/icons";
import { Bars } from "react-loader-spinner";
import usePagination from "../hooks/usePagination";
// import { Pagination } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import "../../../style.css"
//import { Button } from 'smart-webcomponents-react/button';

export default function BalanceConfirm() {
  const [CustomerList, setCustomerList] = useState([]);
  const [QuarterList, setQuarterList] = useState([]);
  const [fromDate, setFromDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [custCode, setCustCode] = useState('');
  //const [customerCode, setCustomerCode] = useState('');
  const [reqType, setReqType] = useState('');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [reportsFormat, setreportsFormat] = useState('');
  const [user, setUser] = useState(localStorage.getItem('USER'));
  const [quarterType, setQuarterType] = useState('');
  //const [balance, setBalance] = useState('');
  const [confirmproctype, setConfirmProcType] = useState('BALANCEDATA');
  const [proctype, setProcType] = useState('Quarter');
  //const [agreebalanceproctype, setAgreeBalanceProcType] = useState('AGREE');
  //const [disagreebalanceproctype, setDisAgreeBalanceProcType] = useState('DISAGREE');
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" })
  const [validationMessage, setValidationMessage] = useState("")
  const [downloadType, setDownloadType] = useState('');
  //const [id, setId] = useState('');
  const table = React.createRef();
  const keyboardNavigation = true;
  const paging = true;
  const multicomboinput = React.createRef();
  const [addNewUserModal, setAddNewUserModal] = useState(false);
  //const [selectedUser, setSelectedUser] = useState(null);
  
  /* const [balance, setBalance] = useState(null); */
 /*  const [balanceDetail, setBalanceDetail] = useState({
    customerCode: "",
    customerName: "",
    balance: "",
    reason: "",
  }) */
  const [ disagreeCustomerCode, setDisagreeCustomerCode] = useState('');
  const [ disagreeCustomerName, setDisagreeCustomerName] = useState('');
  const [ disagreeBalance, setDisagreeBalance] = useState('');
  const [ disagreeReason, setDisagreeReason] = useState('');
  const [ disagreeId, setDisagreeId] = useState('');

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

  const getQuaterList = () => {
    async function fetchData() {
      const returnapi = await axios.get(`${baseURL}/api/getquarter`, {
        PROC_TYPE: proctype
      });
      if (!returnapi.data.error) {
        setQuarterList(returnapi.data.data);
      }
    }
    fetchData();
  };

  /* const dummyFunction = (id) => {
    console.log(id);
  }; */

  const customerCode = () => {
    if (localStorage.getItem('roleUID') === '3') {
      return null
    }
    if (localStorage.getItem('roleUID') !== '1') {
      return multicomboinput.current.selectedValues
    } else if (CustomerList.length > 0) {
      return [CustomerList[0].value]
    } else {
      return null
    }
  }

  const getDetails = () => {
    setNorecordFound({ display: "none", marginTop: "5rem" })
    if (localStorage.getItem('roleUID') === '3') {
      setIsgetRowData(true);
      async function fetchData() {
        try {
          const returnapi = await axios.post(`${baseURL}/api/getbalanceconfirmation`, {
            Customer: customerCode(),
            Quarter: quarterType,
            PROC_TYPE: confirmproctype,
            userUID: localStorage.getItem("userUID")
          });
          console.log(returnapi);
          if (returnapi?.data.data.data) {
            setIsgetRowData(false);
            if (returnapi?.data.data.data.length == 0) {
              setValidationMessage("No record found")
              setNorecordFound({ display: "block", marginTop: "5rem" })
            } else {
              setGridData(returnapi?.data.data.data);
              setNorecordFound({ display: "none", marginTop: "5rem" })
            }
          } else {
            setValidationMessage("Something went wrong")
            setIsgetRowData(false);
            setGridData([])
          }
        } catch (error) {
          setValidationMessage("Something went wrong")
          setIsgetRowData(false);
          console.log("Error", error);
        }
      }
      fetchData();
    } else if (multicomboinput?.current?.selectedValues.length === 0) {
      setValidationMessage("Customer name is required")
      setNorecordFound({ display: "block", marginTop: "5rem" })
      return
    } else {
      setIsgetRowData(true);
      async function fetchData() {
        try {
          const returnapi = await axios.post(`${baseURL}/api/getbalanceconfirmation`, {
            Customer: customerCode(),
            Quarter: quarterType,
            PROC_TYPE: confirmproctype,
            userUID: localStorage.getItem("userUID")
          });
          console.log(returnapi);
          if (returnapi?.data.data.data) {
            setIsgetRowData(false);
            if (returnapi?.data.data.data.length == 0) {
              setValidationMessage("No record found")
              setNorecordFound({ display: "block", marginTop: "5rem" })
            } else {
              setGridData(returnapi?.data.data.data);
              setNorecordFound({ display: "none", marginTop: "5rem" })
            }
          } else {
            setValidationMessage("Something went wrong")
            setIsgetRowData(false);
            setGridData([])
          }
        } catch (error) {
          setValidationMessage("Something went wrong")
          setIsgetRowData(false);
          console.log("Error", error);
        }
      }
      fetchData();
    }

  }

  const getbalanceagree = async (val, balanceval, value1) => {
    setDisagreeCustomerCode(value1);
    try {
      const returnapi = await axios.post(`${baseURL}/api/getbalanceagree`, {
        Customer: value1,
        Quarter: quarterType,
        Id: val,
        userUID: localStorage.getItem("userUID"),
        balance: balanceval
    });
    if (!returnapi.data.error) {
      getDetails();
    }
    }
    catch(err) {
      console.log(err.errorMessage.data.message);
    }
  }

  const downloadTypes = [
    /*{
      label: "HTML",
      value: 0,
    },*/
    {
      label: "CSV",
      value: 1
    }
    /*{
      label: "PDF",
      value: 2,
    }*/
  ];

  const getData = async () => {
    if(downloadType == 'CSV') {
      Promise.all([
        Promise.resolve(handleCsvBtnClick()),
        Promise.resolve(getDetails())
      ])
    } else {
      Promise.all([
        Promise.resolve(getDetails())
      ])
    }
  }

  /*const handleHtmlBtnClick = () => {
    if (table.current) {
      table.current.exportData('html', reportsType);
    }
    else {
      alert("Sorry, No records to download!");
    }
  };*/

  const handleCsvBtnClick = async () => {
    //if (table.current) {
      //table.current.exportData('xlsx', reportsType);
      //setDownloadFlag(true);
      try {
        let data = {
          Customer: customerCode(),
          Quarter: quarterType,
          userUID: localStorage.getItem("userUID")
        }
        const returnapi = await axios.post(`${baseURL}/api/getbalancecsv`, data);
        if (returnapi?.data.message == 'Successfully downloaded')
        {
          const link = document.createElement('a');
          link.href = 'https://mgorder1.abfrl.com/TradePortal/API/' + returnapi?.data.download;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.log("Error", error);
      }
    //} else {
      //alert("Sorry, No records to download!");
    //}
  };

  /*const handlePdfBtnClick = () => {
    if (table.current) {
      table.current.exportData('pdf', reportsType);
      //getPDF();
    } else {
      alert("Sorry, No records to download!");
    }
  };*/

  const getbalancedisagree = async (val, balanceval, value1, value2) => {    
    setDisagreeCustomerCode(value1);
    setDisagreeCustomerName(value2);
    setDisagreeBalance(balanceval);
    setDisagreeId(val);
    /*setDisagreeReason(value4); */
    openAddNewUserModal();
    console.log(val,balanceval);
  }

  const updateDisagreeDetails =  async () => {
    try {
      const returnapi = await axios.post(`${baseURL}/api/getbalancedisagree`, {
        Customer: disagreeCustomerCode,
        Quarter: quarterType,
        Id: disagreeId,
        userUID: localStorage.getItem("userUID"),
        balance: disagreeBalance,
        reason: disagreeReason
      });
      if (!returnapi.data.error) {
        getDetails();
      }
    }
    catch(err) {
      console.log(err.errorMessage.data.message);
    }  
  }

  const openAddNewUserModal = () => {
    //e.preventDefault();
    setAddNewUserModal(true);
    //setSelectedUser(data);
    //setIsgetRowData(data);
    
  };

  const onModalClose = () => {
    setAddNewUserModal(false);
    //setSelectedUser(null);
  };

  const closeBtn = (
    <button className="close" onClick={onModalClose} type="button">
      &times;
    </button>
  );

  const getdownload = (value1, balanceval) => {
    async function fetchFile(value1, balanceval) {
      const returnapi = await axios.post(`${baseURL}/api/downloadbalancepdf`, {
        customerCode: value1,
        Quarter: quarterType,
        balance: balanceval
      }, { responseType: 'arraybuffer' });
      var fileName = 'BalanceConfirmation-' + new Date().toISOString().split('T')[0];
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
    fetchFile(value1, balanceval);
  }

  useEffect(() => {
    if (localStorage.getItem('roleUID') !== '3') {
      getCustomerList();
    }
    getQuaterList();
  }, []);

  


  const columns = [
    { label: 'Customer Code', dataField: 'CustCode', width: 200 },
    { label: 'Customer Name', dataField: 'CustName', width: 250 },
    { label: 'Balance', dataField: 'balance', width: 200 },
    { label: 'Status', dataField: 'status', width: 200,
    formatFunction: (settings) => {
        const customText = document.createElement('span');
        customText.style.margin = "10px";
        if(settings.data.status == "1") {
          customText.innerHTML = 'Agreed';
        } else if (settings.data.status == "2") {          
          customText.innerHTML ='Disagree';
        } else {
          customText.innerHTML = 'Yet to Confirm';
        }
        settings.template = customText;
     },
    },
    {
      label: 'Actions', dataField: 'id', align: 'left', cellsAlign: 'left', width: '25%',
      cellsVerticalAlign: 'middle', verticalAlign: 'middle', align: 'center', cellsAlign: 'center',
      formatFunction: (settings) => {
        const downloadDiv = document.createElement('span');
        downloadDiv.className = "downBtn";
        downloadDiv.style.margin = "10px";
        downloadDiv.innerHTML = 'Download';
        const agreeDiv = document.createElement('span');
        agreeDiv.className = "downBtn";
        agreeDiv.style.margin = "10px";
        agreeDiv.innerHTML = 'Agree';
        const disagreeDiv = document.createElement('span');
        disagreeDiv.className = "downBtn";
        disagreeDiv.style.margin = "10px";
        disagreeDiv.innerHTML = 'DisAgree';
        const val = settings.value;
        downloadDiv.addEventListener('click', () => {
          const value1 = settings.data.CustCode;
          const balanceval = settings.data.balance;
          getdownload(value1, balanceval);
        });
        agreeDiv.addEventListener('click', () => {
          const value1 = settings.data.CustCode;
          const balanceval = settings.data.balance;
          getbalanceagree(val, balanceval, value1);
          /* agreeDiv.innerHTML = ''; */
        });
        disagreeDiv.addEventListener('click', () => {
          //console.log(e)
          //const cust = formatObject.row.data['CustCode'];
          const val = settings.value;
          const value1 = settings.data.CustCode;
          const value2 = settings.data.CustName;
          const balanceval = settings.data.balance;
          /* console.log('e',formatObject.row.data['balance']);*/
          console.log(val,balanceval, value1, value2); 
          getbalancedisagree(val, balanceval, value1, value2);
          /* openAddNewUserModal(); */
          /*  disagreeDiv.innerHTML = ''; */
        });
        const template = document.createElement('div');
        if(localStorage.getItem("roleUID") === '1' && localStorage.getItem('roleUID') !== '3') {
          if(settings.data.status == "1" || settings.data.status == "2") {
            template.appendChild(downloadDiv);
          } else {
            template.appendChild(agreeDiv);
            template.appendChild(disagreeDiv);
          }
        } else {
          if(settings.data.status == "1" || settings.data.status == "2") {
            template.appendChild(downloadDiv);
          }
        }
        settings.template = template;
      }
      /*  formatFunction(settings) {
       settings.template =
           `<a width="32" target="_blank" href="https://tradeportal.blob.core.windows.net/tradeportal/${settings.row.data['PdfName']}">Download</a>`
       } */
    }
  ]

  /* const columns = [
    { label: 'Customer Code', dataField: 'CustCode', width: '15%' },
    { label: 'Customer Name', dataField: 'CustomerName', width: '20%' },
    { label: 'Credit/Debit No', dataField: 'CrNoteNo', width: '20%' },
    { label: 'Credit/Debit Date', dataField: 'creditDebitDate', width: '15%' },
    { label: 'Doc Ref', dataField: 'DocReference', width: '15%' },
    { label: 'Type', dataField: 'type', width: '5%' },
    { label: 'Download', dataField: 'PdfName', align: 'left', cellsAlign: 'left', width: '10%' , 
    formatFunction(settings) {
      settings.template =
        `<a width="32" target="_blank" href="https://tradeportal.blob.core.windows.net/tradeportal/${settings.row.data['PdfName']}">View</a>`
    }}
  ] */
  const behavior = {
    columnResizeMode: 'growAndShrink'
  }
  const sorting = {
    enabled: true
  }
  const { paginate, count, currentItems, currentPage } = usePagination(
    gridData,
    20
  );

  return (
    <div className="user-management">
      <h3 style={{
        marginTop: "-20px",
        padding: "5px 5px 0px 5px",
        borderRadius: "5px"
      }}> Balance Confirmation</h3>
      <div style={{ justifyContent: "end", display: "flex", marginTop: "-30px", height: "25px" }}>
                <FormGroup className="frmgrp" style={{ width:"140px" }}>
                  <div className="app-selectbox-sm">
                    <Input type="select" name="select" id="Select-2"
                      onChange={(e) => {

                        if (e.target.value === "HTML") {
                          //handleHtmlBtnClick();
                          setDownloadType(e.target.value);
                        }
                        else if (e.target.value === "CSV") {
                          //handleCsvBtnClick();
                          setDownloadType(e.target.value);
                        }
                        else if (e.target.value === "PDF") {
                          //handlePdfBtnClick();
                          setDownloadType(e.target.value);
                        } else {
                          setDownloadType('');
                        }

                      }}
                    >
                      <option value={0}>Select Download</option>
                      {downloadTypes.map((option) => (
                        // <MenuItem key={option.CustCode} value={option.CustCode}>
                        //   {option.CustName}
                        // </MenuItem>
                        <option key={option.value} value={option.label}>{option.label}</option>

                      ))}
                    </Input>
                  </div>
                </FormGroup>
              </div>
      <div className="top-filter clearfix p-5">
      {localStorage.getItem('roleUID') !== '3' ? (
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Customer Name</Label>
          {localStorage.getItem('roleUID') !== '1' ? 
          (<>
          <MultiComboInput ref={multicomboinput} dataSource={CustomerList} dropDownButtonPosition="right" selectAll animation='advanced'
            placeholder="Select / Search customer name"
            inputTagsMode="one"
            inputPurpose="on"
            filterable
          ></MultiComboInput></>
          ) : (<><Input type="select" name="select"
            onChange={(e) => {setCustCode(e.target.value)}}>
            {CustomerList.map((option, i) => (
              <option key={i} value={option.value}>{option.label}</option>              
            ))}
          </Input>
          </>)}
        </FormGroup>
        ):(null)}
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Quarter Type</Label>
          <div className="app-selectbox-sm">
            <Input type="select" name="select" id="Select-2"
              onChange={(e) => {
                setQuarterType(e.target.value);
              }}
            >
              <option value={0}>Select Type</option>
              {QuarterList.map((option) => (
                <option key={option.quarter} value={option.quarter}>{option.quarter}</option>

              ))}
            </Input>
          </div>
        </FormGroup>
        <FormGroup className="mb-5">
          <Label className="d-block">&nbsp;</Label>
          <Button className="btn-primary text-white" onClick={getData}>Get Report</Button>
        </FormGroup>
      </div>
      <div className="top-filter clearfix p-6">
        {!isgetRowData ? (<>
          {gridData && gridData.length > 0 ? (<>
          <Table ref={table} id="balance_confirm_height" dataSource={gridData} keyboardNavigation={keyboardNavigation} paging={paging} columns={columns}></Table>
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
      </div>

      <Modal
        isOpen={addNewUserModal}
      >
      <ModalHeader close={closeBtn}><h2>Balance Details</h2></ModalHeader>
      <ModalBody>
            <Form>
                  
                  <FormGroup className="col-lg-12">
                  <div className="row">
                  <div className="col-lg-12 d-flex">
                    <Label for="Customercode">
                      <h4 className="mt-0 header-title">Customer Code : </h4>
                    </Label>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-12 d-flex">
                    <h4>{disagreeCustomerCode}</h4>
                    </div>
                  </div>
                  </FormGroup>
                  
                    <FormGroup className="col-lg-12">
                  <div className="row">
                <div className="col-lg-12 d-flex">
                  
                    <Label for="Customername">
                      <h4 className="mt-0 header-title">Customer Name : </h4>
                    </Label>
                    </div>
                    </div>
                      <div className="row">
                <div className="col-lg-12 d-flex">
                <h4>{disagreeCustomerName}</h4>
                </div>
                  
                  </div>
                 
                  </FormGroup>
                 
                  <FormGroup className="col-lg-12">
                  <div className="row">
                <div className="col-lg-12 d-flex">
                    <Label for="Balance">
                      <h4 className="mt-0 header-title">Balance : </h4>
                    </Label>
                    </div>
                    </div>
                    <div className="row">
                <div className="col-lg-12 d-flex">
                      <h4>{disagreeBalance}</h4>
                    </div>
                    </div>
                  </FormGroup>
                  
                  
                  <FormGroup className="col-lg-12">
                  <div className="row">
                <div className="col-lg-12 d-flex">
                    <Label for="Reason">
                      <h4 className="mt-0 header-title">Reason for DisAgreement: </h4>
                    </Label>
                    </div>
                    </div>
                    <div className="row">
                <div className="col-lg-12 d-flex">
                      <textarea rows="3" cols="40" 
                      onChange={(e) => {setDisagreeReason(e.target.value)}}
                      >
                      </textarea>                  
                </div>
              </div>
              </FormGroup>
            </Form>
      </ModalBody>
      <ModalFooter>
      
            <Button
              variant="contained"
              className="text-white btn-success"
              onClick={() => onModalClose()}
            >
              Cancel
            </Button>
          
            <Button
              variant="contained"
              color="primary"
              className="text-white"
              type="button"
              onClick={() => updateDisagreeDetails()}
            >
              Submit
            </Button>
          
      </ModalFooter>
      </Modal>
    </div>
  )
}
