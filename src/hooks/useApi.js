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
	const [state, dispatch] = useContext(State);

	const apiBase = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_BASEURL : process.env.REACT_APP_BASEURL_DEV;

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
	const { allowNotifications } = state;
	const axiosOptions = {
		method: method,
		baseURL: apiBase,
		url,
		headers,
		params: params ? {...params, ...queryString.parse(window.location.search), allowNotifications} : {...queryString.parse(window.location.search), allowNotifications},
		data: method !== 'GET' ? bodyFields : null,
	}

	useEffect(() => {
		if (!isLoading) return;
		const fetchData = async () => {
			await setLoading(false);
			return await axios(axiosOptions)
				.then(async(response) => {
					await setResponse(response.data.data);
					await dispatch({type: SET_POPOUT, payload: {popout: null}});
					await dispatch({type: SET_SUCCESS_MESSAGE, payload: {message: response.data.message}});
				})
				.catch((error) => {
					setLoading(false);
					let e = error?.response ? error.response.data.error : new Error('Проблемы с подключением к API');
					setError(e);
					dispatch({type: SET_POPOUT, payload: {popout: null}})
					dispatch({type: SET_ERROR, payload: {error: e}});
				})
		}

		fetchData();
	}, [isLoading, axiosOptions, dispatch]);
	return [{isLoading, response, error}, doApiFetch];
}