/**
 * Signin Firebase
 */

import React, { useState } from 'react';
import baseURL from '../baseurl';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Button, AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
/* import { Form, FormGroup, Input } from "reactstrap"; */
import LinearProgress from "@material-ui/core/LinearProgress";
import QueueAnim from "rc-queue-anim";
import { Fab } from "@material-ui/core";
import Footer from "Components/Footer/Footer";
import image from "../Assets/img/logonew1.png";
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import "../../src/style.css";
import { apiPost, apiFormDatePost, setLoggedInuser } from "../Api/apiCommon";
const AppSignIn = () => {
  //   const [email, setEmail] = useState("demo@example.com");
  //   const [password, setPassword] = useState("test#123");
  //   const dispatch = useDispatch();
  //   const loading = useSelector((state) => state.loading);

  //   /**
  //    * On User Login
  //    */
  //   const onUserLogin = () => {
  //     if (email !== "" && password !== "") {
  //       dispatch(signinUserInFirebase({ email, password }, props.history));
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState("");
  
  

  const initialValues = {
    username: "",
    password: ""
  }
  const d = new Date();
  let year = d.getFullYear();  
  const Login = async (values) => {
    setIsErrorMessage(false);
    const userData = {      
      userName: values.username,      
      password: values.password
    };
    let response = null;
    try {
      response = await axios.post(baseURL + '/api/login', {
        userName: values.username,      
        password: values.password
      });
      if (response.data.status == true && response.data.message == "Login Success") { 
        localStorage.setItem('USER', JSON.stringify(response.data.data.user));
        localStorage.setItem('userUID', response.data.data.user.userUID); 
        localStorage.setItem('UserName', response.data.data.user.UserName);
        localStorage.setItem('roleUID', response.data.data.user.roleUID);
        if(response.data.data.user.roleUID == 2) {
          setTimeout(() => history.push("/admin/invoice"), 1000);
        } else if(response.data.data.user.roleUID == 3) {
          setTimeout(() => history.push("/admin/balanceconfirm"), 1000);
        } else {
          setTimeout(() => history.push("/admin/creditdebit"), 1000);
        }
      }
    }
    catch(err){
      setErrorMessage(err.errorMessage.data.message);
      setIsErrorMessage(true);
    }
  }; 

  

  const validationSchema =
  Yup.object().shape({
      
    username: Yup.string().required("Required username"),
    password: Yup.string().required("Required password"),
     
  });
  /*
  const resetError = (event) => {
    setEmailMssage("");
    setEmailErrorVisible("none");
  };

   
  const login = (event) => {
    event.preventDefault();
  }; */

  return (
    <QueueAnim type="bottom" duration={2000}>
      <div className="rct-session-wrapper">
        {/* {loading && <LinearProgress />} */}
        <AppBar position="static" className="session-header">
          <Toolbar>
            <div className="container">
              <div className="d-flex justify-content-between">
                <div className="session-logo">
                  <Link to="/signin">
                    <img
                      src={image}
                      alt="session-logo"
                      className="img-fluid"
                      width="60"
                      height="60vh"
                    />
                  </Link>
                </div>
                {/* <div>
                  <a
                    href="!#"
                    className="mr-15 text-white"
                    //   onClick={onUserSignUp}
                  >
                    Create New account?
                  </a>
                  <Button
                    variant="contained"
                    className="btn-light"
                    //   onClick={onUserSignUp}
                  >
                    Sign Up
                  </Button>
                </div> */}
              </div>
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
                        <img src={image} height="60" alt="logo" />
                      </a>
                    </h2>
                    {/* <p className="mb-0">Most powerful ReactJS admin panel</p> */}
                  </div>
                 {/*  <div
                    className={MsgType}
                    id="successmsg"
                    style={{ display: isMsgShow ? "block" : "none" }}
                  >
                    {message}
                  </div> */}
                   <Formik
                                initialValues={initialValues}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit= {async (values, { resetForm }) => {
                                  await Login(values)
                                  resetForm()
                                }
                              }
                            >
                                {(props) => (
                                    <Box sx={{ marginLeft: '0px' }}>
                                        <Form>
                                            <React.Fragment>
                                                <Grid container spacing={2} justify="center">
                                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                                        
                                                            {/* <Grid item xs={4} >
                                                        <InputLabel>
                                                            Country
                                                        </InputLabel>
                                                    </Grid> */}
                                                            
                                                              
                                                                {/* <Field as={TextField}

                                                                    name="username"
                                                                    label="Username"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    
                                                                    helperText= {<ErrorMessage style = {{
                                                                      '.rct-session-wrapper .session-inner-wrapper .session-body .p':{ color : 'red !important'} 
                                                                    }}  name="username" />}
                                                                >
                                                                  
                                                                </Field> */}
                                                                <div className="form-group">
                  {/* <label htmlFor="storeName">Store Name</label> */}
                  <Field
                    label="Username"
                    name="username"
                    as={TextField}
                    /* value={values?.storeName ?? " "} */
                    fullWidth
                    variant="outlined"
                    className={
                      "form-control" +
                      (props.errors.username ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="invalid-feedback"
                    style = {{ textAlign : 'left'}}
                  />
                </div>
                                                            
                                                       
                                                    </Grid>
                                                    
                                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                                        
                                                            {/* <Grid item xs={4} >
                                                        <InputLabel>
                                                            Store Name
                                                        </InputLabel>
                                                    </Grid> */}
                                                            
                                                            
                                                               {/*  <Field as={TextField}
                                                                    name="password"
                                                                    label="Password"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    
                                                                    helperText={<ErrorMessage className="invalid-feedback" name="password" />}
                                                                >
                                                                    
                                                                </Field> */}
                                                                <div className="form-group">
                  {/* <label htmlFor="storeName">Store Name</label> */}
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    as={TextField}
                    /* value={values?.storeName ?? " "} */
                    fullWidth
                    variant="outlined"
                    className={
                      "form-control" +
                      (props.errors.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                    style = {{ textAlign : 'left'}}
                  />
                </div>
                                                            
                                                    </Grid>
                                                    
                                                    <Grid container sx={{ marginTop: "20px" }}>
                                                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                            <Button size="large" type="submit" variant="contained">
                                                                Login
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                    {isErrorMessage?(
                                                        <Grid container sx={{ marginTop: "20px" }}>
                                                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                          <Typography variant='h6' sx={{color:"red" , fontSize:"15px"}}>{errorMessage}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    ):null}
                                                     
                                                  
                                                </Grid>
                                            </React.Fragment>
                                        </Form>
                                    </Box>
                                )}
                            </Formik>
                  {/* <p className="mb-20">or sign in with</p>
                  <Fab
                    size="small"
                    variant="circular"
                    className="btn-facebook mr-15 mb-20 text-white"
                    onClick={() =>
                      dispatch(signinUserWithFacebook(props.history))
                    }
                  >
                    <i className="zmdi zmdi-facebook"></i>
                  </Fab>
                  <Fab
                    size="small"
                    variant="circular"
                    className="btn-google mr-15 mb-20 text-white"
                    onClick={() =>
                      dispatch(signinUserWithGoogle(props.history))
                    }
                  >
                    <i className="zmdi zmdi-google"></i>
                  </Fab>
                  <Fab
                    size="small"
                    variant="circular"
                    className="btn-twitter mr-15 mb-20 text-white"
                    onClick={() =>
                      dispatch(signinUserWithTwitter(props.history))
                    }
                  >
                    <i className="zmdi zmdi-twitter"></i>
                  </Fab>
                  <Fab
                    size="small"
                    variant="circular"
                    className="btn-instagram mr-15 mb-20 text-white"
                    onClick={() =>
                      dispatch(signinUserWithGithub(props.history))
                    }
                  >
                    <i className="zmdi zmdi-github-alt"></i>
                  </Fab>
                  <p className="text-muted">
                    By signing up you agree to {AppConfig.brandName}
                  </p>
                  <p className="mb-0">
                    <a
                      target="_blank"
                      href="#/terms-condition"
                      className="text-muted"
                    >
                      Terms of Service
                    </a>
                  </p> */}
                </div>

                {/* <div className="col-sm-5 col-md-5 col-lg-4">
                <SessionSlider />
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div
            className="container-fluid"
            style={{
              marginTop: "20%",
              justifyContent: "center",
              display: "flex",
              color: "white",
            }}
          >
            <div className="row">
              <div>
               {/*  Celio Internaluse by{" "} */}
                <span
                  style={{ fontWeight: "bold" }}
                >
                  ABFRL
                </span>{" "}
                © {year}. All Rights Reserved
              </div>
            </div>
          </div>
        </footer>
      </div>
    </QueueAnim>
  );
};

export default AppSignIn;
