// /**
//  * App.js Layout Start Here
//  */
// import React from "react";
// import { useSelector } from "react-redux";
// import { Redirect, Route } from "react-router-dom";
// import { NotificationContainer } from "react-notifications";
// // rct theme provider
// import RctThemeProvider from "./RctThemeProvider";
// //Horizontal Layout
// import HorizontalLayout from "./HorizontalLayout";
// //Agency Layout
// import AgencyLayout from "./AgencyLayout";
// //Main App
// import RctDefaultLayout from "./DefaultLayout";
// // boxed layout
// import RctBoxedLayout from "./RctBoxedLayout";
// // CRM layout
// import CRMLayout from "./CRMLayout";
// // app signin
// import AppSignIn from "./SigninFirebase";
// import AppSignUp from "./SignupFirebase";
// // async components
// import {
//   AsyncSessionLoginComponent,
//   AsyncSessionRegisterComponent,
//   AsyncSessionLockScreenComponent,
//   AsyncSessionForgotPasswordComponent,
//   AsyncSessionPage404Component,
//   AsyncSessionPage500Component,
//   AsyncTermsConditionComponent,
// } from "Components/AsyncComponent/AsyncComponent";
// //Auth0
// import Auth from "Auth/Auth";
// // callback component
// import Callback from "Components/Callback/Callback";
// //Auth0 Handle Authentication
// const auth = new Auth();
// const handleAuthentication = ({ location }) => {
//   if (/access_token|id_token|error/.test(location.hash)) {
//     auth.handleAuthentication();
//   }
// };
// /**
//  * Initial Path To Check Whether User Is Logged In Or Not
//  */
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

// function App(props) {
//   const authUser = useSelector((state) => state.authUser);
//   const { user } = authUser;
//   const { location, match } = props;
//   if (location.pathname === "/") {
//     if (user === null) {
//       return <Redirect to={"/signin"} />;
//     } else {
//       return <Redirect to={"/app/dashboard/ecommerce"} />;
//     }
//   }
//   return (
//     <RctThemeProvider>
//       <NotificationContainer />
//       <InitialPath
//         path={`${match.url}app`}
//         authUser={user}
//         component={RctDefaultLayout}
//       />
//       <Route path="/horizontal" component={HorizontalLayout} />
//       <Route path="/agency" component={AgencyLayout} />
//       <Route path="/boxed" component={RctBoxedLayout} />
//       <Route path="/dashboard" component={CRMLayout} />
//       <Route path="/signin" component={AppSignIn} />
//       <Route path="/signup" component={AppSignUp} />
//       <Route path="/session/login" component={AsyncSessionLoginComponent} />
//       <Route
//         path="/session/register"
//         component={AsyncSessionRegisterComponent}
//       />
//       <Route
//         path="/session/lock-screen"
//         component={AsyncSessionLockScreenComponent}
//       />
//       <Route
//         path="/session/forgot-password"
//         component={AsyncSessionForgotPasswordComponent}
//       />
//       <Route path="/session/404" component={AsyncSessionPage404Component} />
//       <Route path="/session/500" component={AsyncSessionPage500Component} />
//       <Route path="/terms-condition" component={AsyncTermsConditionComponent} />
//       <Route
//         path="/callback"
//         render={(props) => {
//           handleAuthentication(props);
//           return <Callback {...props} />;
//         }}
//       />
//     </RctThemeProvider>
//   );
// }

// export default App;

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
import HorizontalLayout from "./HorizontalLayout";
//Agency Layout
import AgencyLayout from "./AgencyLayout";
//Main App
import RctDefaultLayout from "./DefaultLayout";
// boxed layout
import RctBoxedLayout from "./RctBoxedLayout";
// CRM layout
import CRMLayout from "./CRMLayout";
// app signin
import AppSignIn from "./SigninFirebase";
import AppSignUp from "./SignupFirebase";
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
import Callback from "Components/Callback/Callback";
import AdminRoute from "Admin/AdminComponent/adminRoute";
import AdminRouteProduction from "AdminRouteProduction";
import UserRoute from "User/UserComponent/UserRoute";
import UserRouteProduction from "UserRouteProduction";
import Signin from "./SigninFirebase";

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
const InitialPath = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

function App(props) {
  const userString = sessionStorage.getItem("bixware_user");
  const User = JSON.parse(userString);
  const isLoggedIn = User && User.userID && User.roleUID;
  // console.log(User);
  return (
    <RctThemeProvider>
      {/* <BrowserRouter basename=""> */}
      <NotificationContainer />
      {/* Handle the main routes based on the authentication status */}
      <Route path="/signin" component={AppSignIn} />
      {/* <Route path="/changepassword" component={AppSignIn} /> */}
      <Route exact path="/" render={() => <Redirect to="/signin" />} />
      {/* <Route path="/app" component={RctDefaultLayout} /> */}
      {/* <Route path="/signup" component={AppSignUp} /> */}
      {isLoggedIn ? (
        <React.Fragment>
          <Route path="/app" component={CRMLayout} />
          <Route path="/admin/">
            <AdminRouteProduction isLoggedIn={User.id} roleUID={User.roleUID}>
              <AdminRoute />
            </AdminRouteProduction>
          </Route>
          <Route path="/user/">
            <UserRouteProduction isLoggedIn={User.id} roleUID={User.roleUID}>
              <UserRoute />
            </UserRouteProduction>
          </Route>
        </React.Fragment>
      ) : (
        <Redirect to={"/signin"} />
      )}
      {/* </BrowserRouter> */}
    </RctThemeProvider>
  );
}

export default App;
