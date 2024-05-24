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

function ViewReports(props) {
  const [rowData, setrowData] = useState({});

  const history = useHistory();
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const userData = User.get_work_flow_statge_user;
  const selData = sessionStorage.getItem("selectedData");
  const selectedData = JSON.parse(selData);

  useEffect(() => {
    (async () => {
      try {
        //console.log(props);
        let data = {
          workFlowRequestUID: selectedData.workFlowRequestUID,
        };
        console.log(data);
        let role = User.roleUID === "1" ? "admin" : "user";
        const response = await apiPost(`${role}/getreportview`, data);
        setrowData(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  // function getFileNames(value) {
  //   var array = str.split(";");
  // }

  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <h4 className="page-title" style={{ fontSize: "1.5rem" }}>
              View Report Details
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
                <div className="row">
                  <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group d-flex justify-content-between">
                        <label>Request ID </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Workflow </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Brand </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Request Status </label>
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
                        <label>SKU Code </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>SKU Description </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Price Changed From </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Price Changed To </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>DC/DSD </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Recipe Name </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>FG Code </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Initiator Remark </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Initiated Date </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Initiator File Name </label>
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
                        <label>{rowData.workFlowName}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.brand}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.RequestStatus}</label>
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
                        <label>{rowData.SKUCode}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.SKUDescription}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.PriceChangeFrom}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.PriceChangeTo}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.dcdsdName}</label>
                      </div>
                      <div className="form-group">
                        <label>
                          {rowData.receipeName ? rowData.receipeName : `-`}
                        </label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.FGCode ? rowData.FGCode : `-`}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.InitiatorRemarks}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.InitiatedOn}</label>
                      </div>
                      {/* <div className="form-group">
                        <label>{getFileNames(rowData.INIFileUpload)}</label>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group d-flex justify-content-between">
                        <label>Initiated By </label>
                        <span>:</span>
                      </div>
                      {/* <div className="form-group d-flex justify-content-between">
                        <label>Level 1 Action </label>
                        <span>:</span>
                      </div> */}
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 1 Actioned By </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 1 Remark </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 1 Action Date </label>
                        <span>:</span>
                      </div>
                      {/* <div className="form-group d-flex justify-content-between">
                        <label>Level 2 Action </label>
                        <span>:</span>
                      </div> */}
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 2 Actioned By </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 2 Remark </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 2 Action Date </label>
                        <span>:</span>
                      </div>
                      {/* <div className="form-group d-flex justify-content-between">
                        <label>Level 3 Action </label>
                        <span>:</span>
                      </div> */}
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 3 Actioned By </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 3 Remark </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>Level 3 Action Date </label>
                        <span>:</span>
                      </div>

                      <div className="form-group d-flex justify-content-between">
                        <label>IT Actioned By </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>IT Remark </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>IT Date </label>
                        <span>:</span>
                      </div>
                      <div className="form-group d-flex justify-content-between">
                        <label>IT File Name </label>
                        <span>:</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="p-20">
                      <div className="form-group">
                        <label>{rowData.InitiatedBy}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level1ActionBy}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level1ActionRemarks}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level1ActionOn}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level2ActionBy}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level2ActionRemarks}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level2ActionOn}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level3ActionBy}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level3ActionRemarks}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Level3ActionOn}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.ITActionBy}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.ITActionRemarks}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.ITActionOn}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.ITFileUpload}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2%" }}></div>
      </div>
    </div>
  );
}

export default ViewReports;
