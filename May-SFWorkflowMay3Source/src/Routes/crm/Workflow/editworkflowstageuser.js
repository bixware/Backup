import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { apiPost } from "Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NotificationManager } from "react-notifications";
import { useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SweetAlert from "react-bootstrap-sweetalert";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditWorkflowStageuser = () => {
  const location = useLocation();
  const selData = sessionStorage.getItem("selectedData");
  const selectedData = JSON.parse(selData);
  const history = useHistory();
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await apiPost("admin/getalluser", {});
      console.log(response);
      let tempUsers = response.data.data.users.filter(
        (user) => user.businessUnitUID === selectedData.businessUnitUID
      );
      setUsers(tempUsers);
      setSelectedUser(parseInt(selectedData.userUID))
    })();


  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser === "") {
      return
    }
    const formDataArray = {
      workFlowStageUserUID: selectedData.workFlowStageUserUID,
      userUID: selectedUser,
    };

    try {
      const response = await apiPost("admin/editstageuser", formDataArray);

      if (response) {
        setSuccess(true);
      } else {
        console.error("Error adding server:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };


  const onConfirm = () => {
    setSuccess(false);
    history.goBack();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <RctCollapsibleCard>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="mt-0 header-title">Edit Workflow stage User</h4>
                <a
                  href="#"
                  onClick={(e) => history.goBack()}
                  style={{ margin: "1%", float: "right" }}
                  className="btn btn-sm btn-primary"
                >
                  Back
                </a>
              </div>
            </div>
            <div className="col-sm-12">
            <div className="p-20">
              <div className="row">
                <div className="col-sm-6">
                <FormGroup>
                  <Label for="StageNo">Stage No</Label>
                  <Input
                    type="text"
                    name="stageNo"
                    id="stageNo"
                    placeholder="Enter your stageNo"
                    value={selectedData.stageNo}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormGroup>
                </div>
                <div className="col-sm-6">
                <FormGroup>
                  <Label for="stageName">StageName</Label>
                  <Input
                    type="text"
                    name="stageName"
                    id="stageName"
                    placeholder="Enter your stageName"
                    value={selectedData.stageName}
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                <FormGroup>
                  <Label for="businessUnitName">BusinessUnitName</Label>
                  <Input
                    type="text"
                    name="businessUnitName"
                    id="businessUnitName"
                    placeholder="Enter your businessUnitName"
                    value={selectedData.businessUnitName}
                    required
                  />
                </FormGroup>
                </div>
                <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="brandUID">
                    User Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={selectedUser}
                      name="userUID"
                      onChange={(e) =>
                        handleInputChange(e)
                      }
                      className="select2 form-control"
                      required
                      style={{ paddingRight: "30px" }}
                    >
                      <option value="" disabled>
                        Select User Name
                      </option>
                      {users.map((item) => (
                        <option key={item.userID} value={item.userID}>
                          {item.name}
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
              </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Button color="primary" type="submit">
              Update
            </Button>{" "}
            <Button color="danger" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </RctCollapsibleCard>

      <SweetAlert
        success
        show={success}
        title="Success"
        btnSize="sm"
        onConfirm={() => onConfirm()}
      >
        Workflow Stage User Updated Successfully!
      </SweetAlert>
    </div>

  );
};

export default EditWorkflowStageuser;
