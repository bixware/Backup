import * as jwtDecode from "jwt-decode";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://sfworkflow.bixware.app/Backend/sapphire_foods/public/index.php/api/";

axios.defaults.baseURL =
  "https://sfworkflow.bixware.app/Development/sapphire_foods/public/api/";
// axios.defaults.baseURL = "http://192.168.29.240:8000/public/api/";
//Client URL
// axios.defaults.baseURL = "http://192.168.10.89:85/API/public/api/";
// axios.defaults.baseURL ="https://workflow.sapphirefoods.in:88/API/public/api/";

// intercepting to capture errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("apiError", error);
    return Promise.reject({ errorAPI: true, errorMessage: error.message });
  }
);

const AUTH_SESSION_KEY = "bixware_user";
const AUTH_TOKEN_KEY = "token";

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  if (token) axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  // if (token) axios.defaults.headers["Authorization"] = "Bearer " + token;
  else delete axios.defaults.headers["Authorization"];
};

const getUserFromCookie = () => {
  const user = sessionStorage.getItem(AUTH_SESSION_KEY);
  return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
};

class APICore {
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    let response;
    if (params) {
      var queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  getFile = (url, params) => {
    let response;
    if (params) {
      var queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };

  getMultiple = (urls, params) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  create = async (url, data) => {
    return axios.post(url, data);
  };

  Get = async (url) => {
    return axios.get(url);
  };

  /**
   * Updates patch data
   */
  updatePatch = (url, data) => {
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url) => {
    return axios.delete(url);
  };

  createForm = async (url, data) => {
    const options = {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      data: data,
      url: url,
    };
    return axios(options);
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  /**
   * post given data to url with file
   */
  updateWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config);
  };

  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();

    if (!user) {
      return false;
    }
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  setLoggedInUser = (session) => {
    if (session)
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  };

  setToken = (token) => {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    if (token) axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers["Authorization"];
  };

  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromCookie();
  };

  setUserInSession = (modifiedUser) => {
    let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const { token, user } = JSON.parse(userInfo);
      this.setLoggedInUser({ token, ...user, ...modifiedUser });
    }
  };
}

let user = getUserFromCookie();
if (user) {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    setAuthorization(token);
  }
}

export { APICore, setAuthorization };
