import { useHistory, Redirect } from "react-router-dom";

const SecurityUserRouteProtection = ({ isLoggedIn, roleUID, children }) => {

    const history = useHistory();
    if (!isLoggedIn) {

        return <Redirect to='/unauthorized' />
    }
    else {
        if (roleUID == "11") {
            return children;
        }
        else {
            return <Redirect to='/unauthorized' />
        }
    }

};
export default SecurityUserRouteProtection;