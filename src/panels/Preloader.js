import React, {useEffect, useContext} from 'react';
import {Panel} from "@vkontakte/vkui";
import useLocalStorage from "../hooks/useLocalStorage";
import {State} from "../state";
import {SET_VIEW} from "../state/actions";

const Preloader = ({id}) => {
	const [, dispatch] = useContext(State);
	const [doneStartup] = useLocalStorage('startup-done');
	useEffect(() => {
		if (!doneStartup) {
			dispatch({type: SET_VIEW, payload: {view: 'startup', panel: 'startup'}});
		} else {
			const done = JSON.parse(doneStartup);
			if (done) {
				dispatch({type: SET_VIEW, payload: {view: 'home', panel: 'home'}});
			} else {
				dispatch({type: SET_VIEW, payload: {view: 'startup', panel: 'startup'}});
			}
		}
	}, [dispatch, doneStartup]);
	return (
		<Panel id={id}>
			<div>Habit</div>
		</Panel>
	)
}

export default Preloader;
