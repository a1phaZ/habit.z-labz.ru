import React, {useContext, useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {Alert, CellButton, List, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {State} from "../state";
import useApi from "../hooks/useApi";
import {SET_CHANGE_HABIT, SET_HABIT_ID, SET_HABITS, SET_HISTORY_BACK, SET_POPOUT} from "../state/actions";
import HabitBanner from "../components/HabitBanner";

import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';

const HabitPage = ({habit, setHabit}) => {
	const [, dispatch] = useContext(State);
	const [{response}, doApiFetch] = useApi(`/habit/${habit?._id}`);

	const [needFetch, setNeedFetch] = useState(false);

	useEffect(() => {
		if (!needFetch) return;
		doApiFetch({
			method: 'DELETE'
		});
		setNeedFetch(false);
	}, [needFetch, doApiFetch]);

	useEffect(() => {
		if (!response) return;
		dispatch({type: SET_HABITS, payload: {habits: response}});
		dispatch({type: SET_HISTORY_BACK});
		// setHabit(response);
	}, [response, dispatch]);

	const message = habit?.days !== habit?.daysComplete
		?
		`Успешно иду к своей цели ${habit?.title}. Уже ${habit?.daysComplete} дней подряд из ${habit?.days}. https://vk.com/app7564973`
		:
		`Успешно выполнил поставленую цель ${habit?.title}. https://vk.com/app7564973`

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
				{habit?.title}
			</PanelHeader>
			<HabitBanner habit={habit} dispatch={dispatch} isSingle={true} setHabit={setHabit}/>
			<List>
				<CellButton
					before={<Icon28ShareOutline/>}
					onClick={() => {
						bridge.send('VKWebAppShowWallPostBox', {message: message})
					}}
				>
					{habit?.days !== habit?.daysComplete ? 'Поделиться прогрессом' : 'Поделиться успехом'}
				</CellButton>
				<CellButton
					before={<Icon28CancelCircleOutline/>}
					mode={'danger'}
					onClick={() => {
						dispatch({
							type: SET_POPOUT, payload: {
								popout: (
									<Alert
										actionsLayout="vertical"
										actions={[{
											title: 'Удалить',
											autoclose: true,
											mode: 'destructive',
											action: () => setNeedFetch(true),
										}, {
											title: 'Отмена',
											autoclose: true,
											mode: 'cancel'
										}]}
										onClose={() => {dispatch({type: SET_POPOUT, payload: {popout: null}})}}
									>
										<h2>Подтвердите действие</h2>
										<p>Вы уверены, что хотите удалить {habit?.title}?</p>
										<p><i>Отменить удаление будет невозможно!</i></p>
									</Alert>
								)
							}
						});
					}}
				>
					Удалить цель
				</CellButton>
			</List>
		</>
	)
}

export default HabitPage;
