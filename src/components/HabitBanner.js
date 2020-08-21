import React, {useEffect, useState} from 'react';
import {SET_HABIT_ID, SET_VIEW} from "../state/actions";
import {Banner, Button, InfoRow, Progress} from "@vkontakte/vkui";
import useApi from "../hooks/useApi";

const HabitBanner = ({habit, dispatch, isSingle = false, setHabit = () => {}}) => {
	const [{response}, doApiFetch] = useApi(`/habit/${habit?._id}`);

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
		<Banner
			key={habit?._id}
			header={habit?.title}
			data-id={habit?._id}
			onClick={() => {
				if (!isSingle) {
					dispatch({type: SET_VIEW, payload: { view: 'habit-page', panel: 'habit-page'}});
					dispatch({type: SET_HABIT_ID, payload: { habitId: habit?._id}});
				}
				return null;
			}}
			subheader={
				<div>
					<InfoRow header={
						<div>
							<p>Статус: <strong>{habit?.status === 'active' ? 'Активно' : 'Выполнено'}</strong></p>
							<p>Дней подряд: <strong>{habit?.daysComplete}</strong> / <strong>{habit?.days}</strong></p>
						</div>
					}>
						<Progress value={(habit?.daysComplete/habit?.days)*100}  style={{marginTop: '1em'}}/>
					</InfoRow>
				</div>
			}
			actions={isSingle &&
				<Button
					onClick={() => {
						setNeedFetch(true);
					}}
					size={'xl'}
					disabled={habit?.daysComplete === habit?.days}
				>
					{habit?.daysComplete === habit?.days ? 'Цель достигнута' : 'Выполнить на сегодня'}
				</Button>
			}
			mode={'tint'}
			asideMode={!isSingle && 'expand'}
		/>
	)
}

export default HabitBanner;
