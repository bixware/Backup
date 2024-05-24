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
import { Col, Menu, Row } from 'antd';
import Component from "react";
import { render } from "react-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Global } from "@emotion/core";
import { TextField, MenuItem } from '@mui/material';
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

async function ContentList() {
  const response = await apiPost(baseURl + config.GetContent, {});
  // console.log(response.data)
  return response.data
  // if (response.data.status == true) {
  //     return response.data.data;
  // }

}


function EntityContent() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // const [textData, setTextData] = useState("");
  const [editedContent, setEditedContent] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)
  const [newInitialValues, setNewInitialValues] = useState("")
  const [text, setText] = useState("")
  const [button, SetButton] = useState("")
  const [auditEntity, setAuditEntity] = useState({})
  const [gridRefresh, setGridRefresh] = useState(false)
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  const initialValues = {
    textData: "",
    contentType: ""
  }

  const [columnDef, setcolumnDef] = useState([
    { headerName: 'ContentType', field: 'contentType', width: '150', flex: 3 },
    { headerName: 'Check list Entity', field: 'auditEntityName', width: '150', flex: 3 },
    { headerName: 'Text Data', field: 'textData', width: '150', flex: 3 },
    {
      headerName: 'Action', field: 'isActive', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<> <Tooltip title="Deactivate / Inactive"><Button onClick={() => ContentActiveFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip></>)
    },
  ])


  async function auditEntityList() {

    let data = {
      userUID: user.userUID,
    };
    const response = await apiPost(baseURl + config.AuditEntityList, data);
    return response.data


  }


  useEffect(() => {
    // console.log(editedContent)
    (async () => {
      const newData = await ContentList();
      // console.log(newData.data)
      setGridRefresh(false)
      setrowData(newData.data)
      //  console.log(newData.data.store)

    })();

    (async () => {
      const newData = await auditEntityList();
      setAuditEntity(newData.data.entity)
      // console.log(newData)


    })();

  }, [gridRefresh])
  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }

  const handleOpen = (params) => {
    SetButton("Update")
    setModalOpen(true)
    setIsUpdate(true)
    // console.log(params.data)
    setNewInitialValues(params.data)

    // setTextData(params.data.textData)

  }

  // tinymce.init({
  //   selector: 'textarea',
  //   setup: function (ed) {
  //     ed.on('keydown', function (e) {
  //       if (e.ctrlKey && e.keyCode == 13) {
  //         alert("CTRL + ENTER PRESSED");
  //         e.preventDefault();
  //       }
  //     });
  //   }
  // });

  async function ContentActiveFunc(params) {
    let data = {
      "contentUID": params.data.contentUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.ContentActive, data);
    // console.log(response)
    if (response.data.status === true) {
      toast.success(response.data.message);
      setGridRefresh(true)

    } else {
      toast.warning("Try again later")
    }

  }
  const handleChange = (e) => {
    // var frame = document.getElementById('tinymce');
    // var iframeDocument = frame.contentWindow.document;
    // iframeDocument.addEventListener('keydown', function(e) {
    //     if (
    //         [38, 40, 13].indexOf(e.keyCode) > -1 //Enter and up/down arrows or whatever you want
    //     ) {

    //         e.preventDefault();
    //         e.stopPropagation();
    //         e.stopImmediatePropagation();

    //         // your code here
    //         return false;
    //     }
    // }, true);
    // console.log(e.target.getContent());
    // setEditedContent(e.target.value)
  }

  async function handleSubmit(values) {
    // console.log(auditEntity)
    // console.log(values)
    // console.log(text)
    let response;
    if (isUpdate) {
      let data = {
        "contentUID": values.contentUID,
        "textData": text,
        "userUID": user.userUID,
      }
      response = await apiPost(baseURl + config.UpdateContent, data);
      // console.log(response)
      if (response.data.status === true) {
        toast.success(response.data.message);
        setModalOpen(false)
        setGridRefresh(true)

      }
    }
    else {
      let data = {
        "auditEntityUID": values.auditEntityUID,
        "contentType": values.contentType,
        "textData": text,
        "userUID": user.userUID
      }
      response = await apiPost(baseURl + config.AddContent, data);
      // console.log(response)
      if (response.data.status === true) {
        toast.success(response.data.message);
        setModalOpen(false)
        setGridRefresh(true)

      }
    }

    // console.log(values);
    // console.log(text)
  }

  const addModel = () => {
    SetButton("Submit")
    setModalOpen(true)
    setIsUpdate(false)
  }
  return (
    <>
      {/* <Row className='rowTopLevel'>
        <Col lg={20}>
          <h3>Entity Content</h3>
        
        </Col>
        <Col lg={4} >
          <Button className="btn-success Content" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px",marginRight:"27px" }}>Add Entity Content</Button>
        </Col>
      </Row> */}
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
          <Button className="btn-success Content" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add Entity Content</Button>
        </Col>
      </Row>
      <div className="ag-theme-alpine" id='aggridheightWith'>
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
        title="Content Editor Panel"
        centered
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[null]}
        width="75%"
        maskClosable={false}
      >
        {/* <Global
          styles={css`
            .tox-notifications-container {
              display: none !important;
            }
          `}
        /> */}
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {!isUpdate ? (<div className="form-group">
                {/* <label htmlFor="auditEntityUID">Check list entity name : </label> */}

                <Field
                  style={{ marginTop: "15px" }}
                  as={TextField}
                  label="Check list entity"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  required
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
              </div>) : ("")}
              {!isUpdate ? (<div className="form-group">
                {/* <label htmlFor="contentType">Content Type</label> */}

                <Field
                  style={{ marginTop: "15px" }}
                  label="Content type"
                  inputProps={{
                    style: {
                      padding: "6.5px 14px"
                    }
                  }}
                  required
                  name="contentType"
                  as={TextField}
                  fullWidth
                  value={values.contentType}
                  className={
                    "form-control" +
                    (errors.contentType && touched.contentType ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="contentType"
                  component="div"
                  className="invalid-feedback"
                />
              </div>) : ("")}

              <div style={{ marginTop: "10px" }}>
                <Editor

                  // apiKey="y7gnmtbsaxnjbgh3405ioqbdm24eit5f0ovek49w8yvq5r9q"
                  // initialValue={textData.textData}
                  // initialValue={values.textData}
                  // value={values?.textData?? ""}
                  //  initialValue={initialValues}
                  tagName="textData"
                  name="textData"
                  initialValue={values?.textData ?? ""}
                  // textareaName='textData'
                  init={{

                    branding: false,
                    height: 400,
                    menubar: true,
                    plugins:
                      "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                    toolbar:
                      "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                    image_advtab: true
                  }}
                  onInit={(evt, editor) => {
                    setText(editor.getContent());
                  }}
                  // onEditorChange={(e)=>handleChange(setFieldValue("textData",e.target.getContent()))}
                  // onChange={(e) => handleChange(setFieldValue("textData", e.target.getContent()))}
                  // onClick={(e)=>handleChange(setFieldValue("textData",e.target.getContent()))}
                  onEditorChange={(evt, editor) => {
                    // setText(
                    // setFieldValue("textData",evt.target.getContent()));
                    setText(editor.getContent());
                  }
                  }
                />
              </div>

              <Row style={{ justifyContent: "end", display: "flex", marginTop: "10px" }}>
                <Col>
                  <Button style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white" }}
                    htmltype='submit'
                    type="submit"
                    // onClick={()=>setModal2Open(false)}
                    className="btn btn-primary mr-2"
                  // disabled={isSubmitting}
                  >
                    {button}
                  </Button>

                  <Button type="reset" htmltype="reset" onClick={() => setModalOpen(false)} className="btn btn-secondary" style={{
                    marginLeft: "15px", backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white"
                  }}>
                    Cancel
                  </Button></Col>
              </Row>

            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default EntityContent


