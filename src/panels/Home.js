import React, {useContext, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {
	Button,
	Cell,
	CellButton,
	Div,
	FixedLayout,
	FormLayout,
	Group,
	Headline,
	List,
	PanelHeaderContent,
	PanelHeaderContext,
	Placeholder,
	Text
} from "@vkontakte/vkui";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon28ShareExternalOutline from '@vkontakte/icons/dist/28/share_external_outline';
import Icon56DiamondOutline from '@vkontakte/icons/dist/56/diamond_outline';
import {State} from "../state";
import {SET_MODAL} from "../state/actions";
import HabitList from "../components/HabitList";

import './style.css';

const Home = ({id, habits}) => {
	const [, dispatch] = useContext(State);
	const [contextOpened, setContextOpened] = useState(false);

	return (
		<Panel id={id}>
			<PanelHeader>
				<PanelHeaderContent
					aside={<Icon16Dropdown style={{transform: `rotate(${contextOpened ? '180deg' : '0'})`}}/>}
					onClick={() => {
						setContextOpened(!contextOpened)
					}}
				>
					Habit
				</PanelHeaderContent>
			</PanelHeader>
			<PanelHeaderContext opened={contextOpened} onClose={() => {
				setContextOpened(!contextOpened)
			}}>
				<List>
					<Div>
						<Headline weight={'semibold'}>О приложении</Headline>
						<Text>Habit - Ваш личный помошник в формировании привычек. Приложение помогает развить хорошие привычки и
							избавиться от плохих.</Text>
					</Div>
					<Cell
						before={<Icon28ShareExternalOutline/>}
						onClick={() => {
							bridge.send('VKWebAppShare', {'link': 'https://vk.com/app7564973'})
						}}
					>
						Поделиться приложением
					</Cell>
				</List>
			</PanelHeaderContext>
			{habits.length === 0
				?
				<Placeholder
					icon={<Icon56DiamondOutline/>}
					action={
						<Button
							size="l"
							mode="tertiary"
							onClick={() => {
								dispatch({type: SET_MODAL, payload: {modal: 'add-habit'}})
							}}
						>
							Создать первую цель
						</Button>
					}
					stretched
				>
					Формируйте свои привычки самостоятельно. Создайте первую цель и следуйте к ней
				</Placeholder>
				:
				<Group style={{paddingBottom: '60px'}}>
					<HabitList habits={habits}/>
				</Group>
			}
			<FixedLayout
				vertical={'bottom'}
				className={'fixed-button'}
			>
				<FormLayout>
					<CellButton
						onClick={() => {
							dispatch({type: SET_MODAL, payload: {modal: 'add-habit'}})
						}}
						before={<Icon24Add/>}
					>
						Создать цель
					</CellButton>
				</FormLayout>
			</FixedLayout>
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Home;
