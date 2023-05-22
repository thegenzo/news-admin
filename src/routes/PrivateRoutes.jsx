import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {

	// token from cookies
	const token = Cookies.get('token');

	// if token not set
	if(!token) {
		return <Navigate to="/" replace />
	}

	return children;
};

export default PrivateRoutes;
