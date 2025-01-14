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
import PropertyEntity from "../pages/reports/propertyentity/PropertyEntity";
import FoodEntity from "../pages/reports/foodentity/FoodEntity";
// import DmCheckListEntity from "../pages/reports/DmCheckListEntity/DmCheckListEntity";
import SecurityEntity from "../pages/reports/securityentity/SecurityEntity";
import DmCheckListEntity from "../pages/reports/DmCheckListEntity/DmCheckListEntity";
function PropertyUserRoute() {

    const userString = sessionStorage.getItem('Audit_user');
    const user = JSON.parse(userString);
    const auditentitys = sessionStorage.getItem('AuditEntity')
    const auditentitycount = JSON.parse(auditentitys)

    return (
        <div>
            <Switch>
                <Main>
                    <Route exact path="/admin/property/dashboard" component={Dashboard} />
                    <Route exact path="/admin/property/location" component={Location} />
                    <Route exact path="/admin/property/section" component={CheckListType} />
                    <Route
                        exact
                        path="/admin/property/sub_section"
                        component={CheckListSubType}
                    />
                    <Route exact path="/admin/property/questions" component={Questions} />
                    <Route exact path="/admin/property/scoring" component={Scoring} />
                    <Route exact path="/admin/property/user" component={User} />


                    <Route
                        exact
                        path="/admin/property/property_entity"
                        component={PropertyEntity}
                    />
                    {/* <Route exact path="/admin/property/dm_check_list_entity" component={DmCheckListEntity} />
                    <Route
                        exact
                        path="/admin/property/security_entity"
                        component={SecurityEntity}
                    /> */}

                </Main>
            </Switch>
        </div>
    )
}

export default PropertyUserRoute