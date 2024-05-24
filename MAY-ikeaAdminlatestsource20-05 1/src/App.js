import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
// import Login from "./pages/Login";
import Main from "./components/layout/Main";
import User from "./pages/user/User";
// import "antd/dist/antd.Css";
// import 'antd/dist/reset.css';
// import 'antd/dist/reset.css'
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { APICore } from "./api/apiCore";
import React, { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import AdminRouteProduction from "../src/router/RouteProtection/AdminRoute";
import MasterAdmin from "./MasterAdmin";
import FoodUserRouteProtection from "./router/RouteProtection/FoodUserRouteProtection";
import FoodUserRoute from '../src/router/FoodUserRoute'
import PropertyUserRouteProtection from "./router/RouteProtection/PropertyUserRouteProtection";
import PropertyUserRoute from "./router/PropertyUserRoute";
import DmUserRouteProtection from "./router/RouteProtection/DmUserRouteProtection";
import DMUserRoute from "./router/DmUserRoute";
import SecurityUserRouteProtection from "./router/RouteProtection/SecurityUserRouteProtection";
import SecurityUserRoute from "./router/SecurityUserRoute";
import Router from "./router/Router";
import { apiPost } from "./api/apiCommon";
import baseURl from "./base";
import config from "./config";


// import { setLoggedInuser } from "./api/apiCommon";
const authcheck = new APICore();

function App() {
  return (
    <div className="App">

      <Switch>
        <HashRouter>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route
            exact
            path="/admin"
            render={() => <Redirect to="/login" />}
          />
          <Route path="/login" exact component={SignIn} />
          <PrivateRoute path="/admin" component={Router}>
          </PrivateRoute>
        </HashRouter>
      </Switch>
    </div>
  );
}


function PrivateRoute({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authcheck.checkAuthorization() ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

export default App;
