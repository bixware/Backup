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
import { Bars } from "react-loader-spinner";
import 'smart-webcomponents-react/source/styles/smart.default.css';
import "../../../style.css"
//import { Button } from 'smart-webcomponents-react/button';

export default function Customer() {
  const [CustomerList, setCustomerList] = useState([]);
  const [fromDate, setFromDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [custCode, setCustCode] = useState('');
  const [reqType, setReqType] = useState('');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [reportsFormat, setreportsFormat] = useState('HTML');
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" })
  const [user, setUser] = useState(localStorage.getItem('USER'));
  const User = JSON.parse(user);
  const gridRef = useRef();
  const [validationMessage, setValidationMessage] = useState("")
  const multicomboinput = React.createRef();
  const [downloadType, setDownloadType] = useState('');

  const reqTypeValues = [
    {
      label: "All",
      value: 0,
    }
  ];

  const downloadTypes = [
    {
      label: "HTML",
      value: 0,
    },
    {
      label: "CSV",
      value: 1,
    },
    {
      label: "PDF",
      value: 2,
    }
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
    setNorecordFound({ display: "none", marginTop: "5rem" })
    if (multicomboinput?.current?.selectedValues.length === 0) {
      setNorecordFound({ display: "block", marginTop: "5rem" })
      setValidationMessage("Customer name is required")
      return
    } else {
      async function fetchData() {
        setIsgetRowData(true);
        try {
          const returnapi = await axios.post(`${baseURL}/api/getcustomeronhold`, {
            custCode: customerCode(),
            reportFormat: reportsFormat,
            userUID: User.userUID
          });

          if (returnapi?.data.data) {

            setIsgetRowData(false);

            if (returnapi?.data.data.length === 0) {
              setValidationMessage("No records found")
              setNorecordFound({ display: "block", marginTop: "5rem" })
            } else {
              setGridData(returnapi?.data.data);
              setNorecordFound({ display: "none", marginTop: "5rem" })
            }
          } else {
            setValidationMessage("Something went wrong")
            setIsgetRowData(false);
            setGridData([])
          }
        } catch (error) {
          setValidationMessage("Something went wrong")
          setNorecordFound({ display: "block", marginTop: "5rem" })
          setIsgetRowData(false);
          console.log("Error", error);
        }
      }
      fetchData();
    }

  }

  useEffect(() => {
    getCustomerList();
  }, []);


  const columns = [
    { label: 'Customer Code', dataField: 'CustCode', width: "33%" },
    { label: 'Customer Name', dataField: 'CustName', width: "33%" },
    { label: 'OnHold Reason', dataField: 'OnHoldReasonCode', width: "33%" }
  ]

  const handleHtmlBtnClick = () => {
    if (gridRef.current) {
      console.log(gridRef.current);
      gridRef.current.exportData('html');
    }
    else {
      alert("Sorry, No records to download!");
      console.error("gridRef is undefined");
    }

  };

  const handleCsvBtnClick = () => {
    if (gridRef.current) {
      gridRef.current.exportData('csv');
    } else {
      alert("Sorry, No records to download!");
      console.error("gridRef is undefined");
    }
  };

  const handlePdfBtnClick = () => {
    if (gridRef.current) {
      gridRef.current.exportData('pdf');
    } else {
      alert("Sorry, No records to download!");
      console.error("gridRef is undefined");
    }
  };


  const behavior = {
    columnResizeMode: 'growAndShrink'
  }
  const sorting = {
    enabled: true
  }

  return (
    // <div className="user-management">
    <>
      <div className="top-filter clearfix p-6">
        <div style={{ justifyContent: "start", display: "flex" }}>
          <h3 style={{
            marginTop: "-20px",
            padding: "5px 5px 0px 5px",
            borderRadius: "5px"
          }}>Customer OnHold</h3>
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
                    handleCsvBtnClick();
                    setDownloadType(e.target.value);
                  }
                  else if (e.target.value === "PDF") {
                    handlePdfBtnClick();
                    setDownloadType(e.target.value);
                  }

                }}
              >
                <option value={0}>Select Download</option>
                {downloadTypes.map((option) => (
                  <option key={option.value} value={option.label}>{option.label}</option>

                ))}
              </Input>
            </div>
          </FormGroup>
        </div>

      </div>

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
          <Label for="Select-1">Type</Label>
          <div className="app-selectbox-sm">
            <Input type="select" name="select" id="Select-2"
              onChange={(e) => {
                setReqType(e.target.value);
              }}
            >
              <option value={0}>Select Type</option>
              {reqTypeValues.map((option) => (
                // <MenuItem key={option.CustCode} value={option.CustCode}>
                //   {option.CustName}
                // </MenuItem>
                <option key={option.value} value={option.label}>{option.label}</option>

              ))}
            </Input>
          </div>
        </FormGroup>
        <FormGroup className="mb-5">
          <Label className="d-block">&nbsp;</Label>
          <Button className="btn-primary text-white" onClick={getDetails}>Get Report</Button>
        </FormGroup>
      </div>
      {/* <div style={{ height: "1px", width: "100%", backgroundColor: "#9f538675" }} /> */}
      {!isgetRowData ? (<>
        {gridData && gridData.length > 0 ? (<>    <Grid ref={gridRef}
          id="customer_height"
          dataSource={gridData}
          columns={columns}
          behavior={behavior}
          // appearance={appearance}
          // paging={paging}
          sorting={sorting}
        // uncomment this for pagination
        // pager={pager}
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

      {/* // </div> */}
    </>
  )
}
