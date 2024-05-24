/**
 * Add New User Form
 */
import { useState } from "react";
import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import PhoneInput from "react-phone-input-2";

const AddNewUserForm = ({
  addNewUserDetails,
  onChangeAddNewUserDetails,
  isVisible,
}) => (
  <Form>
    <FormGroup>
      <label>
        Name <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        // onKeyPress={(e) => NameValidation(e)}
        value={addNewUserDetails.name}
        onChange={(e) => onChangeAddNewUserDetails("name", e.target.value)}
        placeholder="Enter your name"
        className="form-control"
        name="name"
        id="name"
        maxLength="50"
        min="3"
        tabIndex="1"
        required
      />
    </FormGroup>
    <FormGroup>
      <label>
        Parent's/Spouse Contact no <span className="inputImportantRed">*</span>
      </label>
      {/* <input
        type="text"
        value={addNewUserDetails.parentContactNo}
        onChange={(e) =>
          onChangeAddNewUserDetails("parentContactNo", e.target.value)
        }
        placeholder="Enter Store Code"
        className="form-control"
        name="storeCode"
        id="storeCode"
        tabIndex="1"
        required
      /> */}
      <PhoneInput
        country={"in"}
        value={addNewUserDetails.parentsContactNo}
        onChange={(e) =>
          onChangeAddNewUserDetails("parentsContactNo", e.target.value)
        }
      />
    </FormGroup>
    <FormGroup>
      <label>
        Permanent Address <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        value={addNewUserDetails.address}
        onChange={(e) => onChangeAddNewUserDetails("address", e.target.value)}
        className="form-control"
        maxLength="225"
        rows="1"
        placeholder="Enter your address"
        name="address"
        id="storeName"
        tabIndex="1"
        required
      />
    </FormGroup>
    <FormGroup>
      <label>
        Expected Date of Joining
        <span className="inputImportantRed"></span>
      </label>
      <input
        type="date"
        value={addNewUserDetails.expectedJoinDate}
        onChange={(e) =>
          onChangeAddNewUserDetails("expectedJoinDate", e.target.value)
        }
        // onKeyPress={(e) => AccountValidation(e)}
        placeholder="Enter your Expected Date"
        className="form-control"
        name="expect"
        id="expect"
        tabIndex="16"
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="accountNumber">
        Account No <span className="inputImportantRed">*</span>
      </Label>
      <input
        type="text"
        value={addNewUserDetails.accountNumber}
        onChange={(e) =>
          onChangeAddNewUserDetails("accountNumber", e.target.value)
        }
        // onKeyPress={(e) => AccountValidation(e)}
        placeholder="Enter your savings account number"
        className="form-control"
        name="accountNumber"
        id="accountNumber"
        tabIndex="13"
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="func">
        Function<span className="inputImportantRed">*</span>
      </Label>
      <select
        className="form-control"
        name="func"
        value={addNewUserDetails.func}
        onChange={(e) => onChangeAddNewUserDetails("func", e.target.value)}
        tabIndex="11"
        required
      >
        <option value="">Select</option>
        <option value="store">Store</option>
        <option value="Head Office">Head Office</option>
      </select>
    </FormGroup>
    <FormGroup>
      <Label for="dateofBirth">
        Date of birth<span className="inputImportantRed">*</span>
      </Label>
      <input
        type="date"
        value={addNewUserDetails.dateofBirth}
        onChange={(e) =>
          onChangeAddNewUserDetails("dateofBirth", e.target.value)
        }
        className="form-control"
        placeholder="2017-06-04"
        id="dateofBirth"
        name="dateofBirth"
        tabIndex="2"
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="mobileNumber">
        Mobile number<span className="inputImportantRed">*</span>
      </Label>
      <input
        type="text"
        // onKeyPress={(e) => mobile(e)}
        minLength={10}
        maxLength={10}
        value={addNewUserDetails.mobileNumber}
        onChange={(e) =>
          onChangeAddNewUserDetails("mobileNumber", e.target.value)
        }
        placeholder="Enter your Mobile Number"
        className="form-control"
        name="mobileNumber"
        id="mobileNumber"
        tabIndex="1"
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="email">
        Pan Card no<span className="inputImportantRed">*</span>
      </Label>
      <input
        type="text"
        onkeypress="return (event.charCode > 47 && event.charCode < 58)"
        // onKeyUp={panKeyUp}
        value={addNewUserDetails.pan}
        onChange={(e) => onChangeAddNewUserDetails("pan", e.target.value)}
        // onBlur={panOnBlur}
        // placeholder={panCardNoPlaceHolder}
        className="form-control"
        name="pan"
        minLength="10"
        maxLength="10"
        tabIndex="5"
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="qualification">Current Organisation</Label>
      <input
        type="text"
        value={addNewUserDetails.previousExperience}
        onChange={(e) =>
          onChangeAddNewUserDetails("previousExperience", e.target.value)
        }
        // onKeyPress={(event) => exp(event)}
        placeholder="Enter your current organisation"
        className="form-control"
        name="previousExperience"
        tabIndex="8"
      />
    </FormGroup>
    {/* <FormGroup>
      <Label for="state">
        State <span className="inputImportantRed">*</span>
      </Label>
      <select
        className="form-control"
        name="state"
        value={addNewUserDetails.state}
        onChange={(e) => onChangeAddNewUserDetails("state", e.target.value)}
        tabIndex="11"
        required
      >
        <option value="">Select</option>
        {stateList.map((e, key) => {
          return (
            <option key={key} value={e.stateUID}>
              {e.stateName}
            </option>
          );
        })}
      </select>
    </FormGroup>
    <FormGroup>
      <label>
        IFSC Code <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter your bank IFSc code"
        className="form-control"
        name="ifscCode"
        value={addNewUserDetails.ifscCode}
        onChange={(e) => onChangeAddNewUserDetails("ifscCode", e.target.value)}
        onKeyPress={(e) => ifscCode(e)}
        tabIndex="14"
        required
      />
    </FormGroup>

    <FormGroup>
      <label>
        Video Upload <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter your bank IFSc code"
        className="form-control"
        name="ifscCode"
        value={addNewUserDetails.ifscCode}
        onChange={(e) => onChangeAddNewUserDetails("ifscCode", e.target.value)}
        onKeyPress={(e) => ifscCode(e)}
        tabIndex="14"
        required
      />
    </FormGroup>
    <FormGroup>
      <label>
        IFSC Code <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter your bank IFSc code"
        className="form-control"
        name="ifscCode"
        value={addNewUserDetails.ifscCode}
        onChange={(e) => onChangeAddNewUserDetails("ifscCode", e.target.value)}
        onKeyPress={(e) => ifscCode(e)}
        tabIndex="14"
        required
      />
    </FormGroup>
    <FormGroup>
      <label>
        IFSC Code <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter your bank IFSc code"
        className="form-control"
        name="ifscCode"
        value={addNewUserDetails.ifscCode}
        onChange={(e) => onChangeAddNewUserDetails("ifscCode", e.target.value)}
        onKeyPress={(e) => ifscCode(e)}
        tabIndex="14"
        required
      />
    </FormGroup>
    <FormGroup>
      <label>
        IFSC Code <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter your bank IFSc code"
        className="form-control"
        name="ifscCode"
        value={addNewUserDetails.ifscCode}
        onChange={(e) => onChangeAddNewUserDetails("ifscCode", e.target.value)}
        onKeyPress={(e) => ifscCode(e)}
        tabIndex="14"
        required
      />
    </FormGroup>
    <FormGroup>
      <label>
        IFSC Code <span className="inputImportantRed">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter your bank IFSc code"
        className="form-control"
        name="ifscCode"
        value={addNewUserDetails.ifscCode}
        onChange={(e) => onChangeAddNewUserDetails("ifscCode", e.target.value)}
        onKeyPress={(e) => ifscCode(e)}
        tabIndex="14"
        required
      />
    </FormGroup> */}
  </Form>
);

export default AddNewUserForm;
