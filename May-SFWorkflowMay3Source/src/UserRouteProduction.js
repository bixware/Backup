import { useHistory, Redirect } from "react-router-dom";
const UserRouteProduction = ({ isLoggedIn, roleUID, children }) => {
  const history = useHistory();
  if (!isLoggedIn) {
    return <Redirect to="/unauthorized" />;
  } else {
    if (roleUID == 2) {
      return children;
    } else {
      return <Redirect to="/unauthorized" />;
    }
  }
};
export default UserRouteProduction;
