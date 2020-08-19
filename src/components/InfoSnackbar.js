import React, {useContext, useEffect, useState} from 'react';
import {Snackbar} from "@vkontakte/vkui";
import {State} from "../state";
import {SET_ERROR} from "../state/actions";
import Icon24ErrorCircle from '@vkontakte/icons/dist/24/error_circle';

const InfoSnackbar = ({children}) => {
	const [state, dispatch] = useContext(State);
	const [snackbar, setSnackbar] = useState(null);
	useEffect(() => {
		if (!state.error) return;
		setSnackbar(<Snackbar
			onClose={
				() => {
					dispatch({type: SET_ERROR, payload: {error: null}});
					setSnackbar(null);
				}}
			before={<Icon24ErrorCircle style={{color: 'var(--destructive)'}}/>}
		>
			{state.error.message}
		</Snackbar>)
	}, [setSnackbar, dispatch, state.error]);
	return (
		<>
			{children}
			{snackbar}
		</>
	)
}

export default InfoSnackbar;
