import { getAuthorizationHeader, instance } from "./axios";

export const searchUserRequest = (username) =>
	instance({
		url: `/users?search=${username}`,
		method: "get",
		headers: {
			Authorization: getAuthorizationHeader(),
		},
	})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err));