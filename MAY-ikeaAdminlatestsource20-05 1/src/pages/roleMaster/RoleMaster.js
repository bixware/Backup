import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { apiPost } from "../../api/apiCommon"
import config from "../../config"
import { useState, useEffect } from 'react';
import baseURl from "../../base"
// import { Button } from 'antd';
// import { Col, Row } from "reactstrap";
import { Col, Menu, Row } from 'antd';
// import EditOutlined from "@ant-design/icons"
import { Modal } from 'antd';
// import { Checkbox, Form, Input } from 'antd';
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from "formik";
// import { FormGroup, Input, } from 'reactstrap';
import * as Yup from "yup";
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import IconButton from '@mui/material/IconButton';
// import { TextField,Select} from '@mui/material';
import { MenuItem, TextField, Select } from "@mui/material";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { Radio } from 'antd';
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { toast } from "react-toastify";
import Tooltip from '@mui/material/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
});



async function RoleList() {
    const userString = sessionStorage.getItem("Audit_user");
    const user = JSON.parse(userString);
    const response = await apiPost(baseURl + config.GetRoles, { userUID: user.userUID });
    if (response.data.status === true) {
        // console.log(response.data)
        return response.data
    }
}


function RoleMaster() {
    const [rowData, setrowData] = useState(null);
    const [gridApi, setgridApi] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [submitButton, setSubmitButton] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [gridRefresh, setGridRefresh] = useState(false)
    const [newInitialValues, setNewInitialValues] = useState("")
    const userString = sessionStorage.getItem('Audit_user');
    const user = JSON.parse(userString);
    const initialValues = {
        roleName: "",
    }



    const validationSchemaAdd = Yup.object().shape({
        roleName: Yup.string().required("Role Name is required"),
    })

    const validationSchemaUpdate = Yup.object().shape({
        roleName: Yup.string().required("Role Name is required"),
    })


    const [columnDef, setcolumnDef] = useState([
        {
            headerName: 'Role Name', field: 'roleName', cellStyle: { textAlign: "left" }, sortable: true,
            resizable: true,
            filter: true,
            floatingFilter: true,
        },
        // { headerName: 'Role Type', field: 'roleType', cellStyle: { textAlign: "left" }, },
        {
            headerName: 'Created date', field: 'createdDate', cellStyle: { textAlign: "left" }, sortable: true,
            resizable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: 'Action', field: 'isActive', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<> <Tooltip title="Deactivate / Inactive"><Button onClick={() => roleStatusFunc(params)}> <Switch
                checked={params.data.isActive === "1" ? true : false}
            /></Button></Tooltip><Tooltip title="Edit"><IconButton onClick={() => handleOpen(params)}><DriveFileRenameOutlineOutlinedIcon /></IconButton></Tooltip></>
            )
        },
        //   { <IconButton onClick={() => handleDeleteModalOpen(params)}><DeleteSweepSharpIcon /></IconButton>
        //     headerName: 'Action', field: 'userUID', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<></>
        //     )
        // }
    ]);
    useEffect(() => {
        // userstatusfunc();
        (async () => {
            const newData = await RoleList();
            // console.log(newData)
            setrowData(newData.data)
            setGridRefresh(false)

        })();
    }, [gridRefresh])


    const onGridReady = (params) => {
        setgridApi(params.api);

        params.api.sizeColumnsToFit();
    }

    const addModel = () => {
        setModalOpen(true)
        setIsUpdate(false)
        setSubmitButton("Submit")
    }
    async function roleStatusFunc(params) {
        let data = {
            "roleUID": params.data.roleUID,
            "isActive": params.data.isActive === "1" ? "0" : "1"
        }
        const response = await apiPost(baseURl + config.RoleActive, data);
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
        // console.log(params.data)
        setModalOpen(true)
        setIsUpdate(true)
        setNewInitialValues(params.data)
    }


    async function handleSubmit(values) {
        if (isUpdate) {
            let data = {
                "roleUID": values.roleUID,
                "roleName": values.roleName
            }
            const response = await apiPost(baseURl + config.RoleUpdate, data);
            // console.log(response)
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
        } else {
            let data = {
                "roleName": values.roleName,
                "userUID": user.userUID,
            }
            const response = await apiPost(baseURl + config.CreateRoles, data);
            // console.log(response)
            if (response.data.status === true) {
                toast.success(response.data.message);
                setGridRefresh(true)
                setModalOpen(false)//user and update consolelog
            } else if (response.data.status === false) {
                toast.warning(response.data.validationList[0])
                setModalOpen(false)
            } else {
                toast.warning("please try again sometime")
                setModalOpen(false)
            }
        }


    }
    return (
        <>
            <Row>
                <Col lg={24} md={24} sm={24} xs={24} style={{ justifyContent: "end", display: "flex", marginBottom: "-5px" }}>
                    <Button className="btn-success" onClick={addModel} style={{ backgroundColor: "#0257a7", fontSize: "12px", padding: "7px", color: "white", height: "32px", marginTop: "7px", color: "#ffdc01" }}>Add Role</Button>
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
                    pagination={true}
                    onGridReady={onGridReady}
                    columnDefs={columnDef}
                    rowData={rowData}
                />
            </div>
            <Modal
                title={isUpdate ? "Update Role Panel" : "Add Role Panel"}
                centered
                visible={modalOpen}
                destroyOnClose={true}
                maskClosable={false}
                // enableReinitialize={true}
                // onSubmit={handleSubmit}
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
                            <Row>
                                <Col lg={24} md={24} sm={24} xs={24}>
                                    <div className="form-group">
                                        {/* <label htmlFor="roleName">Role Name :</label> */}
                                        <br />
                                        <Field
                                            required
                                            label="Role name"
                                            inputProps={{
                                                style: {
                                                    padding: "6.5px 14px"
                                                }
                                            }}
                                            name="roleName"
                                            as={TextField}
                                            // value={values.menuName}
                                            fullWidth
                                            className={
                                                "form-control" +
                                                (errors.roleName && touched.roleName ? " is-invalid" : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="roleName"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className="form-group">
                                <Row style={{
                                    marginTop: "10px", justifyContent: "end",
                                    display: "flex"
                                }}  >
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
        </>
    )
}

export default RoleMaster