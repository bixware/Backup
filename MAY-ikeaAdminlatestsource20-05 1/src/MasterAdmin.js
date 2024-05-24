import React from "react";
import { useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Main from "./components/layout/Main";
import User from "./pages/user/User";
import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location/Location";
import CheckListEntity from "./pages/CheckListEntity/CheckListEntity";
import CheckListType from "./pages/CheckListType/CheckListType";
import CheckListSubType from "./pages/CheckListSubType/CheckListSubType";
import Scoring from "./pages/Scoring/Scoring";
import FormBuilder from "./pages/formBuilder/FormBuilder";
import LocationType from "./pages/LocationType/LocationType";
import EntityContent from "./pages/EntityContent/EntityContent";
import Menus from "./pages/menu/Menu";
import RoleMaster from "./pages/roleMaster/RoleMaster";
import Content from "./pages/Content/Content";
import Questions from "./pages/formBuilder/Questions";
import FoodEntity from "./pages/reports/foodentity/FoodEntity";
import DmCheckListEntity from "./pages/reports/DmCheckListEntity/DmCheckListEntity";
import PropertyEntity from "./pages/reports/propertyentity/PropertyEntity";
import SecurityEntity from "./pages/reports/securityentity/SecurityEntity";
import UnauthorizedPage from "./pages/unautherized";


function Router() {
    const [roleMenu1, setRoleMenu] = useState(
        sessionStorage.getItem("Role_Menu")
    );

    return (
        <div>
            <Switch>
                <Main>
                    <Route exact path="/admin/master/dashboard" component={Dashboard} />

                    <Route exact path="/admin/master/questions" component={Questions} />
                    <Route exact path="/admin/master/user" component={User} />
                    <Route exact path="/admin/master/location" component={Location} />
                    <Route exact path="/admin/master/section" component={CheckListType} />
                    <Route
                        exact
                        path="/admin/master/sub_section"
                        component={CheckListSubType}
                    />
                    <Route exact path="/admin/master/scoring" component={Scoring} />
                    <Route exact path="/admin/master/entity_content" component={EntityContent} />

                    <Route exact path="/admin/master/role_master" component={RoleMaster} />
                    <Route
                        exact
                        path="/admin/master/check_list_entity"
                        component={CheckListEntity}
                    />
                    <Route exact path="/admin/master/menu" component={Menus} />
                    <Route exact path="/admin/master/location_type" component={LocationType} />
                    <Route exact path="/admin/master/content" component={Content} />
                    <Route exact path="/admin/master/food_entity" component={FoodEntity} />
                    <Route exact path="/admin/master/dm_check_list_entity" component={DmCheckListEntity} />
                    <Route
                        exact
                        path="/admin/master/property_entity"
                        component={PropertyEntity}
                    />
                    <Route
                        exact
                        path="/admin/master/security_entity"
                        component={SecurityEntity}
                    />
                    <Route
                        exact
                        path="/admin/master/unauthorized"
                        component={UnauthorizedPage}
                    />
                </Main>
            </Switch>
        </div>
    );
}

export default withRouter(Router);
