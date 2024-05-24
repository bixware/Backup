import { APICore } from './apiCore'
const api = new APICore();

const apiPost = async (apiName, params) => {
    const baseUrl = apiName;
    return api.create(`${baseUrl}`, params);
}
const apiFormDatePost = async (apiName, params) => {
    const baseUrl = apiName;
    return api.createWithFile(`${baseUrl}`, params);
}
const setLoggedInuser = (userDetails, token, roleMenus) => {
    api.setToken(token);
    api.setLoggedInUser(userDetails);
    api.setRoleMenu(roleMenus);
}
const setLogoutUser = () => {
    api.setLoggedInUser(false);

}

export { apiPost, apiFormDatePost, setLoggedInuser, setLogoutUser };