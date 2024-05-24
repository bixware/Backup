import { useHistory, Redirect } from "react-router-dom";

const AdminRouteProduction = ({ isLoggedIn, roleUID, children }) => {

    const history = useHistory();
    if (!isLoggedIn) {

        return <Redirect to='/unauthorized' />
    }
    else {
        if (roleUID == "1") {
            return children;
        }
        else {
            return <Redirect to='/unauthorized' />
        }
    }

};
export default AdminRouteProduction;