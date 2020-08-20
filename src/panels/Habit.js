import React, {useContext, useEffect, useState} from 'react';
import {CellButton, List, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {State} from "../state";
import useApi from "../hooks/useApi";
import {SET_CHANGE_HABIT, SET_HABIT_ID, SET_HISTORY_BACK} from "../state/actions";
import HabitBanner from "../components/HabitBanner";

import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';

const HabitPage = ({habit, setHabit}) => {
	const [, dispatch] = useContext(State);
	const [{response}, doApiFetch] = useApi(`/habit/${habit._id}`);

	const [needFetch, setNeedFetch] = useState(false);

	useEffect(() => {
		if (!needFetch) return;
		doApiFetch({
			method: 'PUT'
		});
		setNeedFetch(false);
	}, [needFetch, doApiFetch]);

	useEffect(() => {
		if (!response) return;
		setHabit(response);
	}, [response, setHabit]);

	return (
		<>
			<PanelHeader left={
				<PanelHeaderBack
					onClick={() => {
						dispatch({type: SET_HISTORY_BACK});
						dispatch({type: SET_HABIT_ID, payload: {habitId: null}});
						dispatch({type: SET_CHANGE_HABIT, payload: {habit: habit}});
					}}
				/>
			}
			>
				{habit.title}
			</PanelHeader>
			<HabitBanner habit={habit} dispatch={dispatch} isSingle={true} setNeedFetch={setNeedFetch}/>
			<List>
				<CellButton
					before={<Icon28ShareOutline/>}
				>
					{habit.days !== habit.daysComplete ? 'Поделиться прогрессом' : 'Поделиться успехом'}
				</CellButton>
				<CellButton
					before={<Icon28CancelCircleOutline/>}
					mode={'danger'}
				>
					Удалить цель
				</CellButton>
			</List>
		</>
	)
}

export default HabitPage;
