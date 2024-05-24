import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { apiGet, apiPost, apiFormDataPost } from "Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import MatButton from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Button from "@mui/material/Button";
import { Label, Input, FormGroup } from "reactstrap";
import { NotificationManager } from "react-notifications";
import { FileUploader } from "react-drag-drop-files";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Textarea from "@mui/material/TextField";
import { IMAGEURL } from "../../base";
import SweetAlert from "react-bootstrap-sweetalert";

function ViewRequest(props) {
  const [rowData, setrowData] = useState({});
  const [fileData, setfileData] = useState([]);
  const [remarkFileData, setremarkFileData] = useState([]);
  const docFileTypes = [
    "png",
    "PDF",
    "DOCX",
    "DOC",
    "xlsx",
    "xls",
    "csv",
    "zip",
    "eml",
  ];
  const history = useHistory();
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const userData = User.get_work_flow_statge_user;
  const selData = sessionStorage.getItem("selectedData");
  const selectedData = JSON.parse(selData);
  const [supportiveDocs, setSupportiveDocs] = useState([]);
  const [dataEntryDocs, setDataEntryDocs] = useState([]);
 
  useEffect(() => {
    (async () => {
      try {
        // console.log(props);
        let data = {
          workFlowRequestUID: selectedData.workFlowRequestUID,
        };
        const response = await apiPost("user/viewapproverstatus", data);
        console.log(response.data.data.upload_file);
        setfileData(response.data.data?.upload_file);
        let sDocs = [];
        let dDocs = [];
        if (response.data.data?.upload_file.length > 0) {
          response.data.data?.upload_file.forEach((item) => {
            if (item.dataEntryFileName) {
              dDocs.push(item)
            }else{
              sDocs.push(item) 
            }
          })
        }
        setSupportiveDocs(sDocs);
        setDataEntryDocs(dDocs);
        setremarkFileData(
          response.data.data?.remarks_file
            ? response.data.data?.remarks_file
            : []
        );
        setrowData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  function openImageInNewTab(imageUrl) {
    // Create a new tab with the image URL
    window.open(imageUrl, "_blank");
  }

  return (
    <div className="wrapper">
      <div className="container-fluid">
      <div className="row">
            <div className="col-sm-8">
              <h4 className="page-title" style={{ fontSize: "1.5rem" }}>
                View Request Details
              </h4>
            </div>
            <div className="col-sm-4 text-right">
              <a
                href="#"
                onClick={(e) => history.goBack()}
                className="btn btn-sm btn-primary"
                style={{ marginLeft: "auto" }}
              >
                Back
              </a>
            </div>
          </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-3">
              <div className="card-body">
                {/* <h4 className="mt-0 header-title">Personal Details </h4> */}
                <div className="row">
                  <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group d-flex justify-content-between">
                        <label>Request No </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Brand </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Category </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Vendor Code </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Vendor Name </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Remarks </label>
                        <span>:</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group">
                        <label>{rowData.requestNo}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.brand}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.category}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.vendorCode}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.vendorDescription}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Remarks}</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group d-flex justify-content-between">
                        <label>SKU Code </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>SKU Description </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>From Date </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>To Date </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>DC / DSD </label>
                        <span>:</span>
                      </div>
                    
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group">
                        <label>{rowData.materialCode}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.description}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.fromDate}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.toDate}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.dcdsdName}</label>
                      </div>
                  
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                  <div className="p-20">
                    <div className="form-group d-flex justify-content-between">
                      <label>Supportive Documents </label>
                      <span>:</span>
                    </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="p-20">
                    <div className="form-group"  style={{display:"flex",flexDirection:"row",justifyContent:"start",alignItems:"center"}}>
                      {supportiveDocs.length > 0 ? (
                        <>
                          {fileData.map((item, i) => {
                            return (
                              <span key={i}>
                                <MatButton
                                  style={
                                    item.requestFileName === null
                                      ? { display: "none" }
                                      : { display: "block" }
                                  }
                                  variant="contained"
                                  className="btn-info mr-10 mb-10 text-white btn-icon"
                                  onClick={() =>
                                    openImageInNewTab(
                                      `${IMAGEURL}uploads/tickets/${item.requestFileName}`
                                    )
                                  }
                                  download={true}
                                >
                                  File{i + 1}{" "}
                                  <i className="zmdi zmdi-inbox"></i>
                                </MatButton>
                              </span>
                            );
                          })}
                        </>
                      ) : null}
                    </div>
                    </div>
                  </div>
                </div>
                {dataEntryDocs.length > 0 ? (
                  <div className="row">
                    <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group d-flex justify-content-between">
                        <label>Data entry Documents </label>
                        <span>:</span>
                      </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div className="p-20">
                      <div className="form-group"  style={{display:"flex",flexDirection:"row",justifyContent:"start",alignItems:"center"}}>
                        {fileData.map((item, i) => {
                          return (
                            <span key={i}>
                              <MatButton
                                style={
                                  item.dataEntryFileName === null
                                    ? { display: "none" }
                                    : { display: "block" }
                                }
                                variant="contained"
                                className="btn-info mr-10 mb-10 text-white btn-icon"
                                onClick={() =>
                                  openImageInNewTab(
                                    `${IMAGEURL}uploads/tickets/${item.dataEntryFileName}`
                                  )
                                }
                                download={true}
                              >
                                File{i + 1} <i className="zmdi zmdi-inbox"></i>
                              </MatButton>
                            </span>
                          );
                        })}
                      </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2%" }}></div>
      </div>
    </div>
  );
}

export default ViewRequest;
