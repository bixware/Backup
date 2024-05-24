import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from "react-router-dom";
import corporateComponent from ".";
import PageNotFound from "../../extraPages/pagenotfound";
const CorporateRoute = () => {
  return (
    <Switch>
      <Route path="/admin" component={corporateComponent} />
      <Route path="*" render={() => <Redirect to="/pagenotfound" />} />
    </Switch>
  );
};
export default CorporateRoute;
