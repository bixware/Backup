// /**
//  * Update User Details Form
//  */
// import React from "react";
// import { Form, FormGroup, Label, Input } from "reactstrap";

// const NameValidation = (event) => {
//   //accept alphabets only
//   if (
//     !(
//       (event.charCode > 64 && event.charCode < 91) ||
//       (event.charCode > 96 && event.charCode < 123) ||
//       event.charCode == 32 ||
//       event.charCode == 46
//     )
//   ) {
//     event.preventDefault();
//   }
// };

// const qualificationValidation = (event) => {
//   //accept alphabets only
//   if (
//     !(
//       (event.charCode > 64 && event.charCode < 91) ||
//       (event.charCode > 96 && event.charCode < 123) ||
//       event.charCode == 32 ||
//       event.charCode == 46 ||
//       event.charCode == 44
//     )
//   ) {
//     event.preventDefault();
//   }
// };
// const mobile = (event) => {
//   //accept alphabets only
//   if (!(event.charCode > 47 && event.charCode < 58)) {
//     event.preventDefault();
//   }
// };

// const current = (event) => {
//   //accept alphabets only
//   if (!(event.charCode > 47 && event.charCode < 58)) {
//     event.preventDefault();
//   }
// };
// const Age = (event) => {
//   //accept alphabets only
//   if (!(event.charCode > 47 && event.charCode < 58)) {
//     event.preventDefault();
//   }
// };

