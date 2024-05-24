import React from "react";
import { BrowserRouter, Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import SecurityUserRoute from "../SecurityUserRoute";
const SecurityRouteswitch = () => {
    return (
        <Switch>
            <Route path="/admin/security/" component={SecurityUserRoute} />
            <Route path='*' render={() => (<Redirect to="/pagenotfound" />)} />
        </Switch>
    );

}
export default SecurityRouteswitch;