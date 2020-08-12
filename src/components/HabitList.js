import React from 'react';
import {Banner} from "@vkontakte/vkui";

const HabitList = ({habits}) => {
	return habits.map((habit, index) => {
		return (
			<Banner
				key={index}
				header={habit.title}
				subheader={
					<div>
						<p>Дней подряд: <strong>{habit.daysComplete}</strong> / <strong>{habit.days}</strong></p>
						<p>Статус: <strong>{habit.status === 'active' ? 'Активно' : 'Выполнено'}</strong></p>
					</div>
				}
				mode={'tint'}
				asideMode={'expand'}
			/>
		)
	})
}

export default HabitList;
