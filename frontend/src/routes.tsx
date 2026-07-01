import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from './pages/auth/Login.tsx';

export const router = createBrowserRouter([{
	path: "/",
	children: [
		{index: true, element: <Navigate to="login" replace />},
		{path: "login", element: <Login />},
	]
}]);