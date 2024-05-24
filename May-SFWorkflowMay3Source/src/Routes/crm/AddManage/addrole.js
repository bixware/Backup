// import React, { useState } from "react";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
// import { apiPost } from "Api/apiCommon";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { NotificationManager } from "react-notifications";
// // import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

// const AddRole = () => {
//   const history = useHistory();
//   const [formData, setFormData] = useState({
//     roleUID: "",
//     roleName: "",
//     isActive: "",
//     createdBy: "",
//     createdDate: "",
//   });

//   const resetForm = () => {
//     setFormData({
//       roleUID: "",
//       roleName: "",
//       isActive: "",
//       createdBy: "",
//       createdDate: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await apiPost("admin/roles", formData);

//       if (response) {
//         // Successful API call
//         NotificationManager.success("Role added successfully!");
//         history.push("/app/crm/role");
//         // You can redirect the user to a different page or perform other actions upon success
//       } else {
//         // Handle error cases
//         console.error("Error adding server:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error during API call:", error);
//     }
//   };

//   return (
//     <RctCollapsibleCard>
//       <Form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-sm-12">
//             <div className="page-title-box">
//               <h4 className="mt-0 header-title">Manage Role</h4>
//               <a
//                 href="#"
//                 onClick={(e) => history.goBack()}
//                 style={{ margin: "1%", float: "right" }}
//                 className="btn btn-sm btn-secondary"
//               >
//                 Back
//               </a>
//             </div>
//           </div>
//           <div className="col-sm-6">
//             <div className="p-20">
//               {/* <FormGroup>
//                 <Label for="roleUID">RoleUID</Label>
//                 <Input
//                   type="text"
//                   name="roleUID"
//                   id="roleUID"
//                   placeholder="Enter your roleUID"
//                   value={formData.roleUID}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup> */}
//               <TextField
//                 label="RoleUID"
//                 variant="outlined"
//                 type="text"
//                 name="roleUID"
//                 id="roleUID"
//                 placeholder="Enter your roleUID"
//                 value={formData.roleUID}
//                 onChange={handleInputChange}
//                 required
//               />
//               {/* <FormGroup>
//                 <Label for="roleName">RoleName</Label>
//                 <Input
//                   type="text"
//                   name="roleName"
//                   id="roleName"
//                   placeholder="Enter your roleName"
//                   value={formData.roleName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup> */}
//               <TextField
//                 label="RoleName"
//                 variant="outlined"
//                 type="text"
//                 name="roleName"
//                 id="roleName"
//                 placeholder="Enter your roleName"
//                 value={formData.roleName}
//                 onChange={handleInputChange}
//                 required
//               />
//               {/* <FormGroup>
//                 <Label for="isActive">isActive</Label>
//                 <Input
//                   type="text"
//                   name="isActive"
//                   id="isActive"
//                   placeholder="Enter your isActive"
//                   value={formData.isActive}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup> */}
//               <TextField
//                 label="isActive"
//                 variant="outlined"
//                 type="text"
//                 name="isActive"
//                 id="isActive"
//                 placeholder="Enter your isActive"
//                 value={formData.isActive}
//                 onChange={handleInputChange}
//                 required
//               />
//               {/* <FormGroup>
//                 <Label for="createdBy">CreatedBy</Label>
//                 <Input
//                   type="text"
//                   name="createdBy"
//                   id="createdBy"
//                   placeholder="Enter your createdBy"
//                   value={formData.createdBy}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup> */}
//               <TextField
//                 label="CreatedBy"
//                 variant="outlined"
//                 type="text"
//                 name="createdBy"
//                 id="createdBy"
//                 placeholder="Enter your createdBy"
//                 value={formData.createdBy}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//           <div className="col-sm-6">
//             <div className="p-20"></div>
//           </div>
//         </div>
//         <div className="text-right">
//           <Button color="danger" type="submit">
//             Submit
//           </Button>{" "}
//           <Button color="primary" type="button" onClick={resetForm}>
//             Cancel
//           </Button>
//         </div>
//       </Form>
//     </RctCollapsibleCard>
//   );
// };

