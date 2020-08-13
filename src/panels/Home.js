import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {CellButton, FixedLayout, FormLayout, Group} from "@vkontakte/vkui";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import {State} from "../state";
import {SET_MODAL} from "../state/actions";
import HabitList from "../components/HabitList";
import useApi from "../hooks/useApi";

const Home = ({ id, habits }) => {
	const [{response, error}, doApiFetch] = useApi();
	const [, dispatch] = useContext(State);
	const [needFetch, setNeedFetch] = useState(true);

	useEffect(() => {
		if (!needFetch) return;
		doApiFetch();
		setNeedFetch(false);
	}, [doApiFetch, needFetch]);

	console.log({response, error});
	return (
		<Panel id={id}>
			<PanelHeader>Example</PanelHeader>
			<Group>
				<HabitList habits={habits} />
			</Group>
			<FixedLayout
				vertical={'bottom'}
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
