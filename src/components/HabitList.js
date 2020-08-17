import React, { useContext } from 'react';
import {Banner, InfoRow, Progress} from "@vkontakte/vkui";
import {State} from "../state";
import {SET_VIEW} from "../state/actions";

const HabitList = ({habits}) => {
	const [, dispatch] = useContext(State);
	return habits.map((habit) => {
		return (
			<Banner
				key={habit._id}
				header={habit.title}
				data-id={habit._id}
				onClick={(e) => {
					dispatch({type: SET_VIEW, payload: { view: 'habit-page', panel: habit._id}})
					console.log(e.currentTarget.dataset.id);
				}}
				subheader={
					<div>
						<InfoRow header={
							<div>
								<p>Статус: <strong>{habit.status === 'active' ? 'Активно' : 'Выполнено'}</strong></p>
								<p>Дней подряд: <strong>{habit.daysComplete}</strong> / <strong>{habit.days}</strong></p>
							</div>
						}>
							<Progress value={(habit.daysComplete/habit.days)*100}  style={{marginTop: '1em'}}/>
						</InfoRow>
					</div>
				}
				mode={'tint'}
				asideMode={'expand'}
			/>
		)
	})
}

export default HabitList;
