import React, {useContext, useReducer} from 'react';
import {Button, Div, Panel, PanelHeader, Placeholder} from "@vkontakte/vkui";
import Icon56EventOutline from '@vkontakte/icons/dist/56/event_outline';
import {State} from "../state";
import {SET_VIEW} from "../state/actions";
import useLocalStorage from "../hooks/useLocalStorage";

const templates = [
	{
		id: 1,
		icon: (<Icon56EventOutline/>),
		header: 'Формирование привычки',
		buttonText: 'Далее',
		placeholderText: 'В психологии давно установлен факт, что 21 дня достаточно, чтобы привить новые привычки (избавиться от старых) и таким образом улучшить качество жизни',
	},
	{
		id: 2,
		icon: (<Icon56EventOutline/>),
		header: 'Поставьте цель и идите к ней',
		buttonText: 'Далее',
		placeholderText: 'Создайте в приложении цель (привычку, которую хотите изменить) и отмечайте ее успешное ежедневное выполнение',
	},
	{
		id: 3,
		icon: (<Icon56EventOutline/>),
		header: 'В формировании привычки важна регулярность',
		buttonText: 'Начать',
		placeholderText: 'В случае пропуска ежедневной отметки прогресс сбрасывается, но вы можете запустить счетчик сначала',
	},
]

const initialState = {
	placeholder: {
		id: 1,
		icon: (<Icon56EventOutline/>),
		header: 'Формирование привычки',
		buttonText: 'Далее',
		placeholderText: 'В психологии давно установлен факт, что 21 дня достаточно, чтобы привить новые привычки (избавиться от старых) и таким образом улучшить качество жизни',

	}
}
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_PLACEHOLDER':
			return {
				...state,
				placeholder: action.payload.placeholder
			}
		default:
			return state
	}
}
const Startup = ({id}) => {
	const [, setDone] = useLocalStorage('startup-done');
	const [{placeholder}, dispatchStartup] = useReducer(reducer, initialState);
	const [, dispatch] = useContext(State);
	return (
		<Panel id={id}>
			<PanelHeader>Введение</PanelHeader>
			<Placeholder
				icon={placeholder.icon}
				header={placeholder.header}
				action={
					[<Div key={'action'}>
						<Button onClick={
							() => {
								if (placeholder.id < 3) {
									dispatchStartup({
										type: 'SET_PLACEHOLDER', payload: {
											placeholder: templates[placeholder.id],
										}
									})
								} else {
									dispatch({type: SET_VIEW, payload: {view: 'home', panel: 'home'}});
									setDone('true');
								}
							}
						}
						>
							{placeholder.buttonText}
						</Button>
					</Div>,
					<Div key={'skip'}>
						{placeholder.id !== 3 && <Button
							mode={'tertiary'}
							onClick={() => {
								dispatch({type: SET_VIEW, payload: {view: 'home', panel: 'home'}});
								setDone('true');
							}}
						>
							Пропустить
						</Button>}
					</Div>
					]
				}
			>
				{placeholder.placeholderText}
			</Placeholder>
		</Panel>
	)
}

export default Startup;
