import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import SighUp from "./pages/auth/Signup.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ScheduleMain from "./pages/schedule/ScheduleMain.tsx";
import GroupMain from "./pages/group/GroupMain.tsx";
import MyMain from "./pages/my/MyMain.tsx";
import SideLayout from "./layouts/SideLayout.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="login" replace />,
	},
	{
		path: "login", element: <Login />,
	},
	{
		path: "signUp", element: <SighUp />,
	},
	{
		element: <SideLayout />,
		children: [
			{path: "scheduleMain", element: <ProtectedRoute><ScheduleMain /></ProtectedRoute>},
			{path: "groupMain", element: <ProtectedRoute><GroupMain /></ProtectedRoute>},
			{path: "myMain", element: <ProtectedRoute><MyMain /></ProtectedRoute>},
		]
	}
]);