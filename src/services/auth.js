import { getAuthorizationHeader, instance } from "./axios";

export const loginRequest = payload =>
	instance({
		url: "/auth/login",
		method: "post",
		data: payload,
	})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err));

export const userProfileRequest = () =>
	instance({
		url: "/user-profile",
		method: "get",
		headers: {
			Authorization: getAuthorizationHeader(),
		},
	})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err));

export const logoutRequest = payload =>
	instance({
		url: "/auth/logout",
		method: "post",
		data: payload,
	})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err));
