import React, { useState, useEffect, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import {State} from "./state";
import {SET_PANEL} from "./state/actions";
import {Root} from "@vkontakte/vkui";
import Startup from "./panels/Startup";
import Preloader from "./panels/Preloader";

const App = () => {
	const [state, dispatch] = useContext(State);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		// setActivePanel(e.currentTarget.dataset.to);
		dispatch({type: SET_PANEL, payload: {panel: e.currentTarget.dataset.to}});
	};

	return (
		<Root activeView={state.view}>
			<View activePanel={state.panel} id={'preloader'}>
				<Preloader id={'preloader'} />
			</View>
			<View activePanel={state.panel} id={'startup'}>
				<Startup id={'startup'}/>
			</View>
			<View activePanel={state.panel} popout={popout} id={'home'}>
				<Home id='home' fetchedUser={fetchedUser} go={go} />
				<Persik id='persik' go={go} />
			</View>
		</Root>
	);
}

export default App;

