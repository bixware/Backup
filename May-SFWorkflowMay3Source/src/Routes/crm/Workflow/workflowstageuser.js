import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import IntlMessages from "Util/IntlMessages";
import { apiPost } from "Api/apiCommon";
import { apiGet } from "Api/apiCommon";
import { NavLink } from "reactstrap";
import { Link } from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASEURL } from "../../../base";
import { Form } from "reactstrap";
import { NotificationManager } from "react-notifications";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import { array } from "i/lib/util";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";

function WorkflowStageUser(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const selectedData = location.state ? location.state.selectedData : null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [workflowStages, setWorkflowStages] = useState([]);
  const history = useHistory();
  const [gridApi, setgridApi] = useState(null);
  const [columnDef, setcolumnDef] = useState([
    {
      headerName: "workFlow Name",
      colId: "workFlowName",
      field: "workFlowName",
      width: 150,
    },
    {
      headerName: "Stage No",
      colId: "stageNo",
      field: "stageNo",
      width: 100,
    },
    {
      headerName: "Stage Name",
      colId: "stageName",
      field: "stageName",
      width: 150,
    },
    {
      headerName: "Business Unit Name",
      colId: "businessUnitName",
      field: "businessUnitName",
      width: 200,
    },

    {
      headerName: "User Name",
      colId: "userName",
      field: "userName",
      width: 150,
    },
    {
      headerName: "Details",
      colId: "workFlowRequestUID",
      field: "workFlowRequestUID",
      width: 100,
      cellRenderer: (params) => (
        <button
          onClick={() => handleView(params.data)}
          className="btn btn-warning"
        >
          Edit
        </button>
      ),
    },
  ]);

  const handleView = (selectedData) => {
    console.log(selectedData);
    history.push({
      pathname: "/app/crm/view-workflow-stageuser",
      state: { selectedData },
    });
    sessionStorage.setItem("selectedData", JSON.stringify(selectedData));
  };

  const onGridReady = (params) => {
    setgridApi(params.api);
    params.api.sizeColumnsToFit();
  };
  const options = {
    filterType: "dropdown",
    customToolbar: () => {
      return (
        <button className="btn btn-primary" onClick={handleClickOpen}>
          Add Workflow StageUser
        </button>
      );
    },
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/workflowstageuser");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const [data1, setData1] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/workflowstage");
        // console.log(response);
        setData1(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const [workflowuid, setworkflowuid] = useState([]);
  const [businessunit, setbusinessunit] = useState([]);
  const [Selectworkflowuid, setSelectworkflowuid] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/workflow");
        console.log(response.data.data);
        setworkflowuid(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response1 = await apiGet("admin/businessunit");
        setbusinessunit(response1.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  function handleUserChange(workflowItem, e) {
    console.log(workflowItem, e.target.value);
    setWorkflowStages((prevState) => {
      let coppiedArr = [...prevState];
      coppiedArr.forEach((item) => {
        if (item.stageNo === workflowItem.stageNo) {
          item.userUID =
            typeof e.target.value === "string"
              ? e.target.value.split(",")
              : e.target.value;
        }
        if (workflowItem.stageNo === coppiedArr[0].stageNo) {
          coppiedArr[coppiedArr.length - 1].userUID =
            typeof e.target.value === "string"
              ? e.target.value.split(",")
              : e.target.value;
        }
      });
      return coppiedArr;
    });
  }

  async function handleWorkflowChange(data) {
    setSelectworkflowuid(data.target.value);
    let selectedWorkflow = workflowuid.find(
      (item) => parseInt(item.workFlowUID) === parseInt(data.target.value)
    );
    let tempworkflowStages = [];
    let tempWorkflowUsers = [];
    if (selectedWorkflow) {
      for (let i = 0; i < parseInt(selectedWorkflow.noOfStage); i++) {
        tempworkflowStages.push({
          stageNo: "",
          stageName: "",
          workFlowUID: "",
          workFlowStageUID: "",
          businessUnitName: "",
          businessUnitUID: "",
          userUID: [],
          noOfStages: parseInt(selectedWorkflow.noOfStage),
          users: [],
        });
      }
      try {
        const response = await apiPost("admin/getalluser", {});
        console.log(response);
        tempWorkflowUsers = response.data.data.users;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      let filteredWorkflowValues = data1.filter(
        (item) => parseInt(item.workFlowUID) === parseInt(data.target.value)
      );
      //console.log(filteredWorkflowValues)
      filteredWorkflowValues.forEach(async (workFlowValue, i) => {
        tempworkflowStages[i].businessUnitName = workFlowValue.businessUnitName;
        tempworkflowStages[i].businessUnitUID = workFlowValue.businessUnitUID;
        tempworkflowStages[i].stageName = workFlowValue.stageName;
        tempworkflowStages[i].workFlowUID = data.target.value;
        tempworkflowStages[i].workFlowStageUID = workFlowValue.workFlowStageUID;
        tempworkflowStages[i].stageNo = workFlowValue.stageNo;
        tempworkflowStages[i].users = tempWorkflowUsers.filter(
          (user) => user.businessUnitUID === workFlowValue.businessUnitUID
        );
      });
      console.log(tempworkflowStages);
    }
    setWorkflowStages(tempworkflowStages);
    setOpenForm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(workflowStages);
    let checkAnsFilled = false;
    workflowStages.forEach((item) => {
      if (item.userUID === "") {
        checkAnsFilled = true;
        return;
      }
    });
    if (checkAnsFilled || workflowStages.length === 0) return;

    let Stages = [];
    workflowStages.forEach((item) => {
      Stages.push({
        workFlowStageUID: item.workFlowStageUID,
        businessUnitUID: item.businessUnitUID,
        businessUnitName: item.businessUnitName,
        userUID:
          typeof item.userUID === "object" ? item.userUID : [item.userUID],
      });
    });

    const formDataArray = {
      workFlowUID: workflowStages[0].workFlowUID,
      stages: Stages,
    };

    console.log(formDataArray);

    try {
      const response = await apiPost("admin/workflowstageuser", formDataArray);

      if (response) {
        NotificationManager.success("WorkflowstageUser added successfully!");
        history.push("/app/crm/workflow-stageuser");
        setOpen(false);
      } else {
        console.error("Error adding server:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  function getChipLabelName(users, value) {
    let userName = users.find((item) => item.userID === value);
    return userName.name;
  }
  return (
    <div className="data-table-wrapper">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <i
            className="zmdi zmdi-spinner zmdi-hc-spin"
            style={{ fontSize: "3rem" }}
          ></i>
          <span style={{ fontSize: "1.5rem" }}>{"  "}Loading...</span>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-lg-6">
              <div
                style={{
                  justifyContent: "start",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4>Workflow StageUser</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ justifyContent: "end", display: "flex" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleClickOpen}
                  style={{ margin: "1%", float: "right" }}
                >
                  Add Workflow StageUser
                </button>
              </div>
            </div>
          </div>
          <RctCollapsibleCard heading="" fullBlock>
            <div
              className="ag-theme-quartz"
              style={{
                height: "60vh",
                width: "100%",
                border: "none !important",
              }}
            >
              <AgGridReact
                defaultColDef={{
                  editable: false,
                  resizable: true,
                  minWidth: 210,
                }}
                onGridReady={onGridReady}
                columnDefs={columnDef}
                rowData={data}
                options={options}
              />
            </div>
          </RctCollapsibleCard>
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiDialog-paper": {
            maxWidth: "69rem !important",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <i
            className="zmdi zmdi-close-circle"
            onClick={handleClose}
            style={{ margin: "1%", float: "right" }}
          ></i>
          {"Manage Workflow StageUser"}
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <DialogContent fullWidth>
            <DialogContentText id="alert-dialog-description">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Workflow</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Selectworkflowuid}
                  label="workFlowUID"
                  name="workFlowUID"
                  onChange={handleWorkflowChange}
                  //handleWorkflowChange
                  //handleChange
                >
                  <MenuItem value="" disabled>
                    Select workflow
                  </MenuItem>
                  {workflowuid.map((item) => (
                    <MenuItem key={item.workFlowUID} value={item.workFlowUID}>
                      {item.workFlowName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {openForm && (
                <>
                  {workflowStages.length > 0 && (
                    <>
                      {workflowStages.map((workflowItem, workflowIndex) => {
                        return (
                          <div className="row mt-1" key={workflowIndex}>
                            <div className="col-lg-3">
                              <TextField
                                label="Stage No"
                                variant="outlined"
                                type="text"
                                size="medium"
                                name={`stageNo_${workflowIndex}`}
                                placeholder="Enter your stageNo"
                                value={workflowItem.stageNo}
                                required
                                fullWidth
                                margin="normal"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </div>
                            <div className="col-lg-3">
                              <TextField
                                label="Stage Name"
                                variant="outlined"
                                type="text"
                                size="medium"
                                name={`stageName_${workflowIndex}`}
                                placeholder="Enter your stageName"
                                value={workflowItem.stageName}
                                // onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </div>
                            <div className="col-lg-3">
                              <TextField
                                label="Business Unit Name"
                                variant="outlined"
                                type="text"
                                size="medium"
                                name={`businessUnitName_${workflowIndex}`}
                                placeholder="Enter your stageName"
                                value={workflowItem.businessUnitName}
                                // onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </div>
                            <div className="col-lg-3 mt-3">
                              {parseInt(workflowItem.stageNo) === 1 ||
                              parseInt(workflowItem.stageNo) ===
                                parseInt(workflowItem.noOfStages) ||
                              parseInt(workflowItem.stageNo) ===
                                parseInt(workflowItem.noOfStages) - 1 ? (
                                <FormControl
                                  fullWidth
                                  disabled={
                                    parseInt(workflowItem.stageNo) ===
                                    workflowStages.length
                                      ? true
                                      : false
                                  }
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    User Name
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={workflowItem.userUID}
                                    name={`userUID${workflowIndex}`}
                                    label="name"
                                    multiple
                                    onChange={(e) =>
                                      handleUserChange(workflowItem, e)
                                    }
                                    renderValue={(selected) => (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 0.5,
                                        }}
                                      >
                                        {selected.map((value) => (
                                          <Chip
                                            key={value}
                                            label={getChipLabelName(
                                              workflowItem.users,
                                              value
                                            )}
                                          />
                                        ))}
                                      </Box>
                                    )}
                                  >
                                    <MenuItem value="" disabled>
                                      Select User Name
                                    </MenuItem>
                                    {workflowItem.users.map((item) => (
                                      <MenuItem
                                        key={item.userID}
                                        value={item.userID}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : (
                                <FormControl
                                  fullWidth
                                  disabled={
                                    parseInt(workflowItem.stageNo) ===
                                    workflowStages.length
                                      ? true
                                      : false
                                  }
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    User Name
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={workflowItem.userUID}
                                    name={`userUID${workflowIndex}`}
                                    label="name"
                                    onChange={(e) =>
                                      handleUserChange(workflowItem, e)
                                    }
                                    renderValue={(selected) => (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 0.5,
                                        }}
                                      >
                                        <Chip
                                          key={selected}
                                          label={getChipLabelName(
                                            workflowItem.users,
                                            selected
                                          )}
                                        />
                                      </Box>
                                    )}
                                  >
                                    <MenuItem value="" disabled>
                                      Select User Name
                                    </MenuItem>
                                    {workflowItem.users.map((item) => (
                                      <MenuItem
                                        key={item.userID}
                                        value={item.userID}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              class="btn btn-danger btn-sm"
              style={{ margin: "1%", float: "right" }}
              type="submit"
            >
              Submit
            </Button>
            <Button
              class="btn btn-warning btn-sm"
              style={{ margin: "1%", float: "right" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}

export default WorkflowStageUser;
