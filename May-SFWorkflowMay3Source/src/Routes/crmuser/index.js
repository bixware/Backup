// /**
//  * Crm Routes
//  */
// /* eslint-disable */
// import React from "react";
// import { Redirect, Route, Switch } from "react-router-dom";

// // async components
// import {
//   AsyncCrmComponent,
//   AsyncProjectsComponent,
//   AsyncProjectDetailComponent,
//   AsyncClientsComponent,
//   AsyncReportsComponent,
// } from "Components/AsyncComponent/AsyncComponent";

// import Workflow from "./Dashboard/workflowpages";
// import EntryRequestList from "./Listpage/entryrequestlist";
// import AddRole from "./addrole";
// import ApprovalList from "./Listpage/approvallist";
// import DataEntryList from "./Listpage/dataEntryList";
// import ViewApproval from "./view-cost-approval";
// import RequestList from "./Listpage/requestlist";
// import ViewRequest from "./view-cost-request";
// import Conclude from "./Listpage/conclude";
// import RejectList from "./Listpage/historylist";
// import AddMaterialCode from "./Dashboard/add-materialcode";
// import ViewMaterialApproval from "./view-material-approval";
// import ViewMaterialRequest from "./view-material-request";
// import AddReceipe from "./addreceipe";
// import ViewReceipeApproval from "./view-receipe-approval";
// import ViewReceipeRequest from "./view-receipe-request";
// import AddNso from "./addnso";
// import ViewNsoApproval from "./view-nso-approval";
// import ViewNsoRequest from "./view-nso-request";

// const CrmUser = ({ match }) => (
//   <div className="Crm-wrapper">
//     <Switch>
//       <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
//       <Route path={`${match.url}/workflow`} component={Workflow} />

//       <Route path={`${match.url}/add-cost`} component={AddRole} />
//       <Route path={`${match.url}/view-approval`} component={ViewApproval} />
//       <Route path={`${match.url}/view-request`} component={ViewRequest} />

//       <Route path={`${match.url}/request-list`} component={EntryRequestList} />
//       <Route path={`${match.url}/view-conclude`} component={Conclude} />
//       <Route path={`${match.url}/historylist`} component={RejectList} />
//       <Route path={`${match.url}/requestlist`} component={RequestList} />
//       <Route path={`${match.url}/approvallist`} component={ApprovalList} />
//       <Route path={`${match.url}/dataentrylist`} component={DataEntryList} />

//       <Route path={`${match.url}/add-material`} component={AddMaterialCode} />
//       <Route
//         path={`${match.url}/view-material-approval`}
//         component={ViewMaterialApproval}
//       />
//       <Route
//         path={`${match.url}/view-material-request`}
//         component={ViewMaterialRequest}
//       />

//       <Route path={`${match.url}/add-receipe`} component={AddReceipe} />
//       <Route
//         path={`${match.url}/view-rc-approval`}
//         component={ViewReceipeApproval}
//       />
//       <Route
//         path={`${match.url}/view-rc-request`}
//         component={ViewReceipeRequest}
//       />

//       <Route path={`${match.url}/add-nso`} component={AddNso} />
//       <Route
//         path={`${match.url}/view-nso-approval`}
//         component={ViewNsoApproval}
//       />
//       <Route
//         path={`${match.url}/view-nso-request`}
//         component={ViewNsoRequest}
//       />
//     </Switch>
//   </div>
// );

// export default CrmUser;
/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import {
  AsyncCrmComponent,
  AsyncProjectsComponent,
  AsyncProjectDetailComponent,
  AsyncClientsComponent,
  AsyncReportsComponent,
} from "Components/AsyncComponent/AsyncComponent";

import WorkflowRoutes from "./Workflow";

import ApprovalRoutes from "./Routing/ApprovalRouting";
import EntryRequestRoutes from "./Routing/EntryRequestRouting";
import ConcludeRoutes from "./Routing/ConcludeRouting";
import DataEntryRoutes from "./Routing/DataEntryRouting";
import RequestRoutes from "./Routing/RequestRouting";

const CrmUser = ({ match }) => (
  <div className="Crm-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />

      <Route
        path={`${match.url}/request-list`}
        component={EntryRequestRoutes}
      />
      <Route path={`${match.url}/view-conclude`} component={ConcludeRoutes} />
      <Route path={`${match.url}/requestlist`} component={RequestRoutes} />
      <Route path={`${match.url}/approvallist`} component={ApprovalRoutes} />
      <Route path={`${match.url}/dataentrylist`} component={DataEntryRoutes} />

      <Route path={`${match.url}/workflow`} component={WorkflowRoutes} />
    </Switch>
  </div>
);

export default CrmUser;
