/**
 * News Dashboard
 */
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import baseURL from '../../../baseurl';
import { format } from 'date-fns';
import { Table } from 'smart-webcomponents-react/table';
import Button from "@material-ui/core/Button";
//import { Grid } from 'smart-webcomponents-react/grid';
import { MultiComboInput } from 'smart-webcomponents-react/multicomboinput';
import { Bars } from "react-loader-spinner";
import usePagination from "../hooks/usePagination";
// import { Pagination } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import 'smart-webcomponents-react/source/styles/smart.default.css';
import "../../../style.css";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import moment from 'moment';
//import { Button } from 'smart-webcomponents-react/button';


export default function ReportsInvoice() {
  const [CustomerList, setCustomerList] = useState([]);
  const [fromDate, setFromDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [custCode, setCustCode] = useState('');
  const [reqType, setReqType] = useState('');
  const [allType, setAllReqType] = useState('');
  const [proctype, setProcType] = useState('BRAND_SUMMARY');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [reportsFormat, setreportsFormat] = useState('HTML');
  const gridRef = useRef();
  const multicomboinput = React.createRef();
  const [reportsType, setReportsType] = useState('');
  const [isOpeningOrderStatus, setIsOpeningOrderStatus] = useState(true);
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" })
  const [columnDynamicState, setColumnDynamicState] = useState([])
  const [headers, setHeaders] = useState([])
  const [validationMessage, setValidationMessage] = useState("")
  const [downloadType, setDownloadType] = useState('');
  const [downloadFlag, setDownloadFlag] = useState(false);
  const keyboardNavigation = true;
  const paging = true;
  const grouping = true;
  const table = React.createRef();
  const csvRef = React.createRef();
  const [agentName, setAgentName] = useState('');

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

  const handleHtmlBtnClick = () => {
    if (table.current) {
      table.current.exportData('html', reportsType);
    }
    else {
      alert("Sorry, No records to download!");
    }
  };

  const handleCsvBtnClick = async () => {
    //if (table.current) {
      //table.current.exportData('xlsx', reportsType);
      //setDownloadFlag(true);
      try {
        let data = {
          from: null,
          to: null,
          customer: customerCode(),
          all: allType,
          reportFormat: reportsFormat,
          REPORT_TYPE: reportsType,
          userUID: localStorage.getItem("userUID")
        }
        let fromto = {
          customer: customerCode(),
          from: fromDate,
          to: toDate,
          all: allType,
          reportFormat: reportsFormat,
          REPORT_TYPE: reportsType,
          userUID: localStorage.getItem("userUID")
        }
        const returnapi = await axios.post(`${baseURL}/api/getinvoicedetailscsv`, isOpeningOrderStatus ? fromto : data);
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

  const handlePdfBtnClick = () => {
    if (table.current) {
      table.current.exportData('pdf', reportsType);
      //getPDF();
    } else {
      alert("Sorry, No records to download!");
    }
  };


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

  const { paginate, count, currentItems, currentPage } = usePagination(
    gridData,
    20
  );

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
    } else {
      Promise.all([
        Promise.resolve(getDetails())
      ])
    }
  }


  const getDetails = () => {
    setNorecordFound({ display: "none", marginTop: "5rem" })
    if (multicomboinput?.current?.selectedValues.length === 0) {
      setValidationMessage("Customer name is required")
      setNorecordFound({ display: "block", marginTop: "5rem" })
      return
    } else {
      setIsgetRowData(true);
      async function fetchData() {
        try {
          let data = {
            from: null,
            to: null,
            customer: customerCode(),
            all: allType,
            reportFormat: reportsFormat,
            REPORT_TYPE: reportsType,
            userUID: localStorage.getItem("userUID")
          }
          let fromto = {
            customer: customerCode(),
            from: fromDate,
            to: toDate,
            all: allType,
            reportFormat: reportsFormat,
            userUID: localStorage.getItem("userUID"),
            REPORT_TYPE: reportsType,
            userUID: localStorage.getItem("userUID")
          }
          const returnapi = await axios.post(`${baseURL}/api/getinvoicedetails`, isOpeningOrderStatus ? fromto : data);
          if (returnapi?.data.data.result) {
            setIsgetRowData(false);
            setAgentName(returnapi.data.data.agentname);
            if (returnapi?.data.data.result.length === 0) {
              setValidationMessage("No record found")
              setNorecordFound({ display: "block", marginTop: "5rem" })
            } else {
              setGridData(returnapi?.data.data.result);
              setNorecordFound({ display: "none", marginTop: "5rem" })
            }
          } else {
            setIsgetRowData(false)
          }
        } catch (error) {
          console.log("Error", error);
        }

      }
      fetchData();
    }
  }

  const reqAllTypeValues = [
    {
      label: "All",
      value: 0,
    }
  ];

  const reqReportTypeValues = [
    {
      label: "BRAND_SUMMARY",
      value: 0
    },
    {
      label: "CUSTOMER_SUMMARY",
      value: 1
    },
    {
      label: "DETAILED",
      value: 2
    },
    {
      label: "STYLE_WISE",
      value: 3
    },
    {
      label: "AGEING",
      value: 4
    }
  ]

  useEffect(() => {
    getCustomerList();
  }, []);

  useEffect(() => {
    init();
  }, [table])
  
  const init = () => {
    if (table.current) {
      const tableValue = table.current;
      if (reportsType == "CUSTOMER_SUMMARY") {
        tableValue.addGroup('custCode');
      }
      if (reportsType == "STYLE_WISE") {
        tableValue.addGroup('CustCode');
      }
      if (reportsType == "DETAILED") {
        tableValue.addGroup('custCode');
      }
    }
  }

  useEffect(() => {
    if (downloadFlag) {
      csvRef.current.link.click();
      setDownloadFlag(false);
    }
  }, [downloadFlag]);

  const getPDF = () => {
    const doc = new jsPDF();
    const arr = table.current.props.dataSource;
    console.log(arr);
    const result = Array.isArray(arr) ? arr.reduce((acc, curr) => acc + curr, 0) : 0;
    console.log(result);
    //const data = table.current.props.dataSource;
    //console.log(table.current.props.dataSource);
    doc.table(0,0, result, {
      callback: function (doc) {
        doc.save();
      }
    });
  }

  const behavior = {
    columnResizeMode: 'growAndShrink'
  }
  const sorting = {
    enabled: true
  }

  const columnsDynamic = (reportType) => {
    if (reportType === "BRAND_SUMMARY") {
      setColumnDynamicState([
        { label: 'Brand', dataField: 'Brand', width: '7%'},
        { label: 'Product', dataField: 'Product', width: '15%'},
        { label: 'Qty', dataField: 'Qty', width: '7%'},
        { label: 'MRP', dataField: 'RetailPrice', width: '7%' },
        { label: 'Excise Rate', dataField: 'ExciseRate', width: '15%' },
        { label: 'WSP', dataField: 'WholeSalePrice', width: '15%' },
        { label: 'Trade Discount', dataField: 'TradeDiscount', width: '15%' },
        { label: 'Cash Discount', dataField: 'CashDiscount', width: '15%' },
        { label: 'Service Charge', dataField: 'ServiceCharge', width: '15%' },
        { label: 'Sales Tax', dataField: 'SalesTax', width: '15%' },
        { label: 'Net Value', dataField: 'NetValue', width: '15%' }
      ])
      setHeaders([
        { label: 'Brand', key: 'Brand' },
        { label: 'Product', key: 'Product' },
        { label: 'Qty', key: 'Qty' },        
        { label: 'MRP', key: 'RetailPrice'},
        { label: 'Excise Rate', key: 'ExciseRate'},
        { label: 'WSP', key: 'WholeSalePrice'},        
        { label: 'Trade Discount', key: 'TradeDiscount'},
        { label: 'Cash Discount', key: 'CashDiscount'},
        { label: 'Service Charge', key: 'ServiceCharge'},
        { label: 'Sales Tax', key: 'SalesTax'},                
        { label: 'Net Value', key: 'NetValue'}
      ])
    } else if (reportType === "CUSTOMER_SUMMARY") {
      setColumnDynamicState([
        { label: 'custCode', dataField: 'custCode', width: '30%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value + ' - ' + settings.data.custName;
          }     
        }},
        { label: 'Brand', dataField: 'Brand', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Product', dataField: 'Product', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = 'Total :';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Qty', dataField: 'Qty', width: '7%'},
        { label: 'MRP', dataField: 'RetailPrice', width: '7%' },
        { label: 'Excise Rate', dataField: 'ExciseRate', width: '15%' },
        { label: 'WSP', dataField: 'WholeSalePrice', width: '15%' },
        { label: 'Trade Discount', dataField: 'TradeDiscount', width: '15%' },
        { label: 'Cash Discount', dataField: 'CashDiscount', width: '15%' },
        { label: 'Service Charge', dataField: 'ServiceCharge', width: '15%' },
        { label: 'Sales Tax', dataField: 'SalesTax', width: '15%' },
        { label: 'Net Value', dataField: 'NetValue', width: '15%' }
      ])
      setHeaders([
        { label: 'Brand', key: 'Brand' },
        { label: 'Product', key: 'Product' },
        { label: 'Qty', key: 'Qty' },        
        { label: 'MRP', key: 'RetailPrice'},
        { label: 'Excise Rate', key: 'ExciseRate'},
        { label: 'WSP', key: 'WholeSalePrice'},        
        { label: 'Trade Discount', key: 'TradeDiscount'},
        { label: 'Cash Discount', key: 'CashDiscount'},
        { label: 'Service Charge', key: 'ServiceCharge'},
        { label: 'Sales Tax', key: 'SalesTax'},                
        { label: 'Net Value', key: 'NetValue'}
      ])
    } else if (reportType === "DETAILED") {
      setColumnDynamicState([
        { label: 'Cust Code', dataField: 'custCode', width: '15%' },
        { label: 'Cust Name', dataField: 'custName', width: '20%' },
        { label: 'Document', dataField: 'Document', width: '15%' },
        { label: 'Bill Date', dataField: 'billdate', width: '9%' },
        { label: 'LR Number', dataField: 'LRNumber', width: '15%' },
        { label: 'LR Date', dataField: 'LRdate', width: '9%' },
        { label: 'Quantity', dataField: 'Quantity', width: '7%' },
        { label: 'Net Value', dataField: 'NetValue', width: '7%' },
        { label: 'Agent Name', dataField: 'agentname', width: '15%' },
        { label: 'Product Name', dataField: 'prodname', width: '15%' },
        { label: 'Brand Code', dataField: 'BrandCode', width: '7%' },
        { label: 'Reference No', dataField: 'referenceno', width: '15%'}        
      ])
      setHeaders([
        { label: 'Brand', key: 'Brand' },
        { label: 'Product', key: 'Product' },
        { label: 'Qty', key: 'Qty' },        
        { label: 'MRP', key: 'RetailPrice'},
        { label: 'Excise Rate', key: 'ExciseRate'},
        { label: 'WSP', key: 'WholeSalePrice'},        
        { label: 'Trade Discount', key: 'TradeDiscount'},
        { label: 'Cash Discount', key: 'CashDiscount'},
        { label: 'Service Charge', key: 'ServiceCharge'},
        { label: 'Sales Tax', key: 'SalesTax'},                
        { label: 'Net Value', key: 'NetValue'}
      ])
    }
    else if (reportType === "STYLE_WISE") {
      setColumnDynamicState([
        { label: 'Cust code', dataField: 'CustCode', width: '15%'},
        { label: 'Cust Name', dataField: 'CustName', width: '20%' },
        { label: 'Cust group', dataField: 'CustGroup', width: '7%' },
        { label: 'Brand', dataField: 'Brand', width: '7%' },
        { label: 'Season', dataField: 'season', width: '7%' },
        { label: 'Style code', dataField: 'StyleCode', width: '15%' },
        { label: 'Size code', dataField: 'Sizecode', width: '15%' },
        { label: 'Product Name', dataField: 'Product', width: '15%' },
        { label: 'Plant code', dataField: 'PlantCode', width: '7%' },
        { label: 'Document', dataField: 'Document', width: '15%' },
        { label: 'Reference no', dataField: 'ReferenceNo', width: '15%' },
        { label: 'Bill date', dataField: 'BillDate', width: '15%' },
        { label: 'Qty', dataField: 'Qty', width: '7%' },
        { label: 'WholeSale Price', dataField: 'WholeSalePrice', width: '15%' },
        { label: 'Retail Price', dataField: 'RetailPrice', width: '7%' },
        { label: 'Trade discount', dataField: 'TradeDiscount', width: '15%' },
        /* { label: 'Style code', dataField: 'StyleCode', width: '7%' }, */
        { label: 'Cash discount', dataField: 'CashDiscount', width: '15%' },
        { label: 'Service', dataField: 'Service', width: '7%' },
        { label: 'Sales tax', dataField: 'SalesTax', width: '7%' },
        { label: 'NetValue', dataField: 'NetValue', width: '7%' },
        { label: 'HSNCode', dataField: 'HSNCode', width: '7%' },
      ])
      setHeaders([
        { label: 'CustCode', key: 'CustCode' },
        { label: 'CustName', key: 'CustName' },
        { label: 'CustGroup', key: 'CustGroup' },        
        { label: 'Brand', key: 'Brand'},
        { label: 'Season', key: 'season'},
        { label: 'StyleCode', key: 'StyleCode'},        
        { label: 'Sizecode', key: 'Sizecode'},
        { label: 'Product', key: 'Product'},
        { label: 'PlantCode', key: 'PlantCode'},
        { label: 'Document', key: 'Document'},                
        { label: 'ReferenceNo', key: 'ReferenceNo'},
        { label: 'Bill date', key: 'BillDate'},
        { label: 'Quantity', key: 'Qty'},
        { label: 'WSP', key: 'WholeSalePrice'},
        { label: 'MRP', key: 'RetailPrice'},
        { label: 'Trade discount', key: 'TradeDiscount'},
        /* { label: 'Style code', dataField: 'StyleCode', width: '7%' }, */
        { label: 'Cash discount', key: 'CashDiscount'},
        { label: 'Service', key: 'Service'},
        { label: 'Sales tax', key: 'SalesTax'},
        { label: 'NetValue', key: 'NetValue'},
        { label: 'HSNCode', key: 'HSNCode'}
      ])
    }
    else {
      setColumnDynamicState([
        { label: 'Cust code', dataField: 'custCode', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Name', dataField: 'custName', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
       /*  { label: 'Brand', dataField: 'Brand', width: '15%' }, */
        { label: 'Reference', dataField: 'Reference', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Doc no', dataField: 'DocNo', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'DocDate2', dataField: 'DocDate', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'DueDt', dataField: 'NetDueDt', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Payment term', dataField: 'PaymentTerm', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = 'Total :';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Amount', dataField: 'Amount', width: '7%'},
        { label: 'Arrear', dataField: 'Arrear', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Comments', dataField: 'Comments', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != '') {
            settings.template = '';
          } else {
            settings.template = settings.value;
          }          
        } },
       /*  { label: 'Document', dataField: 'Document', width: '7%' },
        { label: 'Payment terms', dataField: 'paymentTerms', width: '7%' }, */
      ])
    }
  }

  const gridstyleDisplayNone = {
    display: "none",
    // height: "35vh",
    // width: "125vw",
    // overflowX: "auto"
  }
  const gridstyleDisplayBlock = {
    height: "35vh",
    width: "125vw",
    overflowX: "auto"
  }
  
  return (
    <div className="row">
      <div className="col-xs-12 w-100">
        <div className="row">
          <div className="col-xs-12 w-100" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            {/* <div className="user-management"> */}
            <div className="top-filter clearfix p-6">
              <div style={{ justifyContent: "start", display: "flex", marginTop: "-20px", }}>
                <h3 style={{
                  padding: "5px 5px 0px 5px",
                  borderRadius: "5px"
                }}>Invoice Register</h3>
              </div>
              <div style={{ justifyContent: "end", display: "flex", marginTop: "-30px", height: "25px" }}>
                <FormGroup className="frmgrp" style={{ width:"140px" }}>
                  <div className="app-selectbox-sm">
                    <Input type="select" name="select" id="Select-2"
                      onChange={(e) => {

                        if (e.target.value === "HTML") {
                          handleHtmlBtnClick();
                          setDownloadType(e.target.value);
                        }
                        else if (e.target.value === "CSV") {
                          //handleCsvBtnClick();
                          setDownloadType(e.target.value);
                        }
                        else if (e.target.value === "PDF") {
                          handlePdfBtnClick();
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
        </div>

        <div className="row">
          <div className="col-xs-12 w-100" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            <div className="top-filter clearfix p-5">
              <FormGroup className="w-20 mb-5">
                <Label for="Select-1">Report Options</Label>
                <div className="app-selectbox-sm">
                  <Input type="select" name="select" id="Select-2"
                    onChange={(e) => {
                      // setIsgetRowData(true);
                      setGridData([])
                      setReportsType(e.target.value);
                      columnsDynamic(e.target.value)
                      console.log(e.target.value)
                      if (e.target.value == "AGEING") {

                        setIsOpeningOrderStatus(false);
                      }
                      else {
                        setIsOpeningOrderStatus(true);
                      }

                    }}
                  >
                    <option value={0}>Select Type</option>
                    {reqReportTypeValues.map((option) => (
                      <option key={option.value} value={option.label}>{option.label}</option>
                    ))}
                  </Input>
                </div>
              </FormGroup>
              <FormGroup className="w-20 mb-5">
                <Label className="d-block">&nbsp;</Label>
                <Button className="btn-primary text-white" onClick={getData}>Get Report</Button>
              </FormGroup>
            </div>
          </div>
        </div>
        {/* <div style={{ height: "1px", width: "100%", backgroundColor: "#9f538675" }} /> */}
        <div className="top-filter clearfix p-5">
          {!isgetRowData ? (<>
            {gridData && gridData.length > 0 ? (<>
            {reportsType == "BRAND_SUMMARY" ? (<>
            <h5>Madura Fashion & Lifestyle Division.</h5>
            <h5>Aditya Birla Fashion & Retail Ltd.</h5>
            <h5>Brand wise sales summary report between {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")}</h5>
            <h5 style={{ color:"#FF6600" }}>{agentName}</h5>
            <Table ref={table} id="reports_invoice" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}
              
              {reportsType == "CUSTOMER_SUMMARY" ? (<>
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5>Customer wise sales summary report between {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")}</h5>
              <h5 style={{ color:"#FF6600" }}>{agentName}</h5>
              <Table ref={table} id="reports_invoice" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == "DETAILED" ? (<>
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <Table ref={table} id="reports_invoice" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == "STYLE_WISE" ? (<>
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <h5>Customer wise sales report between {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")}</h5>
              <h5 style={{ color:"#FF6600" }}>{agentName}</h5>
              <Table ref={table} id="reports_invoice" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}

              {reportsType == "AGEING" ? (<>
              <h5>Madura Fashion & Lifestyle Division.</h5>
              <h5>Aditya Birla Fashion & Retail Ltd.</h5>
              <Table ref={table} id="reports_invoice" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
              {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} filename={reportsType+".csv"} headers={headers} target="_blank"></CSVLink> : null}
              </>) : (null)}
              </>) : (<div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
              <h3 style={noRecordFound}>{validationMessage}</h3></div>)}
          </>) : <div className="spinner_SVG"><Bars
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
    </div >
  )
}
