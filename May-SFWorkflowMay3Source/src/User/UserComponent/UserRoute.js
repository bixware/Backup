import React from "react";
import { Route, Switch } from "react-router-dom";
import UserComponent from ".";
const UserRoute = () => {
  return (
    <Switch>
      <Route path="/user/" component={UserComponent} />
      {/* <Route path="*" render={() => <Redirect to="/pagenotfound" />} /> */}
    </Switch>
  );
};
export default UserRoute;
