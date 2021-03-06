import {
	SET_VIEW,
	SET_PANEL,
	SET_MODAL,
	SET_HABITS,
	SET_ERROR,
	SET_HISTORY_BACK,
	SET_HABIT_ID, SET_CHANGE_HABIT, SET_POPOUT, SET_SUCCESS_MESSAGE, SET_ALLOW_NOTIFICATIONS, SET_DENY_NOTIFICATIONS
} from "./actions";
import queryString from "query-string";
import React, {createContext, useReducer} from 'react';

const initialState = {
	view: 'preloader',
	panel: 'preloader',
	history: [],
	activeModal: null,
	habits: [],
	error: null,
	successMessage: null,
	popout: null,
	allowNotifications: queryString.parse(window.location.search).vk_are_notifications_enabled === '1'
}

const reducer = (state, action) => {
	switch (action.type) {
		case SET_VIEW:
			window.history.pushState({view: state.view, panel: state.panel}, `${state.view}.${state.panel}`, window.location.search);
			return {
				...state,
				view: action.payload.view,
				panel: action.payload.panel,
				history: [...state.history, {view: action.payload.view, panel: action.payload.panel}]
			}
		case SET_PANEL:
			window.history.pushState({view: state.view, panel: state.panel}, `${state.view}.${state.panel}`, window.location.search);
			return {
				...state,
				panel: action.payload.panel,
				history: [...state.history, {view: state.view, panel: action.payload.panel}]
			}
		case SET_HISTORY_BACK:
			const backElement = state.history[state.history.length-2];
			if (!backElement) {
				return {
					...state,
					view: 'home',
					panel: 'home',
					history: [{view: 'home', panel: 'home'}]
				}
			}
			const newHistory = state.history;
			newHistory.pop();
			return {
				...state,
				history: [...newHistory],
				view: backElement.view,
				panel: backElement.panel
			}
		case SET_MODAL:
			return {
				...state,
				activeModal: action.payload.modal
			}
		case SET_HABITS:
			return {
				...state,
				habits: action.payload.habits
			}
		case SET_HABIT_ID:
			return {
				...state,
				habitId: action.payload.habitId
			}
		case SET_CHANGE_HABIT:
			const habits = state.habits;
			const index = habits.findIndex(item => {
				return item._id === action.payload.habit?._id
			});
			habits[index] = action.payload.habit;
			return {
				...state,
				habits: [...habits]
			}
		case SET_SUCCESS_MESSAGE:
			return {
				...state,
				successMessage: action.payload.message
			}
		case SET_ERROR:
			return {
				...state,
				error: action.payload.error
			}
		case SET_POPOUT:
			return {
				...state,
				popout: action.payload.popout
			}
		case SET_ALLOW_NOTIFICATIONS:
			return {
				...state,
				allowNotifications: true
			}
		case SET_DENY_NOTIFICATIONS:
			return {
				...state,
				allowNotifications: false
			}
		default:
			return state;
	}
}

export const State = createContext();

export const StateProvider = ({children}) => {
	const value = useReducer(reducer, initialState);
	return (
		<State.Provider value={value}>
			{children}
		</State.Provider>
	)
}