import React from "react";
import { useState } from "react";
import { Route, Switch, Redirect, withRouter, HashRouter, BrowserRouter } from "react-router-dom";
import Main from "../components/layout/Main";
import User from "../pages/user/User";
import Dashboard from "../pages/Dashboard";
import Tables from "../pages/Tables";
import Billing from "../pages/Billing";
import Location from "../pages/Location/Location";
import CheckListEntity from "../pages/CheckListEntity/CheckListEntity";
import CheckListType from "../pages/CheckListType/CheckListType";
import CheckListSubType from "../pages/CheckListSubType/CheckListSubType";
import Scoring from "../pages/Scoring/Scoring";
import FormBuilder from "../pages/formBuilder/FormBuilder";
import LocationType from "../pages/LocationType/LocationType";
import EntityContent from "../pages/EntityContent/EntityContent";
import Menus from "../pages/menu/Menu";
import RoleMaster from "../pages/roleMaster/RoleMaster";
import Content from "../pages/Content/Content";
import Questions from "../pages/formBuilder/Questions";
import FoodEntity from "../pages/reports/foodentity/FoodEntity";
import DmCheckListEntity from "../pages/reports/DmCheckListEntity/DmCheckListEntity";
import PropertyEntity from "../pages/reports/propertyentity/PropertyEntity";
import SecurityEntity from "../pages/reports/securityentity/SecurityEntity";
import Navbarprototype from "../Navbarprototype";
import OnBoarding from "../pages/reports/foodentity/reacttable";
import Radiobutton from "../radiobutton";
import MasterAdmin from "../MasterAdmin";
import FoodUserRouteProtection from "./RouteProtection/FoodUserRouteProtection";
import FoodUserRoute from "./FoodUserRoute";
import PropertyUserRouteProtection from "./RouteProtection/PropertyUserRouteProtection";
import PropertyUserRoute from "./PropertyUserRoute";
import DmUserRouteProtection from "./RouteProtection/DmUserRouteProtection";
import DMUserRoute from "./DmUserRoute";
import SecurityUserRouteProtection from "./RouteProtection/SecurityUserRouteProtection";
import SecurityUserRoute from "./SecurityUserRoute";
import AdminRouteProduction from "./RouteProtection/AdminRoute";
import SecurityRouteswitch from "./Routesswitch/SecurityRouteswitch";
import SuperAdminRouteProduction from "./RouteProtection/propertyDmSecurityprotection";
import PropertyDmSecurityRoute from "./propertyDmSecurityRoute";
function Router() {
  const userString = sessionStorage.getItem('Audit_user');
  const user = JSON.parse(userString);


  return (
    <BrowserRouter>
      <HashRouter>
        <Switch>

          {/* <Main> */}
          <Route path='/admin/master/'>
            <AdminRouteProduction isLoggedIn={user?.userUID != null ? true : false} roleUID={user?.roleUID}>
              <MasterAdmin />
            </AdminRouteProduction>
          </Route>
          <Route path='/admin/food/'>
            <FoodUserRouteProtection isLoggedIn={user?.userUID != null ? true : false} roleUID={user?.roleUID}>
              <FoodUserRoute />
            </FoodUserRouteProtection>
          </Route>
          <Route path='/admin/property/'>
            <PropertyUserRouteProtection isLoggedIn={user?.userUID != null ? true : false} roleUID={user?.roleUID}>
              <PropertyUserRoute />
            </PropertyUserRouteProtection>
          </Route>
          <Route path='/admin/dm/'>
            <DmUserRouteProtection isLoggedIn={user?.userUID != null ? true : false} roleUID={user?.roleUID}>
              <DMUserRoute />
            </DmUserRouteProtection>
          </Route>
          <Route path='/admin/security/'>
            <SecurityUserRouteProtection isLoggedIn={user?.userUID != null ? true : false} roleUID={user?.roleUID}>
              <SecurityUserRoute />
            </SecurityUserRouteProtection>
          </Route>
          <Route path='/admin/superadmin/'>
            <SuperAdminRouteProduction isLoggedIn={user?.userUID != null ? true : false} roleUID={user?.roleUID}>
              <PropertyDmSecurityRoute />
            </SuperAdminRouteProduction>
          </Route>
          {/* </Main> */}
        </Switch>
      </HashRouter>
    </BrowserRouter>
  );
}

export default withRouter(Router);
