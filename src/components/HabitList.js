import React, { useContext } from 'react';
import {State} from "../state";
import HabitBanner from "./HabitBanner";

const HabitList = ({habits}) => {
	const [, dispatch] = useContext(State);
	return habits.map((habit) => {
		return (
			<HabitBanner key={habit._id} habit={habit} dispatch={dispatch} />
		)
	})
}

export default HabitList;
