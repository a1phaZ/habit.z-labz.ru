import React, {useContext, useEffect, useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import {State} from "./state";
import {
	Button, Checkbox,
	FormLayout,
	Input,
	ModalCard,
	ModalRoot,
	Panel,
	PopoutWrapper,
	Root,
	Slider
} from "@vkontakte/vkui";
import Startup from "./panels/Startup";
import Preloader from "./panels/Preloader";
import {
	SET_ALLOW_NOTIFICATIONS,
	SET_DENY_NOTIFICATIONS,
	SET_HABITS,
	SET_HISTORY_BACK,
	SET_MODAL,
	SET_SUCCESS_MESSAGE
} from "./state/actions";
import Icon28AddSquareOutline from '@vkontakte/icons/dist/28/add_square_outline';
import Icon28ListCheckOutline from '@vkontakte/icons/dist/28/list_check_outline';
import useApi from "./hooks/useApi";
import HabitPage from "./panels/Habit";
import InfoSnackbar from "./components/InfoSnackbar";
import bridge from "@vkontakte/vk-bridge";

const getTime = () => {
	const date = new Date();
	const h = date.getHours();
	const m = date.getMinutes();
	let timeStr = h < 10 ? `0${h}:` : `${h}:`;
	timeStr += m < 10 ? `0${m}` : m;
	return timeStr;
}

const App = () => {
	const [state, dispatch] = useContext(State);
	const [title, setTitle] = useState('');
	const [days, setDays] = useState(21);
	const [needNotification, setNeedNotification] = useState(false);
	const [notificationTime, setNotificationTime] = useState(() => {
		return getTime();
	});
	const [apiStr, setApiStr] = useState('/habit');
	const [{response}, doApiFetch] = useApi(apiStr);
	const [needFetch, setNeedFetch] = useState(true);
	const [habit, setHabit] = useState(null);

	bridge.subscribe(({detail: {type}}) => {
		if (type === 'VKWebAppShareResult' || type === 'VKWebAppShowWallPostBoxResult') {
			dispatch({type: SET_SUCCESS_MESSAGE, payload: {message: 'Запись опубликована'}});
		}
		if (type === 'VKWebAppAllowNotificationsResult') {
			dispatch({type: SET_ALLOW_NOTIFICATIONS});
		}
		if (type === 'VKWebAppDenyNotificationsResult') {
			dispatch({type: SET_DENY_NOTIFICATIONS});
		}
	});

	useEffect(() => {
		if (!habit) {
			setTitle('');
			setDays(21);
			setNeedNotification(false);
			setNotificationTime(() => {
				return getTime();
			});
		} else {
			const time = getTime();
			setTitle(habit?.title);
			setDays(habit?.days);
			setNeedNotification(!!habit?.notification);
			setNotificationTime(habit?.notification || time);
		}

	}, [habit]);

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

	useEffect(() => {
		window.onpopstate = () => {
			if (state.view !== 'home' && state.panel !== 'home') {
				dispatch({type: SET_HISTORY_BACK});
			}
		}
	}, [dispatch, state.panel, state.view]);

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
						setApiStr(habit ? `/habit/${habit?._id}` : '/habit');
						doApiFetch({
							method: habit ? 'PATCH' : 'POST',
							title: title,
							days: days,
							time: needNotification ? notificationTime : null,
							timeZoneOffset: new Date().getTimezoneOffset()
						});
						dispatch({type: SET_MODAL, payload: {modal: null}});
						if (!habit) {
							setNeedNotification(false);
							setDays(21);
							setTitle('');
						}
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
					<Checkbox
						type={'checkbox'}
						checked={needNotification}
						onChange={(e) => {
							const {
								currentTarget: {
									checked
								}
							} = e;
							if (checked) {
								if (!state.allowNotifications){
									bridge.send('VKWebAppAllowNotifications');
								}
							}
							setNeedNotification(e.currentTarget.checked);
						}}
					>Включить оповещения</Checkbox>
					<Input
						type={'time'}
						value={notificationTime}
						disabled={!needNotification}
						onChange={(e) => {
							setNotificationTime(e.currentTarget.value);
						}}
					/>
					<Button
						before={habit ? <Icon28ListCheckOutline/> : <Icon28AddSquareOutline/>}
						size={'xl'}
						style={{paddingBottom: 0}}
					>
						{habit ? 'Обновить цель' : 'Создать цель'}
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