// const UpdateUserForm = ({ user, onUpdateUserDetail, isVisible }) => (
//   <Form>
//     <FormGroup>
//       <Label for="name">
//         Name<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         onKeyPress={(e) => NameValidation(e)}
//         value={user.name}
//         onChange={(e) => onUpdateUserDetail("name", e.target.value)}
//         placeholder="Enter your Name"
//         className="form-control"
//         name="name"
//         id="name"
//         tabIndex="1"
//         maxLength="50"
//         min="3"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="parentsContactNo">
//         Parent's/Spouse Contact no<span className="inputImportantRed">*</span>
//       </Label>
//       <PhoneInput
//         country={"in"}
//         value={user.parentsContactNo}
//         onChange={(e) => onUpdateUserDetail("parentsContactNo", e.target.value)}
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="address">
//         Permanent Address<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         value={user.address}
//         onChange={(e) => onUpdateUserDetail("address", e.target.value)}
//         className="form-control"
//         maxLength="225"
//         rows="1"
//         placeholder="Enter your address"
//         name="address"
//         id="address"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="expectedJoinDate">
//         Expected Date of Joining<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         value={user.expectedJoinDate}
//         onChange={(e) => onUpdateUserDetail("expectedJoinDate", e.target.value)}
//         placeholder="Enter your Expected Date"
//         className="form-control"
//         name="expectedJoinDate"
//         id="expectedJoinDate"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="accountNumber">
//         Account No <span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="date"
//         value={user.accountNumber}
//         onChange={(e) => onUpdateUserDetail("accountNumber", e.target.value)}
//         className="form-control"
//         placeholder="Enter your savings account number"
//         id="accountNumber"
//         name="accountNumber"
//         tabIndex="13"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="func">
//         Function<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         value={user.func}
//         onChange={(e) => onUpdateUserDetail("func", e.target.value)}
//         placeholder="Enter your Function"
//         className="form-control"
//         name="func"
//         id="func"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="dateofBirth">
//         Date of birth<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         className="form-control"
//         placeholder="2017-06-04"
//         id="dateofBirth"
//         name="dateofBirth"
//         value={user.dateofBirth}
//         onChange={(e) => onUpdateUserDetail("dateofBirth", e.target.value)}
//         tabIndex="11"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="mobileNumber">
//         Mobile number<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         onKeyPress={(e) => mobile(e)}
//         minLength={10}
//         maxLength={10}
//         value={user.mobileNumber}
//         onChange={(e) => onUpdateUserDetail("mobileNumber", e.target.value)}
//         placeholder="Enter your Mobile Number"
//         className="form-control"
//         name="mobileNumber"
//         id="mobileNumber"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="email">
//         PERSONAL EMAIL ID<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         value={user.emailid}
//         onChange={(e) => onUpdateUserDetail("email", e.target.value)}
//         placeholder="Enter your Personal Email ID"
//         className="form-control"
//         name="email"
//         id="email"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="qualification">
//         QUALIFICATION<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         onKeyPress={(e) => qualificationValidation(e)}
//         value={user.qualification}
//         onChange={(e) => onUpdateUserDetail("qualification", e.target.value)}
//         placeholder="Enter your Qualification"
//         className="form-control"
//         name="qualification"
//         id="qualification"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="currentOrg">
//         CURRENT ORGANISATION<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         value={user.currentOrg}
//         onChange={(e) => onUpdateUserDetail("currentOrg", e.target.value)}
//         placeholder="Enter Current Organisation"
//         className="form-control"
//         name="currentOrg"
//         id="currentOrg"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="totalexperience">
//         TOTAL YEARS OF EXPERIENCE<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         value={user.totalexperience}
//         onChange={(e) => onUpdateUserDetail("totalexperience", e.target.value)}
//         placeholder="Enter total years of experience"
//         className="form-control"
//         name="totalexperience"
//         id="totalexperience"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="currentNetInhand">
//         CURRENT NET INHAND<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         onKeyPress={(e) => current(e)}
//         value={user.currentNetInhand}
//         onChange={(e) => onUpdateUserDetail("currentNetInhand", e.target.value)}
//         placeholder="Enter Current Net Inhand"
//         className="form-control"
//         name="currentNetInhand"
//         id="currentNetInhand"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="proposedNetInhand">
//         PROPOSED NET INHAND<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         onKeyPress={(e) => current(e)}
//         value={user.proposedNetInhand}
//         onChange={(e) =>
//           onUpdateUserDetail("proposedNetInhand", e.target.value)
//         }
//         placeholder="Enter Proposed Net Inhand"
//         className="form-control"
//         name="proposedNetInhand"
//         id="proposedNetInhand"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="budgate">
//         REPLACEMENT/NON-BUDGET<span className="inputImportantRed">*</span>
//       </Label>
//       <select
//         className="form-control"
//         name="budgate"
//         value={user.budgate}
//         onChange={(e) => onUpdateUserDetail("budgate", e.target.value)}
//         tabIndex="11"
//         required
//       >
//         <option value="">Select Replacement/Non-Budget</option>
//         <option value="Replacement">Replacement</option>
//         <option value="Non-Budget">Non-Budget</option>
//       </select>
//     </FormGroup>
//     {isVisible && (
//       <FormGroup>
//         <Label for="replacementCode">
//           REPLACEMENT EMPLOYEE CODE<span className="inputImportantRed">*</span>
//         </Label>
//         <input
//           type="text"
//           value={user.replacementCode}
//           onChange={(e) =>
//             onUpdateUserDetail("replacementCode", e.target.value)
//           }
//           placeholder="Replacement Employee Code"
//           className="form-control"
//           name="replacementCode"
//           id="replacementCode"
//           tabIndex="1"
//         />
//       </FormGroup>
//     )}
//     {isVisible && (
//       <FormGroup>
//         <Label for="replacementName">
//           REPLACEMENT EMPLOYEE NAME<span className="inputImportantRed">*</span>
//         </Label>
//         <input
//           type="text"
//           value={user.replacementName}
//           onChange={(e) =>
//             onUpdateUserDetail("replacementName", e.target.value)
//           }
//           placeholder="Replacement Employee Name"
//           className="form-control"
//           name="replacementName"
//           id="replacementName"
//           tabIndex="1"
//         />
//       </FormGroup>
//     )}
//     <FormGroup>
//       <Label for="weeklyOff">
//         WEEKLY OFF<span className="inputImportantRed">*</span>
//       </Label>
//       <select
//         className="form-control"
//         name="weeklyOff"
//         value={user.weeklyOff}
//         onChange={(e) => onUpdateUserDetail("weeklyOff", e.target.value)}
//         tabIndex="11"
//         required
//       >
//         <option value="">Select Weekly Off</option>
//         <option value="Monday">Monday</option>
//         <option value="Tuesday">Tuesday</option>
//         <option value="Wednesday">Wednesday</option>
//         <option value="Thursday">Thursday</option>
//         <option value="Friday">Friday</option>
//         <option value="Saturday">Saturday</option>
//         <option value="Sunday">Sunday</option>
//       </select>
//     </FormGroup>
//     <FormGroup>
//       <Label for="shiftTiming">
//         SHIFT TIMING<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         value={user.shiftTiming}
//         onChange={(e) => onUpdateUserDetail("shiftTiming", e.target.value)}
//         placeholder="Enter your Shift Timing"
//         className="form-control"
//         name="shiftTiming"
//         id="shiftTiming"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="referredBy">
//         REFERRED BY<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         onKeyPress={(e) => NameValidation(e)}
//         value={user.referredBy}
//         onChange={(e) => onUpdateUserDetail("referredBy", e.target.value)}
//         placeholder="Enter Referred By"
//         className="form-control"
//         name="referredBy"
//         id="referredBy"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="managerName">
//         MANAGER NAME<span className="inputImportantRed">*</span>
//       </Label>
//       <input
//         type="text"
//         onKeyPress={(e) => NameValidation(e)}
//         value={user.managerName}
//         onChange={(e) => onUpdateUserDetail("managerName", e.target.value)}
//         placeholder="Enter Manager Name"
//         className="form-control"
//         name="managerName"
//         id="managerName"
//         tabIndex="1"
//         required
//       />
//     </FormGroup>
//   </Form>
// );

// export default UpdateUserForm;
