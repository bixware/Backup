import { useHistory, Redirect } from "react-router-dom";

const DmUserRouteProtection = ({ isLoggedIn, roleUID, children }) => {

    const history = useHistory();
    if (!isLoggedIn) {

        return <Redirect to='/unauthorized' />
    }
    else {
        if (roleUID == "10") {
            return children;
        }
        else {
            return <Redirect to='/unauthorized' />
        }
    }

};
export default DmUserRouteProtection;