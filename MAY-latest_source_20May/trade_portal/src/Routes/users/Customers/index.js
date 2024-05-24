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
import { PanoramaSharp } from "@material-ui/icons";
import { Bars } from "react-loader-spinner";
import "../../../style.css"
//import { Button } from 'smart-webcomponents-react/button';

export default function Customers() {
  const [reqType, setReqType] = useState('');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [id, setId] = useState('');
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" })
  const [validationMessage, setValidationMessage] = useState("")
  const gridRef = useRef();
  const multicomboinput = React.createRef();

  const getCustomerList = async () => {
    try {
      setIsgetRowData(true)
      const returnapi = await axios.post(`${baseURL}/api/getcustomerlist`, { userUID: localStorage.getItem('userUID') });
      if (!returnapi.data.error) {
        setGridData(returnapi.data.data);
        setIsgetRowData(false)
        if (returnapi?.data.data.length == 0) {
          setValidationMessage("No record found")
          setNorecordFound({ display: "block", marginTop: "5rem" })
        } else {
          setValidationMessage("No record found")
          setNorecordFound({ display: "block", marginTop: "5rem" })
        }
      } else {
        setIsgetRowData(false)
        setNorecordFound({ display: "none", marginTop: "5rem" })
      }

    } catch (error) {
      setIsgetRowData(false)
      console.log(error);
    }
  };


  useEffect(() => {
    setIsgetRowData(true);
    getCustomerList();
  }, []);


  const columns = [
    { label: 'Customer Code', dataField: 'CustCode', width: "14%" },
    { label: 'Customer Name', dataField: 'CustName', width: "20%" },
    { label: 'Credit Limit', dataField: 'CreditLimit', width: "14%" },
    { label: 'Payment Terms', dataField: 'paymentTerms', width: "20%" },
    { label: 'Customer Group', dataField: 'CustGroup', width: "12%" },
    { label: 'OnHold Flag', dataField: 'OnHoldFlag', width: "10%" },
    { label: 'Overall Block', dataField: 'OverallBlock', width: "10%" }
  ]

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
      }}> Customers</h3>

      <div className="top-filter clearfix p-5">
        {!isgetRowData ? (<>
          {gridData && gridData.length > 0 ? (<>    <Grid ref={gridRef}
            id="customers_height"
            dataSource={gridData}
            columns={columns}
            behavior={behavior}
            sorting={sorting}
          >
          </Grid>

          </>) : (<div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
            <h3 style={noRecordFound}>No record found</h3></div>)}
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
      {/* <br></br> */}

    </div>
  )
}
