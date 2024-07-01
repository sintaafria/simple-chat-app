import { getAuthorizationHeader, instance } from "./axios";

export const allMessagesRequest = (chat_id) =>
	instance({
		url: `/message/${chat_id}`,
		method: "get",
		headers: {
			Authorization: getAuthorizationHeader(),
		},
	})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err));

export const sendMessageRequest = (payload) =>
	instance({
		url: '/message',
		method: "post",
		headers: {
			Authorization: getAuthorizationHeader(),
		},
		data: payload
	})
		.then(res => Promise.resolve(res))
		.catch(err => Promise.reject(err));