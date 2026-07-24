import * as React from "react";
import {Navigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";
import {isTokenExpired} from "../util/jwt.ts";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const token = useAuthStore((state) => state.token);

	if(!isLoggedIn || !token || isTokenExpired(token)) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;