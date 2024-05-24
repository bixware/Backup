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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
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
  const columns = [
    "name",
    "email",
    // "businessUnitName",
    // {
    //   name: "Action",
    //   options: {
    //     customBodyRenderLite: (dataIndex) => (
    //       // <i
    //       //   className="zmdi zmdi-edit"
    //       //   onClick={() => handleEdit(data[dataIndex])}
    //       // ></i>
    //       <button
    //         onClick={() => handleEdit(data[dataIndex])}
    //         className="btn btn-secondary"
    //       >
    //         View
    //       </button>
    //     ),
    //   },
    // },
  ];

  const [gridApi, setgridApi] = useState(null);
  const [columnDef, setcolumnDef] = useState([
    // {
    //   headerName: "Request No",
    //   colId: "requestNo",
    //   width: 100,
    //   field: "requestNo",
    // },
    {
      headerName: "Name",
      colId: "name",
      field: "name",
      width: 100,
    },
    {
      headerName: "Email",
      colId: "email",
      field: "email",
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
          Add User
        </button>
      );
    },
  };
  const handleAddList = () => {
    // Navigate to the specified route
    history.push("/app/crm/add-user");
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/getalluser");
        setData(response.data.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleUID: "2",
    businessUnitUID: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      roleUID: "2",
      businessUnitUID: "",
    });
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSelectbusinessUnitName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = {
    //   roleUID: SelectroleUID,
    //   businessUnitUID: SelectbusinessUnitName,
    // };
    try {
      const response = await apiPost("admin/createuser", formData);

      if (response) {
        // Successful API call
        NotificationManager.success("User added successfully!");
        history.push("/app/crm/user");
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

  const [dropDown2, setDropDown2] = useState(false);

  const [roleuid, setRoleUID] = useState([]);
  const [SelectroleUID, setSelectroleUID] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet("admin/roles");
        setRoleUID(response.data.data);
        setDropDown2(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const [businessunit, setBusinessUnit] = useState([]);
  const [SelectbusinessUnitName, setSelectbusinessUnitName] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response1 = await apiGet(`admin/businessunit`);
        setBusinessUnit(response1.data.data);
        setDropDown2(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [SelectroleUID]);

  const handleRoleChange = (e) => {
    setSelectroleUID(e.target.value);
    setSelectbusinessUnitName(""); // Reset selected business unit when role changes
  };

  const handleBusinessUnitChange = (e) => {
    setSelectbusinessUnitName(e.target.value);
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
        //     title={"Manage User"}
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
                <h4>Manage User</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ justifyContent: "end", display: "flex" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleClickOpen}
                  style={{ margin: "1%", float: "right" }}
                >
                  Add User
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
          Add User
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                label="Name"
                variant="outlined"
                type="text"
                size="medium"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                type="text"
                size="medium"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
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
              />
              <div className="row mt-5">
                {/* <div className="col-lg-6">
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={SelectroleUID}
                      name="roleUID"
                      label="Role"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="" disabled>
                        Select Role
                      </MenuItem>
                      {roleuid.map((item) => (
                        <MenuItem key={item.roleUID} value={item.roleUID}>
                          {item.roleName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div> */}
                <div
                  className="col-lg-6"
                  style={dropDown2 ? {} : { display: "none" }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="business-unit-label">
                      BusinessUnit
                    </InputLabel>
                    <Select
                      labelId="business-unit-label"
                      id="business-unit-select"
                      value={SelectbusinessUnitName}
                      name="businessUnitUID"
                      label="BusinessUnit"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="" disabled>
                        Select BusinessUnit
                      </MenuItem>
                      {businessunit.map((item) => (
                        <MenuItem
                          key={item.businessUnitUID}
                          value={item.businessUnitUID}
                        >
                          {item.businessUnitName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
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
