import React, {useContext, useState, useEffect} from 'react';
import {Button, Panel, PanelHeader, Placeholder} from "@vkontakte/vkui";
import {State} from "../state";
import useApi from "../hooks/useApi";

const HabitPage = ({id}) => {
	const [state] = useContext(State);
	const [{response}, doApiFetch] = useApi(`/habit/${id}`);
	const [habit, setHabit] = useState(() => {
		return state.habits.find((item) => {
			return item._id === id
		})
	});
	const [needFetch, setNeedFetch] = useState(false);
	// const [longPress, setLongPress] = useState(false);
	// const [pressTimer, setPressTimer] = useState(null);
	//
	// const pressStart = () => {
	// 	if (pressTimer === null) {
	// 		setPressTimer(setTimeout(() => {
	// 			setLongPress(true);
	// 		}, 1000));
	// 	}
	// }
	// const pressCancel = () => {
	// 	if (pressTimer !== null) {
	// 		clearTimeout(pressTimer);
	// 	}
	// 	setPressTimer(null);
	// 	setLongPress(false);
	// }

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
	}, [response]);

	return (
		<Panel id={id}>
			<PanelHeader>{habit.title}</PanelHeader>
			<Placeholder
				header={habit.title}
				action={
					<Button
						size="l"
						onClick={()=>{
							setNeedFetch(true);
						}}
					>
						Выполнить на сегодня
					</Button>
				}
			>
				Дней подряд: {habit.daysComplete} / {habit.days}
			</Placeholder>
		</Panel>
	)
}

export default HabitPage;
