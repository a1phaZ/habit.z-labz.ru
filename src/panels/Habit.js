import React, {useContext, useEffect, useState} from 'react';
import {Button, PanelHeader, PanelHeaderBack, Placeholder} from "@vkontakte/vkui";
import {State} from "../state";
import useApi from "../hooks/useApi";
import {SET_CHANGE_HABIT, SET_HABIT_ID, SET_HISTORY_BACK} from "../state/actions";

const HabitPage = ({id, habit, setHabit}) => {
	console.log({id, habit});
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
			<Placeholder
				header={habit.title}
				action={
					<Button
						size="l"
						onClick={() => {
							setNeedFetch(true);
						}}
					>
						Выполнить на сегодня
					</Button>
				}
			>
				Дней подряд: {habit.daysComplete} / {habit.days}
			</Placeholder>
		</>
	)
}

export default HabitPage;
