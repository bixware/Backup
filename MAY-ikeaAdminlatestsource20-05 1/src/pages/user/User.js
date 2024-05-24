import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { apiPost } from "../../api/apiCommon"
import config from "../../config"
import { useState, useEffect } from 'react';
import baseURl from "../../base"
// import { Button } from 'antd';
// import { Col, Row } from "reactstrap";
import { Col, Menu, Row } from 'antd';
// import EditOutlined from "@ant-design/icons"
import { Modal } from 'antd';
// import { Checkbox, Form, Input } from 'antd';
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import IconButton from '@mui/material/IconButton';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { TextField,Select} from '@mui/material';
import { MenuItem, TextField, Select } from "@mui/material";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import "../../Style.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});


// async function userListRole() {
//   const response = await apiPost(baseURl + config.GetRoles, {});
//   if (response.data.status === true) {
//     console.log(response)
//     return response.data
//   }
// }

async function menuList() {
  const response = await apiPost(baseURl + config.GetMenus, {});
  if (response.data.status === true) {
    // console.log(response)
    return response.data
  }
}


function User() {
  const userData = useSelector(state => state.user.value)
  useEffect(() => {
    // console.log(userData)
  })


  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modal2Open, setModal2Open] = useState(false);
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [newInitialValues, setNewInitialValues] = useState(undefined)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});
  const [submitButton, setSubmitButton] = useState("")
  const [gridRefresh, setGridRefresh] = useState(false)
  const [roleList, SetRoleList] = useState([])
  const [roleValue, SetRoleValue] = useState("")
  const [menuDropDown, setMenuDropDown] = useState([])
  const [storeCheckBox, setStoreCheckBox] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  const [checkedBoxes, setCheckedBoxes] = useState([])
  const [responseArray, setResponseArray] = useState([])

  // const [menuValue,setMenuValue]=useState("")


  const userString = sessionStorage.getItem('Audit_user');

  const user = JSON.parse(userString);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  // const phoneRegex = RegExp(
  //   /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  // );
  // const phoneRegex = RegExp(
  //   /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/gm);
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const internationalNumber = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailRegex1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const emailvalidation = /^([A-Za-z0-9_\-\.])+\@(?!(?:[A-Za-z0-9_\-\.]+\.)?([A-Za-z]{2,4})\.\2)([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  const initialValues = {
    userName: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roleUID: "",
    menuUID: [],
    storesApplicable: [],

  }

  const validationSchemaAdd = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").matches(emailvalidation, "Invalid email").nullable(),
    // phone: Yup.string().matches(phoneRegex, 'Phone number is not valid'),
    phone: Yup.string().required("Phone number is required").matches(internationalNumber, 'Phone number is not valid').nullable(),
    password: Yup.string()
      .required("Required password")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    roleUID: Yup.string().required("Role is required"),
    // menuUID: Yup.string().required("Menu is required"),
  })

  const validationSchemaUpdate = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").matches(emailvalidation, "Invalid email").nullable(),

    // email: Yup.string()
    //   .email("Email is invalid")
    //   .required("Email is required"),
    roleUID: Yup.string().required("Role is required"),
    phone: Yup.string().required("Phone Number is required").matches(internationalNumber, 'Phone number is not valid').nullable(),
    // menuUID: Yup.string().required("Menu is required"),
  })

  const [columnDef, setcolumnDef] = useState([
    {
      headerName: 'User Name', field: 'userName', cellStyle: { textAlign: "left" }, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Role', field: 'roleName', cellStyle: { textAlign: "left" }, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Email Id', field: 'email', cellStyle: { textAlign: "left" }, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Action', field: 'isActive', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><Button onClick={() => userStatusFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete user"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>
      )
    },
    //   {<IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton>
    //     headerName: 'Action', field: 'userUID', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<></>
    //     )
    // }
  ]);

  async function userList() {
    let data = {
      userUID: user.userUID
    }
    const response = await apiPost(baseURl + config.userList, data);
    if (response.data.status === true) {
      // console.log(response)
      return response.data.data;
    }
  }
  useEffect(() => {



    (async () => {
      const newData = await userList();
      setrowData(newData.user)
      setGridRefresh(false)
    })();
  }, [gridRefresh])

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }

  async function addModel() {

    setSubmitButton("Submit")
    setIsUpdate(false)
    setModal2Open(true)
    const storeResponse = await apiPost(baseURl + config.getStore, {});
    // console.log(storeResponse.data.data.store)
    setStoreCheckBox(storeResponse.data.data.store)

    const roleResponse = await apiPost(baseURl + config.GetRoles, {userUID:user.userUID});
    // console.log(roleResponse.data)
    SetRoleList(roleResponse.data.data)


    const menuResponse = await apiPost(baseURl + config.GetMenus, {});
    // console.log(menuResponse)
    setMenuDropDown(menuResponse.data.data)
  }

  async function userStatusFunc(params) {
    // console.log(params)

    let data = {
      "userUID": params.data.userUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.userActive, data);
    if (response.data.status === true) {

      toast.success(response.data.message);
      setGridRefresh(true)
    } else {
      toast.warning("Try again later")
    }


  }

  async function handleDeleteModalOpen(params) {

    setDeleteUser(params.data)
    setModelDeleteOpen(true)
  }

  async function handleOpen(params) {
    // debugger
    setIsUpdate(true)
    // console.log(params.data)
    const roleResponse = await apiPost(baseURl + config.GetRoles, {userUID:user.userUID});
    SetRoleList(roleResponse.data.data)
    const menuResponse = await apiPost(baseURl + config.GetMenus, {});
    setMenuDropDown(menuResponse.data.data)
    const storeResponse = await apiPost(baseURl + config.getStore, {});
    setStoreCheckBox(storeResponse.data.data.store)




    try {
      let edituserResponse = await axios.post(baseURl + config.Edituser + params.data.userUID)
        .then((response) => {
          // console.log(response.data.data.store_details)
          let arr = [];
          response.data.data.store_details.forEach((s) => {
            arr.push(s.storeUID)
          })

          setResponseArray(arr)
          setSubmitButton("Update")
          setNewInitialValues(params.data)
          setModal2Open(true)
          // let Store_list = responseArray.data.data.store_details
          // console.log("array", Store_list)
          // console.log(edituserResponse)
        });
      // if (edituserResponse.data.status === true) {
      //   // test for status you want, etc
      //   console.log(edituserResponse.data.data.store_details)
      // }
      // Don't forget to return something   
      return edituserResponse;
    }
    catch (err) {
      // console.error(err);
    }


    // console.log(params.data)
  };

  async function handleSubmit(values) {
    // console.log(roleValue)
    // console.log(values)
    // let response;
    if (isUpdate) {
      let data = {
        "userName": values.userName,
        "firstName": values.firstName,
        "lastName": values.lastName,
        "email": values.email,
        "phone": values.phone,
        "userUID": values.userUID,
        "roleUID": values.roleUID,
        // "menuUID": values.menuUID,
        "usertypeUID": user.usertypeUID,
        "storeUID": responseArray
      };

      const response = await apiPost(baseURl + config.updateUser, data);

      if (response.data.status === true) {
        toast.success(response.data.message)
        //user and update consolelog
        setModal2Open(false)
        setGridRefresh(true)
        setCheckedBoxes([])
      } else if (response.data.status === false) {
        toast.warning(response.data.validationList[0])
        setModal2Open(false)
        setResponseArray([])
      } else {
        toast.warning("please try again sometime")
        setModal2Open(false)
        setResponseArray([])
      }

    }
    else {
      let data = {
        "userName": values.userName,
        "password": values.password,
        "firstName": values.firstName,
        "lastName": values.lastName,
        "email": values.email,
        "phone": values.phone,
        "userUID": user.userUID,
        "roleUID": values.roleUID,
        // "menuUID": values.menuUID,
        "usertypeUID": user.usertypeUID,
        "storeUID": responseArray
      };

      const response = await apiPost(baseURl + config.addUser, data);
      // setOpen(false)
      if (response.data.status === true) {
        toast.success(response.data.message);
        //user and update consolelog
        setModal2Open(false)
        setGridRefresh(true)
        setResponseArray([])
      } else if (response.data.status === false) {
        toast.warning(response.data.validationList[0])
        setModal2Open(false)
        setResponseArray([])
      } else {
        toast.warning("please try again sometime")
        setModal2Open(false)
        setResponseArray([])
      }
      // console.log(response)
    }
  }
  async function deleteUID() {
    let data = {
      "userUID": deleteUser.userUID,
    }
    const response = await apiPost(baseURl + config.deleteUser, data);

    if (response.data.message == 'Success') {
      toast.error(response.data.message)
      setModelDeleteOpen(false);
      setGridRefresh(true)
      setDeleteUser({})
    } else {
      toast.error("Please try again later")
      setModelDeleteOpen(false);
      setDeleteUser({})
    }
  }

  const handleChange = (e) => {
    SetRoleValue(e.target.value);
  }

  function isChecked(value) {
    let varCheck = responseArray.find((item) => item === value)
    if (varCheck) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleCheckBoxChange = (e) => {
    // console.log(e.target.value);
    let newArray = [...responseArray];
    if (e.target.checked === true) {
      newArray.push(e.target.value);
      setResponseArray(newArray);
    } else {
      let splicingCheckBox = newArray.findIndex(
        (item) => item === e.target.value
      );
      if (splicingCheckBox !== -1) {
        newArray.splice(splicingCheckBox, 1);
      }
      setResponseArray(newArray);
    }

    // console.log(newArray);

  };

  return (
    <>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add User</Button>
        </Col>
      </Row>
      <div className="ag-theme-alpine" id='aggridheightWith'>
        <AgGridReact
          defaultColDef={{
            editable: false,
            enableValue: true,
            minWidth: 100,
            cellStyle: { textAlign: 'left' }
          }}
          pagination={true}
          onGridReady={onGridReady}
          columnDefs={columnDef}
          rowData={rowData}
        />
      </div>
      <Modal
        title={isUpdate ? "Update User Panel" : "Add User Panel"}
        centered
        visible={modal2Open}
        destroyOnClose={true}
        // onSubmit={handleSubmit}
        onOk={() => { setModal2Open(false); setResponseArray([]) }}
        onCancel={() => { setModal2Open(false); setResponseArray([]) }}
        width={"60%"}
        maskClosable={false}
        footer={[null]}
      >
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          validationSchema={!isUpdate ? validationSchemaAdd : validationSchemaUpdate}
          onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Row gutter={30}>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="userName">User Name</label> */}
                    <br />
                    <Field
                      sx={{
                        '.MuiInputBase-root': {
                          height: "40px"
                        }
                      }}
                      label="User name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      required
                      name="userName"
                      as={TextField}
                      fullWidth
                      value={values.userName}
                      className={
                        "form-control" +
                        (errors.userName && touched.userName ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="firstName">First Name</label> */}
                    <br />
                    <Field
                      required
                      name="firstName"
                      label="First name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      as={TextField}
                      fullWidth
                      value={values.firstName}
                      className={
                        "form-control" +
                        (errors.firstName && touched.firstName ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div></Col></Row>
              <Row gutter={30}>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="lastName">Last Name</label> */}
                    <br />
                    <Field
                      required
                      label="Last name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="lastName"
                      as={TextField}
                      fullWidth
                      value={values.lastName}
                      className={
                        "form-control" +
                        (errors.lastName && touched.lastName ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div></Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="email">Email</label> */}
                    <br />
                    <Field
                      required
                      label="Email"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="email"
                      as={TextField}
                      fullWidth
                      value={values.email}
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div></Col></Row>
              <Row gutter={30}>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="roleUID">Role : </label> */}
                    <br />
                    <Field as={TextField}
                      required
                      label="Role name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="roleUID"
                      variant="outlined"
                      fullWidth
                      value={values?.roleUID ?? ""}
                      select
                      className={
                        "form-control" +
                        (errors.roleUID && touched.roleUID ? " is-invalid" : "")
                      }
                    >
                      {roleList?.map((q) => (
                        <MenuItem key={q.roleUID} value={q.roleUID}>
                          {q.roleName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="roleUID"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div></Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    <br />
                    <Field
                      // required
                      label="Phone number*"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="phone"
                      as={TextField}
                      // type="number"
                      fullWidth
                      value={values.phone}
                      className={
                        "form-control" +
                        (errors.phone && touched.phone ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col></Row>
              <Row gutter={30}>
                <Col lg={12} md={24} sm={24} xs={24}>
                  {!isUpdate ? (
                    <div className="form-group">
                      {/* <label htmlFor="password">Password</label> */}
                      <br />
                      <Field
                        required
                        as={TextField}
                        fullWidth
                        name="password"
                        label="Password"
                        inputProps={{
                          style: {
                            padding: "6.5px 14px"
                          }
                        }}
                        value={values.password}
                        type="password"
                        className={
                          "form-control" +
                          (errors.password && touched.password ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>) : null}
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  {!isUpdate ? (
                    <div className="form-group">
                      {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                      <br />
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        label="Confirm password"
                        inputProps={{
                          style: {
                            padding: "6.5px 14px"
                          }
                        }}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        type="password"
                        className={
                          "form-control" +
                          (errors.confirmPassword && touched.confirmPassword
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>) : null}
                </Col>
              </Row>
              <Row gutter={30} md={24} sm={24} xs={24}>
                <label style={{ marginLeft: "15px", color: "blue" }} htmlFor="confirmPassword">Select stores</label>
                <br />
                <Col lg={24}>
                  {storeCheckBox?.map(q => (
                    <Field
                      type="checkbox"
                      name="storesApplicable"
                      initialValues={""}
                      value={q.storeUID}
                      key={q.storeUID}
                      as={FormControlLabel}
                      control={<Checkbox />}
                      checked={isUpdate ? isChecked(q.storeUID) : values.storeUID}
                      onChange={(e) => handleCheckBoxChange(e)}
                      label={q.storeName}
                      // labelPlacement="start"
                      labelPlacement="end"
                    />
                  ))}
                </Col>
              </Row>
              <br />
              <div className="form-group">
                <Row style={{
                  justifyContent: "end",
                  display: "flex"
                }}>
                  <Col>
                    <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}
                      htmltype='submit'
                      type="submit"
                      // onClick={()=>setModal2Open(false)}
                      className="btn btn-primary mr-2"
                    // disabled={isSubmitting}
                    >
                      {submitButton}
                    </Button>

                    <Button type="reset" htmltype="reset" onClick={() => { setModal2Open(false); setResponseArray([]) }} className="btn btn-secondary" style={{
                      marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
                    }}>
                      Cancel
                    </Button></Col>
                </Row>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        title="Delete User Panel"
        centered
        visible={modelDeleteOpen}
        // onSubmit={handleSubmit}
        onOk={() => { setModelDeleteOpen(false); setDeleteUser({}) }}
        onCancel={() => { setModelDeleteOpen(false); setDeleteUser({}) }}
        footer={[null]}
      > <Row>
          <Row>
            <Col lg={24}>
              <h3 style={{ color: "red" }}>Are you sure you want to delete this user </h3>
            </Col>
          </Row>
          <Row>
            <Col lg={24}>
              <h3 >{deleteUser.userName} ?</h3>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col lg={24} style={{ justifyContent: "end", display: "flex" }}>
            <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }} onClick={deleteUID}>
              Delete
            </Button>
            <Button style={{
              marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
            }} onClick={() => { setModelDeleteOpen(false); setDeleteUser({}) }}>
              Cancel
            </Button>
          </Col>
        </Row>

      </Modal>
    </>


  )
}

export default User


{/* <Formik
initialValues={initialValues}
enableReinitialize={true}
// validationSchema={isUpdate? validationSchemaUpdate : validationSchemaAdd }

onSubmit={handleSubmit}>
  {(props) => (
<Form
// name="basic"
// labelCol={{ span: 8 }}
// wrapperCol={{ span: 16 }}
// style={{ maxWidth: 600 }}
// // initialValues={{ remember: true }}
// // onFinish={onFinish}
// // onFinishFailed={onFinishFailed}
// autoComplete="off"
>
<Form.Item
label="userName"
name="userName"
rules={[{ required: true, message: 'Please input your username!' }]}
>
<Input />
</Form.Item>

<Form.Item
label="password"
name="password"
rules={[{ required: true, message: 'Please input your password!' }]}
>
<Input.Password />
</Form.Item>
<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
<Button type="submit" onClick={handleSubmit}>
Submit
</Button>
</Form.Item>
</Form>
)}
</Formik> */}



