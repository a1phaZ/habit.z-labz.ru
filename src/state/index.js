import {SET_VIEW, SET_PANEL, SET_MODAL} from "./actions";
import React, {createContext, useReducer} from 'react';

const initialState = {
	view: 'preloader',
	panel: 'preloader',
	activeModal: null
}

const reducer = (state, action) => {
	switch (action.type) {
		case SET_VIEW:
			return {
				...state,
				view: action.payload.view,
				panel: action.payload.panel
			}
		case SET_PANEL:
			return {
				...state,
				panel: action.payload.panel
			}
		case SET_MODAL:
			return {
				...state,
				activeModal: action.payload.modal
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