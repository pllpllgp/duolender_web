import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ScheduleMain from "./pages/schedule/ScheduleMain.tsx";
import SideLayout from "./layouts/SideLayout.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="login" replace />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		element: <SideLayout />,
		children: [
			{path: "scheduleMain", element: <ProtectedRoute><ScheduleMain /></ProtectedRoute>},
		]
	}
]);