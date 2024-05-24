/**
 * News App
 */
import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

// Agency layout
import RctAgencyLayout from "Components/RctAgencyLayout";

// router service
import routerService from "Routes";
import corporateComponent from "Admin/CorporateComponent";
//import DataTable from "Routes/tables/data-table";
//import OnboardindDataTable from "Routes/tables/onboarding-table";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import CreditDebit from "Routes/users/Newregistration";
//import NewsDashboard from "Routes/dashboard/news";
import Invoice from "Routes/users/user-management/index";
//import Newregistration from "Routes/users/Newregistration/Newregistration";
/* import NewsDashboard from "Routes/dashboard/news" */
import OrderStatus from "Routes/users/orderstatus/index"
import Customer from "Routes/users/CustomerOnHold/index";
import ReportsInvoice from "Routes/users/reportsinvoice";
import BalanceConfirm from "Routes/users/Balanceconf";
import ReportsFinance from "Routes/users/Finance";
import FinanceCreditDebitSummary from "Routes/users/Finance/financecreditdebitsummary";
import Customers from "Routes/users/Customers";
import SchemeWorking from "Routes/users/Schemeworks";

function RctNewsApp(props) {
  const { match, location } = props;
  // if (location.pathname === "/boxed") {
  //   return <Redirect to={"/boxed/dashboard/news"} />;
  // }
  return (
    <RctAgencyLayout enableBgImage>
      <Switch>
        {/* <Route path="/admin/dashboard" component={NewsDashboard} /> */}
        <Route path="/admin/creditdebit" component={CreditDebit} />
        <Route path="/admin/invoice" component={Invoice} />
        <Route path="/admin/orderstatus" component={OrderStatus} />
        <Route path="/admin/customer" component={Customer} />
        <Route path="/admin/reportsinvoice" component={ReportsInvoice} />
        <Route path="/admin/balanceconfirm" component={BalanceConfirm} />
        <Route path="/admin/customers" component={Customers} />
        <Route path="/admin/customerledger" component={ReportsFinance} />
        <Route path="/admin/creditdebitnotesummary" component={FinanceCreditDebitSummary} />
        <Route path="/admin/schemeworking" component={SchemeWorking} />
        {/* <Route
          path="/corporate/admin/newregistration"
          component={Newregistration}
        /> */}
      </Switch>
    </RctAgencyLayout>
  );
}

export default withRouter(RctNewsApp);
