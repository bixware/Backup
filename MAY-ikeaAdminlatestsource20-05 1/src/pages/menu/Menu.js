import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { apiPost } from "../../api/apiCommon";
import config from "../../config";
import { useState, useEffect } from "react";
import baseURl from "../../base";
// import { Button } from 'antd';
// import { Col, Row } from "reactstrap";
import { Col, Menu, Row } from "antd";
// import EditOutlined from "@ant-design/icons"
import { Modal } from "antd";
// import { Checkbox, Form, Input } from 'antd';
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteSweepSharpIcon from "@mui/icons-material/DeleteSweepSharp";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { TextField,Select} from '@mui/material';
import { MenuItem, TextField, Select } from "@mui/material";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { Radio } from "antd";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import "../../Style.css";
import { ref, object, string, boolean } from "yup";

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});

async function menuList() {
  const response = await apiPost(baseURl + config.GetMenus, {});
  if (response.data.status === true) {
    // console.log(response);
    return response.data;
  }
}

async function parentMenuList() {
  const response = await apiPost(baseURl + config.GetParentMenu, {});
  if (response.data.status === true) {
    // console.log(response.data)
    return response.data;
  }
}
async function RoleList() {
  const userString = sessionStorage.getItem("Audit_user");
  const user = JSON.parse(userString);
  const response = await apiPost(baseURl + config.GetRoles, { userUID: user.userUID });
  if (response.data.status === true) {
    console.log(response.data);
    return response.data;
  }
}
function Menus() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitButton, setSubmitButton] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [rvalue, setRValue] = useState(true);
  const [gridRefresh, setGridRefresh] = useState(false);
  const [parentDropDown, setParantDropDown] = useState([]);
  const [roleDropDown, setRoleDropDown] = useState([]);
  const [newInitialValues, setNewInitialValues] = useState("");
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [modelDeleteOpen, setModelDeleteOpen] = useState(false);
  const [score, setScore] = useState({});



  const initialValues = {
    menuName: "",
    menuURL: "",
    parentMenu: "",
    parentMenu: "",
    rolesApplicable: [],
    isExternalLink: "",
    menuIcon: [],
  };

  const validationSchemaAdd = Yup.object().shape(
    {
      // auditEntityUID: Yup.string().required("Audit Entity Name is required"),
      menuName: Yup.string().required("Menu Name is required"),
      menuURL: Yup.string().required("Menu URL is required"),


      // parentMenuSection: Yup.string().when('rvalue', {
      //   is: false,
      //   then: Yup.string().required('parentMenu is required'),
      // })

      // parentMenu: Yup.boolean().required("Choose parent menu"),
      // parentMenuSection: Yup.string().when("parentMenu", {
      // is: false,
      // then: Yup.string().required("parentMenuSection No is required"),
      // parentMenu: Yup.boolean().when("parentMenu", {
      //   is: false,
      //   then: Yup.string(),
      //   parentMenuSection: Yup.string().required("Parent Menu is required"),
      // }),
      // rvalue:Yup.boolean().when('rvalue',{
      //   is:false
      //     required("Parent Menu is required"),

      // rvalue:Yup.boolean().when("rvalue", {
      //   is: false,
      //   then: Yup.string().of(
      //     Yup
      //       .object()
      //       .shape({
      //         parentMenu: Yup.string().required("Parent Menu is required"),
      //       }))
      // parentMenuSection: Yup
      //   .when("rvalue", {
      //     is: false,
      //     then: Yup.string().required("Must enter email address"),
      // // parentMenu: Yup.string().required("Parent Menu is required"),

      // // rolesApplicable: Yup.string().required("Question Category is required"),
    },
    // ["parentMenu", "parentMenuSection"]
  );
  const validationSchemaUpdate = Yup.object().shape({
    menuName: Yup.string().required("Menu Name is required"),
    menuURL: Yup.string().required("Menu URL is required"),
    // isExternalLink
    // parentMenu: Yup.string().required("Parent Menu is required"),
    // parentMenu: Yup.string().required("Parent Menu is required"),
    // radioGroup: Yup.string().required("A radio option is required"),
  });
  const validationSchemaAddParentMenu = Yup.object().shape({
    menuName: Yup.string().required("Menu Name is required"),
    menuURL: Yup.string().required("Menu URL is required"),
    parentMenu: Yup.string().required('parentMenu is required')
    // parentMenu: Yup.string().required("Parent Menu is required"),
    // radioGroup: Yup.string().required("A radio option is required"),
  });



  const [columnDef, setcolumnDef] = useState([
    {
      headerName: "Menu Name",
      field: "menuName",
      cellStyle: { textAlign: "left" },
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Menu URL",
      field: "menuURL",
      cellStyle: { textAlign: "left" },
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Role", field: "roles", cellStyle: { textAlign: "left" }, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },

    {
      headerName: "Action",
      field: "isActive",
      cellStyle: { textAlign: "center" },
      cellRendererFramework: (params) => (
        <> <Tooltip title="Deactivate / Inactive">
          <Button onClick={() => menuStatusFunc(params)}>
            {" "}
            <Switch checked={params.data.isActive === "1" ? true : false} />
          </Button></Tooltip>
          <Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}>
            <DriveFileRenameOutlineOutlinedIcon />
          </IconButton></Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton></Tooltip>
        </>
      ),
    },
    //   { <IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton>
    //     headerName: 'Action', field: 'userUID', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<></>
    //     )
    // }
  ]);
  useEffect(() => {
    // userstatusfunc();
    (async () => {
      const newData = await menuList();
      // console.log(newData);
      setrowData(newData.data);
      setGridRefresh(false);
    })();
  }, [gridRefresh]);

  useEffect(() => {

    (async () => {
      const newData = await RoleList();
      // console.log(newData);
      setRoleDropDown(newData.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const newData = await parentMenuList();
      // console.log(newData);
      setParantDropDown(newData.data);
    })();
  }, [rvalue])

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  };
  const addModel = () => {
    setSubmitButton("Submit");
    setIsUpdate(false);
    setModalOpen(true);
  };

  async function handleOpen(params) {
    if (params.data.parentMenu === "0") {
      setRValue(true)
    } else {
      setRValue(false)
    }
    setSubmitButton("Update");
    // console.log(params);
    setModalOpen(true);
    setIsUpdate(true);
    setNewInitialValues(params.data);
    if (params.data.rolesUID !== null && params.data.roleUID !== "null" && params.data.roleUID !== "") {
      const newCheck = params.data.rolesUID.split(",");
      setCheckedBoxes(newCheck);
    }
    // console.log(checkedBoxes);
    // let data={
    //   "menuUID":params.data.menuUID
    // }
    // const response = await apiPost(baseURl + "/menuUID", data);
    // console.log(response)
  }

  async function handleSubmit(values) {
    // console.log(values);
    // console.log(rvalue)
    // console.log(parentDropDown)

    if (checkedBoxes.length <= 0) {
      setIsCheckboxSelected(true)
      return;
    } else {
      setIsCheckboxSelected(false)
    }
    if (isUpdate) {
      let data = {
        menuUID: values.menuUID,
        menuName: values.menuName,
        menuURL: values.menuURL,
        menuIcon: values.menuIcon,
        parentMenu: rvalue === true ? 1 : 0,
        rolesApplicable: checkedBoxes,
        ParentMenuSection: values.parentMenu,
        isExternalLink: values.isExternalLink,
      };
      const response = await apiPost(baseURl + config.UpdateMenus, data);
      // console.log(response)
      if (response.data.status === true) {
        setGridRefresh(true);
        toast.success(response.data.message);
        setModalOpen(false);
        setCheckedBoxes([])
        setIsCheckboxSelected(false)//user and update consolelog
      } else if (response.data.status === false) {
        toast.warning(response.data.validationList[0]);
        // setModalOpen(false);
        // setCheckedBoxes([])
        // setIsCheckboxSelected(false)
      } else {
        toast.warning("please try again sometime");
        setModalOpen(false);
        setCheckedBoxes([])
        setIsCheckboxSelected(false)
      }
    } else {
      let data = {
        menuName: values.menuName,
        menuURL: values.menuURL,
        menuIcon: values.menuIcon,
        parentMenu: rvalue === true ? 1 : 0,
        ParentMenuSection: values.parentMenu,
        rolesApplicable: checkedBoxes,
      };
      // console.log(data)

      const response = await apiPost(baseURl + config.AddMenus, data);
      // console.log(response);
      if (response.data.status === true) {
        setGridRefresh(true);
        toast.success(response.data.message);
        setModalOpen(false);
        setCheckedBoxes([])
        setIsCheckboxSelected(false)//user and update consolelog
      } else if (response.data.status === false) {
        toast.warning(response.data.validationList[0]);
        // setModalOpen(false);
        setCheckedBoxes([])
        setIsCheckboxSelected(false)
      } else {
        toast.warning("please try again sometime");
        setModalOpen(false);
        setCheckedBoxes([])
        setIsCheckboxSelected(false)
      }
    }
  }
  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setRValue(e.target.value);
  };
  async function menuStatusFunc(params) {
    // setGridRefresh(true);

    let data = {
      menuUID: params.data.menuUID,
      isActive: params.data.isActive === "1" ? "0" : "1",
    };
    const response = await apiPost(baseURl + config.MenuActive, data);
    // console.log(response.data)
    if (response.data.status === true) {
      toast.success(response.data.message);
      setGridRefresh(true);
    }
  }

  const isChecked = (R) => {
    console.log(R)
    let foundcheckboxTrue = checkedBoxes.find((item) => item === R);
    if (foundcheckboxTrue) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckBoxChange = (e) => {
    console.log(e.target.value);
    let newArray = [...checkedBoxes];
    if (e.target.checked === true) {
      newArray.push(e.target.value);
      setCheckedBoxes(newArray);
    } else {
      let splicingCheckBox = newArray.findIndex(
        (item) => item === e.target.value
      );
      if (splicingCheckBox !== -1) {
        newArray.splice(splicingCheckBox, 1);
      }
      setCheckedBoxes(newArray);
    }

    console.log(newArray);

  };

  function getValidation() {

    if (rvalue === false) {
      return validationSchemaAddParentMenu;
    }
    else {
      return validationSchemaAdd;
    }

  }


  const handleDeleteModalOpen = (params) => {
    console.log(params.data)
    setModelDeleteOpen(true)
    setScore(params.data)
  }

  async function deleteScore() {
    let data = {
      "menuUID": score.menuUID
    }
    const response = await apiPost(baseURl + config.Deletemenu, data);
    if (response.data.status === true) {
      toast.success(response.data.message)
      setModelDeleteOpen(false);
      setGridRefresh(true)
    }
  }

  return (
    <>
      <Row>
        <Col
          lg={24} md={24} sm={24} xs={24}
          style={{
            justifyContent: "end",
            display: "flex",
            marginBottom: "-5px",
          }}
        >
          <Button
            className="btn-success"
            onClick={addModel}
            style={{
              backgroundColor: "#0257a7",
              fontSize: "12px",
              padding: "7px",
              color: "white",
              height: "32px",
              marginTop: "7px",
              color: "#ffdc01",
            }}
          >
            Add Menu
          </Button>
        </Col>
      </Row>
      <div className="ag-theme-alpine" id="aggridheightWith">
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,
            // filter: "agTextColumnFilter",
            minWidth: 100,
            cellStyle: { textAlign: "left" },
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
        title={isUpdate ? "Update Menu Panel" : "Add Menu Panel"}
        centered
        visible={modalOpen}
        destroyOnClose={true}
        maskClosable={false}
        enableReinitialize={true}
        // onSubmit={handleSubmit}
        onOk={() => setModalOpen(false)}
        onCancel={() => { setModalOpen(false); setRValue(true); setCheckedBoxes([]); setIsCheckboxSelected(false) }}
        footer={[null]}
      >
        <Formik
          initialValues={isUpdate ? newInitialValues : initialValues}
          enableReinitialize={true}
          validationSchema={getValidation()}
          //!isUpdate ? validationSchemaAdd : validationSchemaUpdate
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="menuName">Menu Name</label> */}
                    <br />
                    <Field
                      required
                      label="Menu name"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="menuName"
                      as={TextField}
                      // value={values.menuName}
                      fullWidth
                      className={
                        "form-control" +
                        (errors.menuName && touched.menuName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="menuName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <div className="form-group">
                    {/* <label htmlFor="menuURL">Menu URL</label> */}
                    <br />
                    <Field
                      required
                      label="Menu url"
                      inputProps={{
                        style: {
                          padding: "6.5px 14px"
                        }
                      }}
                      name="menuURL"
                      as={TextField}
                      // value={values.menuURL}
                      fullWidth
                      className={
                        "form-control" +
                        (errors.menuURL && touched.menuURL ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="menuURL"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              {isUpdate ? (
                <Row>
                  <Col lg={24} md={24} sm={24} xs={24}>
                    <div className="form-group">
                      {/* <label htmlFor="isExternalLink">External Link</label> */}
                      <br />
                      <Field
                        label="External link in number*"
                        inputProps={{
                          style: {
                            padding: "6.5px 14px"
                          },
                          type: "number",
                        }}
                        name="isExternalLink"
                        as={TextField}
                        // value={values.menuName}
                        fullWidth
                        className={
                          "form-control" +
                          (errors.isExternalLink && touched.isExternalLink
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="isExternalLink"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                </Row>
              ) : (
                null
              )}

              <Row
                className="radioBtn"
                style={{ justifyContent: "start", display: "flex" }}
              >
                <Col lg={24} md={24} sm={24} xs={24}>
                  {/* <div className="form-group">
                    <label htmlFor="menuURL" id="my-radio-group">Parent Menu</label>
                    </Col>
                    <Col lg={6}>
                    <div role="group" defaultValue={false} onChange={onChange} aria-labelledby="my-radio-group">
                      <label style={{marginRight:"10px"}}>
                        <Field  style={{margin:"5px"}} type="radio" name="parentMenu" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field  style={{margin:"5px"}} type="radio" name="parentMenu" value="false" />
                        No
                      </label>
                      <div>Picked: {values.picked}</div>
                    </div> */}
                  <label htmlFor="parentMenu" style={{ marginRight: "10px" }}>
                    Parent Menu
                  </label>
                  {/* </Col> */}
                  {/* <Col lg={6}> */}
                  <Radio.Group
                    onChange={onChange}
                    name="parentMenu"
                    value={rvalue}
                  >
                    <Radio
                      name="parentMenu"
                      value={true}
                      className={
                        "form-control" +
                        (errors.parentMenu && touched.parentMenu
                          ? " is-invalid"
                          : "")
                      }
                    >
                      Yes
                    </Radio>
                    <Radio
                      name="parentMenu"
                      value={false}
                      className={
                        "form-control" +
                        (errors.parentMenu && touched.parentMenu
                          ? " is-invalid"
                          : "")
                      }
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </Col>

                {/* <ErrorMessage
                  name="parentMenu"
                  value={rvalue}
                  component="div"
                  className="invalid-feedback"
                /> */}
                {/* </div> */}
                {rvalue ? (
                  ""
                ) : (

                  <Col lg={12} md={24} sm={24} xs={24} style={{ marginTop: "10px" }}>
                    <div className="form-group">

                      <Field
                        style={{ marginTop: "10px" }}
                        label="Parent menu"
                        inputProps={{
                          style: {
                            padding: "6.5px 14px"
                          }
                        }}
                        as={TextField}
                        name="parentMenu"
                        variant="outlined"
                        fullWidth
                        value={values?.parentMenu ?? ""}
                        select
                        className={
                          "form-control" +
                          (errors.parentMenu && touched.parentMenu
                            ? " is-invalid"
                            : "")
                        }
                      >
                        {parentDropDown?.map((q) => (
                          <MenuItem key={q.menuUID} value={q.menuUID}>
                            {q.menuName}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="parentMenu"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                )}
              </Row>
              {/* <Row>
                <input
                  type="file"
                  name="menuIcon"
                  placeholder='Upload icon'
                  onChange={(event) => {
                    setFieldValue('menuIcon', event.currentTarget.files[0]);
                  }}
                />
              </Row> */}
              <Row>
                {/* <Col lg={24}>
                <label htmlFor="rolesApplicable">Role</label>
                <div className="form-group">
                    <Field 
                    as={TextField}
                      name="rolesApplicable"
                      variant="outlined"
                      fullWidth
                      value={values?.rolesApplicable ?? ""}
                      select
                      className={
                        "form-control" +
                        (errors.rolesApplicable && touched.rolesApplicable ? " is-invalid" : "")
                      }
                    >
                      {roleDropDown?.map((q) => (
                        <MenuItem key={q.roleUID} value={q.roleUID}>
                          {q.roleName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="rolesApplicable"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </Col> */}

                <Col lg={24} md={24} sm={24} xs={24}>
                  <label style={{ color: "blue" }} htmlFor="rolesApplicable">Select roles applicable</label>
                  <br />
                  {roleDropDown?.map((q) => (
                    <Field
                      type="checkbox"
                      name="rolesApplicable"
                      value={q.roleUID}
                      key={q.roleUID}
                      as={FormControlLabel}
                      control={<Checkbox />}
                      checked={isUpdate ? isChecked(q.roleUID) : values.roleUID}
                      // checked={values.roleUID}
                      onChange={(e) => handleCheckBoxChange(e)}
                      label={q.roleName}
                      // labelPlacement="start"
                      labelPlacement="end"
                    />

                  ))}
                  {isCheckboxSelected ? (
                    // <ErrorMessage
                    // component="div"
                    // className="invalid-feedback"
                    // >"Please select one role"</ErrorMessage>
                    <span style={{
                      color: "red",
                      fontSize: "13px",
                      fontWeight: "500"
                    }}>
                      Please select one role
                    </span>
                  ) : null
                  }
                  {/* {
                    roleDropDown?.map((q) => {
                      return (
                        <>                   
                        <input type='checkbox' key={q.rolesUID} value={q.rolesUID}  onChange={(e)=>handleCheckBoxChange(e)}></input>
                        <label key={q.rolesUID}>{q.roleName}</label>
                        </>
                      )
                    })
                  } */}
                </Col>
                {/* <Col>
                  {roleDropDown?.map((q) => {
                   
                    return (
                      <div key={q.roleUID} value={q.roleUID}>
                        <Image src={image.path} alt={"image"} fluid />
                        <Checkbox
                          name= "rolesApplicable"
                          value={q.roleName}
                          defaultChecked={values.images[index].isMain}
                          onChange={checkHandleChange}
                        >{q.roleName}</Checkbox>
                      </div>
                    );
                  })}
                </Col> */}
              </Row>
              <div className="form-group">
                <Row style={{
                  marginTop: "10px", justifyContent: "end",
                  display: "flex",
                }}>
                  <Col
                  >
                    <Button
                      style={{
                        backgroundColor: "#0257a7",
                        fontSize: "12px",
                        padding: "7px",
                        color: "white",
                      }}
                      htmltype="submit"
                      type="submit"
                      // onClick={()=>setModal2Open(false)}
                      className="btn btn-primary mr-2"
                    // disabled={isSubmitting}
                    >
                      {submitButton}
                    </Button>

                    <Button
                      type="reset"
                      htmltype="reset"
                      onClick={() => { setModalOpen(false); setCheckedBoxes([]); setRValue(true); setIsCheckboxSelected(false) }}
                      className="btn btn-secondary"
                      style={{
                        marginLeft: "15px",
                        backgroundColor: "#0257a7",
                        fontSize: "12px",
                        padding: "7px",
                        color: "white",
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        title="Delete Menu Panel"
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
            <h3>Are you sure want to delete this Menu: <span style={{ color: "red" }}>{score.menuName} ?</span></h3>
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
  );
}

export default Menus;
