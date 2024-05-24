/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddRole from "../addrole";
import AddMaterialCode from "../Dashboard/add-materialcode";
import AddReceipe from "../addreceipe";
import AddNso from "../addnso";
import Workflow from "../Dashboard/workflowpages";

const WorkflowRoutes = ({ match }) => (
  <div className="Crm-wrapper">
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} /> */}
      <Route exact path={`${match.url}`}  component={Workflow} /> 
    <Route path={`${match.url}/add-cost`} component={AddRole} /> 
      <Route path={`${match.url}/add-material`} component={AddMaterialCode} />   
      <Route path={`${match.url}/add-receipe`} component={AddReceipe} />
      <Route path={`${match.url}/add-nso`} component={AddNso} />
   </Switch>
  </div>
);

export default WorkflowRoutes;
