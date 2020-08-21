import React, {useContext, useEffect, useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import {State} from "./state";
import {Button, FormLayout, Input, ModalCard, ModalRoot, Panel, PopoutWrapper, Root, Slider} from "@vkontakte/vkui";
import Startup from "./panels/Startup";
import Preloader from "./panels/Preloader";
import {SET_HABITS, SET_MODAL, SET_SUCCESS_MESSAGE} from "./state/actions";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import useApi from "./hooks/useApi";
import HabitPage from "./panels/Habit";
import InfoSnackbar from "./components/InfoSnackbar";
import bridge from "@vkontakte/vk-bridge";

const App = () => {
	const [state, dispatch] = useContext(State);
	const [title, setTitle] = useState('');
	const [days, setDays] = useState(21);
	const [{response}, doApiFetch] = useApi('/habit');
	const [needFetch, setNeedFetch] = useState(true);
	const [habit, setHabit] = useState(null);

	bridge.subscribe(({detail: {type}}) => {
		if (type === 'VKWebAppShareResult' || type === 'VKWebAppShowWallPostBoxResult') {
			dispatch({type: SET_SUCCESS_MESSAGE, payload: {message: 'Запись опубликована'}});
		}
	});

	useEffect(() => {
		if (!needFetch) return;
		doApiFetch();
		setNeedFetch(false);
	}, [doApiFetch, needFetch]);

	useEffect(() => {
		if (!response) return;
		dispatch({type: SET_HABITS, payload: {habits: response}});
	}, [response, dispatch]);

	useEffect(() => {
		if (!state.habitId) return;
		setHabit(state.habits.find((item) => {
			return item._id === state.habitId
		}));
	}, [state.habitId, state.habits])

	const modalBack = () => {
		dispatch({type: SET_MODAL, payload: {modal: null}});
	}

	const modal = (
		<ModalRoot
			activeModal={state.activeModal}
			onClose={modalBack}
		>
			<ModalCard
				id={'add-habit'}
				onClose={modalBack}
				dynamicContentHeight
				header={'Создать цель'}
			>
				<FormLayout
					id={'habit-add-form'}
					onSubmit={(e) => {
						e.preventDefault();
						doApiFetch({
							method: 'POST',
							title: title,
							days: days
						});
						dispatch({type: SET_MODAL, payload: {modal: null}});
						setDays(21);
						setTitle('');
					}}
				>
					<Input
						required
						type={'text'}
						value={title}
						onChange={(e) => {
							if (e.currentTarget.value.length <= 20) {
								setTitle(e.currentTarget.value)
							}
						}}
						top={'Название цели'}
						bottom={`Введено: ${title.length} из 20`}
					/>
					<Slider min={1} max={21} step={1} value={days} top={`Кол-во дней: ${days}`} onChange={(d) => {
						setDays(d)
					}}/>
					<Button
						before={<Icon24Add/>}
						size={'xl'}
						style={{paddingBottom: 0}}
					>
						Создать цель
					</Button>
				</FormLayout>
			</ModalCard>
		</ModalRoot>
	)

	return (
		<InfoSnackbar>
			<PopoutWrapper alignY="center" alignX="center">
				<Root activeView={state.view} popout={state.popout} modal={modal}>
					<View activePanel={state.panel} id={'preloader'}>
						<Preloader id={'preloader'}/>
					</View>
					<View activePanel={state.panel} id={'startup'}>
						<Startup id={'startup'}/>
					</View>
					<View activePanel={state.panel} id={'habit-page'}>
						<Panel id={'habit-page'}>
							<HabitPage habit={habit} setHabit={setHabit}/>
						</Panel>
					</View>
					<View activePanel={state.panel} id={'home'}>
						<Home id='home' habits={state.habits}/>
					</View>
				</Root>
			</PopoutWrapper>
		</InfoSnackbar>
	);
}

export default App;

