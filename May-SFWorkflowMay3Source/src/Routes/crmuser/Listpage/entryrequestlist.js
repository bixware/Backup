import React, { useState, useEffect, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { TablePagination } from "mui-datatables";
import { apiGet, apiPost } from "Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IMAGEURL } from "../../../base";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { NotificationManager } from "react-notifications";
import TextField from "@mui/material/TextField";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";

function EntryRequestList(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [data, setData] = useState([]);
  const [historyValues, setHistoryValues] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading spinner
  const history = useHistory();
  const [gridApi, setgridApi] = useState(null);
  const [historyGridApi, setHistoryGridApi] = useState(null);
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const userData = User.get_work_flow_statge_user[0];
  const [columnDef, setcolumnDef] = useState([
    {
      headerName: " WorkFlow Name",
      colId: " workFlowName",
      field: "workFlowName",
    },
    {
      headerName: "Request No",
      colId: "requestNo",
      width: 100,
      field: "requestNo",
    },
    {
      headerName: "Brand",
      colId: "brand",
      field: "brand",
      width: 100,
    },
    {
      headerName: "Category",
      colId: "category",
      field: "category",
      width: 100,
    },
    {
      headerName: "Vendor Code",
      colId: "vendorCode",
      field: "vendorCode",
      width: 100,
    },
    {
      headerName: "Stage Name",
      colId: "stageName",
      field: "RemarWorkFlowStageName",
    },
    {
      headerName: "Status",
      colId: "status",
      field: "statusDescription",
      // cellRenderer: (params) => (
      //   <>
      //     {[1, 2, 4, 6, 8, 10, 11].includes(parseInt(params.data.approvalStatus)) ? (
      //       <span style={{ color: "green" }}>Completed</span>
      //     ) : (
      //       <span style={{ color: "red" }}>Rejected</span>
      //     )}
      //   </>
      // ),
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
          View
        </button>
      ),
    },
    {
      headerName: "History",
      colId: "workFlowRequestUID",
      field: "workFlowRequestUID",
      width: 100,
      cellRenderer: (params) => (
        <button
          onClick={() => handleHistory(params.data)}
          className="btn btn-warning"
        >
          View
        </button>
      ),
    },
  ]);
  const [historyColumnDef, setHistoryColumnDef] = useState([
    {
      headerName: " Stage Name",
      colId: "workFlowStageName",
      width: 100,
      field: "workFlowStageName",
    },
    {
      headerName: "Description",
      colId: "statusDescription",
      width: 100,
      field: "statusDescription",
    },
    {
      headerName: "Remarks",
      colId: "remarks",
      field: "remarks",
      width: 100,
    },
    {
      headerName: "Action By",
      colId: "name",
      field: "name",
      width: 150,
    },
    {
      headerName: "Action Date",
      colId: "createdDate",
      field: "createdDate",
      width: 150,
    },
  ]);

  async function handleHistory(historyData) {
    try {
      let data = {
        workFlowRequestUID: parseInt(historyData.workFlowRequestUID),
      };
      const response = await apiPost("user/sfrequesthistory", data);
      setHistoryValues(response.data.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onGridReady = (params) => {
    setgridApi(params.api);
    params.api.sizeColumnsToFit();
  };
  const onHistoryGridReady = (params) => {
    setHistoryGridApi(params.api);
    params.api.sizeColumnsToFit();
  };
  const handleView = (selectedData) => {
    console.log(selectedData);
    if (selectedData.workFlowName === "Material Code Creation") {
      history.push({
        pathname: "/app/user/request-list/view-material-request",
        state: { selectedData },
      });
    } else if (selectedData.workFlowName === "Cost Price Update") {
      history.push({
        pathname: "/app/user/request-list/view-request",
        state: { selectedData },
      });
    } else if (selectedData.workFlowName === "Receipe Creation") {
      history.push({
        pathname: "/app/user/request-list/view-rc-request",
        state: { selectedData },
      });
    } else if (selectedData.workFlowName === "NSO Store Live") {
      history.push({
        pathname: "/app/user/request-list/view-nso-request",
        state: { selectedData },
      });
    }
    sessionStorage.setItem("selectedData", JSON.stringify(selectedData));
  };

  useEffect(() => {
    (async () => {
      try {
        let data = {
          // workFlowUID: parseInt(userData.workFlowUID),
          // workFlowStageUID: parseInt(userData.workFlowStageUID),
          userUID: parseInt(userData.userUID),
        };
        const response = await apiPost("user/sfrequestlist", data);
        //const response = await apiGet("user/getallcpu");
        setData(response.data.data);
        setLoading(false); // Data loaded, set loading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Error occurred, set loading to false
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const paginationPageSizeSelector = useMemo(() => {
    return [8, 15, 20, 50, 100];
  }, []);

  // const exportExcel = async () => {
  //   try {
  //     let data = {
  //       userUID: parseInt(userData.userUID),
  //     };
  //     const response = await apiPost("requestlistexport", {
  //       // responseType: "blob", // Set the response type to blob
  //       data,
  //     });

  //     const currentDate = new Date().toISOString().split("T")[0];
  //     const currentTime = new Date().toLocaleTimeString().replace(/:/g, "-");
  //     const fileName = `requestlist_${currentDate}_${currentTime}.xlsx`;

  //     const url = window.URL.createObjectURL(new Blob([response.data]));

  //     // Create a link element
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", fileName);
  //     // Simulate a click on the link to trigger the file download
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };
  const exportExcel = async () => {
    try {
      let data = {
        userUID: parseInt(userData.userUID),
      };
      const response = await apiPost("requestlistexport", {
        data,
        responseType: "blob", // Set the response type to blob
      });

      const currentDate = new Date().toISOString().split("T")[0];
      const currentTime = new Date().toLocaleTimeString().replace(/:/g, "-");
      const fileName = `requestlist_${currentDate}_${currentTime}.xlsx`;

      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      // Simulate a click on the link to trigger the file download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching data", error);
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
        <>
          {/* <div className="row">
            <div className="col-lg-6">
              <div
                style={{
                  justifyContent: "start",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4>Request List</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ justifyContent: "end", display: "flex" }}>
                <button
                  className="btn btn-secondary"
                  onClick={exportExcel}
                  style={{ margin: "1%", float: "right" }}
                >
                  Export RequestList
                </button>
              </div>
            </div>
          </div> */}
          <RctCollapsibleCard heading="Request List" fullBlock>
            <div
              className="ag-theme-quartz"
              style={{
                height: "63vh",
                width: "100%",
                border: "none !important",
              }}
            >
              <AgGridReact
                defaultColDef={{
                  editable: false,
                  resizable: true,
                  minWidth: 130,
                  filter: "agTextColumnFilter",
                }}
                pagination={true}
                paginationPageSize={8}
                paginationPageSizeSelector={paginationPageSizeSelector}
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
        sx={{
          ".MuiDialog-paper": {
            width: "70% !important",
            maxWidth: "750px !important",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <i
            className="zmdi zmdi-close-circle"
            onClick={handleClose}
            style={{ margin: "1%", float: "right" }}
          ></i>
          History List
        </DialogTitle>
        <DialogContent fullWidth>
          <RctCollapsibleCard fullBlock>
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
                  minWidth: 120,
                  filter: "agTextColumnFilter",
                }}
                onGridReady={onHistoryGridReady}
                columnDefs={historyColumnDef}
                rowData={historyValues}
              />
            </div>
          </RctCollapsibleCard>
        </DialogContent>
        <DialogActions>
          {/* Additional dialog actions can be added here */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EntryRequestList;
