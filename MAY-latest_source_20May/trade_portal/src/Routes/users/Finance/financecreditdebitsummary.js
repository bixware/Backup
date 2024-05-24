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
import { MultiComboInput } from 'smart-webcomponents-react/multicomboinput';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import "../../../style.css"
//import { Button } from 'smart-webcomponents-react/button';


export default function FinanceCreditDebitSummary() {
  const [CustomerList, setCustomerList] = useState([]);
  const [fromDate, setFromDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [custCode, setCustCode] = useState('');
  const [reqType, setReqType] = useState('');
  const [allType, setAllReqType] = useState('');
  const [docproctype, setDocProcType] = useState('CREDIT_DEBIT_NOTE_BY_DOCDATE');
  //const [postingproctype, setPostingProcType] = useState('CREDIT_DEBIT_NOTE_BY_POSTINGDATE');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [reportsFormat, setreportsFormat] = useState('HTML');
  const gridRef = useRef();
  const multicomboinput = React.createRef();

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

  const getDetails = () => {
    console.log(docproctype);
    setIsgetRowData(true);
    console.log(custCode);
    console.log(fromDate);
    async function fetchData() {
      try {
        const returnapi = await axios.post(`${baseURL}/api/getfinance`, {
          customer: multicomboinput.current.selectedValues,
          from: fromDate,
          to: toDate,
          PROC_TYPE: docproctype,
          all: allType,
          reportFormat: reportsFormat
        });
        console.log(returnapi);
        if (returnapi?.data.data) {
          setGridData(returnapi?.data.data);
        } else {
          setGridData([])
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchData();
  }

  const reqAllTypeValues = [
    {
      label: "All",
      value: 0,
    }
  ];

  useEffect(() => {
    getCustomerList();
  }, []);

  const handleCsvBtnClick = () => {
    /* if (gridRef.current && typeof gridRef.current.exportData === 'function') {
        gridRef.current.exportData('xlsx');
    } else {
        console.error("gridRef or exportData is undefined");
    } */
    if (gridRef.current) {
      gridRef.current.exportData('csv');
    } else {
      console.error("gridRef is undefined");
    }
  };

  const handlePdfBtnClick = () => {
    /* if (gridRef.current && typeof gridRef.current.exportData === 'function') {
        gridRef.current.exportData('xlsx');
    } else {
        console.error("gridRef or exportData is undefined");
    } */
    if (gridRef.current) {
      gridRef.current.exportData('pdf');
    } else {
      console.error("gridRef is undefined");
    }
  };


  /* const dataSource = new window.Smart.DataAdapter({
    dataFields: [
      'CustCode:string',
      'CustomerName:string',
      'creditDebitNo:string',
      'creditDebitDate:string',
      'docRef:string',
      'recType:string',
      'PdfName:string'
    ],
  }) */

  const columns = [
    { label: 'Cust Code', dataField: 'CustCode', width: '10%' },
    { label: 'Cust Name', dataField: 'CustName', width: '10%' },
    { label: 'SchemeDetail/Text', dataField: 'SchemeDetail/Text', width: '11%' },
    { label: 'Doc No', dataField: 'DocumentNo', width: '12%' },
    { label: 'Date', dataField: 'Date', width: '12%' },
    { label: 'Month', dataField: 'Month', width: '10%' },
    { label: 'Credit/DebitNoteNo', dataField: 'Credit/DebitNoteNo', width: '12%' },
    { label: 'OriginalInvoiceRefrence', dataField: 'OriginalInvoiceRefrence', width: '13%', }
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


  return (
    <div className="user-management">
      {/* <Helmet>
        <title>Credit & debit notes</title>
        <meta name="description" content="Reactify News Dashboard" />
      </Helmet> */}
      <h3 style={{
        marginTop: "-20px",
        padding: "5px 5px 0px 5px",
        borderRadius: "5px"
      }}>Finance credit & debit</h3>

      <div className="top-filter clearfix p-5">
        <FormGroup className="w-20 mb-5">
          <Label for="startDate">From Date</Label>
          <Input type="date" name="fromDate" id="fromDate"
            value={fromDate}
            onChange={(e) => {
              console.log((e.target.value));
              setFromDate((e.target.value));
            }} />

          {/* <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DatePicker
                    id="datepickerheight"
                    // label="From Date"
                    // name="fromDate"
                    renderInput={(props) => <TextField {...props} />}
                    value={fromDate}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setFromDate(newValue);
                    }}
                  />
                </LocalizationProvider> */}
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="toDate">To Date</Label>
          <Input type="date" name="toDate" id="toDate"
            value={toDate}
            onChange={(e) => {
              console.log((e.target.value));
              setToDate((e.target.value));
            }} />
          {/* <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DatePicker
                    id="datepickerheight"
                    // label="To Date"
                    renderInput={(props) => <TextField {...props} />}
                    // name="toDate"
                    value={toDate}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setToDate(newValue);
                    }}
                  />
                </LocalizationProvider> */}
        </FormGroup>
        {/* <FormGroup className="w-10 mt-15">
                      <div className="radio">
                      <label>
                      <input type="radio" value="docdate" checked={true} />
                      Doc Date
                      </label>
                      </div>
                      <div className="radio">
                      <label>
                      <input type="radio" value="postingdate" />
                      Posting Date
                      </label>
                      </div>
                      </FormGroup> */}

        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Customer Name</Label>
          {/* <div className="app-selectbox-sm">
                           <Input type="select" name="select" id="Select-2"
                           onChange={(e) => {setCustCode(e.target.value);
                          console.log(e.target.value)}}>
                           <option value={0}>Select Customer Name</option>
                           {CustomerList.map((option) => (
                        <option key={option.CustCode} value={option.CustCode}>{option.CustName}</option>
                        ))}
                           </Input>
                        </div> */}
          <MultiComboInput ref={multicomboinput} dataSource={CustomerList} dropDownButtonPosition="right" selectAll animation='advanced'
            placeholder="Select / Search customer name"
            inputTagsMode="one"
            inputPurpose="on"
            filterable
          ></MultiComboInput>

        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Type</Label>
          <div className="app-selectbox-sm">
            {/* <Input type="select" name="select" id="Select-2">
                           <option value={0}>Select Type</option>
                              <option value={1}>Credit</option>
                              <option value={2}>Debit</option>
                           </Input> */}
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
      <div className="top-filter clearfix p-5">

        <FormGroup className="w-20 mt-20 pl-20">
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
        <FormGroup className="mb-5">
          <Label className="d-block">&nbsp;</Label>
          <Button className="btn-primary text-white" onClick={getDetails}>Get Report</Button>
        </FormGroup>
      </div>
      <br></br>
      {isgetRowData ? (
        <Grid ref={gridRef}
          style={{
            height: '38vh',
            width: '100%'
          }}
          dataSource={gridData}
          columns={columns}
        >
        </Grid>

      ) : null}
      <div className="top-filter clearfix p-5">
        <i id="csvBtn" className="zmdi zmdi-download" style={{ fontSize: '20px' }}
          onClick={(e) => {
            handleCsvBtnClick(e.target.value);
            setreportsFormat(e.target.value);
          }}
        /* onChange={(e) => {setreportsFormat (e.target.value)}} */
        >&nbsp;CSV</i>&nbsp;&nbsp;
        <i id="csvBtn" className="zmdi zmdi-download" style={{ fontSize: '20px' }} onClick={(e) => {
          handlePdfBtnClick(e.target.value);
          setreportsFormat(e.target.value);
        }}
        /* onChange={(e) => {setreportsFormat (e.target.value)}} */
        >&nbsp;PDF</i>
      </div>
    </div>
  )
}
