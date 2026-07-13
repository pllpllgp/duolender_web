import {create} from "zustand";
import {persist} from "zustand/middleware";

interface User {
	userId: string;
	userNick: string;
	scheduleColor: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isLoggedIn: boolean;
	login: (userData: User, userToken: string) => void;
	logout: () => void;
	updateUser: (partial: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>() (
	persist(
		(set) => ({
			user: null,
			token: null,
			isLoggedIn: false,

			login: (userData, userToken) => set({user: userData, token: userToken, isLoggedIn: true}),

			logout: () => set({user: null, token: null, isLoggedIn: false}),

			updateUser: (partial) => set((state) => ({
				user: state.user ? {...state.user, ...partial} : state.user
			})),
		}),
	{
			name: 'userInfo'
		}
	)
);