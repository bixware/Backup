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

async function SContentList() {
  const response = await apiPost(baseURl + config.GetCommonContent, {});
  // console.log(response.data)
  return response.data
  // if (response.data.status == true) {
  //     return response.data.data;
  // }

}

function Content() {
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
    PageName: "",
    SectionName: "",
  }



  const validationSchemaAdd = Yup.object().shape({
    PageName: Yup.string().required("Page name is required"),
    SectionName: Yup.string().required("Section name is required"),

  })


  const [columnDef, setcolumnDef] = useState([
    { headerName: 'Page Name', field: 'PageName', width: '150', flex: 3 },
    { headerName: 'Section Name', field: 'SectionName', width: '150', flex: 3 },
    { headerName: 'Text Data', field: 'textData', width: '150', flex: 3 },
    {
      headerName: 'Action', field: 'isActive', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<><Tooltip title="Deactivate / Inactive"><Button onClick={() => SContentActiveFunc(params)}> <Switch
        checked={params.data.isActive === "1" ? true : false}
      /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip></>)
    },
  ])

  useEffect(() => {
    // console.log(editedContent)
    (async () => {
      const newData = await SContentList();
      // console.log(newData.data)
      setGridRefresh(false)
      setrowData(newData.data)
      //  console.log(newData.data.store)

    })();

  }, [gridRefresh])
  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  }

  const handleOpen = (params) => {
    setIsUpdate(true)
    SetButton("Update")
    setModalOpen(true)
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

  async function SContentActiveFunc(params) {
    let data = {
      "contentUID": params.data.contentUID,
      "isActive": params.data.isActive === "1" ? "0" : "1"
    }
    const response = await apiPost(baseURl + config.CommonContentActive, data);
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
        "pageName": values.PageName,
        "sectionName": values.SectionName,
        "userUID": user.userUID,
      }
      response = await apiPost(baseURl + config.UpdateCommonContent, data);
      // console.log(response)
      if (response.data.status === true) {
        toast.success(response.data.message);
        setModalOpen(false)
        setGridRefresh(true)

      }
    }
    else {
      let data = {
        "pageName": values.PageName,
        "sectionName": values.SectionName,
        "textData": text,
        "userUID": user.userUID
      }
      response = await apiPost(baseURl + config.AddCommonContent, data);
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
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
          <Button className="btn-success Content" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add Content</Button>
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
        destroyOnClose={true}
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
          validationSchema={validationSchemaAdd}
          onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Row gutter={30} style={{ marginBottom: "10px" }}>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="PageName">Page Name</label> */}
                    <br />
                    <Field
                      label="Page name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="PageName"
                      as={TextField}
                      fullWidth
                      value={values?.PageName ?? ""}
                      className={
                        "form-control" +
                        (errors.PageName && touched.PageName ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="PageName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="sectionName">Section Name</label> */}
                    <br />
                    <Field
                      label="Section name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="SectionName"
                      as={TextField}
                      fullWidth
                      value={values?.SectionName ?? ""}
                      className={
                        "form-control" +
                        (errors.SectionName && touched.SectionName ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="SectionName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              {/* <Row gutter={30}>
               
                  </Row> */}


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

export default Content


