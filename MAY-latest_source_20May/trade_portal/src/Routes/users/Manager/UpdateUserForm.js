/**
 * Update User Details Form
 */
import React from "react";
import { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const NameValidation = (event) => {
  //accept alphabets only
  if (
    !(
      (event.charCode > 64 && event.charCode < 91) ||
      (event.charCode > 96 && event.charCode < 123) ||
      event.charCode == 32 ||
      event.charCode == 46
    )
  ) {
    event.preventDefault();
  }
};

const qualificationValidation = (event) => {
  //accept alphabets only
  if (
    !(
      (event.charCode > 64 && event.charCode < 91) ||
      (event.charCode > 96 && event.charCode < 123) ||
      event.charCode == 32 ||
      event.charCode == 46 ||
      event.charCode == 44
    )
  ) {
    event.preventDefault();
  }
};
const mobile = (event) => {
  //accept alphabets only
  if (!(event.charCode > 47 && event.charCode < 58)) {
    event.preventDefault();
  }
};

const current = (event) => {
  //accept alphabets only
  if (!(event.charCode > 47 && event.charCode < 58)) {
    event.preventDefault();
  }
};
const Age = (event) => {
  //accept alphabets only
  if (!(event.charCode > 47 && event.charCode < 58)) {
    event.preventDefault();
  }
};

const UpdateUserForm = ({ user, onUpdateUserDetail, isVisible }) => {
  const [isReplacementVisible, setIsReplacementVisible] = useState(true);

  const changeHandler = (e) => {
    onUpdateUserDetail("budgate", e.target.value);
    if (e.target.value === "Replacement") {
      setIsReplacementVisible(true);
    } else {
      setIsReplacementVisible(false);
    }
  };
  return (
    <Form>
      <div className="row">
        <div className="col-xl-12">
          <h4 className="mt-0 header-title">EMPLOYEE DETAILS</h4>
        </div>
      </div>
      <div className="row  mt-3">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="employeeName">
              EMPLOYEE NAME<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => NameValidation(e)}
              value={user.employeeName}
              onChange={(e) =>
                onUpdateUserDetail("employeeName", e.target.value)
              }
              placeholder="Enter your Name"
              className="form-control"
              name="employeeName"
              id="employeeName"
              tabIndex="1"
              required
            />
          </FormGroup>
          <FormGroup className="col-lg-4">
            <Label for="storeCode">
              STORE CODE<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              value={user.storeCode}
              onChange={(e) => onUpdateUserDetail("storeCode", e.target.value)}
              placeholder="Enter Store Code"
              className="form-control"
              name="storeCode"
              id="storeCode"
              tabIndex="1"
              required
            />
          </FormGroup>

          <FormGroup className="col-lg-4">
            <Label for="storeName">
              STORE NAME<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              value={user.storeName}
              onChange={(e) => onUpdateUserDetail("storeName", e.target.value)}
              placeholder="Enter Store Name"
              className="form-control"
              name="storeName"
              id="storeName"
              tabIndex="1"
              required
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="designation">
              Designation<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              value={user.designation}
              onChange={(e) =>
                onUpdateUserDetail("designation", e.target.value)
              }
              placeholder="Enter Designation"
              className="form-control"
              name="designation"
              id="designation"
              tabIndex="1"
              required
            />
          </FormGroup>
          <FormGroup className="col-lg-4">
            <Label for="dateOfJoin">
              DATE OF JOINING <span className="inputImportantRed">*</span>
            </Label>
            <input
              type="date"
              value={user.dateOfJoin}
              onChange={(e) => onUpdateUserDetail("dateOfJoin", e.target.value)}
              className="form-control"
              placeholder="2017-06-04"
              id="dateOfJoin"
              name="dateOfJoin"
              tabIndex="2"
              required
            />
          </FormGroup>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <h4 className="mt-0 header-title">Personal Details </h4>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="age">
              Age<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => Age(e)}
              minLength={2}
              maxLength={2}
              value={user.age}
              onChange={(e) => onUpdateUserDetail("age", e.target.value)}
              placeholder="Enter your Age"
              className="form-control"
              name="age"
              id="age"
              tabIndex="1"
              required
            />
          </FormGroup>

          <FormGroup className="col-lg-4">
            <Label for="gender">
              Gender<span className="inputImportantRed">*</span>
            </Label>
            <select
              className="form-control"
              name="gender"
              value={user.gender}
              onChange={(e) => onUpdateUserDetail("gender", e.target.value)}
              tabIndex="11"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </FormGroup>
          <FormGroup className="col-lg-4">
            <Label for="mobileNumber">
              Mobile number<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => mobile(e)}
              minLength={10}
              maxLength={10}
              value={user.mobileNumber}
              onChange={(e) =>
                onUpdateUserDetail("mobileNumber", e.target.value)
              }
              placeholder="Enter your Mobile Number"
              className="form-control"
              name="mobileNumber"
              id="mobileNumber"
              tabIndex="1"
              required
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="email">
              PERSONAL EMAIL ID<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              value={user.emailid}
              onChange={(e) => onUpdateUserDetail("email", e.target.value)}
              placeholder="Enter your Personal Email ID"
              className="form-control"
              name="email"
              id="email"
              tabIndex="1"
              required
            />
          </FormGroup>

          <FormGroup className="col-lg-4">
            <Label for="qualification">
              QUALIFICATION<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => qualificationValidation(e)}
              value={user.qualification}
              onChange={(e) =>
                onUpdateUserDetail("qualification", e.target.value)
              }
              placeholder="Enter your Qualification"
              className="form-control"
              name="qualification"
              id="qualification"
              tabIndex="1"
              required
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <h4 className="mt-0 header-title">JOB DETAILS </h4>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="currentOrg">
              CURRENT ORGANISATION<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              value={user.currentOrg}
              onChange={(e) => onUpdateUserDetail("currentOrg", e.target.value)}
              placeholder="Enter Current Organisation"
              className="form-control"
              name="currentOrg"
              id="currentOrg"
              tabIndex="1"
              required
            />
          </FormGroup>
          <FormGroup className="col-lg-4">
            <Label for="totalexperience">
              TOTAL YEARS OF EXPERIENCE
              <span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              value={user.totalexperience}
              onChange={(e) =>
                onUpdateUserDetail("totalexperience", e.target.value)
              }
              placeholder="Enter total years of experience"
              className="form-control"
              name="totalexperience"
              id="totalexperience"
              tabIndex="1"
              required
            />
          </FormGroup>

          <FormGroup className="col-lg-4">
            <Label for="currentNetInhand">
              CURRENT NET INHAND<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => current(e)}
              value={user.currentNetInhand}
              onChange={(e) =>
                onUpdateUserDetail("currentNetInhand", e.target.value)
              }
              placeholder="Enter Current Net Inhand"
              className="form-control"
              name="currentNetInhand"
              id="currentNetInhand"
              tabIndex="1"
              required
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="proposedNetInhand">
              PROPOSED NET INHAND<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => current(e)}
              value={user.proposedNetInhand}
              onChange={(e) =>
                onUpdateUserDetail("proposedNetInhand", e.target.value)
              }
              placeholder="Enter Proposed Net Inhand"
              className="form-control"
              name="proposedNetInhand"
              id="proposedNetInhand"
              tabIndex="1"
              required
            />
          </FormGroup>

          <FormGroup className="col-lg-4">
            <Label for="weeklyOff">
              WEEKLY OFF<span className="inputImportantRed">*</span>
            </Label>
            <select
              className="form-control"
              name="weeklyOff"
              value={user.weeklyOff}
              onChange={(e) => onUpdateUserDetail("weeklyOff", e.target.value)}
              tabIndex="11"
              required
            >
              <option value="">Select Weekly Off</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </FormGroup>
          <FormGroup className="col-lg-4">
            <Label for="shiftTiming">
              SHIFT TIMING<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              value={user.shiftTiming}
              onChange={(e) =>
                onUpdateUserDetail("shiftTiming", e.target.value)
              }
              placeholder="Enter your Shift Timing"
              className="form-control"
              name="shiftTiming"
              id="shiftTiming"
              tabIndex="1"
              required
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="budgate">
              REPLACEMENT/NON-BUDGET<span className="inputImportantRed">*</span>
            </Label>
            <select
              className="form-control"
              name="budgate"
              value={user.budgate}
              // onChange={(e) => onUpdateUserDetail("budgate", e.target.value)}
              onChange={changeHandler}
              tabIndex="11"
              required
            >
              <option value="">Select Replacement/Non-Budget</option>
              <option value="Replacement">Replacement</option>
              <option value="Non-Budget">Non-Budget</option>
            </select>
          </FormGroup>

          {isReplacementVisible && user.budgate === "Replacement" ? (
            <FormGroup className="col-lg-4">
              <Label for="replacementCode">
                REPLACEMENT EMPLOYEE CODE
                <span className="inputImportantRed">*</span>
              </Label>
              <input
                type="text"
                value={user.replacementCode}
                onChange={(e) =>
                  onUpdateUserDetail("replacementCode", e.target.value)
                }
                placeholder="Replacement Employee Code"
                className="form-control"
                name="replacementCode"
                id="replacementCode"
                tabIndex="1"
              />
            </FormGroup>
          ) : null}
          {isReplacementVisible && user.budgate === "Replacement" ? (
            <FormGroup className="col-lg-4">
              <Label for="replacementName">
                REPLACEMENT EMPLOYEE NAME
                <span className="inputImportantRed">*</span>
              </Label>
              <input
                type="text"
                value={user.replacementName}
                onChange={(e) =>
                  onUpdateUserDetail("replacementName", e.target.value)
                }
                placeholder="Replacement Employee Name"
                className="form-control"
                name="replacementName"
                id="replacementName"
                tabIndex="1"
              />
            </FormGroup>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <h4 className="mt-0 header-title">OTHER DETAILS </h4>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12 d-flex">
          <FormGroup className="col-lg-4">
            <Label for="referredBy">
              REFERRED BY<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => NameValidation(e)}
              value={user.referredBy}
              onChange={(e) => onUpdateUserDetail("referredBy", e.target.value)}
              placeholder="Enter Referred By"
              className="form-control"
              name="referredBy"
              id="referredBy"
              tabIndex="1"
              required
            />
          </FormGroup>
          <FormGroup className="col-lg-4">
            <Label for="managerName">
              MANAGER NAME<span className="inputImportantRed">*</span>
            </Label>
            <input
              type="text"
              onKeyPress={(e) => NameValidation(e)}
              value={user.managerName}
              onChange={(e) =>
                onUpdateUserDetail("managerName", e.target.value)
              }
              placeholder="Enter Manager Name"
              className="form-control"
              name="managerName"
              id="managerName"
              tabIndex="1"
              required
            />
          </FormGroup>
        </div>
      </div>
    </Form>
  );
};

export default UpdateUserForm;
