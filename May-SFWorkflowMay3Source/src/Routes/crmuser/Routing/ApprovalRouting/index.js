/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ViewApproval from "Routes/crmuser/view-cost-approval";
import ViewRequest from "Routes/crmuser/view-cost-request";
import ViewMaterialApproval from "Routes/crmuser/view-material-approval";
import ViewMaterialRequest from "Routes/crmuser/view-material-request";
import ViewNsoApproval from "Routes/crmuser/view-nso-approval";
import ViewNsoRequest from "Routes/crmuser/view-nso-request";
import ViewReceipeApproval from "Routes/crmuser/view-receipe-approval";
import ViewReceipeRequest from "Routes/crmuser/view-receipe-request";
import ApprovalList from "Routes/crmuser/Listpage/approvallist";


const ApprovalRoutes = ({ match }) => (
  <div className="Crm-wrapper">
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} /> */}
      <Route exact path={`${match.url}`}  component={ApprovalList} /> 

      <Route path={`${match.url}/view-approval`} component={ViewApproval} />
      <Route path={`${match.url}/view-request`} component={ViewRequest} />

      <Route path={`${match.url}/view-material-approval`} component={ViewMaterialApproval}/>
      <Route path={`${match.url}/view-material-request`} component={ViewMaterialRequest}/> 

      <Route  path={`${match.url}/view-nso-approval`} component={ViewNsoApproval}/>
      <Route path={`${match.url}/view-nso-request`} component={ViewNsoRequest}/>
       
      <Route path={`${match.url}/view-rc-approval`} component={ViewReceipeApproval}/>
      <Route path={`${match.url}/view-rc-request`} component={ViewReceipeRequest} /> 
   </Switch>
  </div>
);

export default ApprovalRoutes;