// export default AddRole;
import React, { useState, useEffect } from "react";
import { Button, Form } from "reactstrap";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { apiPost, apiGet } from "Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NotificationManager } from "react-notifications";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FileUploader } from "react-drag-drop-files";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const AddRole = () => {
  const docFileTypes = ["PDF", "DOCX", "DOC", "xlsx", "xls", "csv"];

  const history = useHistory();
  const [formData, setFormData] = useState({
    brandUID: "",
    vendorCode: "",
    materialCode: "",
    fromDate: "",
    category: "",
    vendorDescription: "",
    description: "",
    toDate: "",
    multipleUpload: [],
  });

  const [branduid, setBrandUid] = useState([]);

  useEffect(() => {
    const fetchBrandUid = async () => {
      try {
        const response = await apiGet("admin/getbrand");
        if (response && response.data && response.data.data) {
          setBrandUid(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBrandUid();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(multipleFile);
    formData.multipleUpload.push(multipleFile);

    try {
      const response = await apiPost("admin/createcpu", formData);
      if (response) {
        NotificationManager.success("CostpriceUpdate added successfully!");
        history.push("/app/crm/cost");
      } else {
        console.error("Error adding role:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      brandUID: "",
      vendorCode: "",
      materialCode: "",
      fromDate: "",
      category: "",
      vendorDescription: "",
      description: "",
      toDate: "",
      multipleUpload: [],
    });
  };

  const [multipleFile, setmultipleFile] = useState([]);
  // const multipleFileChange = (file) => {
  //   if (file.length !== 0) {
  //     console.log(file);
  //     setmultipleFile(file);
  //     setFormData({ ...formData, multipleUpload: file });
  //   }
  // };
  // const multipleFileChange = (files) => {
  //   if (files.length !== 0) {
  //     const updatedFiles = files.map((file) => ({
  //       file: file,
  //       name: file.name,
  //     }));
  //     console.log(updatedFiles);
  //     setmultipleFile(updatedFiles);
  //     setFormData({ ...formData, multipleUpload: updatedFiles });
  //   }
  // };
  const handleChange = (file) => {
    // console.log(file);
    setmultipleFile(file[0].name);
  };
  return (
    <RctCollapsibleCard>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <h4 className="mt-0 header-title">Manage Cost</h4>
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
          <div className="col-sm-6">
            <div className="p-20 ">
              <FormControl fullWidth className="mt-3">
                <InputLabel id="brand-select-label">Brand</InputLabel>
                <Select
                  labelId="brand-select-label"
                  id="brand-select"
                  name="brandUID"
                  value={formData.brandUID}
                  onChange={handleInputChange}
                  label="Brand"
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Brand
                  </MenuItem>
                  {branduid.map((item) => (
                    <MenuItem key={item.brandUID} value={item.brandUID}>
                      {item.brandName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Vendor Code"
                variant="outlined"
                type="text"
                size="medium"
                name="vendorCode"
                id="vendorCode"
                placeholder="Enter Vendor Code"
                value={formData.vendorCode}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Material Code"
                variant="outlined"
                type="text"
                size="medium"
                name="materialCode"
                id="materialCode"
                placeholder="Enter Material Code"
                value={formData.materialCode}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                // label="From Date"
                variant="outlined"
                type="date"
                size="medium"
                name="fromDate"
                id="fromDate"
                placeholder="2017-06-04"
                value={formData.fromDate}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <div className="card mt-3">
                <div className="card-body">
                  <h4 className="mt-0 header-title">Cost List</h4>
                  <div className="dropify-wrapper">
                    {/* <FileUploader
                      multiple={true}
                      name="file"
                      className="multipleUpload"
                      types={docFileTypes}
                      onChange={multipleFileChange}
                      value={formData.multipleUpload}
                      maxSize={2}
                      fullWidth
                    /> */}
                    <FileUploader
                      handleChange={handleChange}
                      name="file"
                      types={docFileTypes}
                      value={formData.multipleUpload}
                      multiple={true}
                    />
                  </div>
                  {/* <div className="row">
                    {multipleFile ? (
                      <div className="col">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="fileUploadEyeIcon"
                          // onClick={() => openPDFModel("multipleUpload")}
                        />
                      </div>
                    ) : null}

                    <div className="col-11">
                      <span className="font-13 text-muted">
                        {multipleFile
                          ? `File name: ${multipleFile[0].name}`
                          : "no files uploaded yet"}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-20">
              <TextField
                label="Category"
                variant="outlined"
                type="text"
                size="medium"
                name="category"
                id="category"
                placeholder="Enter Category"
                value={formData.category}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Vendor Description"
                variant="outlined"
                type="text"
                size="medium"
                name="vendorDescription"
                id="vendorDescription"
                placeholder="Enter Vendor Description"
                value={formData.vendorDescription}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                variant="outlined"
                type="text"
                size="medium"
                name="description"
                id="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                // label="To Date"
                variant="outlined"
                type="date"
                size="medium"
                name="toDate"
                id="toDate"
                placeholder="2017-06-04"
                value={formData.toDate}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button color="danger" type="submit">
            Submit
          </Button>{" "}
          <Button color="primary" type="button" onClick={resetForm}>
            Cancel
          </Button>
        </div>
      </Form>
    </RctCollapsibleCard>
  );
};

export default AddRole;
