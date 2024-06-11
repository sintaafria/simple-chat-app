import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_HOST;

export const getAuthorizationHeader = () =>
	`Bearer ${localStorage.getItem('token')}`;

export const instance = axios.create({
	baseURL: baseUrl + '/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error?.response?.status === 401) {
			localStorage.removeItem('token');
			window.location.assign('/signin');
		}
		if (error.response) {
			throw { ...error.response.data, ...error.response.config.meta };
		} else {
			throw error;
		}
	}
);
