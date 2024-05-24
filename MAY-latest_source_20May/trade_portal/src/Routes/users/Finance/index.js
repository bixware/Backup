/**
 * News Dashboard
 */
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import baseURL from '../../../baseurl';
import { format } from 'date-fns';
import Button from "@material-ui/core/Button";
import { Grid } from 'smart-webcomponents-react/grid';
import { Table } from 'smart-webcomponents-react/table';
import { MultiComboInput } from 'smart-webcomponents-react/multicomboinput';
import usePagination from "../hooks/usePagination";
// import { Pagination } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Bars } from "react-loader-spinner";
import 'smart-webcomponents-react/source/styles/smart.default.css';
import "../../../style.css";
import { CSVLink } from "react-csv";
import moment from 'moment';
//import { Button } from 'smart-webcomponents-react/button';

export default function ReportsFinance() {
//class ReportsFinance extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {CustomerList: []};
    this.state = {fromDate: format(new Date(), "yyyy-MM-dd")};
    this.state = {toDate: format(new Date(), "yyyy-MM-dd")};
    this.state = {custCode: ''};
    this.state = {reqType: ''};
    this.state = {allType: ''};
    this.state = {proctype: 'CUSTOMER_LEDGER'};
    this.state = {gridData: []};
    this.state = {openBalance: []};
    this.state = {closeBalance: []};
    this.state = {isgetRowData: false};
    this.state = {reportsFormat: 'HTML'};
    this.state = {reportsType: ''};
    this.state = {isOpeningOrderStatus: true};
    this.state = {isDocType: false};
    this.state = {docproctype: 'CREDIT_DEBIT_NOTE_BY_DOCDATE'};
    this.state = {reportOption: ''};
    this.state = {columnDynamicState: []};
    this.state = {noRecordFound: { display: "none", marginTop: "5rem" }};
    this.state = {validationMessage: ''};
    this.state = {downloadType: ''};
    this.state = {downloadFlag: false};
  }
  */
  const [CustomerList, setCustomerList] = useState([]);
  const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [custCode, setCustCode] = useState('');
  const [reqType, setReqType] = useState('');
  const [allType, setAllReqType] = useState('');
  const [proctype, setProcType] = useState('CUSTOMER_LEDGER');
  const [gridData, setGridData] = useState([]);
  const [openBalance, setOpenBalance] = useState([]);
  const [closeBalance, setCloseBalance] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [reportsFormat, setreportsFormat] = useState('HTML');
  const multicomboinput = React.createRef();
  const [reportsType, setReportsType] = useState('');
  const [isOpeningOrderStatus, setIsOpeningOrderStatus] = useState(true);
  const [isDocType, setIsDocType] = useState(false);
  const [docproctype, setDocProcType] = useState('CREDIT_DEBIT_NOTE_BY_DOCDATE');
  const [reportOption, setReportOption] = useState("")
  const [columnDynamicState, setColumnDynamicState] = useState([])
  const [headers, setHeaders] = useState([])
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" })
  const [validationMessage, setValidationMessage] = useState("")
  const [downloadType, setDownloadType] = useState('');
  const [downloadFlag, setDownloadFlag] = useState(false);  
  const gridRef = useRef();
  const keyboardNavigation = true;
  const paging = true;
  const grouping = true;
  const freezeFooter = true;
  const table = React.createRef();
  const csvRef = React.createRef();
  const [agentName, setAgentName] = useState('');

  const behavior = {
    columnResizeMode: 'growAndShrink'
  }
    const appearance = {
      alternationCount: 2,
      showRowHeader: true,
      showRowHeaderSelectIcon: true,
      showRowHeaderFocusIcon: true
    }
    const pager = {
      visible: true
    }
    const sorting = {
      enabled: true
    }
    const { paginate, count, currentItems, currentPage } = usePagination(
      gridData,
      20
    );

    const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
    const downloadTypes = [
      /*{
        label: "HTML",
        value: 0,
      },*/
      {
        label: "CSV",
        value: 1
      },
      {
        label: "PDF",
        value: 2,
      }
    ];
    const reqTypeValues = [
      {
        label: "All",
        value: 0,
      },
      {
        label: "PPO",
        value: 1,
      },
      {
        label: "Normal",
        value: 2,
      },
      {
        label: "Trade",
        value: 3,
      },
    ];
    const reqAllTypeValues = [
      {
        label: "All",
        value: 0,
      }
    ];
    const reqReportTypeValues = [
      {
        label: "CUSTOMER_LEDGER",
        value: 0
      },
      {
        label: "COLLECTION_REGISTER",
        value: 1
      },
      {
        label: "DEBTOR_AGEING",
        value: 2
      },
      {
        label: "CHEQUE_DEPOSIT",
        value: 3
      },
      {
        label: "BALANCE_CONFIRMATION",
        value: 4
      },
      {
        label: "CREDIT_DEBIT_SUMMARY",
        value: 5
      }
    ];

  useEffect(() => {
    getCustomerList();
  }, []);

  useEffect(() => {
    if (downloadFlag) {
      csvRef.current.link.click();
      setDownloadFlag(false);
    }
  }, [downloadFlag])

  useEffect(() => {
    init();
  }, [table])
  
  const init = () => {
    if (table.current) {
      const tableValue = table.current;
      if (reportsType == "CUSTOMER_LEDGER") {
        tableValue.addGroup('custCode');
      } else if (reportsType == "COLLECTION_REGISTER") {
        tableValue.addGroup('custCode');
      } else if (reportsType == "CHEQUE_DEPOSIT") {
        tableValue.addGroup('custCode');
      }
    }
  }

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
    if (localStorage.getItem('roleUID') !== '1') {
      return multicomboinput.current.selectedValues
    } else if (CustomerList.length > 0) {
      return [CustomerList[0].value]
    } else {
      return null
    }
  }

  const getData = async () => {
    if(downloadType == 'CSV') {
      Promise.all([
        Promise.resolve(handleCsvBtnClick()),
        Promise.resolve(getDetails())
      ])
    } else if(downloadType == 'PDF' && reportsType == "CUSTOMER_LEDGER") {
      Promise.all([
        Promise.resolve(handlePdfBtnClick()),
        Promise.resolve(getDetails())
      ])
    } else {
      Promise.all([
        Promise.resolve(getDetails())
      ])
    }
  }


  const getDetails = () => {


    async function fetchData() {
      if (multicomboinput?.current?.selectedValues.length === 0) {
        setValidationMessage("Customer name is required")
        setNorecordFound({ display: "block", marginTop: "5rem" })
      } else {
        setIsgetRowData(true);
        try {
          let data = {
            from: null,
            to: null,
            customer: customerCode(),
            REPORT_TYPE: reportsType,
            all: allType,
            reportFormat: reportsFormat,
            userUID: localStorage.getItem("userUID")
          }
          let fromto = {
            customer: customerCode(),
            from: fromDate,
            to: toDate,
            REPORT_TYPE: reportsType,
            all: allType,
            reportFormat: reportsFormat,
            userUID: localStorage.getItem("userUID")
          }
          if (isDocType) {
            fromto.REPORT_TYPE = docproctype;
          }
          const returnapi = await axios.post(`${baseURL}/api/getfinance`, isOpeningOrderStatus ? fromto : data);
          if (returnapi?.data.data) {
            setIsgetRowData(false);
            setAgentName(returnapi.data.data.agentname);
            if (returnapi?.data.data.result.length == 0) {
              setValidationMessage("No record found")
              setNorecordFound({ display: "block", marginTop: "5rem" })
            } else {
              setOpenBalance(returnapi?.data.data.openBal);
              setCloseBalance(returnapi?.data.data.closeBal);
              setGridData(returnapi?.data.data.result);
              setNorecordFound({ display: "none", marginTop: "5rem" })
            }

          } else {
            setValidationMessage("Something went wrong")
            setGridData([])
            setIsgetRowData(false);
          }
        } catch (error) {
          setValidationMessage("Something went wrong")
          setIsgetRowData(false);
          console.log("Error", error);
        }
      }

    }
    fetchData();
  }

  const columnsDynamic = (reportType) => {
    if (reportType == "CUSTOMER_LEDGER") {
      setColumnDynamicState([
        { label: 'Cust Code', dataField: 'custCode', width: '15%' },
        { label: 'Cust Name', dataField: 'custName', width: '20%' },
        { label: 'Doc Date', dataField: 'DocDate', width: '10%' },
        { label: 'Doc Type', dataField: 'DocType', width: '10%' },
        { label: 'Doc Description', dataField: 'DocDescription', width: '10%' },
        { label: 'Doc No', dataField: 'DocNo', width: '12%' },
        { label: 'Doc Reference', dataField: 'DocReference', width: '12%' },
        { label: 'Debit Amount', dataField: 'DebitAmount', width: '12%' },
        { label: 'Credit Amount', dataField: 'CreditAmount', width: '10%' },
        { label: 'Clearing Doc', dataField: 'ClearingDoc', width: '12%' },
        { label: 'Sold To Party', dataField: 'SoldToParty', width: '12%', },
        { label: 'Description', dataField: 'Description', width: '12%', }
      ])
      setHeaders([
        { label: 'Doc Date', key: 'DocDate' },
        { label: 'Doc Type', key: 'DocType' },
        { label: 'Doc Description', key: 'DocDescription' },        
        { label: 'Doc No', key: 'DocNo'},
        { label: 'Doc Reference', key: 'DocReference'},
        { label: 'Debit Amount', key: 'DebitAmount'},        
        { label: 'Credit Amount', key: 'CreditAmount'},
        { label: 'Clearing Doc', key: 'ClearingDoc'},
        { label: 'Sold To Party', key: 'SoldToParty'},
        { label: 'Description', key: 'Description'}
      ])
    }
    else if (reportType == "COLLECTION_REGISTER") {
      setColumnDynamicState([
        { label: 'Cust Code', dataField: 'custCode', width: '15%' },
        { label: 'Cust Name', dataField: 'custName', width: '20%' },
        { label: 'Collect Doc No', dataField: 'CollecDocNo', width: '10%' },
        { label: 'Invoice No', dataField: 'InvoiceNo', width: '10%' },
        { label: 'Cheque No', dataField: 'ChequeNo', width: '10%' },
        { label: 'Date', dataField: 'CollecDate', width: '12%' },
        { label: 'Dr/Cr', dataField: 'DrCrIndicate', width: '12%' },
        { label: 'Amount', dataField: 'CollecAmount', width: '12%' },
        { label: 'Doc Type', dataField: 'DocType', width: '10%' },
        { label: 'Collec Ref No', dataField: 'CollecRefNo', width: '12%' },
        { label: 'Due Date', dataField: 'DueDate', width: '12%', }
      ])
      setHeaders([
        { label: 'Collect Doc No', key: 'CollecDocNo' },
        { label: 'Invoice No', key: 'InvoiceNo' },
        { label: 'Cheque No', key: 'ChequeNo' },        
        { label: 'Date', key: 'CollecDate'},
        { label: 'Dr/Cr', key: 'DrCrIndicate'},
        { label: 'Amount', key: 'CollecAmount'},        
        { label: 'Doc Type', key: 'DocType'},
        { label: 'Collect Ref No', key: 'CollecRefNo'},
        { label: 'Due Date', key: 'DueDate'}
      ])
    }
    else if (reportType == "DEBTOR_AGEING") {
      setColumnDynamicState([
        { label: 'Cust Code', dataField: 'CustCode', width: '12%' },
        { label: 'Customer name', dataField: 'CustName', width: '20%' },
        { label: 'Customer city', dataField: 'CustomerCity', width: '12%' },
        { label: 'Classification', dataField: 'Classification', width: '20%' },
        { label: 'Region', dataField: 'Region', width: '7%' },
        /* { label: 'S.GRP', dataField: 'S.Grp', width: '7%' }, */
        { label: 'Pay Terms', dataField: 'paymentTerms', width: '20%' },
        { label: 'TOTAL OS', dataField: 'TOTALOS', width: '12%' },
        { label: 'NOT DUE', dataField: 'NotDue', width: '12%', },
        { label: 'OVER DUE', dataField: 'OVERDUE', width: '12%', },
        /* { label: 'OVER DUE', dataField: 'OVERDUE', width: '12%', }, */
        { label: '0-15', dataField: '0-15', width: '12%', },
        { label: '16-30', dataField: '16-30', width: '12%', },
        { label: '31-60', dataField: '31-60', width: '12%', },
        { label: '61-90', dataField: '61-90', width: '12%', },
        { label: '91-180', dataField: '91-180', width: '12%', },
        { label: '180+', dataField: '180+', width: '12%', },
        { label: 'BC', dataField: 'BC', width: '12%', },
        /* { label: 'BC', dataField: 'BC', width: '12%', }, */
        { label: 'HOLD REASON', dataField: 'HoldReason', width: '12%', }
      ])
      setHeaders([
        { label: 'Cust Code', key: 'CustCode'},
        { label: 'Customer name', key: 'CustName'},
        { label: 'Customer city', key: 'CustomerCity'},
        { label: 'Classification', key: 'Classification'},
        { label: 'Region', key: 'Region'},
        { label: 'Pay Terms', key: 'paymentTerms'},
        { label: 'TOTAL OS', key: 'TOTALOS'},
        { label: 'NOT DUE', key: 'NotDue'},
        { label: 'OVER DUE', key: 'OVERDUE'},
        { label: '0-15', key: '0-15'},
        { label: '16-30', key: '16-30'},
        { label: '31-60', key: '31-60'},
        { label: '61-90', key: '61-90'},
        { label: '91-180', key: '91-180'},
        { label: '180+', key: '180+'},
        { label: 'BC', key: 'BC'},
        { label: 'HOLD REASON', key: 'HoldReason'}
      ])
    }
    else if (reportType == "CHEQUE_DEPOSIT") {
      setColumnDynamicState([
        { label: 'Cust Code', dataField: 'custCode', width: '15%' },
        { label: 'Cust Name', dataField: 'custName', width: '20%' },
        { label: 'Reference', dataField: 'Reference', width: '15%' },
        { label: 'Doc No', dataField: 'DocNo', width: '15%' },
        { label: 'Doc Date', dataField: 'DocDate', width: '20%' },
        { label: 'Due Date', dataField: 'DueDate', width: '12%' },
        { label: 'Payment Terms', dataField: 'PaymentTerm', width: '12%' },
        { label: 'Amount', dataField: 'Amount', width: '12%' },
        { label: 'Arrear', dataField: 'Arrear', width: '10%' }
      ])
      setHeaders([
        { label: 'Reference', key: 'Reference'},
        { label: 'Doc No', key: 'DocNo'},
        { label: 'Doc Date', key: 'DocDate'},
        { label: 'Due Date', key: 'DueDate'},
        { label: 'Payment Terms', key: 'PaymentTerm'},
        { label: 'Amount', key: 'Amount'},
        { label: 'Arrear', key: 'Arrear'}
      ])
    }
    else if (reportType == "BALANCE_CONFIRMATION") {
      setColumnDynamicState([
        { label: 'Cust Code', dataField: 'CustCode', width: '16%' },
        { label: 'Cust Name', dataField: 'custName', width: '25%' },
        { label: 'Quarter', dataField: 'quarter', width: '20%' },
        { label: 'Status', dataField: 'status', width: '12%' },
        { label: 'Date', dataField: 'Date', width: '12%' },
        { label: 'Disagree Reason', dataField: 'disagreeReason', width: '12%' }
      ])
      setHeaders([
        { label: 'Cust Code', key: 'CustCode'},
        { label: 'Cust Name', key: 'custName'},
        { label: 'Quarter', key: 'quarter'},
        { label: 'Status', key: 'status'},
        { label: 'Date', key: 'Date'},
        { label: 'Disagree Reason', key: 'disagreeReason'}
      ])
    }
    else if (reportType == "CREDIT_DEBIT_SUMMARY") {
      setColumnDynamicState([
        { label: 'Code', dataField: 'CustCode', width: '12%' },
        { label: 'Customer Name', dataField: 'CustName', width: '25%' },
        { label: 'Scheme detail /Text', dataField: 'SchemeDetail\/Text', width: '40%' },
        { label: 'Document no', dataField: 'DocumentNo', width: '12%' },
        { label: 'Document description', dataField: 'DocumentDescription', width: '12%' },
        { label: 'Date', dataField: 'Date', width: '10%' },
        { label: 'Month', dataField: 'Month', width: '12%' },
        { label: 'Credit/Debit note No', dataField: 'Credit\/DebitNoteNo', width: '12%' },
        { label: 'Original invoice reference', dataField: 'OriginalInvoiceRefrence', width: '18%', },
        { label: 'HSN no', dataField: 'HSNno', width: '12%', },
        { label: 'Base value', dataField: 'BaseValue', width: '12%', },
        { label: 'SGST %', dataField: 'SGST %', width: '12%', },
        { label: 'SGST Value', dataField: 'SGST Value', width: '12%', },
        { label: 'CGST %', dataField: 'CGST %', width: '12%', },
        { label: 'CGST Value', dataField: 'CGST Value', width: '12%', },
        { label: 'UTGST %', dataField: 'UTGST %', width: '12%', },
        { label: 'UTGST Value', dataField: 'UTGST Value', width: '12%', },
        { label: 'IGST %', dataField: 'IGST %', width: '12%', },
        { label: 'IGST value', dataField: 'IGST value', width: '12%', },
        { label: 'Total CN/DN Value', dataField: 'Total CN\/DN Value', width: '12%', },
        { label: 'Posting Date', dataField: 'PostingDate', width: '18%', }
      ]
      )
      setHeaders([
        { label: 'Code', key: 'CustCode'},
        { label: 'Customer Name', key: 'CustName'},
        { label: 'Scheme detail /Text', key: 'SchemeDetail\/Text'},
        { label: 'Document no', key: 'DocumentNo'},
        { label: 'Document description', key: 'DocumentDescription'},
        { label: 'Date', key: 'Date'},
        { label: 'Month', key: 'Month'},
        { label: 'Credit/Debit note No', key: 'Credit\/DebitNoteNo'},
        { label: 'Original invoice reference', key: 'OriginalInvoiceRefrence'},
        { label: 'HSN no', key: 'HSNno'},
        { label: 'Base value', key: 'BaseValue'},
        { label: 'SGST %', key: 'SGST %'},
        { label: 'SGST Value', key: 'SGST Value'},
        { label: 'CGST %', key: 'CGST %'},
        { label: 'CGST Value', key: 'CGST Value'},
        { label: 'UTGST %', key: 'UTGST %'},
        { label: 'UTGST Value', key: 'UTGST Value'},
        { label: 'IGST %', key: 'IGST %'},
        { label: 'IGST value', key: 'IGST value'},
        { label: 'Total CN/DN Value', key: 'Total CN\/DN Value'},
        { label: 'Posting Date', key: 'PostingDate'}
      ])

    } else {
      const columns = []
    }
  }

  const handleHtmlBtnClick = () => {
    if (table.current) {
      table.current.exportData('html', reportsType);
    }
    else {
      alert("Sorry, No records to download!");
    }
  };

  const handlePdfAlertBtnClick = () => {
      alert("PDF Download will work only for Customer Ledger!");
  };

  const handleCsvBtnClick = async () => {
    //if (table.current) {
      //table.current.exportData('csv', reportsType);
      //setDownloadFlag(true); getfinancecsv
      try {
      let data = {
        from: null,
        to: null,
        customer: customerCode(),
        REPORT_TYPE: reportsType,
        all: allType,
        reportFormat: reportsFormat,
        userUID: localStorage.getItem("userUID")
      }
      let fromto = {
        customer: customerCode(),
        from: fromDate,
        to: toDate,
        REPORT_TYPE: reportsType,
        all: allType,
        reportFormat: reportsFormat,
        userUID: localStorage.getItem("userUID")
      }
      if (isDocType) {
        fromto.REPORT_TYPE = docproctype;
      }
      const returnapi = await axios.post(`${baseURL}/api/getfinancecsv`, isOpeningOrderStatus ? fromto : data);
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

  const handlePdfBtnClick = async () => {
    /*if (table.current) {
      table.current.exportData('pdf', reportsType);
    } else {
      alert("Sorry, No records to download!");
    }*/
    try {
      let fromto = {
        customer: customerCode(),
        from: fromDate,
        to: toDate,
        REPORT_TYPE: reportsType,
        all: allType,
        reportFormat: reportsFormat,
        userUID: localStorage.getItem("userUID")
      }
      if (isDocType) {
        fromto.REPORT_TYPE = docproctype;
      }
      const returnapi = await axios.post(`${baseURL}/api/getfinancepdf`, fromto);
      if (returnapi?.data.success == true)
      {
          const link = document.createElement('a');
          link.href = 'https://mgorder1.abfrl.com/TradePortal/API' + returnapi?.data.data;
          link.target = '_blank'
          link.download =  returnapi?.data.data.substr(returnapi?.data.data.lastIndexOf("/")+1, returnapi?.data.data.length);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-xs-12 w-100">
          <div className="row">
            <div className="col-xs-12 w-100" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
              <div className="top-filter clearfix p-6">
                <div style={{ justifyContent: "start", display: "flex", marginTop: "-20px", }}>
                  <h3 style={{

                    padding: "5px 5px 0px 5px",
                    borderRadius: "5px"
                  }}>Finance</h3>
                </div>
                <div style={{ justifyContent: "end", display: "flex", marginTop: "-30px", height: "25px" }}>
                  <FormGroup className="frmgrp" style={{ width:"140px" }}>
                    <div className="app-selectbox-sm">
                      <Input type="select" name="select" id="Select-2"
                        onChange={(e) => {
                          setDownloadFlag(false);
                          if (e.target.value === "HTML") {
                            handleHtmlBtnClick();
                            setDownloadType(e.target.value);
                          }
                          else if (e.target.value === "CSV") {
                            //handleCsvBtnClick();
                            setDownloadType(e.target.value);
                          }
                          else if (e.target.value === "PDF") {
                            //handlePdfBtnClick();
                            handlePdfAlertBtnClick();
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
              </div>
              <div className="top-filter clearfix p-5">
                {isOpeningOrderStatus ? (
                  <FormGroup className="w-20 mb-5">
                    <Label for="startDate">From Date</Label>
                    <Input type="date" name="fromDate" id="fromDate"
                      value={fromDate}
                      onChange={(e) => {
                        console.log((e.target.value));
                        setFromDate((e.target.value));
                      }} />
                  </FormGroup>
                ) : null}
                {isOpeningOrderStatus ? (
                  <FormGroup className="w-20 mb-5">
                    <Label for="toDate">To Date</Label>
                    <Input type="date" name="toDate" id="toDate"
                      value={toDate}
                      onChange={(e) => {
                        console.log((e.target.value));
                        setToDate((e.target.value));
                      }} />
                  </FormGroup>
                ) : null}
                {isDocType ? (
                  <FormGroup className="w-10 mb-5 pl-20 form-group mt-20">
                    <div className="radio">
                      <Input type="radio" name="radio" id="radio"
                        value='CREDIT_DEBIT_NOTE_BY_DOCDATE' defaultChecked
                        onChange={(e) => {
                          console.log((e.target.value));
                          setDocProcType((e.target.value));

                        }}
                      /><Label for="toDate">Doc Date</Label>
                    </div>

                    <div className="radio">
                      <Input type="radio" name="radio" id="radio"
                        value='CREDIT_DEBIT_NOTE_BY_POSTINGDATE'
                        onChange={(e) => {
                          console.log((e.target.value));
                          setDocProcType((e.target.value));
                        }}
                      />
                      <Label for="toDate">Posting Date</Label>
                    </div>

                  </FormGroup>
                ) : null}
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
                  <Label for="Select-1">Type</Label>
                  <div className="app-selectbox-sm">
                    <Input type="select" name="select" id="Select-2"
                      onChange={(e) => {
                        setAllReqType(e.target.value);
                      }}
                    >
                      <option value={0}>Select Type</option>
                      {reqAllTypeValues.map((option) => (
                        <option key={option.value} value={option.label}>{option.label}</option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 w-100" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
              <div className="top-filter clearfix p-5">
                <FormGroup className="w-20 mb-5">
                  <Label for="Select-1">Report Options</Label>
                  <div className="app-selectbox-sm">
                    <Input type="select" name="select" id="Select-2"
                      onChange={(e) => {
                        setGridData([])
                        console.log(e.target.value)
                        if (e.target.value == "CUSTOMER_LEDGER") {
                          columnsDynamic(e.target.value)

                          // setReportOption(e.target.value)
                          setIsOpeningOrderStatus(true);
                          setIsDocType(false);
                        }
                        else if (e.target.value == "COLLECTION_REGISTER") {
                          columnsDynamic(e.target.value)
                          // setReportOption(e.target.value)
                          setIsOpeningOrderStatus(true);
                          setIsDocType(false);
                        }
                        else if (e.target.value == "DEBTOR_AGEING") {
                          columnsDynamic(e.target.value)
                          // setReportOption(e.target.value)
                          setIsOpeningOrderStatus(false);
                          setIsDocType(false);
                        }
                        else if (e.target.value == "CHEQUE_DEPOSIT") {
                          columnsDynamic(e.target.value)
                          // setReportOption(e.target.value)
                          setIsOpeningOrderStatus(false);
                          setIsDocType(false);
                        }
                        else if (e.target.value == "BALANCE_CONFIRMATION") {
                          columnsDynamic(e.target.value)
                          // setReportOption(e.target.value)
                          setIsOpeningOrderStatus(false);
                          setIsDocType(false);
                        }
                        else if (e.target.value == "CREDIT_DEBIT_SUMMARY") {
                          columnsDynamic(e.target.value)
                          // setReportOption(e.target.value)
                          setIsOpeningOrderStatus(true);
                          setIsDocType(true);
                        }
                        /* else if(e.target.value == "CREDIT_DEBIT_NOTE_BY_DOCDATE"){
                          setIsDocType(true);
                        }
                        else if(e.target.value == "CREDIT_DEBIT_NOTE_BY_POSTINGDATE"){
                          setIsDocType(true);
                        } */
                        else {
                          setIsOpeningOrderStatus(true);
                        }
                        setReportsType(e.target.value);
                      }}
                    >
                      <option value={0}>Select Type</option>
                      {reqReportTypeValues.map((option) => (
                        <option key={option.value} value={option.label}>{option.label}</option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
                <FormGroup className="w-20-mb-5">
                  <Label className="d-block">&nbsp;</Label>
                  <Button className="btn-primary text-white" onClick={getData}>Get Report</Button>
                </FormGroup>
              </div>
            </div>
          </div>
          {/* <div style={{ height: "1px", width: "100%", backgroundColor: "#9f538675", marginTop: "-22px" }} /> */}
          <div className="top-filter clearfix p-6">
            {!isgetRowData ? (<>
              {gridData && gridData.length > 0 ? (<>
              {reportsType == 'CUSTOMER_LEDGER' ? (<> 
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5 className="redColor">Ledger from {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")}</h5><br/>
              <div className="openBalanceSpan">Opening Balance as on {moment(fromDate).format("DD/MM/YYYY")} : {openBalance.length > 0 ? openBalance[0].OpenBal :'' }</div><div className="closeBalanceSpan">Closing Balance as on {moment(toDate).format("DD/MM/YYYY")} : {closeBalance.length > 0 ? closeBalance[0].ClosingBal : '' } </div>
              <Table ref={table} id="customer_ledger_height" freezeFooter={freezeFooter} grouping={grouping} dataSource={gridData} keyboardNavigation={keyboardNavigation} paging={paging} columns={columnDynamicState}></Table>                
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == 'COLLECTION_REGISTER'  ? (<> 
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5 className="redColor">Collection Register between {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")} as on {moment(toDate).format("DD/MM/YYYY")}</h5>
              <Table ref={table} id="customer_ledger_height" freezeFooter={freezeFooter} grouping={grouping} dataSource={gridData} keyboardNavigation={keyboardNavigation} paging={paging} columns={columnDynamicState}></Table>                
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == 'DEBTOR_AGEING'  ? (<> 
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5>Debtor Ageing Report for all Customers as on {moment(toDate).format("DD/MM/YYYY")}</h5>
              <h5 style={{ color:"#FF6600" }}>{agentName}</h5>
              <Table ref={table} id="customer_ledger_height" freezeFooter={freezeFooter} dataSource={gridData} grouping={grouping} keyboardNavigation={keyboardNavigation} paging={paging} columns={columnDynamicState}></Table>                
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == 'CHEQUE_DEPOSIT' ? (<> 
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5>Cheque Deposit between {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")} as on {moment(toDate).format("DD/MM/YYYY")}</h5>
              <Table ref={table} id="customer_ledger_height" freezeFooter={freezeFooter} dataSource={gridData} grouping={grouping} keyboardNavigation={keyboardNavigation} paging={paging} columns={columnDynamicState}></Table>                
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == 'BALANCE_CONFIRMATION' ? (<> 
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5>Balance Confirmation Status for customers</h5>
              <Table ref={table} id="customer_ledger_height" freezeFooter={freezeFooter} dataSource={gridData} keyboardNavigation={keyboardNavigation} paging={paging} columns={columnDynamicState}></Table>                
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == 'CREDIT_DEBIT_SUMMARY' ? (<> 
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5>Credit/Debit Note Summary</h5>
              <Table ref={table} id="customer_ledger_height" freezeFooter={freezeFooter} dataSource={gridData} keyboardNavigation={keyboardNavigation} paging={paging} columns={columnDynamicState}></Table>                
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}
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
          {/* </div> */}
        </div>
      </div>
    </>
  )
}