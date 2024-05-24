// /**
//  * Signin Firebase
//  */

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, AppBar, Toolbar } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { Form, FormGroup, Input } from "reactstrap";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import QueueAnim from "rc-queue-anim";
// import { Fab } from "@material-ui/core";
// import { apiPost, setLoggedInuser } from "../Api/apiCommon";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// // import { useNavigate } from "react-router-dom";
// // components
// import { SessionSlider } from "Components/Widgets";

// // app config
// import AppConfig from "Constants/AppConfig";

// // redux action
// import {
//   signinUserInFirebase,
//   signinUserWithFacebook,
//   signinUserWithGoogle,
//   signinUserWithGithub,
//   signinUserWithTwitter,
// } from "Store/Actions";
// import { useRef } from "react";

// //Auth File
// import Auth from "Auth/Auth";
// import logo from "../Assets/img/sapphire-logo.png";

// const auth = new Auth();

// function Signin(props) {
//   //const navigate = useNavigate();
//   // const [email, setEmail] = useState("demo@example.com");
//   // const [password, setPassword] = useState("test#123");
//   // const dispatch = useDispatch();
//   // const loading = useSelector((state) => state.loading);

//   /**
//    * On User Login
//    */
//   // const onUserLogin = () => {
//   //   if (email !== "" && password !== "") {
//   //     dispatch(signinUserInFirebase({ email, password }, props.history));
//   //   }
//   // };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [data, setData] = useState("");
//   const dispatch = useDispatch();
//   const [message, setMessage] = useState("");
//   const [isMsgShow, setIsMsgShow] = useState(false);
//   const [MsgType, setMsgType] = useState("alert alert-success");
//   const history = useHistory();
//   const loading = useSelector((state) => state.loading);

//   const [emailMssage, setEmailMssage] = useState("");
//   const [emailErrorVisible, setEmailErrorVisible] = useState("none");
//   const [passwordMssage, setpasswordMssage] = useState(false);
//   const [passwordErrorVisible, setpasswordErrorVisible] = useState("none");
//   const inputRef = useRef(null);

//   const onUserLogin = async (event) => {
//     event.preventDefault();

//     // Client-side validation
//     if (!email) {
//       setEmailErrorVisible("block");
//       setEmailMssage("Please enter an email.");
//       return;
//     }

//     if (!password) {
//       setpasswordErrorVisible("block");
//       setpasswordMssage("Please enter a password.");
//       return;
//     }

//     try {
//       // API call for login
//       const response = await apiPost("/login", {
//         email: email,
//         password: password,
//       });

//       if (response) {
//         if (response.data.message === "Success") {
//           if (response.data.data.User) {
//             setLoggedInuser(response.data.data.User, response.data.data.token);

//             if (response.data.data.User.roleUID === "1") {
//               history.push("/app/crm/role");
//             } else {
//               let workflowUsers =
//                 response.data.data.User.get_work_flow_statge_user;
//               let initiator = false;
//               let approval = false;
//               let dataEntry = false;
//               workflowUsers.forEach((item, i) => {
//                 if (parseInt(item.stageNo) === 1) {
//                   initiator = true;
//                 }
//                 if (
//                   parseInt(item.stageNo) <
//                     parseInt(item.work_flow.noOfStage) - 1 &&
//                   parseInt(item.stageNo) !== 1
//                 ) {
//                   approval = true;
//                 }
//                 if (
//                   parseInt(item.stageNo) ===
//                   parseInt(item.work_flow.noOfStage) - 1
//                 ) {
//                   dataEntry = true;
//                 }
//               });
//               if (
//                 initiator === true &&
//                 approval !== true &&
//                 dataEntry !== true
//               ) {
//                 history.push("/app/user/workflow");
//               } else if (
//                 initiator !== true &&
//                 approval === true &&
//                 dataEntry !== true
//               ) {
//                 history.push("/app/user/approvallist");
//               } else if (
//                 initiator !== true &&
//                 approval !== true &&
//                 dataEntry === true
//               ) {
//                 history.push("/app/user/dataentrylist");
//               }
//             }
//           } else {
//             setMsgType("alert alert-danger");
//             setMessage(response.data.data.error);
//             setIsMsgShow(true);
//           }
//         }
//       } else {
//         setMsgType("alert alert-danger");
//         setMessage(response.data.data.error);
//         setIsMsgShow(true);
//       }
//     } catch (error) {
//       setMsgType("alert alert-danger");
//       setMessage("Something went wrong, Please try again later");
//       setIsMsgShow(true);
//       console.error("Error during login:", error);
//     }
//   };
//   /**
//    * On User Sign Up
//    */
//   const onUserSignUp = () => {
//     props.history.push("/signup");
//   };

//   //Auth0 Login
//   const loginAuth0 = () => {
//     auth.login();
//   };

