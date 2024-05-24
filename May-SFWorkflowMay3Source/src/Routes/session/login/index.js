/**
 * Login Page
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { Fab } from '@material-ui/core';

// components
import { SessionSlider } from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
} from 'Store/Actions';

function Signin(props) {
   const [email, setEmail] = useState('demo@example.com');
   const [password, setPassword] = useState('test#123');
   const dispatch = useDispatch();
   const loading = useSelector(state => state.loading);
   /**
    * On User Login
    */
   const onUserLogin = () => {
      if (email !== '' && password !== '') {
         dispatch(signinUserInFirebase({ email: email, password: password }, props.history));
      }
   }

   /**
    * On User Sign Up
    */
   const onUserSignUp = () => {
      props.history.push('/signup');
   }

   return (
      <QueueAnim type="bottom" duration={2000}>
         <div className="rct-session-wrapper">
            {loading &&
               <LinearProgress />
            }
            <AppBar position="static" className="session-header">
               <Toolbar>
                  <div className="container">
                     <div className="d-flex justify-content-between">
                        <div className="session-logo">
                           <Link to="/">
                              <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                           </Link>
                        </div>
                        <div>
                           <a href="!#" className="mr-15" onClick={(e) => {e.preventDefault();onUserSignUp()}}>Create New account?</a>
                           <Button variant="contained" className="btn-light" onClick={() => onUserSignUp()}>Sign Up</Button>
                        </div>
                     </div>
                  </div>
               </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper">
               <div className="container">
                  <div className="row row-eq-height">
                     <div className="col-sm-7 col-md-7 col-lg-8">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2 className="font-weight-bold">Get started with {AppConfig.brandName}</h2>
                              <p className="mb-0">Most powerful ReactJS admin panel</p>
                           </div>
                           <Form>
                              <FormGroup className="has-wrapper">
                                 <Input type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(event) => setEmail(event.target.value)} />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup className="has-wrapper">
                                 <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                                 <span className="has-icon"><i className="ti-lock"></i></span>
                              </FormGroup>
                              <FormGroup className="mb-15">
                                 <Button
                                    color="primary"
                                    className="btn-block text-white w-100"
                                    variant="contained"
                                    size="large"
                                    onClick={() => onUserLogin()}>
                                    Sign In
                                 </Button>
                              </FormGroup>
                           </Form>
                           <p className="mb-20">or sign in with</p>
                           <Fab size="small" variant="circular" className="btn-facebook mr-15 mb-20 text-white"
                              onClick={() => dispatch(signinUserWithFacebook(props.history))}
                           >
                              <i className="zmdi zmdi-facebook"></i>
                           </Fab>
                           <Fab size="small" variant="circular" className="btn-google mr-15 mb-20 text-white"
                              onClick={() => dispatch(signinUserWithGoogle(props.history))}
                           >
                              <i className="zmdi zmdi-google"></i>
                           </Fab>
                           <Fab size="small" variant="circular" className="btn-twitter mr-15 mb-20 text-white"
                              onClick={() => dispatch(signinUserWithTwitter(props.history))}
                           >
                              <i className="zmdi zmdi-twitter"></i>
                           </Fab>
                           <Fab size="small" variant="circular" className="btn-instagram mr-15 mb-20 text-white"
                              onClick={() => dispatch(signinUserWithGithub(props.history))}
                           >
                              <i className="zmdi zmdi-github-alt"></i>
                           </Fab>
                           <p className="text-muted">By signing up you agree to {AppConfig.brandName}</p>
                           <p><a target="_blank" href="/terms-condition" onClick={(e) => e.preventDefault()}className="text-muted">Terms of Service</a></p>
                        </div>
                     </div>
                     <div className="col-sm-5 col-md-5 col-lg-4">
                        <SessionSlider />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </QueueAnim>
   );
}

export default Signin;
