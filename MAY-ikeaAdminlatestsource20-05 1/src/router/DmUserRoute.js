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
import DmCheckListEntity from "../pages/reports/DmCheckListEntity/DmCheckListEntity";
import PropertyEntity from "../pages/reports/propertyentity/PropertyEntity";
import SecurityEntity from "../pages/reports/securityentity/SecurityEntity";

function DMUserRoute() {

    const userString = sessionStorage.getItem('Audit_user');
    const user = JSON.parse(userString);

    return (
        <div>
            <Switch>
                <Main>
                    <Route exact path="/admin/dm/dashboard" component={Dashboard} />
                    <Route exact path="/admin/dm/location" component={Location} />
                    <Route exact path="/admin/dm/section" component={CheckListType} />
                    <Route
                        exact
                        path="/admin/dm/sub_section"
                        component={CheckListSubType}
                    />
                    <Route exact path="/admin/dm/questions" component={Questions} />
                    <Route exact path="/admin/dm/scoring" component={Scoring} />
                    <Route exact path="/admin/dm/user" component={User} />
                    { }

                    <Route exact path="/admin/dm/dm_check_list_entity" component={DmCheckListEntity} />
                    {/* <Route
                        exact
                        path="/admin/dm/security_entity"
                        component={SecurityEntity}
                    />
                    <Route
                        exact
                        path="/admin/dm/property_entity"
                        component={PropertyEntity}
                    /> */}

                </Main>
            </Switch>
        </div>
    )
}

export default DMUserRoute