import {
  userConstant,
  HRuserConstant,
} from "../../customRedux/constants/actionConstant";
const AUTH_SESSION_KEY = "bixware_user";
debugger;
const user = sessionStorage.getItem(AUTH_SESSION_KEY);
const loginUser = user
  ? typeof user == "object"
    ? user
    : JSON.parse(user)
  : null;
const userDetailsJson = {
  email: loginUser != null ? loginUser.email : null,
  name: loginUser != null ? loginUser.name : null,
  roleName: loginUser != null ? loginUser.roleName : null,
  roleUID: loginUser != null ? parseInt(loginUser.roleUID) : null,
  token: loginUser != null ? loginUser.token : null,
  userUID: loginUser != null ? loginUser.userUID : null,
  isLoggedIn: loginUser != null ? true : false,
  employeeUID: loginUser != null ? parseInt(loginUser.employeeUID) : null,
};

export const userReducer = (state = userDetailsJson, action) => {
  switch (action.type) {
    case userConstant.setAdminUser:
      return {
        ...state,
        email: action.userDetails.email,
        name: action.userDetails.name,
        roleName: action.userDetails.roleName,
        roleUID: parseInt(action.userDetails.roleUID),
        token: action.userDetails.token,
        userUID: action.userDetails.userUID,
        isLoggedIn: true,
        employeeUID: parseInt(action.userDetails.employeeUID),
      };
    case userConstant.logoutAdminUser:
      return {
        ...state,
        email: null,
        name: null,
        roleName: null,
        roleUID: null,
        token: null,
        userUID: null,
        isLoggedIn: false,
      };

    case HRuserConstant.setHRUser:
      return {
        ...state,
        email: action.userDetails.email,
        name: action.userDetails.name,
        roleName: action.userDetails.roleName,
        roleUID: parseInt(action.userDetails.roleUID),
        token: action.userDetails.token,
        userUID: action.userDetails.userUID,
        isLoggedIn: true,
        employeeUID: parseInt(action.userDetails.employeeUID),
      };
    case HRuserConstant.logoutHRUser:
      return {
        ...state,
        email: null,
        name: null,
        roleName: null,
        roleUID: null,
        token: null,
        userUID: null,
        isLoggedIn: false,
        employeeUID: null,
      };
    default:
      return { ...state };
  }
};
