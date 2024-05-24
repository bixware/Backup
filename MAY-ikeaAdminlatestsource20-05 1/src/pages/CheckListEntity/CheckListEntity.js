import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { apiPost } from "../../api/apiCommon"
import config from "../../config"
import { useState, useEffect } from 'react';
import baseURl from "../../base"
import { Col, Row } from 'antd';
import { Modal } from 'antd';
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import IconButton from '@mui/material/IconButton';
import Menu from "antd";
import MenuItem from 'antd/es/menu/MenuItem';
import { TextField, Select } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import "../../Style.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});
// import { MenuItem } from '@mui/material';



function CheckListEntity() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [newInitialValues, setNewInitialValues] = useState(undefined)
  const [isUpdate, setIsUpdate] = useState(false)
  const [auditEntity, setAuditEntity] = useState({})
  const [submitButton, setSubmitButton] = useState("")
  const [gridRefresh, setGridRefresh] = useState(false)
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);
  const initialValues = {
    auditEntityName: "",
  }

  const [columnDef, setcolumnDef] = useState([
    { headerName: 'Check list Entity', field: 'auditEntityName', width: '150', flex: 3 },
    {
      headerName: 'Action', field: 'isActive', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><Button onClick={() => auditEntityActiveFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip></>)
    },
  ]);

  const validationSchemaAdd = Yup.object().shape({
    auditEntityName: Yup.string().required("Audit Entity Name is required"),

  })

  const validationSchemaUpdate = Yup.object().shape({
    auditEntityName: Yup.string().required("Audit Entity Name is required"),
  })


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
      setrowData(newData.data.entity)
      // console.log(newData)
      setGridRefresh(false)

    })();

  }, [gridRefresh])

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }
  async function auditEntityActiveFunc(params) {
    // console.log(params)
    let data = {
      "auditEntityUID": params.data.auditEntityUID,
      "isActive": params.data.isActive === "1" ? "0" : "1",
    }
    const response = await apiPost(baseURl + config.AuditEntityActive, data);
    if (response.data.status === true) {
      toast.success(response.data.message);
      setGridRefresh(true)
    } else {
      toast.error("Please try again later");
    }
  }
  const addModel = () => {
    setIsUpdate(false)
    setModalOpen(true)
    setSubmitButton("Submit")

  }
  const handleOpen = (params) => {

    setSubmitButton("Update")
    setModalOpen(true)
    setIsUpdate(true)
    setAuditEntity(params.data)
    setNewInitialValues(params.data)
  }

  async function handleSubmit(values) {
    let response;
    if (isUpdate) {
      let data = {
        "userUID": user.userUID,
        "auditEntityName": values.auditEntityName,
        "auditEntityUID": auditEntity.auditEntityUID,
      };

      response = await apiPost(baseURl + config.UpdateAuditEnity, data);
    }
    else {
      let data = {
        "userUID": user.userUID,
        "auditEntityName": values.auditEntityName
      }

      response = await apiPost(baseURl + config.AddAuditEntity, data);
      //  setOpen(false)
    }
    // console.log(response)
    if (response.data.status === true) {
      toast.success(response.data.message);
      setModalOpen(false)
      setGridRefresh(true)
    } else {
      //  console.log(response)
    }
    // const newData = await auditEntityList();
    // setrowData(newData.data.entity)

  }
  async function handleDeleteModalOpen(params) {
    setModelDeleteOpen(true)
    setAuditEntity(params.data)

  }
  async function deleteAuditEntity() {

  }
  return (
    <>
      {/* <Row>
        <Col style={{ justifyContent: "end", display: "flex" }}>
          <Button className="btn-success" onClick={addModel} style={{ marginBottom: "10px", display: "flex", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}>Add Audit Entity</Button>
        </Col>
      </Row> */}
      {/* <Row className='rowTopLevel'>
        <Col lg={24} style={{justifyContent:"flex-start"}}>
          <h3>Audit Entity</h3></Col>
          </Row> */}
      <div className="ag-theme-alpine" id='aggridheightWO'>
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            // filter: true,
            // floatingFilter: true,
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
          pagination={true}
          onGridReady={onGridReady}
          columnDefs={columnDef}
          rowData={rowData}

        />
      </div>
      <Modal
        title="Edit Audit Entity Panel"
        centered
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[null]}
      >
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          validationSchema={!isUpdate ? validationSchemaAdd : validationSchemaUpdate}
          onSubmit={handleSubmit}>
          {({ values, errors, touched }) => (
            <Form>
              <div className="form-group">
                {/* <label htmlFor="auditEntityName">Check list entity name</label> */}
                <br />
                <Field
                  label="Check list entity"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  name="auditEntityName"
                  as={TextField}
                  fullWidth
                  value={values?.auditEntityName ?? ""}
                  className={
                    "form-control" +
                    (errors.auditEntityName && touched.auditEntityName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="auditEntityName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <br />
              <div className="form-group">
                <Row className='buttonAddUpdate'>
                  <Col lg={12} style={{ justifyContent: "flex-end", display: "flex" }}>
                    <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}
                      htmlType='submit'
                      type="submit"
                      // onClick={()=>setModal2Open(false)}
                      className="btn btn-primary mr-2"
                    // disabled={isSubmitting}
                    >
                      {submitButton}
                    </Button>

                    <Button type="reset" htmlType="reset" onClick={() => setModalOpen(false)} className="btn btn-secondary" style={{
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
      {/* <Modal
        title="Delete User Panel"
        centered
        open={modelDeleteOpen}
        // onSubmit={handleSubmit}
        onOk={() => setModelDeleteOpen(false)}
        onCancel={()=>setModelDeleteOpen(false)}

        footer={[null]}
      > <Row>
        <Col lg={12}>
          <h3>Are you sure want to delete this AuditEntity {auditEntity.auditEntityName} ?</h3>
        </Col>
         <Row style={{justifyContent: "end",
    display: "flex",marginTop:"20px"}}>
        <Col lg={12}>
         <Button  style={{backgroundColor: "#0257a7",fontSize: "12px",padding:"7px",color: "white"}} onClick={deleteAuditEntity}>
                        Delete
                    </Button>
                    <Button  style={{marginLeft:"15px",backgroundColor: "#0257a7",fontSize: "12px",padding:"7px",color: "white"
        }} onClick={()=>setModelDeleteOpen(false)}>
                        Cancel
                    </Button>
      </Col>
        </Row>
        </Row>
        </Modal> */}
    </>
  )
}

export default CheckListEntity