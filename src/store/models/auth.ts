import { Action, action, Thunk, thunk } from "easy-peasy";
import { toast } from "react-toastify";

export interface AuthModel {
	loginUser: Thunk<AuthModel, LoginModel>;
	logoutUser: Thunk<AuthModel>;
	registerUser: Thunk<AuthModel, RegisterModel>;
	get_me: Thunk<AuthModel>;
	user: UserModel;
	setUser: Action<AuthModel, UserModel>;
	isAuthenticated: boolean;
	setIsAuthenticated: Action<AuthModel, boolean>;
}

export interface UserModel {
	userData: {
		email: string;
		firstName: string;
		lastName: string;
	};
}

export interface RegisterModel {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface LoginModel {
	email: string;
	password: string;
}
export const auth: AuthModel = {
	user: {
		userData: {
			email: "",
			firstName: "",
			lastName: "",
		},
	},
	isAuthenticated: false,
	setIsAuthenticated: action((state, payload) => {
		state.isAuthenticated = payload;
	}),
	setUser: action((state, payload) => {
		state.user.userData.email = payload.userData.email;
		state.user.userData.firstName = payload.userData.firstName;
		state.user.userData.firstName = payload.userData.firstName;
	}),
	loginUser: thunk(async (actions, payload, { fail, injections, getState }) => {
		const { authService } = injections;

		const rsp = await authService.loginUser(payload.email, payload.password);
		if (rsp.status === 200) {
			const token = rsp.data.token;
			if (token) {
				actions.setIsAuthenticated(true);
				actions.setUser({
					userData: rsp.data.user,
				});
			}
		} else {
			toast.error(`Error logging in!`, {
				position: "top-right",
			});
		}
		return rsp;
	}),
	logoutUser: thunk(async (actions, payload, { fail, injections, getState }) => {
		const { authService } = injections;
		const rsp = await authService.logoutUser();
		actions.setIsAuthenticated(false);
		return rsp;
	}),
	registerUser: thunk(async (actions, payload, { fail, injections, getState }) => {
		const { authService } = injections;

		const rsp = await authService.registerUser(
			payload.firstName,
			payload.lastName,
			payload.email,
			payload.password
		);

		if (rsp.status === 200) {
			toast.success(`New User`, {
				position: "top-right",
			});
		}

		return rsp;
	}),
	get_me: thunk(async (actions, payload, { fail, injections, getState }) => {
		const { authService } = injections;
		const rsp = await authService.get_me();

		return rsp;
	}),
};

