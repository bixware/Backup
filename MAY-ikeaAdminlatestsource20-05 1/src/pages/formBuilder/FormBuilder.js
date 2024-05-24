import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { apiPost } from "../../api/apiCommon"
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
// import { MenuItem, TextField,Select} from "@mui/material";
import { MenuItem, TextField, Select } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
// import { Col, Row } from "reactstrap"; 
import { Row, Col, Menu, } from 'antd';
import { Radio } from 'antd';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../Style.css";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
// import {
//   CellEditingStartedEvent,
//   CellEditingStoppedEvent,
//   ColDef,
//   ColGroupDef,
//   Grid,
//   GridOptions,
//   ICellRendererComp,
//   ICellRendererParams,
//   KeyCreatorParams,
//   RowEditingStartedEvent,
//   RowEditingStoppedEvent,
// } from 'ag-grid-community';
toast.configure({
  position: toast.POSITION.TOP_RIGHT
});





// async function auditTypeList() {
//   const response = await apiPost(baseURl + config.AuditTypeList, {});
//   // console.log(response.data)
//   return response.data
// }
async function auditEntityList() {
  const response = await apiPost(baseURl + config.AuditEntityList, {})
  // console.log(response.data)
  return response.data
}



function FormBuilder() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [auditEntity, setAuditEntity] = useState([]);
  const [auditType, setAuditType] = useState([]);
  const [auditSubType, setAuditSubType] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [newInitialValues, setNewInitialValues] = useState(undefined);
  const [submitButton, setSubmitButton] = useState("")
  const [auditMainType, setAuditMainType] = useState("")
  const [gridRefresh, setGridRefresh] = useState(false)
  const [startEdit, setStartEdit] = useState({})
  const [inputRow, setInputRow] = useState({});
  const [value, setValue] = useState(false);

  const [selectedAuditType, setSelectedAuditType] = useState("")
  const [selectedAuditSubType, setSelectedAuditSubType] = useState("")
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  // console.log(user)
  const initialValues = {
    // auditEntityUID: "",
    auditTypeUID: "",
    auditSubtypeUID: "",
    questionName: "",
    helpStandard: "",
    helpBelowstandard: "",
    helpSerious: "",
    referenceNo: "",
    questionCategory: ""
  }

  async function getquestion() {
    // console.log(auditMainType)
    let data = {
      "entityUID": auditMainType
    }
    const response = await apiPost(baseURl + config.GetQuestionByEntity, data);
    // console.log(response.data)
    return response.data
    // if (response.data.status == true) {
    //     return response.data.data;
    // }
  }


  const validationSchemaAdd = Yup.object().shape({
    // auditEntityUID: Yup.string().required("Audit Entity Name is required"),
    auditTypeUID: Yup.string().required("Audit Type is required"),
    auditSubtypeUID: Yup.string().required("Audit Sub Type is required"),
    questionName: Yup.string().required("Question Name is required"),
    questionCategory: Yup.string().required("Question Category is required"),
  })

  // const validationSchemaUpdate = Yup.object().shape({
  //   // auditEntityUID: Yup.string().required("Audit Entity Name is required"),
  //   auditTypeUID: Yup.string().required("Audit Type is required"),
  //   auditSubtypeUID: Yup.string().required("Audit Sub Type is required"),
  //   questionName: Yup.string().required("Question Name is required"),
  //   questionCategory: Yup.string().required("Question Category is required"),
  // })


  const [columnDef, setcolumnDef] = useState([
    // {
    //   headerName: 'Action', field: 'userUID', width: '30', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><IconButton onClick={() => QuestionAddModel(params)}><AddBoxIcon /></IconButton></>
    //   )
    // },
    { headerName: 'Question Name', field: 'questionName', width: '100', flex: 3 },
    {
      headerName: 'Category', field: 'questionCategory', width: '80', flex: 3,
      // cellEditorParams: {
      //   values: ['Swimming', 'Gymnastics', 'Cycling', 'Ski Jumping'],
      // }
    },
    // { headerName: 'Audit Entity', field: 'auditEntityName', width: '120', flex: 3 },
    {
      headerName: 'Audit Type', field: 'auditTypeName', width: '80', flex: 3,
      // cellEditor: 'agLargeTextCellEditor',
      // cellEditorPopup: true,
      // cellEditorParams: {
      //   maxLength: '300',
      //   cols: '50',
      //   rows: '6',
      // },
    },
    {
      headerName: 'Audit Sub Type', field: 'auditSubtypeName', width: '100', flex: 3,
      // cellEditor: 'agLargeTextCellEditor',
      // cellEditorPopup: true,
      // cellEditorParams: {
      //   maxLength: '300',
      //   cols: '50',
      //   rows: '6',
      // },
    },
    // { headerName: 'Help Standard', field: 'helpStandard', width: '150', flex: 3 },
    // { headerName: 'Help Below Standard', field: 'helpBelowstandard', width: '120', flex: 3 },
    // { headerName: 'Help Serious', field: 'helpSerious', width: '120', flex: 3 },
    // { headerName: 'Help Critical', field: 'helpCritical', width: '120', flex: 3 },
    {
      headerName: 'Action', field: 'isActive', width: '100', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Button onClick={() => QuestionStatusFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
        inputProps={{ 'aria-label': 'controlled' }}
      /></Button><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></>
      )
    },
  ]);

  // const [defaultColDef] = useState({
  //   flex: 1,
  //   editable: true,
  //   valueFormatter: (params) =>
  //     isEmptyPinnedCell(params)
  //       ? createPinnedCellPlaceholder(params)
  //       : undefined,
  // });

  // const getRowStyle = React.useCallback(
  //   ({ node }) =>
  //     node.rowPinned ? { fontWeight: 'bold', fontStyle: 'italic' } : {},
  //   []
  // );

  // const onCellEditingStopped = React.useCallback(
  //   (params) => {
  //     if (isPinnedRowDataCompleted(params)) {
  //       setrowData([...rowData, inputRow]);
  //       setInputRow({});
  //     }
  //   },
  //   [rowData, inputRow]
  // );

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }
  useEffect(() => {
    (async () => {
      const newData = await getquestion();
      setrowData(newData.data)
      // console.log(newData.data)


    })();
    (async () => {
      const auditTypeBYEntityListNewData = await auditTypeBYEntityList();
      // console.log(auditTypeBYEntityListNewData.data)
      setAuditType(auditTypeBYEntityListNewData.data)
      // setSelectedAuditType(auditTypeBYEntityListNewData.data[0].auditTypeUID)
      // console.log(auditTypeBYEntityListNewData.data)
    })();

    // (async () => {
    //   const auditSubTypeBYEntityListNewData = await auditSubTypeBYEntityList();
    //   console.log(auditSubTypeBYEntityListNewData)

    //   // console.log(newData.data)
    // })();
    // // (async () => {
    //   const newData = await auditTypeList();
    //   // setAuditType(newData.data)
    //   // console.log(newData.data)
    // })();

  }, [auditMainType])


  async function auditTypeBYEntityList() {

    let data = {
      "auditEntityUID": auditMainType
    }
    const response = await apiPost(baseURl + config.GetAuditTypeByEntity, data);
    // console.log(response.data)
    // setAuditType(response.data)

    return response.data
  }


  async function auditSubTypeBYEntityList(AuditTypeValue) {
    setSelectedAuditType(AuditTypeValue)
    // console.log(SubTypeValue)
    let data = {
      "auditEntityUID": auditMainType,
      "auditTypeUID": AuditTypeValue,
    }
    const response = await apiPost(baseURl + config.GetAuditSubTypeByEntity, data);
    // console.log(response.data.data)
    // setAuditType(response.data)
    setAuditSubType(response.data.data)
    setSelectedAuditSubType(response.data.data[0].auditSubtypeUID)
  }

  async function auditSubTypeByAuditType(SubTypeValue) {
    setSelectedAuditSubType(SubTypeValue)
  }






  useEffect(() => {
    (async () => {
      const newData = await getquestion();
      setrowData(newData.data)
      setGridRefresh(false)
    })();

  }, [gridRefresh])

  useEffect(() => {
    // (async () => {
    //   const newData = await auditSubTypeList();
    //   // console.log(newData)
    //   // setAuditSubType(newData.data.SubType)
    //   //  console.log(newData.data.SubType)

    // })();

    (async () => {
      const newData = await auditEntityList();
      // console.log(newData)
      setAuditEntity(newData.data.entity)
      setAuditMainType(newData.data.entity[0].auditEntityUID)
      // console.log(newData.data.entity)

    })();

  }, [])

  async function QuestionStatusFunc(params) {
    // console.log(params)
    setStartEdit(params)

    let data = {
      "questionUID": params.data.questionnaireUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.QuestionActive, data)
    // console.log(response)
    if (response.data.status === true) {
      toast.success(response.data.message);
      setGridRefresh(true)
    }
  }

  const handleOpen = (params) => {
    setIsUpdate(true)
    setSubmitButton("Update")
    setModalOpen(true)
    setNewInitialValues(params.data)
    // console.log(params.data)
  }
  const QuestionAddModel = (params) => {
    // console.log(params.data)
  }

  const addModel = () => {
    auditSubTypeBYEntityList(selectedAuditType)
    // setSelectedAuditType(auditType[0].auditTypeUID)
    setIsUpdate(false)
    setModalOpen(true)
    setSubmitButton("Submit")
    // console.log(auditSubType)
  }

  async function handleSubmit(values) {
    // console.log(values)
    // console.log(user)
    // let response;
    // if (isUpdate) {
    //   let data = {
    //     "userUID": user.userUID,
    //     "questionUID": values.questionnaireUID,
    //     "questionName": values.questionName,
    //     "questionCategory": values.questionCategory,
    //     "auditEntityUID": auditMainType,
    //     "auditTypeUID": values.auditTypeUID,
    //     "auditSubtypeUID": values.auditSubtypeUID,
    //     "referenceNo": values.referenceNo,
    //     "helpStandard": values.helpStandard,
    //     "helpBelowstandard": values.helpBelowstandard,
    //     "helpSerious": values.helpSerious,
    //     "helpCritical": values.helpCritical

    //   };

    //   response = await apiPost(baseURl + config.UpdateQuestion, data);
    // }
    // else {
    //   let data = {
    //     "userUID": user.userUID,
    //     "questionName": values.questionName,
    //     "questionCategory": values.questionCategory,
    //     "auditEntityUID": auditMainType,
    //     "auditTypeUID": values.auditTypeUID,
    //     "auditSubtypeUID": values.auditSubtypeUID,
    //     "referenceNo": values.referenceNo,
    //     "helpStandard": values.helpStandard,
    //     "helpBelowstandard": values.helpBelowstandard,
    //     "helpSerious": values.helpSerious,
    //     "helpCritical": values.helpCritical
    //   }

    //   response = await apiPost(baseURl + config.AddQuestion, data);

    // }
    // console.log(response)
    // if (response.data.status === true) {
    //   setGridRefresh(true)
    //   toast.success(response.data.message);
    //   setModalOpen(false)
    // }
    // const newData = await auditEntityList();
    // setrowData(newData.data.entity)

  }
  const handleDeleteModalOpen = (params) => {

  }
  async function handleChange(e) {
    setAuditMainType(e.target.value);
  }
  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // const handleAuditTypeChange=(e)=>{
  //   console.log(e)
  // }

  return (
    <>
      {/* <Row>
        <div className='QuestionAuditEntityDropDown'>
          <Select style={{height:"32px"}}
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
        </div>
        <Col style={{ justifyContent: "end", display: "flex" }}>
          <Button className="btn-success" onClick={addModel} style={{  display: "flex", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}>Add Question</Button>
        </Col>
      </Row> */}
      <Row className='rowTopLevel'>
        <Col lg={4} style={{ justifyContent: "flex-start" }}>
          <h3>Questions</h3></Col>
        {/* <Breadcrumb items={[{ title: pathname.replace("admin/", "") }]} style={{
            textTransform: "capitalize", fontWeight: "300",
            fontSize: "x-large", fontFamily: "math"
          }}
          /> */}
        <Col lg={5}>
          <Select style={{ height: "32px" }}
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
        <Col lg={9}></Col>
        <Col lg={6} style={{
          justifyContent: "end",
          display: "flex",
        }}>
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginRight: "27px" }}>Add Question</Button>
        </Col>
      </Row>
      <div className="ag-theme-alpine" style={{ height: 500, width: 'auto' }}>
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            floatingFilter: true,
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
        title={isUpdate ? "Update Question Panel" : "Add Question Panel"}
        centered
        destroyOnClose={true}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[null]}
        width={"70%"}

      >
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          // validationSchema={validationSchemaAdd}
          onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Row gutter={30}>
                {/* first half */}

                <Col lg={12} md={24} sm={24} >
                  {/* audittypename */}
                  <div className="form-group">
                    <label htmlFor="auditTypeUID">Audit Type Name : </label>
                    <Field as={TextField}
                      name="auditTypeUID"
                      variant="outlined"
                      fullWidth
                      //  value={values?.auditTypeUID ?? ""}
                      select
                      SelectProps={{
                        value: selectedAuditType,
                        onChange: (e) => {
                          // console.log(e)
                          auditSubTypeBYEntityList(e);
                          setFieldValue("auditTypeUID", e.target.value);
                        }
                      }}
                      helperText={<ErrorMessage name="auditTypeUID" />}
                    // onChange={(e)=>handleAuditTypeChange(e)}
                    // className={
                    //   "form-control" +
                    //   (errors.auditTypeUID && touched.auditTypeUID ? " is-invalid" : "")
                    // }
                    >
                      {auditType?.map((q, index) => (
                        <MenuItem key={index} value={q.auditTypeUID}>
                          {q.auditTypeName}
                        </MenuItem>
                      ))}
                    </Field>
                    {/* <ErrorMessage
                      name="auditTypeUID"
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

                </Col>


                {/* second half */}


                <Col lg={12} md={24} sm={24}>

                  <div className="form-group">
                    <label htmlFor="questionName">Question Name :</label>
                    <Field
                      as={TextField}
                      name="questionName"
                      fullWidth
                      value={values?.questionName ?? ""}
                      className={
                        "form-control" +
                        (errors.questionName && touched.questionName ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="questionName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  {/* auditType TextField */}
                  {/* {!isUpdate ? (<div className="form-group">
                    <label htmlFor="auditTypeUID">Audit Type Name : </label>
                    <Field as={TextField}
                      name="auditTypeUID"
                      variant="outlined"
                      // value={values?.auditTypeUID ?? ""}
                      fullWidth
                      className={
                        "form-control" +
                        (errors.auditTypeUID && touched.auditTypeUID ? " is-invalid" : "")
                      }
                    >
                    </Field>
                    <ErrorMessage
                      name="auditTypeUID"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>)  */}






                </Col>
              </Row>

              {/* End of first row */}

              <Row gutter={30}>
                <Col lg={12} md={24} sm={24}>

                  {/* auditsubtypename */}

                  <div className="form-group">
                    <label htmlFor="auditSubtypeUID">Audit Sub Type Name : </label>
                    <Field as={TextField}
                      name="auditSubtypeUID"
                      variant="outlined"
                      fullWidth
                      // value={values?.auditSubtypeUID ?? ""}
                      select
                      SelectProps={{
                        value: selectedAuditSubType,
                        onChange: (e) => {
                          auditSubTypeByAuditType(e.target.value);
                          setFieldValue("auditSubtypeUID", e.target.value);
                        }
                      }}
                      helperText={<ErrorMessage name="auditSubtypeUID" />}
                    // className={
                    //   "form-control" +
                    //   (errors.auditSubtypeUID && touched.auditSubtypeUID ? " is-invalid" : "")
                    // }
                    >
                      {auditSubType?.map((q, index) => (
                        <MenuItem key={index} value={q.auditSubtypeUID}>
                          {q.auditSubtypeName}
                        </MenuItem>
                      ))}
                    </Field>
                    {/* <ErrorMessage
                      name="auditSubtypeUID"
                      component="div"
                      className="invalid-feedback"
                    /> */}
                  </div>
                </Col>
                <Col lg={12} md={24} sm={24} >

                  {/* Question Name */}

                  <div className="form-group">
                    <label htmlFor="questionCategory">Question Category  :</label>
                    <Field
                      as={TextField}
                      name="questionCategory"
                      fullWidth
                      select
                      value={values?.questionCategory ?? ""}
                      className={
                        "form-control" +
                        (errors.questionCategory && touched.questionCategory ? " is-invalid" : "")
                      }
                    > <MenuItem value="Normal">
                        Normal
                      </MenuItem>
                      <MenuItem value="Critical">
                        Critical
                      </MenuItem></Field>
                    <ErrorMessage
                      name="questionCategory"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                </Col>
              </Row>
              <Row gutter={30}>
                <Col lg={24} md={24} sm={24}>

                  {/* questionCategory */}

                  <label htmlFor="Add Help">Add Help</label>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio style={{ marginLeft: "10px" }} value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>

                </Col>
              </Row>

              {!value ? ("") : (<>
                <Row gutter={30}>
                  <Col lg={12} md={24} sm={24} >
                    {/* helpStandard */}
                    < div className="form-group" >
                      <label htmlFor="helpStandard">Help Standard :</label>
                      <Field
                        as={TextField}
                        name="helpStandard"
                        // type="text"
                        fullWidth
                        multiline
                        rows={2}
                        value={values?.helpStandard ?? ""}
                        className={
                          "form-control" +
                          (errors.helpStandard && touched.helpStandard ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="helpStandard"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div >
                  </Col>
                  <Col lg={12} md={24} sm={24}>
                    {/* helpBelowstandard */}
                    <div className="form-group">
                      <label htmlFor="helpBelowstandard">Help Below Standard :</label>
                      <Field
                        as={TextField}
                        name="helpBelowstandard"
                        // type="text"
                        fullWidth
                        multiline
                        rows={2}
                        value={values?.helpBelowstandard ?? ""}
                        className={
                          "form-control" +
                          (errors.helpBelowstandard && touched.helpBelowstandard ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="helpBelowstandard"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                </Row>




                <Row gutter={30}>

                  <Col lg={12} md={24} sm={24} >
                    {/* helpSerious */}

                    <div className="form-group">
                      <label htmlFor="helpSerious">Help Serious :</label>
                      <Field
                        as={TextField}
                        name="helpSerious"
                        // type="text"
                        fullWidth
                        multiline
                        rows={2}
                        value={values?.helpSerious ?? ""}
                        className={
                          "form-control" +
                          (errors.helpSerious && touched.helpSerious ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="helpSerious"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                  </Col>
                  <Col lg={12} md={24} sm={24}>
                    {/* helpCritical */}
                    <div className="form-group">
                      <label htmlFor="helpCritical">Help Critical :</label>
                      <Field
                        // as="textarea"
                        as={TextField}
                        name="helpCritical"
                        // type="text"
                        fullWidth
                        multiline
                        rows={2}
                        value={values?.helpCritical ?? ""}
                        className={
                          "form-control" +
                          (errors.helpCritical && touched.helpCritical ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="helpCritical"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                  </Col>
                </Row>
                <Row gutter={30} style={{ justifyContent: "start" }}>
                  <Col lg={12} md={24} sm={24}>
                    {/* referenceNo */}
                    <div className="form-group">
                      <label htmlFor="referenceNo">Reference No :</label>
                      <Field
                        // type="text"
                        as={TextField}
                        name="referenceNo"
                        // type="text"
                        // multiline
                        fullWidth
                        // rows={2}
                        value={values?.referenceNo ?? ""}
                        className={
                          "form-control" +
                          (errors.referenceNo && touched.referenceNo ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="referenceNo"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                </Row></>)}

              <div className="form-group">
                <Row gutter={30} style={{ marginTop: "15px" }}>
                  <Col lg={12}></Col>
                  <Col lg={12} style={{ justifyContent: "flex-end", display: "flex" }} >
                    <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}
                      // htmlType='submit'
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
    </>
  )
  //   function isEmptyPinnedCell(params) {
  //     return (
  //       (params.node.rowPinned === 'top' && params.value == null) ||
  //       (params.node.rowPinned === 'top' && params.value === '')
  //     );
  //   }

  //   function createPinnedCellPlaceholder({ colDef }) {
  //     return colDef.field[0].toUpperCase() + colDef.field.slice(1) + '...';
  //   }

  //   function isPinnedRowDataCompleted(params) {
  //     if (params.rowPinned !== 'top') return;
  //     return columnDef.every((def) => inputRow[def.field]);
  //   }
}

export default FormBuilder