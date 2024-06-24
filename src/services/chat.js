import { getAuthorizationHeader, instance } from "./axios";

export const chatListRequest = (keyword) =>
	instance({
		url: `/chat-list?search=${keyword}`,
		method: "get",
		headers: {
			Authorization: getAuthorizationHeader(),
		},
	})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err));