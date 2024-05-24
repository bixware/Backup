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
import Tooltip from '@mui/material/Tooltip';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import "../../Style.css";

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});



function Questions() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false)
  const [newInitialValues, setNewInitialValues] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [auditEntity, setAuditEntity] = useState([]);
  const [selectedAuditEntity, setSelectedAuditEntity] = useState("")
  const [auditType, setAuditType] = useState([]);
  const [auditSubType, setAuditSubType] = useState([]);
  const [selectedAuditType, setSelectedAuditType] = useState("")
  const [value, setValue] = useState(false);
  const [gridRefresh, setGridRefresh] = useState(false)
  const [deleteQuestion, setDeleteQuestion] = useState({})
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [columnDef, setcolumnDef] = useState([])
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);

  const initialValues = {
    auditTypeUID: "",
    auditSubtypeUID: "",
    questionName: "",
    helpStandard: "",
    helpBelowstandard: "",
    helpSerious: "",
    referenceNo: "",
    questionCategory: ""
  }

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }

  // const [columnDef, setcolumnDef] = useState(
  //   [
  //     {
  //       headerName: 'Question name', field: 'questionName', width: '100', flex: 3, sortable: true,
  //       resizable: true,
  //       filter: true,
  //       floatingFilter: true,
  //       onCellClicked: (params) => { handleCellClickOpen(params) }
  //     },
  //     {
  //       headerName: 'Category', field: 'questionCategory', width: '80', flex: 3, sortable: true,
  //       resizable: true,
  //       filter: true,
  //       floatingFilter: true,
  //       onCellClicked: (params) => { handleCellClickOpen(params) }
  //     },
  //     {
  //       headerName: 'Section', field: 'auditTypeName', width: '95', flex: 3, sortable: true,
  //       resizable: true,
  //       filter: true,
  //       floatingFilter: true,
  //       onCellClicked: (params) => { handleCellClickOpen(params) }
  //     },
  //     {
  //       headerName: 'Sub section', field: 'auditSubtypeName', width: '95', flex: 3, sortable: true,
  //       resizable: true,
  //       filter: true,
  //       floatingFilter: true,
  //       onCellClicked: (params) => { handleCellClickOpen(params) }

  //     },
  //     {
  //       headerName: 'Action', field: 'isActive', width: '120', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><IconButton onClick={() => QuestionStatusFunc(params)}> <Switch
  //         checked={params.data.isActive === "1" ? true : false}
  //       /></IconButton></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete question"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>
  //       )
  //     },
  //   ]
  // );

  const handleDeleteModalOpen = (params) => {
    // console.log(params.data)
    setDeleteQuestion(params.data)
    setModelDeleteOpen(true)
  }

  useEffect(() => {
    // Entity List api
    (async () => {

      let data = {
        userUID: user.userUID,
      };
      let response = await apiPost(baseURl + config.AuditEntityList, data)
      // console.log(response.data.data.entity[0].auditEntityUID);
      setSelectedAuditEntity(response.data.data.entity[0].auditEntityUID)
      columndefinition(response.data.data.entity[0].auditEntityUID)
      setAuditEntity(response.data.data.entity)
    })();
  }, [])

  useEffect(() => {

    (async () => {
      let data = {
        "entityUID": selectedAuditEntity
      }
      let response = await apiPost(baseURl + config.GetQuestionByEntity, data)
      // console.log(response.data);
      setrowData(response.data.data)
      setGridRefresh(false)

    })
      ();

    // (async () => {
    //     let data = {
    //         "auditEntityUID": selectedAuditEntity
    //     }
    //     let response = await apiPost(baseURl + config.GetAuditTypeByEntity, data)
    //     console.log(response.data.data)
    //     // setSelectedAuditType(response.data.data[0])
    //     console.log(response.data.data)
    //     setAuditType(response.data.data)

    // })();
    // (async () => {
    //     let data = {
    //         "auditEntityUID": selectedAuditEntity
    //     }
    //     let response = await apiPost(baseURl + config.GetAuditTypeNameByEntity, data)
    //     console.log(response.data.data)
    //     setAuditType(response.data.data)
    //     // setSelectedAuditType(response.data.data[0])
    //     // console.log(response.data.data)
    //     // setAuditType(response.data.data)

    // })();

    // (async () => {

    //     let data={
    //         "auditEntityUID":selectedAuditEntity,
    //        "auditTypeUID":selectedAuditType
    //       }
    //     let response = await apiPost(baseURl + config.GetAuditSubTypeNameByEntity, data)
    //     console.log(response.data)
    //     // setSelectedAuditType(response.data.data[0].auditTypeUID)
    //     setAuditSubType(response.data.data)

    // })();



  }, [selectedAuditEntity, gridRefresh])

  async function QuestionStatusFunc(params) {
    setModalOpen(false)
    // console.log(params)
    setModalOpen(false)
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

  const columndefinition = (event) => {
    switch (event) {
      case "1":
        setcolumnDef(
          [
            {
              headerName: 'Question name', field: 'questionName', width: '100', flex: 1, sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              onCellClicked: (params) => { handleCellClickOpen(params) }
            },
            {
              headerName: 'Category', field: 'questionCategory', width: '80', flex: 1, sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              onCellClicked: (params) => { handleCellClickOpen(params) }
            },
            {
              headerName: 'Section', field: 'auditTypeName', width: '95', flex: 1, sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              onCellClicked: (params) => { handleCellClickOpen(params) }
            },
            {
              headerName: 'Sub section', field: 'auditSubtypeName', width: '95', flex: 1, sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              onCellClicked: (params) => { handleCellClickOpen(params) }

            },
            {
              headerName: 'Action', field: 'isActive', width: '120', flex: 1, cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><IconButton onClick={() => QuestionStatusFunc(params)}> <Switch
                checked={params.data.isActive === "1" ? true : false}
              /></IconButton></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete question"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>
              )
            },
          ]
        )
        break;
      case "2":
        setcolumnDef([
          {
            headerName: 'Question name', field: 'questionName', width: '100', flex: 1, sortable: true,
            resizable: true,
            filter: true,
            floatingFilter: true,
            onCellClicked: (params) => { handleCellClickOpen(params) }
          },
          {
            headerName: 'Section', field: 'auditTypeName', width: '95', flex: 1, sortable: true,
            resizable: true,
            filter: true,
            floatingFilter: true,
            onCellClicked: (params) => { handleCellClickOpen(params) }
          },

          {
            headerName: 'Action', field: 'isActive', width: '120', flex: 1, cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><IconButton onClick={() => QuestionStatusFunc(params)}> <Switch
              checked={params.data.isActive === "1" ? true : false}
            /></IconButton></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete question"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>
            )
          },
        ])
        break;
      default:
        setcolumnDef(
          [
            {
              headerName: 'Question name', field: 'questionName', width: '100', flex: 1, sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              onCellClicked: (params) => { handleCellClickOpen(params) }
            },
            {
              headerName: 'Section', field: 'auditTypeName', width: '100', flex: 1, sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              onCellClicked: (params) => { handleCellClickOpen(params) }
            },
            {
              headerName: 'Sub section', field: 'auditSubtypeName', width: '100', flex: 1, sortable: true,
              resizable: true,
              filter: true,
              floatingFilter: true,
              onCellClicked: (params) => { handleCellClickOpen(params) }

            },
            {
              headerName: 'Action', field: 'isActive', width: '120', flex: 1, cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><IconButton onClick={() => QuestionStatusFunc(params)}> <Switch
                checked={params.data.isActive === "1" ? true : false}
              /></IconButton></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip><Tooltip title="Delete question"><IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip></>
              )
            },
          ]
        )
        break;
    }
  }

  const handleChange = (e) => {
    setSelectedAuditEntity(e.target.value);
    columndefinition(e.target.value)
  }

  async function addModel() {
    setIsUpdate(false)
    setModalOpen(true)
    // auditSubTypeBYEntityList(0);
    setSelectedAuditType("");
    setAuditSubType([]);
    setValue(false)
    if (selectedAuditEntity === "2") {
      setSelectedAuditType("0")
    }
  }

  const handleOpen = (params) => {
    setIsUpdate(true)
    setNewInitialValues(params.data)
    // console.log('from handle open', params)
    setSelectedAuditType(params.data.auditTypeUID)
    setValue(true)
    setModalOpen(true)
    // var tempValue = auditType.find((item, index) => {
    //     if (item?.auditTypeUID === params.data.auditTypeUID) {
    //         console.log(index)
    //         return index;
    //     }
    // })
  }

  async function handleSubmit(values) {
    // console.log(user)
    let response;

    if (isUpdate) {
      let data = {
        "userUID": user.userUID,
        "questionUID": values.questionnaireUID,
        "questionName": values.questionName,
        "questionCategory": values.questionCategory,
        "auditEntityUID": selectedAuditEntity,
        // "auditTypeUID": auditType[values.auditTypeUID].auditTypeUID,
        "auditTypeUID": values.auditTypeUID,
        "auditSubtypeUID": selectedAuditEntity === "2" ? 0 : values.auditSubtypeUID,
        "priority": values.priority,
        "referenceNo": values.referenceNo,
        "helpStandard": values.helpStandard,
        "helpBelowstandard": values.helpBelowstandard,
        "helpSerious": values.helpSerious,
        "helpCritical": values.helpCritical

      };

      response = await apiPost(baseURl + config.UpdateQuestion, data);
    }
    else {
      let data = {
        "userUID": user.userUID,
        "questionName": values.questionName,
        "questionCategory": values.questionCategory,
        "auditEntityUID": selectedAuditEntity,
        // "auditTypeUID":selectedAuditEntity === "2"? values.auditTypeUID : auditType[values.auditTypeUID].auditTypeUID,
        "auditTypeUID": values.auditTypeUID,
        "auditSubtypeUID": selectedAuditEntity === "2" ? "0" : values.auditSubtypeUID,
        "priority": values.priority,
        "referenceNo": values.referenceNo,
        "helpStandard": values.helpStandard,
        "helpBelowstandard": values.helpBelowstandard,
        "helpSerious": values.helpSerious,
        "helpCritical": values.helpCritical
      }

      response = await apiPost(baseURl + config.AddQuestion, data);

    }
    // console.log(response)
    if (response.data.status === true) {
      setGridRefresh(true)
      toast.success(response.data.message);
      setModalOpen(false)
    } else if (response.data.status === false) {
      toast.error(response.data.validationList[0]);
    } else {
      toast.error("Please try again later");
    }
  }

  useEffect(() => {
    (async () => {
      let data = {
        "auditEntityUID": selectedAuditEntity,
        "auditTypeUID": selectedAuditType
      }
      // console.log(data)
      let response = await apiPost(baseURl + config.GetAuditSubTypeNameByEntity, data)
      // console.log(response.data)
      // setSelectedAuditType(response.data.data[0].auditTypeUID)
      setAuditSubType(response.data.data)
    })();
  }, [selectedAuditType])

  useEffect(() => {


    (async () => {
      let data = {
        "auditEntityUID": selectedAuditEntity
      }
      // console.log(data)
      let response = await apiPost(baseURl + config.GetQuestionsAudittype, data)
      // console.log(response.data.data)
      setAuditType(response.data.data)
    })();

  }, [selectedAuditEntity])

  async function auditSubTypeBYEntityList(value) {




  }

  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleCellClickOpen = (params) => {
    setIsUpdate(true)
    setNewInitialValues(params.data)
    console.log('from cell clicked', params)
    setSelectedAuditType(params.data.auditTypeUID)
    setValue(true)
    setModalOpen(true)
  }

  async function DeleteQuestion(event) {

    let data = {
      "questionUID": deleteQuestion.questionnaireUID
    }
    const response = await apiPost(baseURl + config.DeleteQuestion, data);
    // console.log(response)
    if (response.data.message == 'Success') {
      setGridRefresh(true)
      toast.error(response.data.message)
      setDeleteQuestion({})
      setModelDeleteOpen(false);
    } else {
      setGridRefresh(true)
      toast.error("Please try again later")
      setModelDeleteOpen(false);
      setDeleteQuestion({})
    }
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
          <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add Question</Button>
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
          // onRowClicked={(params) => { handleOpen(params); setNewInitialValues(params.data) }}
          // onCellClicked={(params) => { handleCellClickOpen(params) }}
          // onCellFocused={(params) => { handleCellClickOpen(params) }}
          paginationPageSize={20}
          pagination={true}
          onGridReady={onGridReady}
          columnDefs={columnDef}
          rowData={rowData}
          animateRows="true"
        //  gridOptions

        />
      </div>
      <Modal
        title="Question Panel"
        centered
        destroyOnClose={true}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => { setModalOpen(false); setValue(false) }}
        footer={[null]}
        maskClosable={false}
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
                {selectedAuditEntity === "2" ? (<Col lg={24} md={24} sm={24} >

                  {/* audittypename */}
                  <br />
                  <div className="form-group">
                    {/* <label htmlFor="auditTypeUID">Check list type name : </label> */}
                    <Field as={TextField}


                      name="auditTypeUID"
                      required
                      variant="outlined"
                      label="Section"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      fullWidth
                      // value={values?.auditTypeUID ?? ""}
                      select
                      SelectProps={{

                        value: isUpdate ? newInitialValues.auditTypeUID : selectedAuditType,
                        onChange: (e) => {
                          // console.log(e)
                          // console.log(newInitialValues)
                          setSelectedAuditType(e.target.value)
                          auditSubTypeBYEntityList(e.target.value);
                          setFieldValue("auditTypeUID", e.target.value);
                        }
                      }}
                      helperText={<ErrorMessage name="auditTypeUID" />}
                    >
                      {auditType?.map((q, index) => (
                        <MenuItem key={index} value={q.auditTypeUID}>
                          {q.auditTypeName}
                        </MenuItem>
                      ))}
                    </Field>

                  </div>

                </Col>) : (<Col lg={12} md={24} sm={24} >

                  {/* audittypename */}
                  <div className="form-group">
                    {/* <label htmlFor="auditTypeUID">Check list type name : </label> */}
                    <br />
                    <Field as={TextField}
                      required
                      label="Section"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="auditTypeUID"
                      variant="outlined"
                      fullWidth
                      value={values?.auditTypeUID ?? ""}
                      select
                      SelectProps={{
                        // value: isUpdate ? newInitialValues.auditTypeUID : selectedAuditType,
                        onChange: (e) => {
                          setSelectedAuditType(e.target.value)

                          // auditSubTypeBYEntityList(e.target.value);

                          setFieldValue("auditTypeUID", e.target.value);
                          setFieldValue("auditSubtypeUID", "");
                        }
                      }}
                      helperText={<ErrorMessage name="auditTypeUID" />}
                    >
                      {auditType?.map((q, index) => (
                        <MenuItem key={index} value={q.auditTypeUID}>
                          {q.auditTypeName}
                        </MenuItem>
                      ))}
                    </Field>

                  </div>

                </Col>)}

                {selectedAuditEntity === "2" ? (null) : (<Col lg={12} md={24} sm={24}>

                  {/* auditsubtypename */}

                  <div className="form-group">
                    {/* <label htmlFor="auditSubtypeUID">Check list sub type name : </label> */}
                    <br />
                    <Field as={TextField}
                      label="Sub section"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      disabled={selectedAuditEntity === "2"}
                      name="auditSubtypeUID"
                      required
                      variant="outlined"
                      fullWidth
                      value={values?.auditSubtypeUID ?? ""}
                      select
                      // SelectProps={{
                      //     value: isUpdate? newInitialValues.auditSubtypeUID :selectedAuditSubType,
                      //     onChange: (e) => {
                      //         // console.log(e)
                      //         setSelectedAuditSubType(e.target.value)
                      //         auditSubTypeBYEntityList(e.target.value);

                      //         setFieldValue("auditSubtypeUID", e.target.value);
                      //     }
                      // }}
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


                  </div>
                </Col>)}
              </Row>
              <Row gutter={30}>
                <Col lg={12} md={24} sm={24}>
                  <div className="form-group">
                    <br />
                    {/* <label htmlFor="questionName">Question name :</label> */}
                    <Field
                      label="Question name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      as={TextField}
                      name="questionName"
                      fullWidth
                      required
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
                </Col>
                {selectedAuditEntity != "1" ? (null) : (<><Col lg={12} md={24} sm={24}>
                  <div className="form-group">
                    <br />
                    {/* <label htmlFor="questionCategory">Question category  :</label> */}
                    <Field
                      as={TextField}
                      label="Question category"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
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
                </Col></>)}


              </Row>
              {selectedAuditEntity !== "1" ? (null) : (<Row gutter={30}>
                <Col lg={12} md={24} sm={24}>
                  <div className="form-group">
                    <br />
                    {/* <label htmlFor="questionName">Question name :</label> */}
                    <Field
                      label="Weightage"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        },
                        type: "number", // Use number type to show numeric keyboard on mobile devices
                        min: "0", // Set min value to 0 if needed
                        step: "any"
                      }}
                      as={TextField}
                      name="priority"
                      fullWidth
                      required
                      value={values?.priority ?? ""}
                      className={
                        "form-control" +
                        (errors.priority && touched.priority ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="priority"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>)}

              {selectedAuditEntity != "1" ? (null) : (<Row gutter={30}>
                <Col lg={24} md={24} sm={24}>

                  {/* questionCategory */}

                  <label htmlFor="Add Help">Add help</label>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio style={{ marginLeft: "10px" }} value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>

                </Col>
              </Row>)}
              {(selectedAuditEntity === "1" && value === true) ? (<>
                <Row gutter={30}>
                  <Col lg={12} md={24} sm={24} >
                    {/* helpStandard */}
                    < div className="form-group" >
                      <br />
                      {/* <label htmlFor="helpStandard">Help standard :</label> */}
                      <Field
                        sx={{
                          '.MuiInputBase-root': {
                            height: "60px !important"
                          }
                        }}
                        as={TextField}
                        label="Help standard"
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
                      {/* <label htmlFor="helpBelowstandard">Help below standard :</label> */}
                      <br />
                      <Field
                        sx={{
                          '.MuiInputBase-root': {
                            height: "60px !important"
                          }
                        }}
                        as={TextField}
                        label="Help below standard"
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
                      {/* <label htmlFor="helpSerious">Help serious :</label> */}
                      <br />
                      <Field
                        sx={{
                          '.MuiInputBase-root': {
                            height: "60px !important"
                          }
                        }}
                        label="Help serious"
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
                      {/* <label htmlFor="helpCritical">Help critical :</label> */}
                      <br />
                      <Field
                        sx={{
                          '.MuiInputBase-root': {
                            height: "60px !important"
                          }
                        }}
                        // as="textarea"
                        as={TextField}
                        label="Help critical"
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
                      {/* <label htmlFor="referenceNo">Reference no :</label> */}
                      <br />
                      <Field
                        // type="text"
                        as={TextField}
                        name="referenceNo"
                        label="Reference no"
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
                </Row></>) : (null)}
              {/* {!value ? null : (
               
              )} */}

              <div className="form-group">
                <Row gutter={30} style={{ marginTop: "15px" }}>
                  <Col lg={12} md={12} sm={12}></Col>
                  <Col lg={12} md={12} sm={12} style={{ justifyContent: "flex-end", display: "flex" }} >
                    <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}
                      // htmlType='submit'
                      type="submit"
                      // onClick={()=>setModal2Open(false)}
                      className="btn btn-primary mr-2"
                    // disabled={isSubmitting}
                    >
                      Submit
                    </Button>

                    <Button type="reset" htmltype="reset" onClick={() => { setModalOpen(false); setValue(false) }} className="btn btn-secondary2" style={{
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
        onOk={() => { setModelDeleteOpen(false); setDeleteQuestion({}) }}
        onCancel={() => { setModelDeleteOpen(false); setDeleteQuestion({}) }}
        footer={[null]}
      > <Row>
          <Row>
            <Col lg={24}>
              <h3 style={{ color: "red" }}>Are you sure you want to delete this question</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={24}>
              <h3>{deleteQuestion.questionName}</h3>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col lg={24} style={{ justifyContent: "end", display: "flex" }}>
            <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }} onClick={(event) => DeleteQuestion(event)}>
              Delete
            </Button>
            <Button style={{
              marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
            }} onClick={() => { setModelDeleteOpen(false); setDeleteQuestion({}) }}>
              Cancel
            </Button>
          </Col>
        </Row>

      </Modal>
    </>
  )
}

export default Questions
