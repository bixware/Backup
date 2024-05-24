/**
 * Main App
 */
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// css
import "Assets/scss/reactifyCss";

// firebase
import "./Firebase";

// app component
import App from "Container/App";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { configureStore } from "Store";
// import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";

function MainApp() {
  return (
    <Provider store={configureStore()}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {/* <Router> */}
        <HashRouter>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </HashRouter>
        {/* </Router> */}
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default MainApp;
