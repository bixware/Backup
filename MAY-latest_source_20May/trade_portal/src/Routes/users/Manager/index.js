/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Form, FormGroup, Label, Input } from "reactstrap";

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { NotificationManager } from "react-notifications";
import Avatar from "@material-ui/core/Avatar";
import { useHistory, useParams } from "react-router-dom";
// api
import api from "Api";
import {
  apiPost,
  apiFormDatePost,
  setLoggedInuser,
} from "../../../Api/apiCommon";
// delete confirmation dialog
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
// add new user form
import AddNewUserForm from "./AddNewUserForm";
// update user form
import UpdateUserForm from "./UpdateUserForm";
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// intl messages
import IntlMessages from "Util/IntlMessages";
// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
// rct section loader
//import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

export default function UserProfile(props) {
  const deleteConfirmationDialog = useRef();
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addNewUserModal, setAddNewUserModal] = useState(false);
  const [addNewUserDetail, setAddNewUserDetail] = useState({
    boardingUID: "",
    employeeName: "",
    storeCode: "",
    storeName: "",
    designation: "",
    dateOfJoin: "Active",
    age: "",
    gender: "",
    mobileNumber: "",
    email: "",
    qualification: "",
    currentOrg: "",
    totalexperience: "",
    currentNetInhand: "",
    proposedNetInhand: "",
    budgate: "",
    replacementName: "",
    replacementCode: "",
    weeklyOff: "",
    shiftTiming: "",
    referredBy: "",
    managerName: "",
    createdBy: "",
    createdDate: "",
  });
  const [openViewUserDialog, setOpenViewUserDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(0);

  // const [data, setData] = useState([]);
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  console.log(User);
  // useEffect(() => {
  //   api
  //     .get("userManagement.js")
  //     .then((response) => {
  //       setUsers(response.data);
  //     })
  //     .catch((error) => {
  //       // error hanlding
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiPost("admin/getmanagernewonboardingrlist", {
          roleUID: User.roleUID,
          userUID: User.userUID,
        });
        {
        }

        setUsers(response.data.empDetails);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  /**
   * On Delete
   */
  const onDelete = (data) => {
    deleteConfirmationDialog.current.open();
    setSelectedUser(data);
  };

  /**
   * Delete User Permanently
   */
  const deleteUserPermanently = () => {
    let allUsers = users;
    let indexOfDeleteUser = allUsers.indexOf(selectedUser);
    allUsers.splice(indexOfDeleteUser, 1);
    deleteConfirmationDialog.current.close();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUsers(allUsers);
      setSelectedUser(null);
      NotificationManager.success("User Deleted!");
    }, 2000);
  };

  /**
   * Open Add New User Modal
   */
  const opnAddNewUserModal = (e) => {
    e.preventDefault();
    setAddNewUserModal(true);
  };

  /**
   * On Reload
   */
  const onReload = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  /**
   * On Select User
   */
  const onSelectUser = (user) => {
    user.checked = !user.checked;
    let selectedUsers = 0;
    let allUsers = users.map((userData) => {
      if (userData.checked) {
        selectedUsers++;
      }
      if (userData.id === user.id) {
        if (userData.checked) {
          selectedUsers++;
        }
        return user;
      } else {
        return userData;
      }
    });
    setUsers(allUsers);
    setSelectedUser(selectedUsers);
  };

  /**
   * On Change Add New User Details
   */
  const onChangeAddNewUserDetails = (key, value) => {
    setAddNewUserDetail({
      ...addNewUserDetail,
      [key]: value,
    });
  };

  /**
   * Add New User
   */
  // const addNewUser = () => {
  //   const { name, emailAddress } = addNewUserDetail;
  //   if (name !== "" && emailAddress !== "") {
  //     let allUsers = users;
  //     let newUser = {
  //       ...addNewUserDetail,
  //       id: new Date().getTime(),
  //     };
  //     allUsers.push(newUser);
  //     setAddNewUserModal(false);
  //     setLoading(true);

  //     setTimeout(() => {
  //       setLoading(false);
  //       setUsers(allUsers);
  //       NotificationManager.success("User Created!");
  //     }, 2000);
  //   }
  // };
  const history = useHistory();
  const addNewUser = async () => {
    const { name, emailAddress } = addNewUserDetail;
    if (name !== "" && emailAddress !== "") {
      try {
        const newUser = {
          ...addNewUserDetail,
          id: new Date().getTime(),
        };
        const response = await apiPost("onboarding", {
          employeename: newUser.employeeName,
          storecode: newUser.storeCode,
          storename: newUser.storeName,
          designation: newUser.designation,
          dateofjoin: newUser.dateOfJoin,
          age: newUser.age,
          gender: newUser.gender,
          mobileno: newUser.mobileNumber,
          emailid: newUser.email,
          qualification: newUser.qualification,
          currentorg: newUser.currentOrg,
          totalexperience: newUser.totalexperience,
          currentnet: newUser.currentNetInhand,
          proposednet: newUser.proposedNetInhand,
          budgate: newUser.budgate,
          replacementname: newUser.replacementName,
          replacementcode: newUser.replacementCode,
          weeklyoff: newUser.weeklyOff,
          shift: newUser.shiftTiming,
          referredby: newUser.referredBy,
          manager: newUser.managerName,
          roleUID: User.roleUID,
          userUID: User.userUID,
          status: 1,
        });
        if (!response.data.error) {
          NotificationManager.success("User Created!");
          history.push("/corporate/admin/onboard");
        } else {
          NotificationManager.error(response.data.errorMessage);
        }
      } catch (error) {
        console.error("Error adding new user", error);
      }
    }
  };

  /**
   * View User Detail Hanlder
   */
  const viewUserDetail = (data) => {
    setOpenViewUserDialog(true);
    setSelectedUser(data);
  };

  /**
   * On Edit User
   */
  const onEditUser = (user) => {
    setAddNewUserModal(true);
    setEditUser(user);
  };

  /**
   * On Add & Update User Modal Close
   */
  const onAddUpdateUserModalClose = () => {
    setAddNewUserModal(false);
    setEditUser(null);
  };
  const onViewUserModalClose = () => {
    setOpenViewUserDialog(false);
    setSelectedUser(null);
  };
  /**
   * On Update User Details
   */
  const onUpdateUserDetails = (key, value) => {
    setEditUser({
      ...editUser,
      [key]: value,
    });
  };

  /**
   * Update User
   */
  // const updateUser = () => {
  //   let indexOfUpdateUser = "";
  //   let allUsers = users;
  //   for (let i = 0; i < users.length; i++) {
  //     const user = users[i];
  //     if (user.id === editUser.id) {
  //       indexOfUpdateUser = i;
  //     }
  //   }
  //   allUsers[indexOfUpdateUser] = editUser;
  //   setLoading(true);
  //   setEditUser(null);
  //   setAddNewUserModal(false);
  //   setTimeout(() => {
  //     setUsers(allUsers);
  //     setLoading(false);
  //     NotificationManager.success("User Updated!");
  //   }, 2000);
  // };
  const updateUser = async () => {
    if (editUser) {
      try {
        const response = await apiPost("updateonboarding", {
          id: editUser.boardingUID,
          employeename: editUser.employeeName,
          storecode: editUser.storeCode,
          storename: editUser.storeName,
          designation: editUser.designation,
          dateofjoin: editUser.dateOfJoin,
          age: editUser.age,
          gender: editUser.gender,
          mobileno: editUser.mobileNumber,
          emailid: editUser.email,
          qualification: editUser.qualification,
          currentorg: editUser.currentOrg,
          totalexperience: editUser.totalexperience,
          currentnet: editUser.currentNetInhand,
          proposednet: editUser.proposedNetInhand,
          budgate: editUser.budgate,
          replacementname: editUser.replacementName,
          replacementcode: editUser.replacementCode,
          weeklyoff: editUser.weeklyOff,
          shift: editUser.shiftTiming,
          referredby: editUser.referredBy,
          manager: editUser.managerName,
          roleUID: User.roleUID,
          userUID: User.userUID,
          status: 1,
        });

        if (!response.data.error) {
          setEditUser(null);
          setAddNewUserModal(false);
          history.push("/corporate/admin/onboard");
          NotificationManager.success("User Updated!");
        } else {
          NotificationManager.error(response.data.errorMessage);
        }
      } catch (error) {
        console.error("Error updating user", error);
      }
    }
  };

  //Select All user
  const onSelectAllUser = (e) => {
    let selectAll = selectedUsers < users.length;
    if (selectAll) {
      let selectAllUsers = users.map((user) => {
        user.checked = true;
        return user;
      });
      setUsers(selectAllUsers);
      setSelectedUsers(selectAllUsers.length);
    } else {
      let unselectedUsers = users.map((user) => {
        user.checked = false;
        return user;
      });
      setSelectedUsers(0);
      setUsers(unselectedUsers);
    }
  };
  return (
    <div className="user-management">
      <Helmet>
        {/* <title>Reactify | Users Management</title>
        <meta name="description" content="Reactify Widgets" /> */}
      </Helmet>
      {/* <PageTitleBar
        title={<IntlMessages id="sidebar.userManagement" />}
        match={props.match}
      /> */}
      <RctCollapsibleCard fullBlock>
        <div className="table-responsive">
          <div className="d-flex justify-content-between py-20 px-10 border-bottom">
            <div>
              <h4 className="mt-0 header-title">
                List Of OnBoarding Employees
              </h4>
              {/* <a
                href="!#"
                onClick={(e) => onReload(e)}
                className="btn-outline-default mr-10"
              >
                <i className="ti-reload"></i>
              </a> */}
              {/* <a
                href="!#"
                onClick={(e) => e.preventDefault()}
                className="btn-outline-default mr-10"
              >
             
              </a> */}
            </div>
            <div>
              {/* <a
                href="!#"
                onClick={(e) => e.preventDefault()}
                className="btn-sm btn-outline-default mr-10"
              >
                Export to Excel
              </a> */}
              {/* <a
                href="!#"
                onClick={(e) => opnAddNewUserModal(e)}
                color="primary"
                className="caret btn-sm mr-10"
              >
                Add New onboarding <i className="zmdi zmdi-plus"></i>
              </a> */}
              <Button
                onClick={(e) => opnAddNewUserModal(e)}
                variant="contained"
                className="upgrade-btn tour-step-4 text-white"
                color="primary"
              >
                Add New onboarding
              </Button>
            </div>
          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                {/* <th className="w-5">
                  <FormControlLabel
                    control={
                      <Checkbox
                        indeterminate={
                          selectedUsers > 0 && selectedUsers < users.length
                        }
                        checked={selectedUsers > 0}
                        onChange={(e) => onSelectAllUser(e)}
                        value="all"
                        color="primary"
                      />
                    }
                    label="All"
                  />
                </th> */}
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Store Code</th>
                <th>Store Name</th>
                <th>Gender</th>
                <th>Email</th>
                {/* <th>Created By</th>
                <th>Created Date</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, key) => (
                  <tr key={key}>
                    {/* <td>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={user.checked}
                            onChange={() => onSelectUser(user)}
                            color="primary"
                          />
                        }
                      />
                    </td> */}
                    <td>{user.boardingUID}</td>
                    <td>{user.employeeName}</td>
                    <td>{user.storeCode}</td>
                    <td>{user.storeName}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    {/* <td>{user.createdUser}</td>
                    <td>{user.created_Date}</td> */}
                    <td className="list-action">
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => viewUserDetail(user)}
                      >
                        <i className="ti-eye"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => onEditUser(user)}
                      >
                        <i className="ti-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => onDelete(user)}
                      >
                        <i className="ti-close"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            {/* <tfoot className="border-top">
              <tr>
                <td colSpan="100%">
                  <Pagination className="mb-0 py-10 px-10">
                    <PaginationItem>
                      <PaginationLink
                        previous
                        href="!#"
                        onClick={(e) => e.preventDefault()}
                      />
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink
                        href="!#"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="!#"
                        onClick={(e) => e.preventDefault()}
                      >
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="!#"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        next
                        href="!#"
                        onClick={(e) => e.preventDefault()}
                      />
                    </PaginationItem>
                  </Pagination>
                </td>
              </tr>
            </tfoot> */}
          </table>
        </div>
        {loading}
      </RctCollapsibleCard>
      <DeleteConfirmationDialog
        ref={deleteConfirmationDialog}
        title="Are You Sure Want To Delete?"
        message="This will delete user permanently."
        onConfirm={() => deleteUserPermanently()}
      />
      <Modal
        isOpen={addNewUserModal}
        toggle={() => onAddUpdateUserModalClose()}
      >
        <ModalHeader toggle={() => onAddUpdateUserModalClose()}>
          {editUser === null
            ? "Talent Acquisition Form"
            : "Edit Talent Acquisition Details"}
        </ModalHeader>
        <ModalBody>
          {editUser === null ? (
            <AddNewUserForm
              addNewUserDetails={addNewUserDetail}
              onChangeAddNewUserDetails={onChangeAddNewUserDetails}
            />
          ) : (
            <UpdateUserForm
              user={editUser}
              onUpdateUserDetail={onUpdateUserDetails}
            />
          )}
        </ModalBody>
        <ModalFooter>
          {editUser === null ? (
            <Button
              variant="contained"
              className="text-white btn-success"
              onClick={() => addNewUser()}
            >
              Add
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="text-white"
              onClick={() => updateUser()}
            >
              Update
            </Button>
          )}{" "}
          <Button
            variant="contained"
            className="text-white btn-danger"
            onClick={() => onAddUpdateUserModalClose()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal toggle={() => onViewUserModalClose()} isOpen={openViewUserDialog}>
        <ModalHeader toggle={() => onViewUserModalClose()}>
          {selectedUser !== null ? "Talent Acquisition Details" : ""}
        </ModalHeader>
        <ModalBody>
          {selectedUser !== null && (
            <Form>
              <div className="row">
                <div className="col-xl-12">
                  <h4 className="mt-0 header-title">EMPLOYEE DETAILS</h4>
                </div>
              </div>
              <div className="row  mt-3">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Employee Name : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.employeeName}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Store Code : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.storeCode}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Store Name : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.storeName}</h4>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Designation : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.designation}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Date of Joining : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.dateOfJoin}</h4>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <hr></hr>
              <div className="row">
                <div className="col-xl-12">
                  <h4 className="mt-0 header-title">PERSONAL DETAILS </h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Age : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.age}</h4>
                    </Label>
                  </FormGroup>

                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Gender : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.gender}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Mobile Number : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.mobileNumber}</h4>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Qualification : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.qualification}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-6 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">
                        Personal Email ID :{" "}
                      </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.email}</h4>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <hr></hr>

              <div className="row">
                <div className="col-xl-12">
                  <h4 className="mt-0 header-title">JOB DETAILS </h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">
                        Current Organisation :{" "}
                      </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.currentOrg}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">
                        Total Years of Experience :{" "}
                      </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.totalexperience}</h4>
                    </Label>
                  </FormGroup>

                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">
                        Current Net Inhand :{" "}
                      </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.currentNetInhand}</h4>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">
                        Proposed Net Inhand :{" "}
                      </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.proposedNetInhand}</h4>
                    </Label>
                  </FormGroup>

                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Weekly Off : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.weeklyOff}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Shift Timing : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.shiftTiming}</h4>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">
                        Replacement/Non-Budget :{" "}
                      </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.budgate}</h4>
                    </Label>
                  </FormGroup>

                  {selectedUser.budgate === "Replacement" ? (
                    <FormGroup className="col-lg-4 d-flex">
                      <Label for="employeeName">
                        <h4 className="mt-0 header-title">
                          Replacement Code :{" "}
                        </h4>
                      </Label>
                      <Label for="employeeName" className="ml-3">
                        <h4>{selectedUser.replacementCode}</h4>
                      </Label>
                    </FormGroup>
                  ) : null}
                  {selectedUser.budgate === "Replacement" ? (
                    <FormGroup className="col-lg-4 d-flex">
                      <Label for="employeeName">
                        <h4 className="mt-0 header-title">
                          Replacement Name :{" "}
                        </h4>
                      </Label>
                      <Label for="employeeName" className="ml-3">
                        <h4>{selectedUser.replacementName}</h4>
                      </Label>
                    </FormGroup>
                  ) : null}
                </div>
              </div>
              <hr></hr>

              <div className="row">
                <div className="col-xl-12">
                  <h4 className="mt-0 header-title">OTHER DETAILS </h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-12 d-flex">
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Referred By : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.referredBy}</h4>
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-lg-4 d-flex">
                    <Label for="employeeName">
                      <h4 className="mt-0 header-title">Manager Name : </h4>
                    </Label>
                    <Label for="employeeName" className="ml-3">
                      <h4>{selectedUser.managerName}</h4>
                    </Label>
                  </FormGroup>
                </div>
              </div>
            </Form>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
