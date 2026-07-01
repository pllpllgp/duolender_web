import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ScheduleMain from "./pages/schedule/ScheduleMain.tsx";

export const router = createBrowserRouter([{
	path: "/",
	children: [
		{index: true, element: <Navigate to="login" replace />},
		{path: "login", element: <Login />},
		{path: "scheduleMain", element: <ProtectedRoute><ScheduleMain /></ProtectedRoute>},
	]
}]);