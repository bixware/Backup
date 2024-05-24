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
import "../../../style.css";
import { Bars } from "react-loader-spinner";

export default function Customers() {
  const [reqType, setReqType] = useState('');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [downloadFile, setdownloadFile] = useState('');
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const gridRef = useRef();
  const multicomboinput = React.createRef();
  
  useEffect(() => {
    setIsgetRowData(true);
    getDownloadFile();
  }, []);

  const getDownloadFile = async () => {
    try {
      const returnapi = await axios.post(`${baseURL}/api/downloadfilelist`, { UserId: localStorage.getItem('userUID') });
      if (!returnapi.data.error) {
        setdownloadFile(
          returnapi.data.data
        );
        setIsgetRowData(false);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-management">
      <h3 style={{
        marginTop: "-20px",
        padding: "5px 5px 0px 5px",
        borderRadius: "5px"
      }}>Scheme Working</h3>
      <div className="top-filter clearfix p-5"> 
      {!isgetRowData ? (<>    
        { downloadFile.fileName?.map((q,i) => (
          <a style={{display: "block"}} href={`https://mgorder1.abfrl.com/tradeportal/API/storage/${downloadFile.filePath[i]}`} download>{q}</a>
        )) }
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
  )
}