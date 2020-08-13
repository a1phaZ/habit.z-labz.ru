import {useState, useEffect, useCallback} from 'react';
import queryString from 'query-string';
import axios from 'axios';

export default url => {
	const [isLoading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState({});

	const apiBase = `http://localhost/api`;

	const doApiFetch = useCallback((options = {}) => {
		setOptions(options);
		setResponse(null);
		setError(null);
		setLoading(true);
	}, []);

	const {method = 'GET', params, ...bodyFields} = options;
	const headers = {
		'Content-Type': 'application/json',
	}
	const axiosOptions = {
		method: method,
		baseURL: apiBase,
		url,
		headers,
		params: params ? {...params, ...queryString.parse(window.location.search)} : {...queryString.parse(window.location.search)},
		data: method !== 'GET' ? bodyFields : null,
	}

	useEffect(() => {

		if (!isLoading) return;

		const fetchData = async () => {
			await axios(axiosOptions)
				.then((response) => {
					setLoading(false);
					setResponse(response.data.data);
				})
				.catch((error) => {
					setLoading(false);
					setError(error.response.data.error);
				})
		}

		fetchData();
	}, [isLoading, axiosOptions]);
	return [{isLoading, response, error}, doApiFetch];
}