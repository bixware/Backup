import { useHistory, Redirect } from "react-router-dom";

const PropertyUserRouteProtection = ({ isLoggedIn, roleUID, children }) => {

    const history = useHistory();
    if (!isLoggedIn) {

        return <Redirect to='/unauthorized' />
    }
    else {
        if (roleUID == "9") {
            return children;
        }
        else {
            return <Redirect to='/unauthorized' />
        }
    }

};
export default PropertyUserRouteProtection;