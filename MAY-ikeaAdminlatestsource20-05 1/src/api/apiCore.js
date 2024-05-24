import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
    position: toast.POSITION.TOP_RIGHT
});
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;




// intercepting to capture errors
axios.interceptors.response.use(

    (response) => {
        return response;
    },
    (error) => {
       // console.log(error)
        return Promise.reject({ errorAPI: true, errorMessage: error.message });

    }
);

// axios.interceptors.response.use(
//     response => response,
//     error => {
//         const errRes = error.response
//         console.log(errRes)
//         // if (!error.config || !error.config.silent) {
//         if (error.response.status === 401) {
//             console.log("error checked")
//         }
//     });


const AUTH_SESSION_KEY = 'Audit_user';
const ROLE_MENUS = 'Role_Menu';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`
    }
    else delete axios.defaults.headers["Authorization"];
};

const getUserFromCookie = () => {
    const user = sessionStorage.getItem(AUTH_SESSION_KEY);
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
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
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
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
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    };

    getMultiple = (urls, params) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
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
                'content-type': 'multipart/form-data',
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
                'content-type': 'multipart/form-data',
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
           // console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    };

    setLoggedInUser = (session) => {
        // console.log("this is from session api core"+ session)
        if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    };

    setRoleMenu = (roleMenus) => {
        if (roleMenus) sessionStorage.setItem(ROLE_MENUS, JSON.stringify(roleMenus));
        else {
            sessionStorage.removeItem(ROLE_MENUS)
        }
    }

    checkAuthorization = () => {
        let userTokenData = sessionStorage.getItem("Token");

        if (userTokenData) {
            setAuthorization(userTokenData);
            return true
        } else {
            return false
        }
    }

    setToken = (token) => {

        if (token) {
            axios.defaults.headers["Authorization"] = `Bearer ${token}`;
            sessionStorage.setItem("Token", (token))
        } else
            delete axios.defaults.headers["Authorization"];

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
    const token = user.token;
    if (token) {
        setAuthorization(token);
    }
}

export { APICore, setAuthorization, };