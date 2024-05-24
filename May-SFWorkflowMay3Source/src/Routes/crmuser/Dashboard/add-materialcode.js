import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { apiPost, apiGet, apiFormDataPost } from "Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NotificationManager } from "react-notifications";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FileUploader } from "react-drag-drop-files";
import { DropzoneArea } from "material-ui-dropzone";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import SweetAlert from "react-bootstrap-sweetalert";

const AddMaterialCode = () => {
  const docFileTypes = [
    "png",
    "PDF",
    "DOCX",
    "DOC",
    "xlsx",
    "xls",
    "csv",
    "zip",
    "eml",
  ];

  const history = useHistory();
  const [multipleFile, setmultipleFile] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandUID: "",
    brand: "",
    categoryUID: "",
    category: "",
    remarks: "",
    vendorDescription: "",
    description: "",
    multipleUpload: [],
  });
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const userData = User.get_work_flow_statge_user;
  const [branduid, setBrandUid] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //let usersData = []
    // userData.forEach((item) => {
    //   if (item.stageName === "Initiator" && item.workFlowName === "Cost Price Update") {
    //    // usersData.push(item)
    //   }
    // })
    let usersData = userData.find(
      (item) =>
        item.stageName === "Initiator" &&
        item.workFlowName === "Material Code Creation"
    );
    setCurrentUser(usersData);
    // console.log(usersData);
    const fetchBrandUid = async () => {
      try {
        const response = await apiGet("user/getbrand");
        if (response && response.data && response.data.data) {
          setBrandUid(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBrandUid();

    const fetchCategory = async () => {
      try {
        const response = await apiGet("user/getcategorylist");
        if (response && response.data && response.data.data) {
          setCategory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCatChange = (e) => {
    const { name, value } = e.target;
    let selectedCat = category.find(
      (item) => item.categoryUID === parseInt(e.target.value)
    );
    setFormData({
      ...formData,
      [name]: selectedCat.categoryName,
      ["categoryUID"]: value,
    });
  };
  const handleBrandChange = (e) => {
    const { name, value } = e.target;
    let selectedBrand = branduid.find(
      (item) => item.brandUID === parseInt(e.target.value)
    );
    console.log(selectedBrand);
    setFormData({
      ...formData,
      [name]: selectedBrand.brandName,
      ["brandUID"]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.multipleUpload = multipleFile;
    const form_data = new FormData();
    setLoading(true);
    form_data.append("userUID", currentUser.userUID);
    form_data.append("businessUnitUID", currentUser.businessUnitUID);
    form_data.append("businessUnitName", currentUser.businessUnitName);
    form_data.append("userName", currentUser.userName);
    form_data.append("userEmail", currentUser.userEmail);
    form_data.append("approveID", currentUser.approveID);
    form_data.append("approveName", currentUser.approveName);
    form_data.append("rejectID", currentUser.rejectID);
    form_data.append("rejectName", currentUser.rejectName);
    form_data.append("stageName", currentUser.stageName);
    form_data.append("stageNo", currentUser.stageNo);
    form_data.append("workFlowName", currentUser.workFlowName);
    form_data.append("workFlowUID", currentUser.workFlowUID);
    form_data.append("workFlowStageUID", currentUser.workFlowStageUID);

    form_data.append("brandUID", formData.brandUID);
    form_data.append("brand", formData.brand);
    form_data.append("category", formData.category);
    form_data.append("categoryUID", parseInt(formData.categoryUID));
    form_data.append("remarks", formData.remarks);
    form_data.append("description", formData.description);
    for (let i = 0; i < multipleFile.length; i++) {
      form_data.append(`multipleUpload[]`, multipleFile[i]);
    }
    try {
      const response = await apiFormDataPost("user/sfcreatemcc", form_data);
      console.log(response);
      if (response) {
        setSuccess(true);
        setLoading(false);
      } else {
        console.error("Error adding role:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      brandUID: "",
      brand: "",
      categoryUID: "",
      category: "",
      remarks: "",
      vendorDescription: "",
      description: "",
      multipleUpload: [],
    });
    history.goBack();
  };

  const handleChange = (file) => {
    // console.log(file);
    setmultipleFile((prevState) => {
      const tempArr = [...prevState];
      Array.from(file).forEach((item) => {
        let duplicateFile = tempArr.find((df) => df.name === item.name);
        if (!duplicateFile) tempArr.push(item);
      });
      // console.log(tempArr);
      return tempArr;
    });
  };

  function handleEvent(event, picker) {
    // console.log(new Date(picker.startDate.format()));
    formData.fromDate = new Date(picker.startDate.format());
    formData.toDate = new Date(picker.endDate.format());
  }

  const onConfirm = () => {
    setSuccess(false);
    setLoading(true);
    history.push("/app/user/request-list");
  };

  function clearFile(data) {
    console.log(data);
    setmultipleFile((prevState) => {
      const tempArr = [...prevState];
      let fileIndex = tempArr.findIndex((item) => item.name === data.name);
      if (fileIndex !== -1) tempArr.splice(fileIndex, 1);
      return tempArr;
    });
  }

  return (
    <RctCollapsibleCard>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <h4 className="mt-0 header-title" style={{ fontSize: "1.5rem" }}>
                Create Material Code
              </h4>
              <a
                href="#"
                onClick={(e) => history.goBack()}
                style={{ margin: "1%", float: "right" }}
                className="btn btn-sm btn-secondary"
              >
                Back
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="brandUID">
                    Brand <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      name="brand"
                      value={formData.brandUID}
                      onChange={handleBrandChange}
                      className="select2 form-control"
                      required
                      style={{ paddingRight: "30px" }}
                    >
                      <option value="" disabled>
                        Select Brand
                      </option>
                      {branduid.map((item) => (
                        <option key={item.brandUID} value={item.brandUID}>
                          {item.brandName}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <FormGroup>
                  <label htmlFor="Category">
                    Category{"  "} <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      name="category"
                      value={formData.categoryUID}
                      onChange={handleCatChange}
                      className="select2 form-control"
                      required
                      style={{ paddingRight: "30px" }}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {category.map((item) => (
                        <option key={item.categoryUID} value={item.categoryUID}>
                          {item.categoryName}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <FormGroup>
                  <Label for="Material Description">
                    SKU Description{"  "}
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Enter SKU Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="col-sm-6">
                <FormGroup>
                  <Label for="remarks">
                    Remarks{"  "}
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="textarea"
                    name="remarks"
                    id="remarks"
                    placeholder="Enter Remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="card mt-3">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">
                      Upload Files{"  "}
                      <span style={{ color: "red" }}>*</span>
                    </h4>
                    <div className="dropify-wrapper">
                      <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={docFileTypes}
                        value={formData.multipleUpload}
                        multiple={true}
                        required
                      />
                    </div>
                    {multipleFile.length > 0 ? (
                      <>
                        {multipleFile.map((item, i) => {
                          return (
                            <div className="row" key={i}>
                              <div className="col-6">
                                <h6>{item.name} </h6>
                              </div>
                              <div className="col-2">
                                <i
                                  className="ti-close"
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => clearFile(item)}
                                ></i>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          {loading ? (
            <Button color="danger" type="submit" disabled>
              <i
                className="zmdi zmdi-spinner zmdi-hc-spin"
                // style={{ fontSize: "1rem", marginRight: "5px" }}
              ></i>{" "}
              Submit
            </Button>
          ) : (
            <Button color="danger" type="submit">
              Submit
            </Button>
          )}
          &nbsp; &nbsp;
          <Button color="primary" type="button" onClick={resetForm}>
            Cancel
          </Button>
        </div>
        <div style={{ marginTop: "2%" }}></div>
      </Form>
      <SweetAlert
        success
        show={success}
        title="Success"
        btnSize="sm"
        onConfirm={() => onConfirm()}
      >
        Material Code added Successfully!
      </SweetAlert>
    </RctCollapsibleCard>
  );
};

export default AddMaterialCode;
