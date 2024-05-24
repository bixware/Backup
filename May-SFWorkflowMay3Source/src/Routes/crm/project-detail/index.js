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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";

function DataTable() {
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
  //   "stageNo",
  //   "stageName",
  //   "businessUnitName",
  //   // {
  //   //   name: "Action",
  //   //   options: {
  //   //     customBodyRenderLite: (dataIndex) => (
  //   //       <button
  //   //         onClick={() => handleEdit(data[dataIndex])}
  //   //         className="btn btn-secondary"
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
      headerName: "workFlowName",
      colId: "workFlowName",
      field: "workFlowName",
      width: 150,
    },
    {
      headerName: "Stage No",
      colId: "stageNo",
      field: "stageNo",
      width: 150,
    },
    {
      headerName: "Stage Name",
      colId: "stageName",
      field: "stageName",
      width: 150,
    },
    {
      headerName: "Business UnitName",
      colId: "businessUnitName",
      field: "businessUnitName",
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
      return (
        <button className="btn btn-primary" onClick={handleClickOpen}>
          Add Workflow Stage
        </button>
      );
    },
  };

  const handleAddList = () => {
    history.push("/app/add-server");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/workflowstage");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })();
  }, []);

  const [formData, setFormData] = useState({
    // workFlowUID: "",
    stageNo: "1",
    stageName: "",
    businessUnitUID: "",
  });

  const resetForm = () => {
    setFormData({
      // workFlowUID: "",
      stageNo: "",
      stageName: "",
      businessUnitUID: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (e.target.name === "businessUnitUID") {
      setSelectbusinessUnitName(e.target.value);
    }
  };

  const [formData1, setFormData1] = useState({
    // workFlowUID: "",
    stageNo: "2",
    stageName: "",
    businessUnitUID: "",
  });

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
    if (e.target.name === "businessUnitUID") {
      setSelectbusinessUnitName1(e.target.value);
    }
  };

  const [formData2, setFormData2] = useState({
    // workFlowUID: "",
    stageNo: "3",
    stageName: "",
    businessUnitUID: "",
  });

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });
    if (e.target.name === "businessUnitUID") {
      setSelectbusinessUnitName2(e.target.value);
    }
  };

  const [formData3, setFormData3] = useState({
    // workFlowUID: "",
    stageNo: "4",
    stageName: "",
    businessUnitUID: "",
  });

  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setFormData3({
      ...formData3,
      [name]: value,
    });
    if (e.target.name === "businessUnitUID") {
      setSelectbusinessUnitName3(e.target.value);
    }
  };

  const [formData4, setFormData4] = useState({
    // workFlowUID: "",
    stageNo: "5",
    stageName: "",
    businessUnitUID: "",
  });

  const handleInputChange4 = (e) => {
    const { name, value } = e.target;
    setFormData4({
      ...formData4,
      [name]: value,
    });
    if (e.target.name === "businessUnitUID") {
      setSelectbusinessUnitName4(e.target.value);
    }
  };

  const [formData5, setFormData5] = useState({
    // workFlowUID: "",
    stageNo: "6",
    stageName: "",
    businessUnitUID: "",
  });

  const handleInputChange5 = (e) => {
    const { name, value } = e.target;
    setFormData5({
      ...formData5,
      [name]: value,
    });
    if (e.target.name === "businessUnitUID") {
      setSelectbusinessUnitName5(e.target.value);
    }
  };
  const [formData6, setFormData6] = useState({
    // workFlowUID: "",
    stageNo: "7",
    stageName: "",
    businessUnitUID: "",
  });

  const handleInputChange6 = (e) => {
    const { name, value } = e.target;
    setFormData6({
      ...formData6,
      [name]: value,
    });
    if (e.target.name === "businessUnitUID") {
      setSelectbusinessUnitName6(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formDataArray = [
    //   formData,
    //   formData1,
    //   formData2,
    //   formData3,
    //   formData4,
    //   {
    //     workflowUID: Selectworkflowuid,
    //     // businessUnitName: SelectbusinessUnitName,
    //   },
    // ];
    let Stages = [];
    // const Stages = [formData, formData1, formData2, formData3, formData4];
    if (Selectworkflowuid === "1") {
      Stages = [
        formData,
        formData1,
        formData2,
        formData3,
        formData4,
        formData5,
        formData6,
      ];
    } else if (Selectworkflowuid === "2") {
      Stages = [formData, formData1, formData2];
    } else if (Selectworkflowuid === "3") {
      Stages = [formData, formData1, formData2, formData3, formData4];
    } else if (Selectworkflowuid === "4") {
      Stages = [formData, formData1, formData2, formData3];
    }

    const formDataArray = {
      workFlowUID: Selectworkflowuid,
      stages: Stages,
    };

    try {
      const response = await apiPost("admin/workflowstage", formDataArray);

      if (response) {
        // Successful API call
        NotificationManager.success("Workflowstage added successfully!");
        history.push("/app/crm/workflow-stage");
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

  const [dropDown, setDropDown] = useState(false);
  const [dropDown1, setDropDown1] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);
  const [dropDown3, setDropDown3] = useState(false);
  const [workflowuid, setworkflowuid] = useState([]);
  const [Selectworkflowuid, setSelectworkflowuid] = useState("");
  // const [selectedOption, setSelectedOption] = useState("");

  const [businessunit, setbusinessunit] = useState([]);
  const [SelectbusinessUnitName, setSelectbusinessUnitName] = useState("");
  const [SelectbusinessUnitName1, setSelectbusinessUnitName1] = useState("");
  const [SelectbusinessUnitName2, setSelectbusinessUnitName2] = useState("");
  const [SelectbusinessUnitName3, setSelectbusinessUnitName3] = useState("");
  const [SelectbusinessUnitName4, setSelectbusinessUnitName4] = useState("");
  const [SelectbusinessUnitName5, setSelectbusinessUnitName5] = useState("");
  const [SelectbusinessUnitName6, setSelectbusinessUnitName6] = useState("");
  const [dropdownState, setDropdownState] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/workflow");
        setworkflowuid(response.data.data);
        setDropDown(false);
        setDropDown1(false);
        setDropDown2(false);
        setDropDown3(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response1 = await apiGet("admin/businessunit");
        setbusinessunit(response1.data.data); // Update to response1.data.data
        setDropDown(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  // const handleChange = (event) => {
  //   setSelectworkflowuid(event.target.value);
  //   setSelectbusinessUnitName("");
  //   setDropDown(true);
  // };
  // const handleChange = (event) => {
  //   if (event.target.value === "1") {
  //     setDropDown(true);
  //   } else if (event.target.value === "2") {
  //     setDropDown(false);
  //     setDropDown1(true);
  //   } else if (event.target.value === "3") {
  //     setDropDown(false);
  //     setDropDown1(false);
  //     setDropDown2(true);
  //   } else if (event.target.value === "4") {
  //     setDropDown(false);
  //     setDropDown1(false);
  //     setDropDown2(false);
  //     setDropDown3(true);
  //   } else {
  //     setDropDown(false);
  //   }

  //   setSelectworkflowuid(event.target.value);
  //   setSelectbusinessUnitName("");
  // };
  const handleChange = (event) => {
    const selectedValue = event.target.value;

    // Reset business unit names
    setSelectbusinessUnitName("");

    // Reset all DropDown states
    setDropDown(false);
    setDropDown1(false);
    setDropDown2(false);
    setDropDown3(false);

    // Set the selected workflow UID
    setSelectworkflowuid(selectedValue);

    // Set the corresponding DropDown state based on workflow UID
    if (selectedValue === "1") {
      setDropDown(true);
    } else if (selectedValue === "2") {
      setDropDown1(true);
    } else if (selectedValue === "3") {
      setDropDown2(true);
    } else if (selectedValue === "4") {
      setDropDown3(true);
    }
  };

  const handleChange1 = (event) => {
    setSelectbusinessUnitName(event.target.value);
    setSelectworkflowuid(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectbusinessUnitName1(event.target.value);
    setSelectworkflowuid(event.target.value);
  };

  const handleChange3 = (event) => {
    setSelectbusinessUnitName2(event.target.value);
    setSelectworkflowuid(event.target.value);
  };

  const handleChange4 = (event) => {
    setSelectbusinessUnitName3(event.target.value);
    setSelectworkflowuid(event.target.value);
  };

  const handleChange5 = (event) => {
    setSelectbusinessUnitName4(event.target.value);
    setSelectworkflowuid(event.target.value);
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
        //     title={"Workflow Stage"}
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
                <h4>Manage Workflow Stage</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ justifyContent: "end", display: "flex" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleClickOpen}
                  style={{ margin: "1%", float: "right" }}
                >
                  Add Workflow Stage
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
                  minWidth: 300,
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
        // style={{ width: "700px" }}
        // fullWidth
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
          {"Manage Workflow Stage"}
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <DialogContent fullWidth>
            <DialogContentText id="alert-dialog-description">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Workflow Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Selectworkflowuid}
                  label="workFlowUID"
                  name="workFlowUID"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select WorkflowName
                  </MenuItem>
                  {workflowuid.map((item) => (
                    <MenuItem key={item.workFlowUID} value={item.workFlowUID}>
                      {item.workFlowName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {dropDown && (
                <div className="row mt-5">
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData.stageNo}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      // disabled
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData.stageName}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange1}
                        onChange={handleInputChange}
                        // onClick={() => setDropdownState("businessUnitName")}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData1.stageNo}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData1.stageName}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName1}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange2}
                        onChange={handleInputChange1}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData2.stageNo}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData2.stageName}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName2}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange3}
                        onChange={handleInputChange2}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData3.stageNo}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData3.stageName}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName3}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange4}
                        onChange={handleInputChange3}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData4.stageNo}
                      onChange={handleInputChange4}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData4.stageName}
                      onChange={handleInputChange4}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName4}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange5}
                        onChange={handleInputChange4}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData5.stageNo}
                      onChange={handleInputChange5}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData5.stageName}
                      onChange={handleInputChange5}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName5}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange1}
                        onChange={handleInputChange5}
                        // onClick={() => setDropdownState("businessUnitName")}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData6.stageNo}
                      onChange={handleInputChange5}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData6.stageName}
                      onChange={handleInputChange5}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName6}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange1}
                        onChange={handleInputChange6}
                        // onClick={() => setDropdownState("businessUnitName")}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              {dropDown1 && (
                <div className="row mt-5">
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData.stageNo}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData.stageName}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange1}
                        onChange={handleInputChange}
                        // onClick={() => setDropdownState("businessUnitName")}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData1.stageNo}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData1.stageName}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName1}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange2}
                        onChange={handleInputChange1}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData2.stageNo}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData2.stageName}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName2}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange3}
                        onChange={handleInputChange2}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData3.stageNo}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData3.stageName}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName3}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange4}
                        onChange={handleInputChange3}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              {dropDown2 && (
                <div className="row mt-5">
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData.stageNo}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData.stageName}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange1}
                        onChange={handleInputChange}
                        // onClick={() => setDropdownState("businessUnitName")}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData1.stageNo}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData1.stageName}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName1}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange2}
                        onChange={handleInputChange1}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData2.stageNo}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData2.stageName}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName2}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange3}
                        onChange={handleInputChange2}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData3.stageNo}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData3.stageName}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName3}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange4}
                        onChange={handleInputChange3}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData4.stageNo}
                      onChange={handleInputChange4}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData4.stageName}
                      onChange={handleInputChange4}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName4}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange5}
                        onChange={handleInputChange4}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData5.stageNo}
                      onChange={handleInputChange5}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData5.stageName}
                      onChange={handleInputChange5}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName5}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange1}
                        onChange={handleInputChange5}
                        // onClick={() => setDropdownState("businessUnitName")}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              {dropDown3 && (
                <div className="row mt-5">
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData.stageNo}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData.stageName}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange1}
                        onChange={handleInputChange}
                        // onClick={() => setDropdownState("businessUnitName")}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData1.stageNo}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData1.stageName}
                      onChange={handleInputChange1}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName1}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange2}
                        onChange={handleInputChange1}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData2.stageNo}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData2.stageName}
                      onChange={handleInputChange2}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName2}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange3}
                        onChange={handleInputChange2}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData3.stageNo}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData3.stageName}
                      onChange={handleInputChange3}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName3}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange4}
                        onChange={handleInputChange3}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="stageNo"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageNo"
                      id="stageNo"
                      placeholder="Enter your stageNo"
                      value={formData4.stageNo}
                      onChange={handleInputChange4}
                      required
                      fullWidth
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField
                      label="StageName"
                      variant="outlined"
                      type="text"
                      size="medium"
                      name="stageName"
                      id="stageName"
                      placeholder="Enter your stageName"
                      value={formData4.stageName}
                      onChange={handleInputChange4}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-lg-4 mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        businessUnitName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelectbusinessUnitName4}
                        name="businessUnitUID"
                        label="businessUnitName"
                        // onChange={handleChange5}
                        onChange={handleInputChange4}
                      >
                        <MenuItem value="" disabled>
                          Select BusinessUnitName
                        </MenuItem>
                        {businessunit.map((item) => (
                          <MenuItem
                            key={item.businessUnitUID} // Use businessUnitUID as key
                            value={item.businessUnitUID} // Use businessUnitUID as value
                          >
                            {item.businessUnitName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
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

export default DataTable;
