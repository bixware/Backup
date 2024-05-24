import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { apiPost } from '../../api/apiCommon';
import config from "../../config"
import { useState, useEffect } from 'react';
import baseURl from "../../base"
import { Modal } from 'antd';
import * as Yup from "yup";
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import IconButton from '@mui/material/IconButton';
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from "formik";
import { Col, Menu, Row } from 'antd';
import { TextField, MenuItem } from '@mui/material';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { Input } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import "../../Style.css";

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});

async function storeList() {
  const response = await apiPost(baseURl + config.getStore, {});
  // console.log(response.data)
  return response.data
  // if (response.data.status == true) {
  //     return response.data.data;
  // }

}


function Location() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [newInitialValues, setNewInitialValues] = useState(undefined)
  const [isUpdate, setIsUpdate] = useState(false)
  const [submitButton, setSubmitButton] = useState("")
  const [store, setStore] = useState({});
  const [locationType, setLocationType] = useState([])
  const [auditEntity, setAuditEntity] = useState([])
  const [gridRefresh, setGridRefresh] = useState(false)
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");


  const initialValues = {
    storeName: "",
    locationTypeUID: "",
    auditEntityUID: "",
    address: "",
    zipcode: "",
    contactEmail: ""
  }


  const validationSchemaAdd = Yup.object().shape({
    storeName: Yup.string().required("Store name is required"),
    storeName: Yup.string().required("Store name is required"),
    locationTypeUID: Yup.string().required("Location Type is required"),
    auditEntityUID: Yup.string().required("Audit Entity is required"),
    address: Yup.string().required("Address is required"),
    zipcode: Yup.string().required("Zip Code is required"),
    contactEmail: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),


  })

  const validationSchemaUpdate = Yup.object().shape({
    storeName: Yup.string().required("Store name is required"),
    storeName: Yup.string().required("Store name is required"),
    locationTypeUID: Yup.string().required("Location Type is required"),
    auditEntityUID: Yup.string().required("Audit Entity is required"),
    address: Yup.string().required("Address is required"),
    zipcode: Yup.string().required("Zip Code is required"),
  })

  const [columnDef, setcolumnDef] = useState([
    {
      headerName: 'Store name', field: 'storeName', width: '150', flex: 3,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Country name', field: 'countryName', width: '150', flex: 3, resizable: true,
      filter: true,
      floatingFilter: true,
    },
    // { headerName: 'Created Date', field: 'createdDate', width: '150', flex: 3 ,},
    {
      headerName: 'Location type', field: 'locationTypeName', width: '150', flex: 3, resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Check list entity', field: 'auditEntityName', width: '150', flex: 3, resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Action', field: 'isActive', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><Button onClick={() => userStatusFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip></>
      )
    },
    // {
    //   headerName: 'Action', field: 'userUID', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<></>
    //   )
    // }
  ]);
  {/* <IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton> */ }
  // {headerName: 'Action', field: 'userUID', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></>)}

  async function auditEntityList() {
    let data = {
      userUID: user.userUID,
    };
    const response = await apiPost(baseURl + config.AuditEntityList, data);
    // console.log(response.data)
    return response.data

  }

  useEffect(() => {

    (async () => {
      const newData = await storeList();
      // console.log(newData.data.store)
      setrowData(newData.data.store)
      // console.log(newData.data.store)
      setGridRefresh(false)

    })();

    (async () => {
      const newData = await auditEntityList();
      setAuditEntity(newData.data.entity)
      // console.log(newData.data.entity)

    })();

    (async () => {

      const response = await apiPost(baseURl + config.GetLocationType, {});
      setLocationType(response.data.data)
      // console.log(auditResult)

    })();

  }, [gridRefresh])

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }
  const addModel = () => {
    setIsUpdate(false)
    setModalOpen(true)
    setSubmitButton("Submit")
  }
  const handleOpen = (params) => {
    // console.log(params)
    setSubmitButton("Update")
    setModalOpen(true)
    setStore(params.data)
    setNewInitialValues(params.data)
    setIsUpdate(true)
  }

  const handleDeleteModalOpen = (params) => {
    setModelDeleteOpen(true)
    setStore(params.data)

  }
  async function userStatusFunc(params) {

    setGridRefresh(true)

    let data = {
      "storeUID": params.data.storeUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.storeActive, data);
    // console.log(response.data)
    if (response.data.status === true) {
      toast.success(response.data.message);
      setGridRefresh(true)
    }

  }

  async function handleSubmit(values) {

    // console.log(values)
    let response;
    if (isUpdate) {
      let data = {
        "userUID": user.userUID,
        "storeUID": store.storeUID,
        "storeName": values.storeName,
        "countryUID": 1,
        "locationTypeUID": values.locationTypeUID,
        "auditEntityUID": values.auditEntityUID,
        "address": values.address,
        "zipcode": values.zipcode
      };

      response = await apiPost(baseURl + config.updateStore, data);
    }
    else {
      let data = {
        "storeName": values.storeName,
        "countryUID": 1,
        "locationTypeUID": values.locationTypeUID,
        "auditEntityUID": values.auditEntityUID,
        "address": values.address,
        "zipcode": values.zipcode,
        "contactEmail": values.contactEmail,
      };

      response = await apiPost(baseURl + config.addStore, data);
      //  setOpen(false)
    }
    if (response.data.status === true) {
      toast.success(response.data.message);
      setModalOpen(false)
      setGridRefresh(true)
    }
    // console.log(response)


  }
  async function deleteStore() {
    let data = {
      "storeUID": store.storeUID
    }
    const response = await apiPost(baseURl + config.DeleteStore, data);
    // console.log(response.data)
    if (response.data.status === true) {
      toast.error(response.data.message)
      setModelDeleteOpen(false);
      setGridRefresh(true)
    }
  }
  return (
    <>
      {/* <Row className='rowTopLevel'>
        <Col lg={20}>
         <h3 >Location</h3> 
        </Col>
        <Col lg={4} >
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white",height: "32px",marginRight:"27px"}}>Add Location</Button>
        </Col>
      </Row> */}
      <Row>
        <Col lg={24} md={24} xs={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>

          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add Location</Button>
        </Col>
      </Row>
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
        title="Add Location Panel"
        centered
        destroyOnClose={true}
        visible={modalOpen}
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
              <>
                <br />
                <div className="form-group">
                  {/* <label htmlFor="storeName">Store Name</label> */}
                  <Field
                    inputProps={{
                      style: {
                        padding: "6.5px 14px"
                      }
                    }}
                    required
                    label="Store name"
                    name="storeName"
                    as={TextField}
                    value={values?.storeName ?? " "}
                    fullWidth
                    variant="outlined"
                    className={
                      "form-control" +
                      (errors.storeName && touched.storeName ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="storeName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                {/* <Field as={TextField}
                inputProps={{
                  style: {
                    padding: "6.5px 14px"
                  }
                }}
                  name="storeName"
                  label="Store name"
                  variant="outlined"
                  fullWidth
                /> */}
                <br />

                <div className="form-group">
                  {/* <label htmlFor="locationTypeUID">Location Type :</label> */}
                  <Field
                    inputProps={{
                      style: {
                        padding: "6.5px 14px"
                      }
                    }}
                    name="locationTypeUID"
                    label="Location name"
                    required

                    as={TextField}
                    value={values?.locationTypeUID ?? ""}
                    fullWidth
                    select
                    className={
                      "form-control" +
                      (errors.locationTypeUID && touched.locationTypeUID ? " is-invalid" : "")
                    }
                  >   {locationType?.map((q) => (
                    <MenuItem key={q.locationTypeUID} value={q.locationTypeUID}>
                      {q.locationTypeName}
                    </MenuItem>
                  ))}
                  </Field>
                  <ErrorMessage
                    name="locationTypeUID"
                    component="div"
                    className="invalid-feedback"
                  />

                </div>
                <br />
                <div className="form-group">
                  {/* <label htmlFor="auditEntityUID">Audit Entity</label> */}
                  <Field
                    inputProps={{
                      style: {
                        padding: "6.5px 14px"
                      }
                    }}
                    label="Check list entity"
                    required
                    name="auditEntityUID"
                    as={TextField}
                    value={values?.auditEntityUID ?? ""}
                    fullWidth
                    select
                    className={
                      "form-control" +
                      (errors.auditEntityUID && touched.auditEntityUID ? " is-invalid" : "")
                    }
                  >  {auditEntity?.map((q) => (
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
                </div>
                <br />
                <div className="form-group">
                  {/* <label htmlFor="address">Address</label> */}
                  <Field
                    // inputProps={{
                    //   style: {
                    //     padding: "6.5px 14px"
                    //     height: "30px"
                    //   }
                    // }}
                    sx={{
                      '.MuiInputBase-root': {
                        height: "60px !important"
                      }
                    }}
                    multiline
                    required

                    rows={2}
                    label="Address"
                    name="address"
                    as={TextField}
                    fullWidth
                    value={values.address}
                    className={
                      "form-control" +
                      (errors.address && touched.address ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <br />
                <div className="form-group">
                  {/* <label htmlFor="zipcode">Zipcode :</label> */}
                  <Field

                    inputProps={{
                      style: {
                        padding: "6.5px 14px"
                      }
                    }}
                    label="Zipcode"
                    name="zipcode"
                    as={TextField}
                    fullWidth
                    required
                    value={values?.zipcode ?? ""}
                    className={
                      "form-control" +
                      (errors.zipcode && touched.zipcode ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="zipcode"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <br />
                {!isUpdate ? (<div className="form-group">
                  {/* <label htmlFor="contactEmail">Email :</label> */}
                  <Field
                    inputProps={{
                      style: {
                        padding: "6.5px 14px"
                      }
                    }}
                    label="Email"
                    required
                    name="contactEmail"
                    as={TextField}
                    fullWidth
                    value={values?.contactEmail ?? ""}
                    className={
                      "form-control" +
                      (errors.contactEmail && touched.contactEmail ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="contactEmail"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>) : null}

                <div className="form-group">
                  <Row style={{ marginTop: "10px" }} >
                    <Col lg={24} md={24} sm={24} xs={24} style={{
                      justifyContent: "end",
                      display: "flex"
                    }}>
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
              </>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        title="Delete User Panel"
        centered

        open={modelDeleteOpen}
        // onSubmit={handleSubmit}
        onOk={() => setModelDeleteOpen(false)}
        onCancel={() => setModelDeleteOpen(false)}

        footer={[null]}
      > <Row>
          <Col lg={12}>
            <h3>Are you sure want to delete this Store {store.storeName} ?</h3>
          </Col>
          <Row style={{
            justifyContent: "end",
            display: "flex", marginTop: "20px"
          }}>
            <Col lg={12}>
              <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }} onClick={deleteStore}>
                Delete
              </Button>
              <Button style={{
                marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
              }} onClick={() => setModelDeleteOpen(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Row>
      </Modal>
    </>

  )
}

export default Location