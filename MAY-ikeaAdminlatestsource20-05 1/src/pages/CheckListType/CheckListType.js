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
import { Formik, Field, Form, ErrorMessage, } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
// import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import IconButton from '@mui/material/IconButton';
// import { Switch } from 'antd';
import Switch from '@mui/material/Switch';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
// import { Select } from 'antd';
import { MenuItem, TextField, Select } from "@mui/material";
import { Option } from 'antd/es/mentions';
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



async function auditTypeList() {
  const response = await apiPost(baseURl + config.AuditTypeList, {});
  // console.log(response.data)
  return response.data
  // if (response.data.status == true) {
  //     return response.data.data;
  // }

}


function CheckListType() {
  const [submitButton, setSubmitButton] = useState("")
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [auditEntity, setAuditEntity] = useState([]);
  const [newInitialValues, setNewInitialValues] = useState(undefined)
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [deleteAuditType, setDeleteAuditType] = useState({})
  const userString = sessionStorage.getItem('Audit_user');
  const [gridRefresh, setGridRefresh] = useState(false)
  const [auditMainType, setAuditMainType] = useState("")
  const user = JSON.parse(userString);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");


  const initialValues = {
    auditTypeName: "",
    auditEntityUID: ""
  }
  const EntityInitialValues = {
    auditEntityUID: ""
  }



  const validationSchemaAdd = Yup.object().shape({
    auditTypeName: Yup.string().required("Audit Type Name is required"),
    // auditEntityUID: Yup.string().required("Audit Entity Type is required"),
  })

  const validationSchemaUpdate = Yup.object().shape({
    auditTypeName: Yup.string().required("Audit Type Name is required"),
    // auditEntityUID: Yup.string().required("Audit Entity Type is required"),
  })



  const [columnDef, setcolumnDef] = useState([
    // {
    //   headerName: 'Check list entity name', field: 'auditEntityName', width: '150', flex: 3,
    //   sortable: true,
    //   resizable: true,
    //   filter: true,
    //   floatingFilter: true,
    // },
    {
      headerName: 'Section name', field: 'auditTypeName', width: '150', flex: 3,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Action', field: 'isActive', width: '150', flex: 3, cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<>  <Tooltip title="Deactivate / Inactive"><Button onClick={() => auditypestatus(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button> </Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>)
    },
  ]);



  async function auditEntityList() {
    let data = {
      userUID: user.userUID,
    };
    const response = await apiPost(baseURl + config.AuditEntityList, data);
    return response.data
  }

  useEffect(() => {
    (async () => {
      const newData = await auditEntityList();
      setAuditEntity(newData.data.entity)

      setAuditMainType(newData.data.entity[0].auditEntityUID)
      // console.log(newData.data.entity)

    })();
  }, [])

  async function getaudittypebyentity() {
    let data = {
      "auditEntityUID": auditMainType
    }
    const response = await apiPost(baseURl + config.GetAuditTypeNameByEntity, data)
    return response.data
  }
  useEffect(() => {
    // (async () => {
    //   let data = {
    //     "auditEntityUID": auditMainType
    //   }
    //   const response = await apiPost(baseURl + config.GetAuditTypeByEntity, data)
    //   console.log(response.data.data)
    //   setrowData(response.data.data)
    //   // setAuditType(newData.data)
    //   //  console.log(newData.data.SubType)
    //   // setGridRefresh(false)
    // })();
    (async () => {
      const newData = await getaudittypebyentity();
      // console.log(newData)
      setrowData(newData.data)
      // setAuditType(newData.data)
      //  console.log(newData.data.SubType)
      // setGridRefresh(false)
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

  async function auditypestatus(params) {
    // if (params.data.isActive === "1" ? `Switch to ${null}` : `Switch to ${checked}`) {
    //   let data = {
    //     "auditTypeUID": params.data.auditTypeUID,
    //     "isActive": params.data.isActive === "1" ? "0" : "1"
    //   }
    //   const response = await apiPost(baseURl + config.AuditTypeActive, data);
    //   console.log(response)
    //   const newData = await auditTypeList();
    //   setrowData(newData.data)

    // } else {

    // }

    let data = {
      "auditTypeUID": params.data.auditTypeUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.AuditTypeActive, data);
    // console.log(response)
    if (response.data.status === true) {
      // console.log("if worked")
      toast.success(response.data.message);
      setGridRefresh(true)
    } else {
      toast.warning("Try again later")
    }

  }

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }
  const addModel = () => {
    setIsUpdate(false)
    setSubmitButton("Submit")
    setModalOpen(true)
    // console.log("this is audit entity name" + JSON.stringify(auditEntity))

  }
  const handleOpen = (params) => {
    // setAuditTypeUID(params.data)
    setModalOpen(true)
    setSubmitButton("Update")
    setIsUpdate(true)
    setNewInitialValues(params.data)
    // console.log(params.data)
  }

  async function handleSubmit(values) {
    // console.log(values)
    let response;
    if (isUpdate) {

      let data = {
        "auditEntityUID": auditMainType,
        "auditTypeName": values.auditTypeName,
        "userUID": user.userUID,
        "auditTypeUID": newInitialValues.auditTypeUID
      }
      // console.log(data)
      response = await apiPost(baseURl + config.UpdateAuditType, data);
    } else {
      let data = {
        "auditEntityUID": auditMainType,
        "auditTypeName": values.auditEntityUID === "2" ? "0" : values.auditTypeName,
        "userUID": user.userUID
      }
      // console.log(data)
      response = await apiPost(baseURl + config.AddAuditType, data);
    }

    if (response.data.status === true) {
      setGridRefresh(true)
      toast.success(response.data.message);
      setModalOpen(false)
    } else {
      if (response.data.status === false) {
        toast.error(response.data.validationList[0])
      }
    }
    // console.log(response)
  }
  async function handleDeleteModalOpen(params) {
    setModelDeleteOpen(true)
    setDeleteAuditType(params.data)
  }

  async function deleteAuditTypefunc() {
    let data = {
      "auditTypeUID": deleteAuditType.auditTypeUID
    }
    const response = await apiPost(baseURl + config.DeleteAudittype, data);
    if (response.data.status === true) {
      toast.error(response.data.message)
      setGridRefresh(true)
      setModelDeleteOpen(false);
      setDeleteAuditType({})
    } else {
      setGridRefresh(true)
      toast.error("Please try again later")
      setModelDeleteOpen(false);
      setDeleteAuditType({})
    }
    // console.log(response)
  }
  // const handleChangeDrop = (e) => {
  //   setAuditMainType(e.target.value);
  //   console.log(e)
  // }
  const handleChange = (e) => {
    // console.log(e)
    setAuditMainType(e.target.value);
  }
  return (
    <>
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
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add section</Button>
        </Col>
      </Row>
      {/* <Row>
        <Col lg={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add check list Type</Button>
        </Col>
      </Row> */}
      {/* <Row className='rowTopLevel'>
        <Col lg={20}>
          <h3>Audit Type</h3> */}
      {/* <Breadcrumb items={[{ title: pathname.replace("admin/", "") }]} style={{
            textTransform: "capitalize", fontWeight: "300",
            fontSize: "x-large", fontFamily: "math"
          }} /> */}
      {/* </Col>
        <Col lg={4}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px",marginRight:"27px" }}>Add Audit Type</Button>
        </Col>
      </Row> */}
      {/* <Field as={TextField}
        variant="outlined"
        fullWidth
        >{auditEntity.array.forEach(q => {
          
        })};

        </Field> */}
      {/* <Formik
          initialValues={EntityInitialValues}
          enableReinitialize={true}
          // validationSchema={!isUpdate ? validationSchemaAdd : validationSchemaUpdate}
          onChange={(e)=>Selectedvalue(e)}>
          {({ values, errors, touched }) => (
            <Form> */}
      {/* <div className="form-group">
                <label htmlFor="auditEntityUID">AuditEntity Name : </label>
                <Field as={TextField}
                  name="auditEntityUID"
                  variant="outlined"
                  fullWidth
                  select
                  onChange={(e)=>Selectedvalue(e)}
                >
                  {auditEntity?.map((q) => (
                    <MenuItem key={q.auditEntityUID} value={q.auditEntityUID}>
                      {q.auditEntityName}
                    </MenuItem>
                  ))}
                </Field>
              </div> */}
      {/* </Form>
          )}
          </Formik> */}

      <div className="ag-theme-alpine" id='aggridheightWith'>
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,
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
        title={isUpdate ? "Update section panel" : "Add section panel"}
        centered
        visible={modalOpen}
        destroyOnClose={true}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[null]}
        maskClosable={false}
      >
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          validationSchema={!isUpdate ? validationSchemaAdd : validationSchemaUpdate}
          onSubmit={handleSubmit}>
          {({ values, errors, touched }) => (
            <Form>
              {/* <br />
              <div className="form-group">
              
                <Field as={TextField}
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  label="Check list entity name"
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
                  {auditEntity.map((q) => (
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
              <br />


              <div className="form-group">
                {/* <label htmlFor="auditTypeName">Check list type name :</label> */}
                <Field
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  required
                  label="Section name"
                  // disabled={values.auditEntityUID === "2"}
                  name="auditTypeName"
                  as={TextField}
                  fullWidth
                  value={values?.auditTypeName ?? ""}
                  className={
                    "form-control" +
                    (errors.auditTypeName && touched.auditTypeName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="auditTypeName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>



              <br />

              <div className="form-group">
                <Row style={{
                  justifyContent: "end",
                  display: "flex",
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
        title="Delete section Panel"
        centered
        open={modelDeleteOpen}
        // onSubmit={handleSubmit}
        onOk={() => { setModelDeleteOpen(false); setDeleteAuditType({}) }}
        onCancel={() => { setModelDeleteOpen(false); setDeleteAuditType({}) }}
        maskClosable={false}
        footer={[null]}
      >
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <h3>Are you sure want to delete this AuditType : <span style={{ color: "red" }}>{deleteAuditType.auditTypeName} ?</span></h3>
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <div style={{
              justifyContent: "end",
              display: "flex"
            }}>
              <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }} onClick={deleteAuditTypefunc}>
                Delete
              </Button>
              <Button style={{
                marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
              }} onClick={() => { setModelDeleteOpen(false); setDeleteAuditType({}) }}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default CheckListType