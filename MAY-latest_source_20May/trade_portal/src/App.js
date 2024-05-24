/**
 * Main App
 */
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// css
import "Assets/scss/reactifyCss";

// firebase
//import "./Firebase";

// app component
import App from "Container/App";

import { configureStore } from "Store";

function MainApp() {
  return (
    <Provider store={configureStore()}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <Switch>
            <HashRouter>
              <Route path="/" component={App} />
            </HashRouter>
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default MainApp;
// <Router basename="trade_portal">
// import React from "react";
// import { Provider } from "react-redux";
// import Routes from "./Routes/Routes";
// import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   toastConstant,
//   apiConstant,
// } from "./customRedux/constants/actionConstant";
// import {
//   apiAction,
//   toastAction,
//   toastActionAlert,
// } from "./customRedux/actions/Actions";
// import { configureStore } from "Store";
// import MomentUtils from "@date-io/moment";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// export const infoToast = (message, position, theme) => {
//   if (message != "" && message != null) {
//     toast.info(message, {
//       position: position,
//       autoClose: process.env.REACT_APP_TOAST_AUTOCLOSE,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: theme,
//     });
//   }
// };

// export const successToast = (message, position, theme) => {
//   if (message != "" && message != null) {
//     toast.success(message, {
//       position: position,
//       autoClose: process.env.REACT_APP_TOAST_AUTOCLOSE,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: theme,
//     });
//   }
// };

// export const warnToast = (message, position, theme) => {
//   if (message != "" && message != null) {
//     toast.warn(message, {
//       position: position,
//       autoClose: process.env.REACT_APP_TOAST_AUTOCLOSE,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: theme,
//     });
//   }
// };

// export const errorToast = (message, position, theme) => {
//   if (message != "" && message != null) {
//     toast.error(message, {
//       position: position,
//       autoClose: process.env.REACT_APP_TOAST_AUTOCLOSE,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: theme,
//     });
//   }
// };

// export const defaultToast = (message, position, theme) => {
//   if (message != "" && message != null) {
//     toast(message, {
//       position: position,
//       autoClose: process.env.REACT_APP_TOAST_AUTOCLOSE,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: theme,
//     });
//   }
// };

// const App = () => {
//   const reduxState = useSelector((state) => state);
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <Provider store={configureStore()}>
//         <MuiPickersUtilsProvider utils={MomentUtils}>
//           <Routes />
//           <ToastContainer
//             position={reduxState.position}
//             autoClose={process.env.REACT_APP_TOAST_AUTOCLOSE}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme={reduxState.theme}
//           />
//         </MuiPickersUtilsProvider>
//       </Provider>
//     </div>
//   );
// };

// export default App;
