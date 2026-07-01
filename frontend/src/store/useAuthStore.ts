import {create} from "zustand";
import {persist} from "zustand/middleware";

interface User {
	userId: string;
	userNm: string;
	userEmail: String;
	userPhone: String;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isLoggedIn: boolean;
	login: (userData: User, userToken: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>() (
	persist(
		(set) => ({
			user: null,
			token: null,
			isLoggedIn: false,

			login: (userData, userToken) => set({user: userData, token: userToken, isLoggedIn: true}),

			logout: () => set({user: null, token: null, isLoggedIn: false}),
		}),
	{
			name: 'userInfo'
		}
	)
)