import * as React from "react";
import {Navigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";
import {isTokenExpired} from "../util/jwt.ts";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const token = useAuthStore((state) => state.token);
	const isLogout = useAuthStore(state => state.isLogout)

	if(!isLoggedIn || !token || isTokenExpired(token)) {
		if(!isLogout) {
			alert("세션이 만료되어 로그인화면으로 이동합니다.");
		}

		return <Navigate to="/login" replace />;

	}

	return <>{children}</>;
};

export default ProtectedRoute;