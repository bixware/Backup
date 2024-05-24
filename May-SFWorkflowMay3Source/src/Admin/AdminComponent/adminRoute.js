import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from "react-router-dom";
import adminComponent from ".";

const AdminRoute = () => {
  return (
    <Switch>
      <Route path="/admin/" component={adminComponent} />
      {/* <Route path="*" render={() => <Redirect to="/pagenotfound" />} /> */}
    </Switch>
  );
};
export default AdminRoute;
