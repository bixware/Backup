/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import WorkflowStageUser from "./Workflow/workflowstageuser";

// async components
import {
  AsyncCrmComponent,
  AsyncProjectsComponent,
  AsyncProjectDetailComponent,
  AsyncClientsComponent,
  AsyncReportsComponent,
} from "Components/AsyncComponent/AsyncComponent";
import AddRole from "./AddManage/addrole";
import AddUser from "./AddManage/adduser";
import CostPrice from "./AddUser/costprice";
import MaterialCode from "./AddUser/materialcode";
import RecipeCreation from "./AddUser/recipecreation";
import Businessunit from "./Businessunit/businessunit";
import ViewReports from "./view-reports";
import EditWorkflowStageuser from "./Workflow/editworkflowstageuser";

const Crm = ({ match }) => (
  <div className="Crm-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
      <Route path={`${match.url}/dashboard`} component={AsyncCrmComponent} />
      <Route path={`${match.url}/role`} component={AsyncProjectsComponent} />
      <Route path={`${match.url}/businessunit`} component={Businessunit} />
      {/* <Route path={`${match.url}/add-cost`} component={AddRole} /> */}
      <Route path={`${match.url}/user`} component={AsyncClientsComponent} />
      {/* <Route path={`${match.url}/add-cost`} component={AddUser} /> */}
      <Route path={`${match.url}/workflow`} component={AsyncReportsComponent} />
      <Route
        path={`${match.url}/workflow-stage`}
        component={AsyncProjectDetailComponent}
      />
      <Route
        path={`${match.url}/workflow-stageuser`}
        component={WorkflowStageUser}
      />
      <Route
        path={`${match.url}/view-workflow-stageuser`}
        component={EditWorkflowStageuser}
      />
      <Route path={`${match.url}/report`} component={MaterialCode} />
      <Route path={`${match.url}/view-reports`} component={ViewReports} />

      {/* <Route path={`${match.url}/cost`} component={CostPrice} />
      <Route path={`${match.url}/nso`} component={NsoStore} />
      <Route path={`${match.url}/recipe`} component={RecipeCreation} /> */}
    </Switch>
  </div>
);

export default Crm;
