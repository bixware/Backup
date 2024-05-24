import React, { useState, useEffect } from "react";
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
import { Badge } from "reactstrap";
import { IMAGEURL } from "../../../base";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { NotificationManager } from "react-notifications";
import TextField from "@mui/material/TextField";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";

function RejectList(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [data, setData] = useState([]);
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const userData = User.get_work_flow_statge_user[0];
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [gridApi, setgridApi] = useState(null);
  const [columnDef, setcolumnDef] = useState([
    {
      headerName: " WorkFlow Name",
      colId: " workFlowName",
      width: 100,
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
      width: 150,
    },
    {
      headerName: "Category",
      colId: "category",
      field: "category",
      width: 150,
    },
    {
      headerName: "Vendor Code",
      colId: "vendorCode",
      field: "vendorCode",
    },
    {
      headerName: "Status",
      colId: "stageName",
      field: "approvalStatus",
      cellRenderer: (params) => (
        <>
          {parseInt(params.data.approvalStatus) === 11 ? (
            <span style={{ color: "green" }}>Completed</span>
          ) : (
            <span style={{ color: "red" }}>Rejected</span>
          )}
        </>
      ),
    },
    {
      headerName: "Action",
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
  ]);

  const onGridReady = (params) => {
    setgridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const handleView = (selectedData) => {
    console.log(selectedData);
    history.push({
      pathname: "/app/user/view-request",
      state: { selectedData },
    });
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
        const response = await apiPost("user/gethistorylist", data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

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
        <RctCollapsibleCard heading="History" fullBlock>
          <div
            className="ag-theme-quartz"
            style={{ height: "63vh", width: "100%", border: "none !important" }}
          >
            <AgGridReact
              defaultColDef={{
                editable: false,
                resizable: true,
                minWidth: 160,
                filter: 'agTextColumnFilter',
              }}
              onGridReady={onGridReady}
              columnDefs={columnDef}
              rowData={data}
            />
          </div>
        </RctCollapsibleCard>
      )}
    </div>
  );
}

export default RejectList;