//   const focusInput = () => {
//     // Access the input element using the ref
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   return (
//     <QueueAnim type="bottom" duration={2000}>
//       <div
//         className="rct-session-wrapper"
//         // style={{
//         //   // background: "linear-gradient(0deg, #240B36 0%, #C31432 100%)",
//         //   backgroundImage: "../../public/bg.png",
//         // }}
//       >
//         {loading && <LinearProgress />}
//         <AppBar position="static" className="session-header">
//           <Toolbar>
//             <div className="container">
//               <div className="d-flex justify-content-between">
//                 {/* <div className="session-logo">
//                    <Link to="/">
//                      <img
//                        src={AppConfig.appLogo}
//                        alt="session-logo"
//                        className="img-fluid"
//                        width="110"
//                        height="35"
//                      />
//                    </Link>
//                  </div> */}
//                 {/* <div>
//                    <a
//                      href="!#"
//                      className="mr-15 text-white"
//                      onClick={onUserSignUp}
//                    >
//                      Create New account?
//                    </a>
//                    <Button
//                      variant="contained"
//                      className="btn-light"
//                      onClick={onUserSignUp}
//                    >
//                      Sign Up
//                    </Button>
//                  </div> */}
//               </div>
//             </div>
//           </Toolbar>
//         </AppBar>
//         <div className="session-inner-wrapper">
//           <div className="container">
//             <div className="row row-eq-height">
//               <div className="col-sm-12 col-md-12 col-lg-6 mx-auto">
//                 <div
//                   className="session-body text-center"
//                   // style={{
//                   //   background:
//                   //     "linear-gradient(to top, #24243e, #302b63, #0f0c29)",
//                   // }}
//                 >
//                   <div className="session-head mb-30">
//                     <h2 className="font-weight-bold">
//                       <a href="#" className="logo logo-admin">
//                         <img
//                           // src={`https://www.sapphirefoods.in/storage/app/media/sapphire-logo.png`}
//                           src={logo}
//                           height="60"
//                           alt="logo"
//                         />
//                       </a>
//                     </h2>
//                   </div>
//                   <div
//                     className={MsgType}
//                     id="successmsg"
//                     style={{ display: isMsgShow ? "block" : "none" }}
//                   >
//                     {message}
//                   </div>
//                   <Form>
//                     <FormGroup className="has-wrapper">
//                       <Input
//                         type="mail"
//                         // value={email}
//                         name="user-mail"
//                         id="user-mail"
//                         ref={inputRef}
//                         className="has-input input-lg"
//                         placeholder="Enter Email Address"
//                         onChange={() => focusInput()}
//                         required
//                       />
//                       <span className="has-icon">
//                         <i className="ti-email"></i>
//                       </span>
//                       <div
//                         className="inputImportantRed"
//                         id="emailprint-error-msg-red"
//                         style={{ display: emailErrorVisible, color: "red" }}
//                       >
//                         {emailMssage}
//                       </div>
//                     </FormGroup>
//                     <FormGroup className="has-wrapper">
//                       <Input
//                         value={password}
//                         type="Password"
//                         name="user-pwd"
//                         id="pwd"
//                         className="has-input input-lg"
//                         placeholder="Enter your Password"
//                         onChange={(event) => setPassword(event.target.value)}
//                         required
//                       />
//                       <span className="has-icon">
//                         <i className="ti-lock"></i>
//                       </span>
//                       <div
//                         className="inputImportantRed"
//                         id="emailprint-error-msg-red"
//                         style={{ display: passwordErrorVisible, color: "red" }}
//                       >
//                         {passwordMssage}
//                       </div>
//                     </FormGroup>
//                     <FormGroup className="mb-15">
//                       <Button
//                         color="primary"
//                         className="btn-warning btn-block text-white w-100 font-weight-bold"
//                         variant="contained"
//                         size="large"
//                         onClick={onUserLogin}
//                         required
//                       >
//                         Login
//                       </Button>
//                     </FormGroup>
//                   </Form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </QueueAnim>
//   );
// }

// export default Signin;
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import QueueAnim from "rc-queue-anim";
import { Fab } from "@material-ui/core";
import { apiPost, setLoggedInuser } from "../Api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Auth from "Auth/Auth";
import logo from "../Assets/img/sapphire-logo.png";

const auth = new Auth();

function Signin(props) {
  const [message, setMessage] = useState("");
  const [isMsgShow, setIsMsgShow] = useState(false);
  const [MsgType, setMsgType] = useState("alert alert-success");
  const history = useHistory();
  const loading = useSelector((state) => state.loading);

  const [emailMssage, setEmailMssage] = useState("");
  const [emailErrorVisible, setEmailErrorVisible] = useState("none");
  const [passwordMssage, setpasswordMssage] = useState(false);
  const [passwordErrorVisible, setpasswordErrorVisible] = useState("none");
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const onUserLogin = async (event) => {
    event.preventDefault();

    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;

    // Client-side validation
    if (!email) {
      setEmailErrorVisible("block");
      setEmailMssage("Please enter an email.");
      return;
    }

    if (!password) {
      setpasswordErrorVisible("block");
      setpasswordMssage("Please enter a password.");
      return;
    }

    try {
      // API call for login
      const response = await apiPost("/login", {
        email: email,
        password: password,
      });

      if (response) {
        if (response.data.message === "Success") {
          if (response.data.data.User) {
            setLoggedInuser(response.data.data.User, response.data.data.token);

            if (response.data.data.User.roleUID === "1") {
              history.push("/app/crm/user");
            } else {
              let workflowUsers =
                response.data.data.User.get_work_flow_statge_user;
              let initiator = false;
              let approval = false;
              let dataEntry = false;
              workflowUsers.forEach((item, i) => {
                if (parseInt(item.stageNo) === 1) {
                  initiator = true;
                }
                if (
                  parseInt(item.stageNo) <
                    parseInt(item.work_flow.noOfStage) - 1 &&
                  parseInt(item.stageNo) !== 1
                ) {
                  approval = true;
                }
                if (
                  parseInt(item.stageNo) ===
                  parseInt(item.work_flow.noOfStage) - 1
                ) {
                  dataEntry = true;
                }
              });
              if (
                initiator === true &&
                approval !== true &&
                dataEntry !== true
              ) {
                history.push("/app/user/workflow");
              } else if (
                initiator !== true &&
                approval === true &&
                dataEntry !== true
              ) {
                history.push("/app/user/approvallist");
              } else if (
                initiator !== true &&
                approval !== true &&
                dataEntry === true
              ) {
                history.push("/app/user/dataentrylist");
              }
            }
          } else {
            setMsgType("alert alert-danger");
            setMessage(response.data.data.error);
            setIsMsgShow(true);
          }
        }
      } else {
        setMsgType("alert alert-danger");
        setMessage(response.data.data.error);
        setIsMsgShow(true);
      }
    } catch (error) {
      setMsgType("alert alert-danger");
      setMessage("Something went wrong, Please try again later");
      setIsMsgShow(true);
      console.error("Error during login:", error);
    }
  };

  const focusInput = (inputRef) => {
    // Access the input element using the ref
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <QueueAnim type="bottom" duration={2000}>
      <div className="rct-session-wrapper">
        {loading && <LinearProgress />}
        <AppBar position="static" className="session-header">
          <Toolbar>
            <div className="container">
              <div className="d-flex justify-content-between"></div>
            </div>
          </Toolbar>
        </AppBar>
        <div className="session-inner-wrapper">
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-sm-12 col-md-12 col-lg-6 mx-auto">
                <div className="session-body text-center">
                  <div className="session-head mb-30">
                    <h2 className="font-weight-bold">
                      <a href="#" className="logo logo-admin">
                        <img src={logo} height="60" alt="logo" />
                      </a>
                    </h2>
                  </div>
                  <div
                    className={MsgType}
                    id="successmsg"
                    style={{ display: isMsgShow ? "block" : "none" }}
                  >
                    {message}
                  </div>
                  <Form>
                    <FormGroup className="has-wrapper">
                      <Input
                        type="mail"
                        name="user-mail"
                        id="user-mail"
                        innerRef={inputEmailRef}
                        className="has-input input-lg"
                        placeholder="Enter Email Address"
                        onChange={() => focusInput(inputEmailRef)}
                        required
                      />
                      <span className="has-icon">
                        <i className="ti-email"></i>
                      </span>
                      <div
                        className="inputImportantRed"
                        id="emailprint-error-msg-red"
                        style={{ display: emailErrorVisible, color: "red" }}
                      >
                        {emailMssage}
                      </div>
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                      <Input
                        type="password"
                        name="user-pwd"
                        id="pwd"
                        innerRef={inputPasswordRef}
                        className="has-input input-lg"
                        placeholder="Enter your Password"
                        onChange={() => focusInput(inputPasswordRef)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            document.getElementById("submitBtn").click();
                          }
                        }}
                        required
                      />
                      <span className="has-icon">
                        <i className="ti-lock"></i>
                      </span>
                      <div
                        className="inputImportantRed"
                        id="emailprint-error-msg-red"
                        style={{ display: passwordErrorVisible, color: "red" }}
                      >
                        {passwordMssage}
                      </div>
                    </FormGroup>
                    <FormGroup className="mb-15">
                      <Button
                        id="submitBtn"
                        color="primary"
                        className="btn-warning btn-block text-white w-100 font-weight-bold"
                        variant="contained"
                        size="large"
                        onClick={onUserLogin}
                      >
                        Login
                      </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueueAnim>
  );
}

export default Signin;
