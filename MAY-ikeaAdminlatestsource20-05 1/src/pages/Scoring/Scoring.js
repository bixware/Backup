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
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn, validateYupSchema } from "formik";
// import { Formik, Field, Form, ErrorMessage, } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import IconButton from '@mui/material/IconButton';
import Menu from "antd";
import { MenuItem, TextField } from "@mui/material";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Tooltip from '@mui/material/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
// import { Select } from '@material-ui/core';
import { Select } from "@mui/material";
toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});



function Scoring() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [auditEntity, setAuditEntity] = useState([])
  const [newInitialValues, setNewInitialValues] = useState(undefined)
  const userString = sessionStorage.getItem('Audit_user');
  const [gridRefresh, setGridRefresh] = useState(false)
  const [submitButton, setSubmitButton] = useState("")
  const [selectedAuditEntity, setSelectedAuditEntity] = useState("")
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [score, setScore] = useState({});
  const user = JSON.parse(userString);


  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");


  const initialValues = {
    auditEntityUID: "",
    answerValue: "",
    answerName: "",
    scoreValue: "",
  }



  const validationSchemaAdd = Yup.object().shape({
    // auditEntityUID: Yup.string().required("Check list name is required"),
    answerValue: Yup.string().required("Answer value is required"),
    answerName: Yup.string().required("Answer name Type is required"),
    scoreValue: Yup.string().required("Score value is required"),


  })

  const AnswerValues = [
    {
      label: "ONE-1",
      value: '1',
    },
    {
      label: "TWO-2",
      value: '2',
    },
    {
      label: "THREE-3",
      value: '3',
    },
    {
      label: "FOUR-4",
      value: '4',
    },
    {
      label: "N/A",
      value: "N/A",
    },
  ];
  const AnswerName = [
    {
      label: "Good Example",
      value: "Good Example",
    },
    {
      label: "OK",
      value: "OK",
    },
    {
      label: "Standard",
      value: "Standard",
    },
    {
      label: "Below Standard",
      value: "Below Standard",
    },
    {
      label: "Serious",
      value: "Serious",
    },
    {
      label: "Critical",
      value: "Critical",
    },
    {
      label: "NOT OK",
      value: "NOT OK",
    },
    {
      label: "N/A",
      value: "N/A",
    },
  ];

  const percentArray = [];

  for (var l = 0; l <= 100; l++) {
    percentArray.push(l);
  }



  const [columnDef, setcolumnDef] = useState([
    {
      headerName: 'S.NO', field: 'statusUID', width: '50', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: 'Check list Name', field: 'auditEntityName', width: '150', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Status Value', field: 'answerValue', width: '80', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Score Value', field: 'scoreValue', width: '80', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Answer name', field: 'answerName', width: '80', flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Action', field: 'isActive', width: '110', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<> <Tooltip title="Deactivate / Inactive"><Button onClick={() => auditEntityActiveFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>
      )
    },
    // {
    //   headerName: 'Action', field: 'userUID', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton>
    //     <IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></>
    //   )
    // }
  ]);
  async function auditEntityActiveFunc(params) {

    let data = {
      "statusUID": params.data.statusUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.StatusActive, data);
    setGridRefresh(true)
    // console.log(response)
    if (response.data.status === true) {
      // console.log("if worked")
      toast.success(response.data.message);
      setGridRefresh(true)
    } else {
      toast.warning("Try again later")
    }

  }

  async function StatusList() {
    let data = {
      "userUID": user.userUID
    }
    const response = await apiPost(baseURl + config.GetStatus, data);
    return response.data
  }

  async function GetAuditScoreByEntity() {
    let data = {
      auditEntityUID: selectedAuditEntity
    }
    const response = await apiPost(baseURl + config.GetAuditScoreByEntity, data)
    return response.data
  }

  async function GetAuditEntity() {
    let data = {
      userUID: user.userUID,
    };
    let response = await apiPost(baseURl + config.AuditEntityList, data)
    return response.data
  }


  useEffect(() => {

    // (async () => {

    //   const newData = await StatusList();
    //   // setrowData(newData.data.Status)
    //   // console.log(newData.data.Status)
    //   setGridRefresh(false)

    // })();
    // (async () => {
    //   let data = {
    //     userUID: user.userUID,
    //   };
    //   let response = await apiPost(baseURl + config.AuditEntityList, data)
    //   setSelectedAuditEntity(response.data.data.entity[0].auditEntityUID)
    //   setAuditEntity(response.data.data.entity)

    // })();
    (async () => {
      const newData = await GetAuditEntity();
      if (newData.status === true) {
        setSelectedAuditEntity(newData.data.entity[0].auditEntityUID)
        setAuditEntity(newData.data.entity)
      }
    })();




  }, [gridRefresh])



  useEffect(() => {
    (async () => {
      const newData = await GetAuditScoreByEntity();
      setrowData(newData.data)
      setGridRefresh(false)
    })();
  }, [selectedAuditEntity, gridRefresh])



  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }

  const addModel = () => {
    setModalOpen(true)
    setIsUpdate(false)
    setSubmitButton("Submit")
  }

  const handleOpen = (params) => {
    setIsUpdate(true)
    setModalOpen(true)
    setSubmitButton("Update")
    // console.log(params.data);
    setNewInitialValues(params.data)

  }



  async function handleSubmit(values) {
    // console.log(values)
    if (isUpdate) {
      let data = {
        "statusUID": values.statusUID,
        "auditEntityUID": selectedAuditEntity,
        "answerValue": values.answerValue,
        "scoreValue": values.scoreValue,
        "answerName": values.answerName,

      }
      const response = await apiPost(baseURl + config.UpdateStatus, data);
      // console.log(response)
      if (response.data.status === true) {
        toast.success(response.data.message);
        setModalOpen(false);
        setGridRefresh(true)
      } else if (response.data.status === false) {
        toast.warning(response.data.validationList[0])
        setModalOpen(false);

      } else {
        toast.warning("please try again sometime")
        setModalOpen(false);
      }

    } else {

      let data = {
        "auditEntityUID": selectedAuditEntity,
        "answerValue": values.answerValue,
        "answerName": values.answerName,
        "scoreValue": values.scoreValue,
        "userUID": user.userUID
      }
      const response = await apiPost(baseURl + config.AddStatus, data);
      // console.log(response)
      if (response.data.status === true) {
        toast.success(response.data.message);
        setModalOpen(false);
        setGridRefresh(true)
      }
      else if (response.data.status === false) {
        toast.warning(response.data.validationList[0])
        setModalOpen(false);
        setGridRefresh(true)
      } else {
        toast.warning("please try again sometime")
        setModalOpen(false);
      }
    }



  }
  const handleChange = (e) => {
    setSelectedAuditEntity(e.target.value);
  }

  const handleDeleteModalOpen = (params) => {
    console.log(params.data)
    setModelDeleteOpen(true)
    setScore(params.data)
  }

  async function deleteScore() {
    let data = {
      "statusUID": score.statusUID
    }
    const response = await apiPost(baseURl + config.Deletestatus, data);
    if (response.data.status === true) {
      toast.success(response.data.message)
      setModelDeleteOpen(false);
      setGridRefresh(true)
    }
  }
  return (
    <>
      {/* <Row>
        <Col style={{ justifyContent: "end", display: "flex" }}>
          <Button className="btn-success" onClick={addModel} style={{ marginBottom: "10px", display: "flex", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white",marginRight:"11px" }}></Button>
        </Col>
      </Row> */}
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} style={{ justifyContent: "start", display: "flex", marginBottom: "-5px", marginTop: "7px" }}>

          <Select sx={{
            '.MuiInputBase-root': {
              height: "32px !important"
            }
          }}
            value={selectedAuditEntity}
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

        <Col lg={12} md={12} sm={12} xs={12} style={{
          justifyContent: "end",
          display: "flex",
          marginBottom: "-5px"
        }}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add Scoring</Button>

        </Col>
      </Row>
      {/* <Row>
        <Col lg={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
        </Col>
      </Row> */}
      <div className="ag-theme-alpine" id='aggridheightWith'>
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,
            // minWidth: 100,
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
        title="Add Score Panel"
        centered
        destroyOnClose={true}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => {
          setModalOpen(false);
          setIsUpdate(false)
        }}
        maskClosable={false}
        footer={[null]}
      >
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          // validationSchema={!isUpdate ? validationSchemaAdd : validationSchemaUpdate}
          validationSchema={validationSchemaAdd}
          onSubmit={handleSubmit}>
          {({ values, errors, touched }) => (
            <Form>
              {/* <div className="form-group">
                <br />
                <Field as={TextField}
                  label="Check list entity"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
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
                {/* <label htmlFor="answerValue">Answer values : </label> */}
                <br />
                <Field as={TextField}
                  label="Answer values"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  required
                  name="answerValue"
                  variant="outlined"
                  fullWidth
                  // select
                  value={values?.answerValue ?? ""}
                  className={
                    "form-control" +
                    (errors.answerValue && touched.answerValue ? " is-invalid" : "")
                  }
                >
                  {/* {AnswerValues.map((q) => (
                    <MenuItem key={q.label} value={q.value}>
                      {q.label}
                    </MenuItem>
                  ))} */}
                </Field>
                <ErrorMessage
                  name="answerValue"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="answerName">Answer name : </label> */}
                <br />
                <Field as={TextField}
                  required
                  label="Answer name"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  name="answerName"
                  variant="outlined"
                  fullWidth
                  value={values?.answerName ?? ""}

                  className={
                    "form-control" +
                    (errors.answerName && touched.answerName ? " is-invalid" : "")
                  }
                >
                  {/* {AnswerName.map((q) => (
                    <MenuItem key={q.label} value={q.value}>
                      {q.label}
                    </MenuItem>
                  ))} */}
                </Field>
                <ErrorMessage
                  name="answerName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="scoreValue">Score value :</label> */}
                <br />
                <Field
                  required
                  label="Score value"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  name="scoreValue"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  value={values?.scoreValue ?? ""}
                  className={
                    "form-control" +
                    (errors.scoreValue && touched.scoreValue ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="scoreValue"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <Row style={{
                  justifyContent: "end",
                  display: "flex", marginTop: "5px"
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
        onOk={() => { setModelDeleteOpen(false); setScore({}) }}
        onCancel={() => { setModelDeleteOpen(false); setScore({}) }}
        maskClosable={false}
        footer={[null]}
      >
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <h3>Are you sure want to delete this Score: <span style={{ color: "red" }}>{score.answerValue} ?</span></h3>
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <div style={{
              justifyContent: "end",
              display: "flex"
            }}>
              <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }} onClick={deleteScore}>
                Delete
              </Button>
              <Button style={{
                marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
              }} onClick={() => { setModelDeleteOpen(false); setScore({}) }}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default Scoring