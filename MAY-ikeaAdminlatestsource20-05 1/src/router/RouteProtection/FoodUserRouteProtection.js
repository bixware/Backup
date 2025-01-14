import { useHistory, Redirect } from "react-router-dom";

const FoodUserRouteProtection = ({ isLoggedIn, roleUID, children }) => {

    const history = useHistory();
    if (!isLoggedIn) {

        return <Redirect to='/unauthorized' />
    }
    else {
        if (roleUID == "8") {
            return children;
        }
        else {
            return <Redirect to='/unauthorized' />
        }
    }

};
export default FoodUserRouteProtection;