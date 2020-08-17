import React from 'react';
import {Banner, InfoRow, Progress} from "@vkontakte/vkui";

const HabitList = ({habits}) => {
	return habits.map((habit) => {
		return (
			<Banner
				key={habit._id}
				header={habit.title}
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
