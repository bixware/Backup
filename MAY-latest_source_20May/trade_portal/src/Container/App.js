/**
 * App.js Layout Start Here
 */
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
// rct theme provider
import RctThemeProvider from "./RctThemeProvider";
//Horizontal Layout
//import HorizontalLayout from "./HorizontalLayout";
//Agency Layout
import AgencyLayout from "./AgencyLayout";
//Main App
//import RctDefaultLayout from "./DefaultLayout";
// boxed layout
import RctBoxedLayout from "./RctBoxedLayout";
// CRM layout
//import CRMLayout from "./CRMLayout";
// app signin
import AppSignIn from "./SigninFirebase";
//import AppSignUp from "./SignupFirebase";
import AdminRouteProduction from "Routes/AdminRouteProduction";
//import ManagerRouteProduction from "Routes/ManagerRouteProduction";
import CorporateRoute from "Admin/CorporateComponent/corporateRoute";
//import ManagerRoute from "Manager/ManagerComponent/ManagerRoute";
import RegistrationSuccess from "success";
// import ProtectedRoute from "../Components/Auth/ProtectedRoutes";
// async components
import {
  AsyncSessionLoginComponent,
  AsyncSessionRegisterComponent,
  AsyncSessionLockScreenComponent,
  AsyncSessionForgotPasswordComponent,
  AsyncSessionPage404Component,
  AsyncSessionPage500Component,
  AsyncTermsConditionComponent,
} from "Components/AsyncComponent/AsyncComponent";
//Auth0
import Auth from "Auth/Auth";
// callback component
//import Callback from "Components/Callback/Callback";
//import DataTable from "Routes/tables/data-table";
//Auth0 Handle Authentication
const auth = new Auth();
const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};
/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
// const InitialPath = ({ component: Component, authUser, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       authUser ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/signin",
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
// );

function App(props) {
  const authUser = useSelector((state) => state.authUser);
  const { user } = authUser;
  const { location, match } = props;
  if (location.pathname === "/") {
    if (user === null) {
      return <Redirect to={"/signin"} />;
    } /* else {
      return <Redirect to={"/boxed/tables/news"} />;
    } */
  }

  const userString = localStorage.getItem("USER");
  const User = JSON.parse(userString);
  const isLoggedIn = User && User.userUID && User.roleUID;
  console.log(User);
  // return (
  //   <RctThemeProvider>
  //     <NotificationContainer />
  //     {/* <InitialPath
  //       path={`${match.url}app`}
  //       authUser={user}
  //       component={RctDefaultLayout}
  //     /> */}
  //     {/* <ProtectedRoute> */}

  //     <Route path="/boxed" component={RctBoxedLayout} />
  //     <Route path="/dashboard" component={CRMLayout} />
  //     <Route path="/signin" component={AppSignIn} />
  //     {/* <Route path="/boxed" component={DataTable} /> */}
  //     <Route path="/corporate/admin/">
  //       <AdminRouteProduction isLoggedIn={User.userUID} roleUID={User.roleUID}>
  //         {" "}
  //         <CorporateRoute />{" "}
  //       </AdminRouteProduction>
  //     </Route>
  //     <Route path="/corporate/manager/">
  //       <ManagerRouteProduction
  //         isLoggedIn={User.userUID}
  //         roleUID={User.roleUID}
  //       >
  //         <Route path="/boxed" component={RctBoxedLayout} />
  //       </ManagerRouteProduction>
  //     </Route>
  //     {/* <Route path="/data-table" component={HorizontalLayout} />
  //     <Route path="/agency" component={AgencyLayout} />
  //     <Route path="/signup" component={AppSignUp} />
  //     <Route path="/session/login" component={AsyncSessionLoginComponent} />
  //     <Route
  //       path="/session/register"
  //       component={AsyncSessionRegisterComponent}
  //     />
  //     <Route
  //       path="/session/lock-screen"
  //       component={AsyncSessionLockScreenComponent}
  //     />
  //     <Route
  //       path="/session/forgot-password"
  //       component={AsyncSessionForgotPasswordComponent}
  //     />
  //     <Route path="/session/404" component={AsyncSessionPage404Component} />
  //     <Route path="/session/500" component={AsyncSessionPage500Component} />
  //     <Route path="/terms-condition" component={AsyncTermsConditionComponent} />
  //     <Route
  //       path="/callback"
  //       render={(props) => {
  //         handleAuthentication(props);
  //         return <Callback {...props} />;
  //       }}
  //     /> */}
  //     {/* </ProtectedRoute> */}
  //   </RctThemeProvider>
  // );

  return (
    <RctThemeProvider>
      <NotificationContainer />
      {/* Handle the main routes based on the authentication status */}
      <Route path="/signin" component={AppSignIn} />
      <Route exact path="/success" component={RegistrationSuccess} />
      <Route path="/admin/" component={CorporateRoute}/>
      {/* {isLoggedIn ? (
        <React.Fragment> */}
          {/* <Route path="/dashboard" component={CRMLayout} /> */}
          {/* <Route path="/corporate/admin/">
            <AdminRouteProduction
              isLoggedIn={User.userUID}
              roleUID={User.roleUID}
            >
              <CorporateRoute />
            </AdminRouteProduction>
          </Route> */}
         {/*  <Route path="/corporate/manager/">
            <ManagerRouteProduction
              isLoggedIn={User.userUID}
              roleUID={User.roleUID}
            >
              <ManagerRoute />
            </ManagerRouteProduction>
          </Route> */}
        {/* </React.Fragment>
      ) : (
        <Redirect to={"/signin"} />
      )} */}
    </RctThemeProvider>
  );
}

export default App;
