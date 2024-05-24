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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";

function DataTable(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState([]);
  const history = useHistory();
  // const columns = [
  //   "workFlowName",
  //   "noOfStage",

  //   // {
  //   //   name: "Action",
  //   //   options: {
  //   //     customBodyRenderLite: (dataIndex) => (
  //   //       // <i
  //   //       //   className="zmdi zmdi-edit"
  //   //       //   onClick={() => handleEdit(data[dataIndex])}
  //   //       // ></i>
  //   //       <button
  //   //         onClick={() => handleEdit(data[dataIndex])}
  //   //         className="btn btn-outline-secondary"
  //   //       >
  //   //         View
  //   //       </button>
  //   //     ),
  //   //   },
  //   // },
  // ];
  const [gridApi, setgridApi] = useState(null);
  const [columnDef, setcolumnDef] = useState([
    // {
    //   headerName: "Request No",
    //   colId: "requestNo",
    //   width: 100,
    //   field: "requestNo",
    // },
    {
      headerName: "WorkFlowName",
      colId: "workFlowName",
      field: "workFlowName",
      width: 150,
    },
    {
      headerName: "No Of Stage",
      colId: "noOfStage",
      field: "noOfStage",
      width: 150,
    },
  ]);

  const onGridReady = (params) => {
    setgridApi(params.api);
    params.api.sizeColumnsToFit();
  };
  const handleEdit = (selectedData) => {
    // console.log(selectedData);
    history.push({
      pathname: "",
      state: { selectedData },
    });
  };

  const options = {
    filterType: "dropdown",
    customToolbar: () => {
      //console.log("Custom toolbar clicked");
      return (
        <button className="btn btn-primary" onClick={handleClickOpen}>
          Add Workflow
        </button>
      );
    },
  };
  const handleAddList = () => {
    // Navigate to the specified route
    history.push("/app/add-server");
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/workflow");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const [formData, setFormData] = useState({
    workFlowName: "",
    noOfStage: "",
  });

  const resetForm = () => {
    setFormData({
      workFlowName: "",
      noOfStage: "",
    });
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiPost("admin/workflow", formData);

      if (response) {
        // Successful API call
        NotificationManager.success("WorkFlow added successfully!");
        history.push("/app/crm/workflow");
        setOpen(false);
        // You can redirect the user to a different page or perform other actions upon success
      } else {
        // Handle error cases
        console.error("Error adding server:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

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
        // <RctCollapsibleCard fullBlock>
        //   <MUIDataTable
        //     title={"Workflow"}
        //     data={data}
        //     columns={columns}
        //     options={options}
        //   />
        // </RctCollapsibleCard>
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
                <h4>Manage Workflow</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ justifyContent: "end", display: "flex" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleClickOpen}
                  style={{ margin: "1%", float: "right" }}
                >
                  Add Workflow
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
                  minWidth: 610,
                }}
                onGridReady={onGridReady}
                columnDefs={columnDef}
                rowData={data}
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
      >
        <DialogTitle id="alert-dialog-title">
          <i
            className="zmdi zmdi-close-circle"
            onClick={handleClose}
            style={{ margin: "1%", float: "right" }}
          ></i>
          {"Manage Workflow"}
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                label="WorkflowName"
                variant="outlined"
                type="text"
                size="medium"
                name="workFlowName"
                id="workFlowName"
                placeholder="Enter your workFlowName"
                value={formData.workFlowName}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="NoOfStage"
                variant="outlined"
                type="text"
                size="medium"
                name="noOfStage"
                id="noOfStage"
                placeholder="Enter your noOfStage"
                value={formData.noOfStage}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              {/* <TextField
                label="Password"
                variant="outlined"
                type="text"
                size="medium"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              /> */}
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
              onClick={resetForm}
            >
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}

export default DataTable;
