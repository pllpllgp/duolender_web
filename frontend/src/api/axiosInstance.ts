import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

// 요청마다 자동으로 Authorization 헤더 추가
axiosInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;

});

// 401 응답 시 자동 로그아웃
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
			window.location.href = "/login";
		}

		return Promise.reject(error);

	}
);

export default axiosInstance;