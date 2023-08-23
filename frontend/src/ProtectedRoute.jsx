import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isAuthenticated }) => {
	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}
	return <Outlet />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};
