import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { apiPost } from "Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NotificationManager } from "react-notifications";

const AddUser = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    roleUID: "",
    id: "",
    name: "",
    email: "",
    email_verified_at: "",
    password: "",
    remember_token: "",
    created_at: "",
  });

  const resetForm = () => {
    setFormData({
      roleUID: "",
      id: "",
      name: "",
      email: "",
      email_verified_at: "",
      password: "",
      remember_token: "",
      created_at: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiPost("admin/user", formData);

      if (response) {
        // Successful API call
        NotificationManager.success("User added successfully!");
        history.push("/app/crm/user");
        // You can redirect the user to a different page or perform other actions upon success
      } else {
        // Handle error cases
        console.error("Error adding server:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <RctCollapsibleCard>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <h4 className="mt-0 header-title">Manage User</h4>
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
          <div className="col-sm-6">
            <div className="p-20">
              <FormGroup>
                <Label for="roleUID">RoleUID</Label>
                <Input
                  type="text"
                  name="roleUID"
                  id="roleUID"
                  placeholder="Enter your roleUID"
                  value={formData.roleUID}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="id">ID</Label>
                <Input
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Enter your id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">email</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-20"></div>
            <FormGroup>
              <Label for="email_verified_at">EmailVerifiedAt</Label>
              <Input
                type="text"
                name="email_verified_at"
                id="email_verified_at"
                placeholder="Enter your email_verified_at"
                value={formData.email_verified_at}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="remember_token">Remembertoken</Label>
              <Input
                type="text"
                name="remember_token"
                id="remember_token"
                placeholder="Enter your remember_token"
                value={formData.remember_token}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="created_at">Createdat</Label>
              <Input
                type="text"
                name="created_at"
                id="created_at"
                placeholder="Enter your created_at"
                value={formData.created_at}
                onChange={handleInputChange}
              />
            </FormGroup>
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

export default AddUser;
