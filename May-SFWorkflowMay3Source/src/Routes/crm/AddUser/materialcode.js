import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { apiPost, apiGet } from "Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Label } from "reactstrap";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Box from "@mui/material/Box";
import todo from "Assets/data/todo-app/labels";
import { FormControl } from "@material-ui/core";

function DataTable(props) {
  const [loading, setLoading] = useState(true);
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const [data, setData] = useState([]);
  const history = useHistory();
  const [gridApi, setgridApi] = useState(null);
  const [workflowuid, setworkflowuid] = useState([]);
  const [workflowuid1, setworkflowuid1] = useState([]);
  const [branduid, setBrandUid] = useState([]);
  const gridRef = useRef();
  const [formData, setFormData] = useState({
    workFlowUID: [],
    workFlowStageUID: "",
    brandUID: [],
    fromDate: new Date().toLocaleDateString("en-US"),
    toDate: new Date(
      new Date().setDate(new Date().getDate() + 30)
    ).toLocaleDateString("en-US"),
  });

  // const [columnDef, setcolumnDef] = useState([
  //   {
  //     headerName: "Request ID",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Request Status",
  //     colId: "RequestStatus",
  //     field: "RequestStatus",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Vendor Code",
  //     colId: "vendorCode",
  //     field: "vendorCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Vendor Name",
  //     colId: "vendorDescription",
  //     field: "vendorDescription",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Description",
  //     colId: "SKUDescription",
  //     field: "SKUDescription",
  //     width: 100,
  //   },

  //   {
  //     headerName: "Price Changed From",
  //     colId: "PriceChangeFrom",
  //     field: "PriceChangeFrom",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Price Changed To",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Recipe Name",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "FG Code",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Initiator File Name",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Initiator Remark",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Initiated Date",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Initiated By",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Level 1 Action",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Request ID",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Request ID",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Request ID",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Request ID",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Request ID",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Request ID",
  //     colId: "requestNo",
  //     field: "requestNo",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Workflow Name",
  //     colId: "workFlowName",
  //     field: "workFlowName",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Brand",
  //     colId: "brand",
  //     field: "brand",
  //     width: 100,
  //   },
  //   {
  //     headerName: "Category",
  //     colId: "category",
  //     field: "category",
  //     width: 100,
  //   },
  //   {
  //     headerName: "SKU Code",
  //     colId: "materialCode",
  //     field: "materialCode",
  //     width: 100,
  //   },
  //   {
  //     headerName: "DC/DSD",
  //     colId: "dcdsdName",
  //     field: "dcdsdName",
  //     width: 100,
  //   },
  // ]);
  const [columnDef, setcolumnDef] = useState([
    { headerName: "Request ID", field: "requestNo", width: 100 },
    { headerName: "Workflow Name", field: "workFlowName", width: 100 },
    { headerName: "Brand", field: "brand", width: 100 },
    // { headerName: "Status", field: "CurrentStatus", width: 100 },
    // { headerName: "Current Stage", field: "RequestStatus", width: 100 },
     { headerName: "Request Status", field: "RequestStatus", width: 100 },
    { headerName: "Initiated Date", field: "InitiatedOn", width: 100 },
    { headerName: "Initiated By", field: "InitiatedBy", width: 100 },
    { headerName: "Category", field: "category", width: 100 },
    { headerName: "Vendor Code", field: "vendorCode", width: 100 },
    { headerName: "Vendor Name", field: "vendorDescription", width: 100 },
    { headerName: "SKU Code", field: "SKUCode", width: 100 },
    { headerName: "SKU Description", field: "SKUDescription", width: 100 },
    { headerName: "Price Changed From", field: "PriceChangeFrom", width: 100 },
    { headerName: "Price Changed To", field: "PriceChangeTo", width: 100 },
    { headerName: "DC/DSD", field: "dcdsdName", width: 100 },
    { headerName: "Recipe Name", field: "receipeName", width: 100 },
    { headerName: "FG Code", field: "FGCode", width: 100 },
    { headerName: "Initiator File Name", field: "INIFileUpload", width: 100 },
    { headerName: "Initiator Remark", field: "InitiatorRemarks", width: 100 },
    { headerName: "Level 1 Action", field: "Level1ActionBy", width: 100 },
    { headerName: "Level 1 Actioned By", field: "Level1ActionBy", width: 100 },
    { headerName: "Level 1 Remark", field: "Level1ActionRemarks", width: 100 },
    { headerName: "Level 1 Action Date", field: "Level1ActionOn", width: 100 },
    { headerName: "Level 2 Action", field: "Level2ActionBy", width: 100 },
    { headerName: "Level 2 Actioned By", field: "Level2ActionBy", width: 100 },
    { headerName: "Level 2 Remark", field: "Level2ActionRemarks", width: 100 },
    { headerName: "Level 2 Action Date", field: "Level2ActionOn", width: 100 },
    { headerName: "Level 3 Action", field: "Level3ActionBy", width: 100 },
    { headerName: "Level 3 Actioned By", field: "Level3ActionBy", width: 100 },
    { headerName: "Level 3 Remark", field: "Level3ActionRemarks", width: 100 },
    { headerName: "Level 3 Action Date", field: "Level3ActionOn", width: 100 },
    { headerName: "IT File Name", field: "ITFileUpload", width: 100 },
    { headerName: "IT Actioned By", field: "ITActionBy", width: 100 },
    { headerName: "IT Remark", field: "ITActionRemarks", width: 100 },
    { headerName: "IT Date", field: "ITActionOn", width: 100 },
    { headerName: "Concluded By", field: "ConcludedBy", width: 100 },
    { headerName: "Concluded On", field: "ConcludedOn", width: 100 },
    { headerName: "Concluded Remarks", field: "ConcludedRemarks", width: 100 },
  ]);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onGridReady = (params) => {
    setgridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = {
          status: "",
          fromdate: "",
          todate: "",
        };
        let role = User.roleUID === "1" ? "admin" : "user";
        const response = await apiPost(`${role}/allreportslist`, data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();

    const fetchworkflowstatus = async () => {
      try {
        let role = User.roleUID === "1" ? "admin" : "user";
        const response = await apiPost(`${role}/getworkflowstatus`, {
          workFlowUID: "",
        });
        setworkflowuid1(response.data.data);
      } catch (error) {
        console.error("Error fetching workflow status data:", error);
      }
    };
    fetchworkflowstatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let statusName = "";
    if (formData.workFlowStageUID !== "") {
      statusName = workflowuid1.find(
        (item) => item.serialNo === parseInt(formData.workFlowStageUID)
      );
    }
    let data = {
      status: statusName !== "" ? statusName.stageName : "",
      fromDate: fDate,
      toDate: tDate,
    };
    console.log(data);
    try {
      let role = User.roleUID === "1" ? "admin" : "user";
      const response = await apiPost(`${role}/allreportslist`, data);

      if (response) {
        setData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Error filtering data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const [fDate, setFDate] = useState("");
  const [tDate, settDate] = useState("");
  function handleEvent(event, picker) {
    setFDate(new Date(picker.startDate.format()).toLocaleDateString("en-GB"));
    settDate(new Date(picker.endDate.format()).toLocaleDateString("en-GB"));
  }

  function getWorkflowChipLabelName(value) {
    let userName = workflowuid.find((item) => item.workFlowUID === value);
    return userName.workFlowName;
  }
  function getStatusChipLabelName(value) {
    let userName = workflowuid1.find((item) => item.serialNo === value);
    return userName.stageName;
  }
  function getBrandChipLabelName(value) {
    let userName = branduid.find((item) => item.brandUID === value);
    return userName.brandName;
  }

  const paginationPageSizeSelector = useMemo(() => {
    return [8, 15, 20, 50, 100];
  }, []);

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
          />
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
                <h4>Manage Reports</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ justifyContent: "end", display: "flex" }}>
                <button
                  className="btn btn-warning"
                  onClick={onBtnExport}
                  style={{ margin: "1%", float: "right" }}
                >
                  Export To Excel
                </button>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row ">
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="stageUID">Select Stage Status</label>
                  <div style={{ position: "relative" }}>
                    <select
                      name="workFlowStageUID"
                      value={formData.workFlowStageUID}
                      onChange={handleInputChange}
                      className="select2 form-control"
                      size="medium"
                    >
                      <option value="">Select Stage Name</option>
                      {workflowuid1.map((item) => (
                        <option key={item.serialNo} value={item.serialNo}>
                          {item.stageName}
                        </option>
                      ))}
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
              </div>
              <div className="col-lg-3 ">
                <div className="form-group">
                  <Label for="Todate">Select Date Range</Label>
                  <DateRangePicker
                    initialSettings={{
                      // autoUpdateInput: false,
                      // locale: {
                      //   cancelLabel: "Clear",
                      // },
                      drops: "down",
                    }}
                    onEvent={handleEvent}
                  >
                    <input type="text" className="form-control" required />
                  </DateRangePicker>
                </div>
              </div>
              <div className="col-lg-1" style={{ marginTop: "32px" }}>
                <div className="page-title-box">
                  <button
                    type="submit"
                    style={{ margin: "1%" }}
                    className="btn btn-sm btn-secondary "
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div
            className="ag-theme-quartz"
            style={{ height: "60vh", width: "100%", border: "none !important" }}
          >
            <AgGridReact
              defaultColDef={{
                editable: false,
                resizable: true,
                minWidth: 160,
                filter: "agTextColumnFilter",
              }}
              pagination={true}
              paginationPageSize={8}
              paginationPageSizeSelector={paginationPageSizeSelector}
              onGridReady={onGridReady}
              columnDefs={columnDef}
              rowData={data}
              ref={gridRef}
              suppressExcelExport={true}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DataTable;
