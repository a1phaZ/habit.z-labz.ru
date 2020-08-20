import React, {useState, useEffect, useCallback, useContext} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import {State} from "../state";
import {SET_ERROR, SET_POPOUT, SET_SUCCESS_MESSAGE} from "../state/actions";
import {PopoutWrapper, ScreenSpinner} from "@vkontakte/vkui";

export default url => {
	const [isLoading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState({});
	const [, dispatch] = useContext(State);

	const apiBase = `http://localhost/api`;

	const doApiFetch = useCallback((options = {}) => {
		setOptions(options);
		setResponse(null);
		setError(null);
		setLoading(true);
		dispatch({type: SET_POPOUT, payload: {popout: (<PopoutWrapper><ScreenSpinner /></PopoutWrapper>)}})
	}, [dispatch]);

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
					console.log(response);
					dispatch({type: SET_POPOUT, payload: {popout: null}});
					dispatch({type: SET_SUCCESS_MESSAGE, payload: {message: response.data.message}});
					setResponse(response.data.data);
				})
				.catch((error) => {
					setLoading(false);
					dispatch({type: SET_POPOUT, payload: {popout: null}})
					dispatch({type: SET_ERROR, payload: {error: error.response.data.error}});
					setError(error.response.data.error);
				})
		}

		fetchData();
	}, [isLoading, axiosOptions, dispatch]);
	return [{isLoading, response, error}, doApiFetch];
}