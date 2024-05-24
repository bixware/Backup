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
function FoodUserRoute() {

    const userString = sessionStorage.getItem('Audit_user');
    const user = JSON.parse(userString);
    const auditentitycount = JSON.parse(sessionStorage.getItem('AuditEntity'))

    return (
        <div>
            <Switch>
                <Main>
                    <Route exact path="/admin/food/dashboard" component={Dashboard} />
                    <Route exact path="/admin/food/location" component={Location} />
                    <Route exact path="/admin/food/section" component={CheckListType} />
                    <Route
                        exact
                        path="/admin/food/sub_section"
                        component={CheckListSubType}
                    />
                    <Route exact path="/admin/food/questions" component={Questions} />
                    <Route exact path="/admin/food/scoring" component={Scoring} />
                    <Route exact path="/admin/food/user" component={User} />
                    <Route exact path="/admin/food/food_entity" component={FoodEntity} />



                    {/* <Route exact path="/admin/dm_check_list_entity" component={DmCheckListEntity} />
                    <Route
                        exact
                        path="/admin/property_entity"
                        component={PropertyEntity}
                    />
                    <Route
                        exact
                        path="/admin/security_entity"
                        component={SecurityEntity}
                    /> */}


                </Main>
            </Switch>
        </div>
    )
}

export default FoodUserRoute