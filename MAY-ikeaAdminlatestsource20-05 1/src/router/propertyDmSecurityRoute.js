import React from "react";
import { useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Main from "../components/layout/Main";
import User from "../pages/user/User";
import Dashboard from "../pages/Dashboard";
import Location from "../pages/Location/Location";
import CheckListType from "../pages/CheckListType/CheckListType";
import CheckListSubType from "../pages/CheckListSubType/CheckListSubType";
import Scoring from "../pages/Scoring/Scoring";
import Questions from "../pages/formBuilder/Questions";
import FoodEntity from "../pages/reports/foodentity/FoodEntity";
import UnauthorizedPage from "../pages/unautherized";
import PropertyEntity from "../pages/reports/propertyentity/PropertyEntity";
import DmCheckListEntity from "../pages/reports/DmCheckListEntity/DmCheckListEntity";
import SecurityEntity from "../pages/reports/securityentity/SecurityEntity";
function PropertyDmSecurityRoute() {

    const userString = sessionStorage.getItem('Audit_user');
    const user = JSON.parse(userString);
    const auditentitycount = JSON.parse(sessionStorage.getItem('AuditEntity'))

    return (
        <div>
            <Switch>
                <Main>
                    <Route exact path="/admin/superadmin/dashboard" component={Dashboard} />
                    <Route exact path="/admin/superadmin/location" component={Location} />
                    <Route exact path="/admin/superadmin/section" component={CheckListType} />
                    <Route
                        exact
                        path="/admin/superadmin/sub_section"
                        component={CheckListSubType}
                    />
                    <Route exact path="/admin/superadmin/questions" component={Questions} />
                    <Route exact path="/admin/superadmin/scoring" component={Scoring} />
                    <Route exact path="/admin/superadmin/user" component={User} />
                    <Route exact path="/admin/superadmin/food_entity" component={FoodEntity} />
                    <Route exact path="/admin/superadmin/property_entity" component={PropertyEntity} />
                    <Route exact path="/admin/superadmin/dm_check_list_entity" component={DmCheckListEntity} />
                    <Route exact path="/admin/superadmin/Security_entity" component={SecurityEntity} />
                </Main>
            </Switch>
        </div>
    )
}

export default PropertyDmSecurityRoute


// props.map((q,i) => {
//     <Route key={i} exact path="/admin/superadmin/${q.menuname}` component={q.component} />
// })