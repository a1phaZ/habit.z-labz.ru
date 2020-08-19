import React, {useState, useContext, useEffect} from 'react';
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
import {SET_HABITS, SET_MODAL} from "./state/actions";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import useApi from "./hooks/useApi";
import HabitPage from "./panels/Habit";
import InfoSnackbar from "./components/InfoSnackbar";

const osName = platform();

const App = () => {
	const [state, dispatch] = useContext(State);
	const [title, setTitle] = useState('');
	const [days, setDays] = useState(21);
	const [{response, error}, doApiFetch] = useApi('/habit');
	const [needFetch, setNeedFetch] = useState(true);
	const [habit, setHabit] = useState(null);

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
		if (!error) return;
		console.log(error);
	}, [error]);

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
							setTitle(e.currentTarget.value)
						}}
						top={'Название цели'}
					/>
					<Slider min={1} max={21} step={1} value={days} top={`Кол-во дней: ${days}`} onChange={(d) => {
						setDays(d)
					}}/>
					<CellButton
						before={<Icon24Add/>}
					>
						Создать цель
					</CellButton>
				</FormLayout>
			</ModalPage>
		</ModalRoot>
	)

	return (
		<InfoSnackbar>
			<Root activeView={state.view}>
				<View activePanel={state.panel} id={'preloader'}>
					<Preloader id={'preloader'}/>
				</View>
				<View activePanel={state.panel} id={'startup'}>
					<Startup id={'startup'}/>
				</View>
				<View activePanel={state.panel} id={'home'} modal={modal}>
					<Home id='home' habits={state.habits}/>
				</View>
				<View activePanel={state.panel} id={'habit-page'}>
					<HabitPage id={'habit-page'} habit={habit} setHabit={setHabit}/>
				</View>
			</Root>
		</InfoSnackbar>
	);
}

export default App;

