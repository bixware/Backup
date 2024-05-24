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
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewMaterialApproval(props) {
  const [open, setOpen] = React.useState(false);
  const [rowData, setrowData] = useState({});
  const [fileData, setfileData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
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
  const [multipleFile, setmultipleFile] = useState([]);
  const history = useHistory();
  const [approvalForm, setApprovalForm] = useState({
    statusCode: "",
    remarks: "",
    remarksFiles: [],
  });
  const [secondStage, setSecondStage] = useState(0);
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const userData = User.get_work_flow_statge_user;
  const selData = sessionStorage.getItem("selectedData");
  const selectedData = JSON.parse(selData);
  const [approvalArr, setApprovalArr] = useState([]);
  const [stageUser, setStageUser] = useState({});
  const [stageCount, setStageCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [supportiveDocs, setSupportiveDocs] = useState([]);
  const [dataEntryDocs, setDataEntryDocs] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    setOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApprovalForm({ ...approvalForm, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      // if (User.get_work_flow_statge_user.length > 1) {
      //   setSecondStage(parseInt(User.get_work_flow_statge_user[1].stageNo));
      // }
      try {
        let data = {
          workFlowRequestUID: selectedData.workFlowRequestUID,
        };
        const response = await apiPost("user/viewapproverstatus", data);
        console.log(response.data.data);
        setfileData(response.data.data?.upload_file);
        let sDocs = [];
        let dDocs = [];
        if (response.data.data?.upload_file.length > 0) {
          response.data.data?.upload_file.forEach((item) => {
            if (item.dataEntryFileName) {
              dDocs.push(item);
            } else {
              sDocs.push(item);
            }
          });
        }
        setSupportiveDocs(sDocs);
        setDataEntryDocs(dDocs);
        setStageCount(parseInt(response.data.data.no_of_stage.noOfStage));
        setremarkFileData(
          response.data.data?.remarks_file
            ? response.data.data?.remarks_file
            : []
        );
        setrowData(response.data.data);
        let usersData = [];
        userData.forEach((item) => {
          if (item.workFlowName === "Material Code Creation") {
            usersData.push(item);
          }
        });
        setStageUser(usersData.length > 1 ? usersData[1] : usersData[0]);
        let list = [];
        let firstValue = 0;
        let secondValue = 1;
        let stageCount = parseInt(response.data.data.no_of_stage.noOfStage);
        for (let i = 1; i <= stageCount; i++) {
          if (i === 1) {
            list.push({ first: 1, second: "" });
          } else if (i === stageCount - 1) {
            list.push({ first: (stageCount - 3) * 2 + 2, second: "" });
          } else if (i === stageCount) {
            list.push({ first: (stageCount - 3) * 2 + 3, second: "" });
          } else {
            firstValue = firstValue + 2;
            secondValue = secondValue + 2;
            // list.push({ i: { firstValue, secondValue } });
            list.push({ first: firstValue, second: secondValue });
          }
        }

        console.log(list);
        setApprovalArr(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (approvalForm.statusCode === "" || approvalForm.remarks === "") {
      NotificationManager.error("Please fill all the fields!");
      return;
    }
    // if (parseInt(stageUser.stageNo) === stageCount - 1) {
    //   if (
    //     approvalForm.statusCode === "" ||
    //     approvalForm.remarks === "" ||
    //     approvalForm.remarksFiles.length === 0
    //   ) {
    //     NotificationManager.error("Please fill all the fields!");
    //     return;
    //   }
    // }
    if (parseInt(stageUser.stageNo) === stageCount) {
      handleClickOpen();
      return;
    }

    console.log(approvalForm.statusCode);
    ApiCall();
    getStatusName();
  };

  function handleCloseRequest() {
    handleClose();
    ApiCall();
    getStatusName();
  }

  async function ApiCall() {
    try {
      let stageName =
        approvalForm.statusCode === stageUser.approveID
          ? stageUser.approveName
          : stageUser.rejectName;
      let data = {
        workFlowRequestUID: parseInt(rowData.workFlowRequestUID),
        userUID: parseInt(stageUser.userUID),
        workFlowStageUID: parseInt(stageUser.workFlowStageUID),
        workFlowStageName: stageName,
        // currentStageUserID: parseInt(stageUser.userUID),
        approvalStatus: parseInt(approvalForm.statusCode),
        // modifiedBy: parseInt(stageUser.userUID),
        // modifiedDate: parseInt(stageUser.userUID),
        Remarks: approvalForm.remarks,
      };
      if (parseInt(stageUser.stageNo) === stageCount - 1) {
        const form_data = new FormData();
        form_data.append(
          "workFlowRequestUID",
          parseInt(rowData.workFlowRequestUID)
        );
        form_data.append("userUID", parseInt(stageUser.userUID));
        form_data.append("approvalStatus", parseInt(approvalForm.statusCode));
        form_data.append(
          "workFlowStageUID",
          parseInt(stageUser.workFlowStageUID)
        );
        form_data.append("workFlowStageName", stageName);
        form_data.append("Remarks", approvalForm.remarks);
        if(multipleFile.length>0){
          for (let i = 0; i < multipleFile.length; i++) {
            form_data.append(`multipleUpload[]`, multipleFile[i]);
          }
        }

        const response = await apiFormDataPost(
          "user/sfdataentryapproval",
          form_data
        );
        if (response) {
          setSuccess(true);
          return;
        } else {
          console.error("Error adding role:", response.statusText);
          return;
        }
      }
      const response = await apiPost("user/sfupdateapproval", data);
      if (response) {
        setSuccess(true);
      } else {
        console.error("Error adding role:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  }

  const handleClicks = async () => {
    history.goBack();
  };
  function getValue(status) {
    if (status === "Approve") {
      return stageUser.approveID;
    } else {
      return stageUser.rejectID;
    }
  }

  function getStatusDropdown() {
    if (parseInt(stageUser.stageNo) === stageCount - 1) {
      approvalForm.statusCode = stageUser.approveID;
      return (
        <div className="form-group">
          <Label for="Brand">
            Select Status{"  "}
            <span style={{ color: "red" }}>*</span>
          </Label>
          <div style={{ position: "relative" }}>
            <select
              name="statusCode"
              value={approvalForm.statusCode}
              className="select2 form-control"
              required
            >
              <option value={stageUser.approveID} disabled>
                Complete
              </option>
            </select>
            <FontAwesomeIcon
              icon={faAngleDown}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>
      );
    } else if (parseInt(stageUser.stageNo) === stageCount) {
      approvalForm.statusCode = stageUser.approveID;
      return (
        <div className="form-group">
          <Label for="Brand">
            Select Status{"  "}
            <span style={{ color: "red" }}>*</span>
          </Label>
          <div style={{ position: "relative" }}>
            <select
              name="statusCode"
              value={approvalForm.statusCode}
              className="select2 form-control"
              required
            >
              <option value={stageUser.approveID} disabled>
                Close Request
              </option>
            </select>
            <FontAwesomeIcon
              icon={faAngleDown}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <Label for="Brand">
            Select Status{"  "}
            <span style={{ color: "red" }}>*</span>
          </Label>
          <div style={{ position: "relative" }}>
            <select
              name="statusCode"
              value={approvalForm.statusCode}
              onChange={handleInputChange}
              className="select2 form-control"
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value={getValue("Approve")}>Approve</option>
              <option value={getValue("Reject")}>Reject</option>
            </select>
            <FontAwesomeIcon
              icon={faAngleDown}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>
      );
    }
  }

  function getButtonName() {
    if (parseInt(stageUser.stageNo) === stageCount - 1) {
      return "Complete";
    } else if (parseInt(stageUser.stageNo) === stageCount) {
      return "Close Request";
    } else {
      return "Submit";
    }
  }

  function getStatusName() {
    let stageName =
      approvalForm.statusCode === stageUser.approveID
        ? stageUser.approveName
        : stageUser.rejectName;
    if (parseInt(stageUser.stageNo) === stageCount - 1) {
      setAlertMessage("Complete");
    } else if (parseInt(stageUser.stageNo) === stageCount) {
      setAlertMessage("Close");
    } else {
      setAlertMessage(stageName);

      // approvalArr.forEach((item, i) => {
      //   if (i !== 0 && i !== stageCount - 1 && i !== stageCount - 2) {
      //     if (parseInt(item.first) === parseInt(approvalForm.statusCode)) {
      //       setAlertMessage("Approve")

      //     } else if (parseInt(item.second) === parseInt(approvalForm.statusCode)) {
      //       setAlertMessage("Reject")

      //     }
      //   }
      // })
    }
  }

  const handleChange = (file) => {
    // console.log(file);
    setmultipleFile((prevState) => {
      const tempArr = [...prevState];
      Array.from(file).forEach((item) => {
        let duplicateFile = tempArr.find((df) => df.name === item.name);
        if (!duplicateFile) tempArr.push(item);
      });
      // console.log(tempArr);
      return tempArr;
    });
    approvalForm.remarksFiles = file;
  };

  function openImageInNewTab(imageUrl) {
    // Create a new tab with the image URL
    window.open(imageUrl, "_blank");
  }

  const onConfirm = () => {
    setSuccess(false);
    // history.push("/app/crmuser/costlist");
    handleClicks();
  };

  function clearFile(data) {
    console.log(data);
    setmultipleFile((prevState) => {
      const tempArr = [...prevState];
      let fileIndex = tempArr.findIndex((item) => item.name === data.name);
      if (fileIndex !== -1) tempArr.splice(fileIndex, 1);
      return tempArr;
    });
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
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="p-20">
                      {/* <div className="form-group d-flex justify-content-between">
                        <label>SKU Code </label>
                        <span>:</span>
                      </div> */}
                      <div className="form-group d-flex justify-content-between">
                        <label>SKU Description </label>
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
                      {/* <div className="form-group">
                        <label>{rowData.materialCode}</label>
                      </div> */}
                      <div className="form-group">
                        <label>{rowData.description}</label>
                      </div>
                      <div className="form-group">
                        <label>{rowData.Remarks}</label>
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
                      <div
                        className="form-group"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      >
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
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                          }}
                        >
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
                                  File{i + 1}{" "}
                                  <i className="zmdi zmdi-inbox"></i>
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

          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="mt-0 header-title">Approval Details</h4>
                <div className="row">
                  <div className="col-md-4">
                    <div className="p-10">
                      <div className="form-group m-b-0 mt-3">
                        {getStatusDropdown()}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="p-10 mt-3">
                      <FormGroup>
                        <Label for="remarks">
                          Remarks{"  "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="textarea"
                          name="remarks"
                          id="remarks"
                          placeholder="Enter Remarks"
                          value={approvalForm.remarks}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
                {parseInt(stageUser.stageNo) === stageCount - 1 ? (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card mt-3">
                          <div className="card-body">
                            <h4 className="mt-0 header-title">
                              Upload Files{"  "}
                              {/* <span style={{ color: "red" }}>*</span> */}
                            </h4>
                            <div className="dropify-wrapper">
                              <FileUploader
                                handleChange={handleChange}
                                name="file"
                                types={docFileTypes}
                                value={approvalForm.remarksFiles}
                                multiple={true}
                                // required
                              />
                            </div>
                            {multipleFile.length > 0 ? (
                              <>
                                {multipleFile.map((item, i) => {
                                  return (
                                    <div className="row" key={i}>
                                      <div className="col-6">
                                        <h6>{item.name} </h6>
                                      </div>
                                      <div className="col-2">
                                        <i
                                          className="ti-close"
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) => clearFile(item)}
                                        ></i>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="d-flex gap-5 justify-content-end align-items-center">
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={handleClicks}
                    type="button"
                    className="btn btn-sm btn-primary"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-sm btn-success"
                  >
                    {getButtonName()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2%" }}></div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiDialog-paper": {
            maxWidth: "55rem !important",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <i
            className="zmdi zmdi-close-circle"
            onClick={handleClose}
            style={{ margin: "1%", float: "right" }}
          ></i>
          Confirmation
        </DialogTitle>
        <DialogContent fullWidth>
          <h4>Are you sure want to close this request ?</h4>
          <div className="text-right">
            <Button onClick={handleCloseRequest}>
              {" "}
              <span style={{ color: "red" }}>OK</span>
            </Button>{" "}
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </DialogContent>
        <DialogActions>
          {/* Additional dialog actions can be added here */}
        </DialogActions>
      </Dialog>
      <SweetAlert
        success
        show={success}
        title="Success"
        btnSize="sm"
        onConfirm={() => onConfirm()}
      >
        {alertMessage} Status Updated Successfully!
      </SweetAlert>
    </div>
  );
}

export default ViewMaterialApproval;
