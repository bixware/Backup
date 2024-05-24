import { APICore } from "./apiCore";
const api = new APICore();

const apiPost = async (apiName, params) => {
  const baseUrl = apiName;
  return api.create(`${baseUrl}`, params);
};
const apiFormDataPost=async  (apiName,params)=> {
  const base = apiName ;
  return api.createForm(`${base}`, params);
}

const apiGet = async (apiName) => {
  const baseUrl = apiName;
  return api.Get(`${baseUrl}`);
};

const apiFormDatePost = async (apiName, params) => {
  const baseUrl = apiName;
  return api.createWithFile(`${baseUrl}`, params);
};
const setLoggedInuser = (userDetails, token) => {
  api.setToken(token);
  api.setLoggedInUser(userDetails);
  // api.setAuthorization(token);
};
const setLogoutUser = () => {
  api.setLoggedInUser(false);
};

export { apiPost, apiFormDatePost, setLoggedInuser, setLogoutUser, apiGet,apiFormDataPost };
