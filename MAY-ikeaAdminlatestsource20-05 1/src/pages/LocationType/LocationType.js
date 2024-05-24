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
import { Formik, Field, Form, values, ErrorMessage, } from "formik";
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
import { Option } from 'antd/es/mentions';
import { MenuItem, TextField, Select } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../Style.css";
toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});


async function LocationTypeList() {
  const response = await apiPost(baseURl + config.GetLocationType, {});
  // console.log(response.data)
  return response.data

}
function LocationType() {
  const [locationType, setLocationType] = useState("")
  const [location, setLocation] = useState([])
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [submitButton, setSubmitButton] = useState("")
  const [newInitialValues, setNewInitialValues] = useState(undefined)
  const userString = sessionStorage.getItem('Audit_user');
  const [gridRefresh, setGridRefresh] = useState(false)
  const user = JSON.parse(userString);
  const initialValues = {
    locationTypeName: "",
  }


  const [columnDef, setcolumnDef] = useState([
    {
      headerName: 'Location ID', field: 'locationTypeUID', width: '150', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Location Names', field: 'locationTypeName', width: '150', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Action', field: 'isActive', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><Button onClick={() => LocationTypeActiveFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip></>)
    },
  ]);


  useEffect(() => {

    (async () => {
      const newData = await LocationTypeList();
      setrowData(newData.data)
      // console.log(newData.data)
      setGridRefresh(false)

    })();
  }, [gridRefresh])
  const handleChange = (e) => {
    setLocationType(e.target.value);
  }

  async function LocationTypeActiveFunc(params) {
    let data = {
      "locationTypeUID": params.data.locationTypeUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.LocationTypeActive, data);
    // setGridRefresh(true)
    // console.log(response)
    if (response.data.status === true) {
      toast.success(response.data.message);
      setGridRefresh(true)

    } else {
      toast.warning("Try again later")
    }

  }
  const handleOpen = (params) => {
    setSubmitButton("Update")
    setModalOpen(true)
    setIsUpdate(true)
    setNewInitialValues(params.data)
    // console.log(params.data)
  }
  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }

  const addModel = () => {
    setSubmitButton("Submit")
    setIsUpdate(false)
    setModalOpen(true)
  }
  async function handleSubmit(values) {
    let response;
    if (isUpdate) {
      let data = {
        "userUID": user.userUID,
        "locationTypeName": values.locationTypeName,
        "locationTypeUID": values.locationTypeUID,
      };

      response = await apiPost(baseURl + config.UpdateLocationType, data);
    }
    else {
      let data = {
        "userUID": user.userUID,
        "locationTypeName": values.locationTypeName
      }

      response = await apiPost(baseURl + config.AddLocationType, data);
      //  setOpen(false)
    }
    if (response.data.status === true) {
      setGridRefresh(true)
      toast.success(response.data.message);
      setModalOpen(false)//user and update consolelog
    } else if (response.data.status === false) {
      toast.warning(response.data.validationList[0])
      setModalOpen(false)
    } else {
      toast.warning("please try again sometime")
      setModalOpen(false)
    }
    // console.log(response)
    // const newData = await auditEntityList();
    // setrowData(newData.data.entity)

  }
  return (
    <>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add Location Type</Button>
        </Col>
      </Row>
      <div className="ag-theme-alpine" id='aggridheightWith'>
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,
            // filter: 'agTextColumnFilter',
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
      {/* <br />
      <br />
      <Row style={{justifyContent: "end",
    display: "flex"}}>
        <Col lg={12}>
          <div className='QuestionAuditEntityDropDown'>
            <Select
              value={locationType}
              onChange={(e) => handleChange(e)}
              className='entityDropDownInput'
            >
              {location?.map((option) => (
                <MenuItem key={option.locationTypeUID} value={option.locationTypeUID}>
                  {option.locationTypeName}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Col>
        <Col lg={12}>
          <Button className="btn-success" onClick={addModel} style={{ marginBottom: "10px", display: "flex", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", marginRight: "10px" }}>Add Form</Button>
        </Col>
      </Row> */}
      <Modal
        title="Add Location Panel"
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
          // validationSchema={!isUpdate ? validationSchemaAdd : validationSchemaUpdate}
          onSubmit={handleSubmit}>
          {({ values, errors, touched }) => (
            <Form>
              <div className="form-group">
                {/* <label htmlFor="locationTypeName">Location Type Name</label> */}
                <br />
                <Field
                  label="Location type name"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  required
                  name="locationTypeName"
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  value={values?.locationTypeName ?? ""}
                  className={
                    "form-control" +
                    (errors.locationTypeName && touched.locationTypeName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="locationTypeName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <Row className='buttonAddUpdate' style={{ marginTop: "10px", justifyContent: "end", display: "flex", marginRight: "-2" }}>
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
    </>
  )
}

export default LocationType