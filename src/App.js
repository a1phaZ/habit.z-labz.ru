import React, {useState, useContext, useReducer} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import {State} from "./state";
import {
	IOS,
	ModalPage,
	ModalPageHeader,
	ModalRoot,
	PanelHeaderButton,
	Root,
	platform,
	FormLayout, Input, Slider, CellButton
} from "@vkontakte/vkui";
import Startup from "./panels/Startup";
import Preloader from "./panels/Preloader";
import {SET_MODAL} from "./state/actions";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Add from '@vkontakte/icons/dist/24/add';

const osName = platform();
const SET_HABITS = 'SET_HABITS';

const initialState = {
	habits: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case SET_HABITS:
			return {
				...state,
				habits: [...state.habits, action.payload.habit]
			}
		default:
			return state;
	}
}

const App = () => {
	const [state, dispatch] = useContext(State);
	const [appState, dispatchApp] = useReducer(reducer, initialState);
	const [title, setTitle] = useState('');
	const [days, setDays] = useState(21);

	const modalBack = () => {
		dispatch({type: SET_MODAL, payload: {modal: null}});
	}

	const modal = (
		<ModalRoot
			activeModal={state.activeModal}
			onClose={modalBack}
		>
			<ModalPage
				id={'add-habit'}
				onClose={modalBack}
				header={
					<ModalPageHeader
						left={osName !== IOS && <PanelHeaderButton onClick={modalBack}><Icon24Cancel/></PanelHeaderButton>}
						right={osName === IOS &&
						<PanelHeaderButton onClick={modalBack}>{osName === IOS ? 'Готово' : <Icon24Dismiss/>}</PanelHeaderButton>}
					>
						Создать цель
					</ModalPageHeader>
				}
			>
				<FormLayout
					onSubmit={(e) => {
						e.preventDefault();
						dispatchApp({
							type: SET_HABITS, payload: {
								habit: {
									title: title,
									days: days,
									lastModified: new Date(),
									daysComplete: 0,
									status: 'active' // active || done
								}
							}
						})
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
							setTitle(e.currentTarget.value)
						}}
						top={'Название цели'}
					/>
					<Slider min={1} max={21} step={1} value={days} top={`Кол-во дней: ${days}`} onChange={(d) => {
						setDays(d)
					}}/>
					<CellButton
						onClick={() => {
							// dispatch({type: SET_MODAL, payload: {modal: 'add-habit'}})
						}}
						before={<Icon24Add/>}
					>
						Создать цель
					</CellButton>
				</FormLayout>
			</ModalPage>
		</ModalRoot>
	)

	return (
		<Root activeView={state.view}>
			<View activePanel={state.panel} id={'preloader'}>
				<Preloader id={'preloader'}/>
			</View>
			<View activePanel={state.panel} id={'startup'}>
				<Startup id={'startup'}/>
			</View>
			<View activePanel={state.panel} id={'home'} modal={modal}>
				<Home id='home' habits={appState.habits}/>
			</View>
		</Root>
	);
}

export default App;

