import { useHistory, Redirect } from "react-router-dom";
const SuperAdminRouteProduction = ({ isLoggedIn, roleUID, children }) => {

    const history = useHistory();
    if (!isLoggedIn) {

        return <Redirect to='/unauthorized' />
    }
    else {
        if (roleUID == "13") {
            return children;
        }
        else {
            return <Redirect to='/unauthorized' />
        }
    }

};
export default SuperAdminRouteProduction;