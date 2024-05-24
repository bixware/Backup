import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { apiPost } from "../../api/apiCommon"
import config from "../../config"
import { useState, useEffect } from 'react';
import baseURl from "../../base"
import { Col, Menu, Row } from 'antd';
import { Modal } from 'antd';
import { Formik, Field, Form, values, ErrorMessage, yupToFormErrors, } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
import notRequired from "yup";
// import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import IconButton from '@mui/material/IconButton';
// import { Switch } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import { Dropdown, message, Space } from 'antd';
// import { Select } from 'antd';
// import { Option } from 'antd/es/mentions';
import { MenuItem, TextField, Select } from "@mui/material";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Tooltip from '@mui/material/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
import "../../Style.css";

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});

async function auditSubTypeList() {
  const response = await apiPost(baseURl + config.GetSubType, {});
  return response.data
}
async function auditTypeList() {
  const response = await apiPost(baseURl + config.AuditTypeList, {});
  // console.log(response.data)
  return response.data
}
// async function auditEntityList() {
//   const response = await apiPost(baseURl + config.AuditEntityList, {})
//   return response.data
// }



function CheckListSubType() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [auditEntity, setAuditEntity] = useState([]);
  const [auditType, setAuditType] = useState({});
  const [newInitialValues, setNewInitialValues] = useState(undefined);
  const [deleteSubType, setDeleteSubType] = useState({});
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [auditMainType, setAuditMainType] = useState("")
  const [gridRefresh, setGridRefresh] = useState(false)
  const [submitButton, setSubmitButton] = useState("")
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  const initialValues = {
    auditSubtypeName: "",
    auditTypeUID: "",
    isMandatoryActive: "",



  }


  const validationSchemaAdd = Yup.object().shape({
    auditSubtypeName: Yup.string().required("Audit Sub Type Name is required"),
    auditMainType: Yup.string(),
    auditTypeUID: Yup.string().when('auditMainType', {
      is: value => value && value == ! "2",
      then: Yup.string().required("Audit Type is required")
      // otherwise:Yup.string().required("Audit Type is required")
    })
    // auditTypeUID: Yup.string()
    // .when('auditSubtypeUID', {
    //     is: value => value && value === "2",
    //     then: Yup
    //         .string()
    //         .notRequired(),
    //     otherwise: Yup
    //         .string()
    //         .required("Audit Type is required"),
    // }),
    // auditTypeUID: Yup.string().required("Audit Type is required"),
  })

  const validationSchemaUpdate = Yup.object().shape({
    auditSubtypeUID: Yup.string().required("Audit Sub Type Name is required"),
    auditTypeUID: Yup.string().required("Audit Type is required"),
  })


  const [columnDef, setcolumnDef] = useState([
    {
      headerName: 'Section name', field: 'auditTypeName', width: '150', flex: 3,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Sub section name', field: 'auditSubtypeName', width: '150', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Mandatory', field: 'isMandatory', width: '150', cellStyle: { textAlign: "center" }, flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    // { headerName: 'Mandatory', field: 'isMandatory', width: '150', flex: 3 },
    {
      headerName: 'Action', field: 'isActive', width: '150', flex: 3, cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<> <Tooltip title="Deactivate / Inactive"> <IconButton onClick={() => auditSubtypestatus(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></IconButton></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>)
    },
    // {
    //   headerName: 'Action', field: 'userUID', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<></>
    //   )
    //   // <IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton>
    // }
  ]);
  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }


  async function getaudittypebyentity() {
    let data = {
      "auditEntityUID": auditMainType
    }
    const response = await apiPost(baseURl + config.GetAuditTypeByEntity, data)
    return response.data
  }


  useEffect(() => {
    (async () => {
      const newData = await getaudittypebyentity();
      // console.log(newData)
      setrowData(newData.data)
      // setAuditType(newData.data)
      //  console.log(newData.data.SubType)
      // setGridRefresh(false)
    })();

    (async () => {
      let data = {
        "auditEntityUID": auditMainType
      }
      // let response = await apiPost(baseURl + config.GetAuditTypeNameByEntity, data)
      let response = await apiPost(baseURl + config.GetQuestionsAudittype, data)
      // console.log(response.data.data)
      setAuditType(response.data.data)
      // setSelectedAuditType(response.data.data[0])
      // console.log(response.data.data)
      // setAuditType(response.data.data)

    })();


  }, [auditMainType])

  useEffect(() => {
    (async () => {
      const newData = await getaudittypebyentity();
      // console.log(newData)
      setGridRefresh(false)
      setrowData(newData.data)

      //  console.log(newData.data.SubType)
      // setGridRefresh(false)
    })();

  }, [gridRefresh])


  async function auditEntityList() {
    let data = {
      userUID: user.userUID,
    };
    const response = await apiPost(baseURl + config.AuditEntityList, data);
    return response.data
  }


  useEffect(() => {

    // (async () => {
    //   const newData = await auditSubTypeList();
    //   setGridRefresh(false)
    // })();

    (async () => {
      const newData = await auditEntityList();
      setAuditEntity(newData.data.entity)
      setAuditMainType(newData.data.entity[0].auditEntityUID)
    })();
  }, [])


  const addModel = () => {
    setSubmitButton("Submit")
    setIsUpdate(false)
    setModalOpen(true)
    // console.log(auditEntity)
    // console.log("this is audit entity name" + JSON.stringify(auditEntity))

  }

  async function auditSubtypestatus(params) {
    // console.log(params.data)
    let data = {
      "auditSubtypeUID": params.data.auditSubtypeUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.SubTypeActive, data);
    // console.log(response)
    if (response.data.status === true) {
      toast.success(response.data.message);
      setGridRefresh(true)
    } else {
      toast.warning("Try again later")
    }
  }

  const handleOpen = (params) => {
    // console.log(params.data)
    setSubmitButton("Update")
    setIsUpdate(true)
    setModalOpen(true)
    setNewInitialValues(params.data)

  }
  const handleDeleteModalOpen = (params) => {
    // console.log(params.data)
    setModelDeleteOpen(true)
    setDeleteSubType(params.data)
  }
  async function deleteAuditSubType() {
    let data = {
      "auditSubtypeUID": deleteSubType.auditSubtypeUID
    }
    const response = await apiPost(baseURl + config.DeleteSubType, data)
    if (response.data.status === true) {
      toast.error(response.data.message)
      setGridRefresh(true)
      setModelDeleteOpen(false);
      setDeleteSubType({})
    } else {
      setGridRefresh(true)
      toast.error("Please try again later")
      setModelDeleteOpen(false);
      setDeleteSubType({})
    }
  }


  async function handleSubmit(values) {
    // console.log(values)
    if (isUpdate) {
      let data = {
        "auditTypeUID": values.auditTypeUID,
        "auditEntityUID": auditMainType,
        "isMandatory": values.isMandatoryActive === "1" ? "Yes" : "No",
        "auditSubtypeUID": values.auditSubtypeUID,
        "auditSubtypeName": values.auditSubtypeName,
      }
      // console.log(data)
      const response = await apiPost(baseURl + config.UpdateSubType, data)
      // console.log(response)
      if (response.data.status === true) {
        toast.success(response.data.message)
        setModalOpen(false)
        setGridRefresh(true)
      } else if (response.data.status === false) {
        toast.warning(response.data.validationList[0])
        setModalOpen(false)
      }


    }
    else {
      let data = {
        // "auditTypeUID": auditMainType === "2"? "0":auditType[values.auditTypeUID].auditTypeUID,
        "auditTypeUID": auditMainType === "2" ? "0" : values.auditTypeUID,
        "auditEntityUID": auditMainType,
        "auditSubtypeName": values.auditSubtypeName,
        "isMandatory": values.isMandatoryActive === "1" ? "Yes" : "No",
        "userUID": user.userUID
      }
      // console.log(data)
      const response = await apiPost(baseURl + config.AddSubType, data)
      // console.log(response)
      if (response.data.status === true) {
        toast.success(response.data.message)
        setModalOpen(false)
        setGridRefresh(true)
      } else if (response.data.status === false) {
        toast.warning(response.data.validationList[0])
        setModalOpen(false)
      } else {
        toast.error("please try again later")
        setModalOpen(false)
      }
    }
  }
  // const Selectedvalue=(values)=>{
  //   console.log(values)
  // }
  const handleChange = (e) => {
    setAuditMainType(e.target.value);
  }

  return (
    <>
      {/* <Row gutter={30} >
     
        <div className='auditEntityDropDown'>
      
      </div>
      <Col style={{ justifyContent: "end", display: "flex" }}>
        <Button className="btn-success" onClick={addModel} style={{ marginBottom: "10px", display: "flex", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}></Button>
      </Col>
    </Row> */}
      {/* <Row className='rowTopLevel'>
        <Col lg={4} style={{ justifyContent: "flex-start" }}>
          <h3>Audit Sub Type</h3></Col> */}
      {/* <Breadcrumb items={[{ title: pathname.replace("admin/", "") }]} style={{
            textTransform: "capitalize", fontWeight: "300",
            fontSize: "x-large", fontFamily: "math"
          }} /> */}
      {/* <Col lg={5}> */}
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} style={{ justifyContent: "start", display: "flex", marginBottom: "-5px", marginTop: "7px" }}>
          <Select sx={{
            '.MuiInputBase-root': {
              height: "32px !important"
            }
          }}
            value={auditMainType}
            onChange={(e) => handleChange(e)}
            className='entityDropDownInput'
          >
            {auditEntity?.map((option) => (
              <MenuItem key={option.auditEntityUID} value={option.auditEntityUID}>
                {option.auditEntityName}
              </MenuItem>
            ))}
          </Select>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add sub section</Button>
        </Col>
      </Row>
      {/* </Col>
        <Col lg={9}></Col>
        <Col lg={6} style={{ justifyContent: "end", display: "flex" }}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px",marginRight:"27px" }}>Add Audit Sub Type</Button>
        </Col>
      </Row> */}
      <div className="ag-theme-alpine" id='aggridheightWith'>
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,
            filter: 'agTextColumnFilter',
            minWidth: 100,
            cellStyle: { textAlign: 'left' }
          }}
          // suppressRowClickSelection={true}
          // groupSelectsChildren={true}
          // debug={true}
          // rowSelection={'multiple'}
          // /*  rowGroupPanelShow={'always'} */
          // pivotPanelShow={'always'}
          // enableRangeSelection={true}
          paginationPageSize={20}
          pagination={true}
          onGridReady={onGridReady}
          columnDefs={columnDef}
          rowData={rowData}

        />
      </div>
      <Modal
        title={isUpdate ? "Update sub section" : "Add sub section"}
        centered
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[null]}
        destroyOnClose={true}
      >
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          validationSchema={!isUpdate ? validationSchemaAdd : validationSchemaUpdate}
          onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <br />
              {auditMainType === "2" ? ("") : (<div className="form-group">
                {/* <label htmlFor="auditTypeUID">Check list type name : </label> */}
                <Field as={TextField}
                  required
                  disabled={auditMainType === "2"}
                  name="auditTypeUID"
                  variant="outlined"
                  label="Section"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  fullWidth
                  value={values?.auditTypeUID ?? ""}
                  select
                  className={
                    "form-control" +
                    (errors.auditTypeUID && touched.auditTypeUID ? " is-invalid" : "")
                  }
                >
                  {auditType?.map((q, index) => (
                    <MenuItem key={index} value={q.auditTypeUID}>
                      {q.auditTypeName}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="auditTypeUID"
                  component="div"
                  className="invalid-feedback"
                />
              </div>)}

              <br />
              {/* {auditMainType === "2" ? ("") : (    */}
              <div className="form-group">
                {/* <label htmlFor="auditSubtypeName">Check list subType name :</label> */}
                <Field
                  required
                  label="Sub section"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  name="auditSubtypeName"
                  as={TextField}
                  fullWidth
                  value={values?.auditSubtypeName ?? ""}
                  className={
                    "form-control" +
                    (errors.auditSubtypeName && touched.auditSubtypeName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="auditSubtypeName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              {/* )} */}
              <div className="form-group">
                <label htmlFor="isMandatoryActive">Mandatory :</label>
                <Field
                  style={{ marginLeft: "5px" }}
                  name="isMandatoryActive"
                  type="checkbox"
                  checked={values?.isMandatoryActive === "1" ? true : false}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setFieldValue("isMandatoryActive", "1")
                    }
                    else {
                      setFieldValue("isMandatoryActive", "0")
                    }
                  }}

                // value={values?.isMandatoryActive?? "" }

                />
                {/* <ErrorMessage
                  name="auditsubTypeName"
                  component="div"
                  className="invalid-feedback"
                /> */}
              </div>
              {/* <div className="form-group">
                <label htmlFor="auditEntityUID">AuditEntity Name : </label>
                <Field as={TextField}
                  name="auditEntityUID"
                  variant="outlined"
                  value={values?.auditEntityUID ?? ""}
                  fullWidth
                  select
                  className={
                    "form-control" +
                    (errors.auditEntityUID && touched.auditEntityUID ? " is-invalid" : "")
                  }
                >
                  {auditEntity?.map((q) => (
                    <MenuItem key={q.auditEntityUID} value={q.auditEntityUID}>
                      {q.auditEntityName}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="auditEntityUID"
                  component="div"
                  className="invalid-feedback"
                />
              </div> */}



              <div className="form-group">
                <Row style={{
                  justifyContent: "end",
                  display: "flex", marginTop: "10px",
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

                    <Button type="reset" htmltype="reset" onClick={() => setModalOpen(false)} className="btn btn-secondary" style={{
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
        open={modelDeleteOpen}
        // onSubmit={handleSubmit}
        onOk={() => { setModelDeleteOpen(false); setDeleteSubType({}) }}
        onCancel={() => { setModelDeleteOpen(false); setDeleteSubType({}) }}
        maskClosable={false}
        footer={[null]}
      >
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <h3>Are you sure want to delete this AuditType : <span style={{ color: "red" }}>{deleteSubType.auditSubtypeName} ?</span></h3>
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <div style={{
              justifyContent: "end",
              display: "flex"
            }}>
              <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }} onClick={deleteAuditSubType}>
                Delete
              </Button>
              <Button style={{
                marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
              }} onClick={() => { setModelDeleteOpen(false); setDeleteSubType({}) }}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default CheckListSubType

