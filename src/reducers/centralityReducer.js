import initialState from './initialState';
import * as types from '../actions/actionTypes';

const centralityReducer = (state = initialState.defaultCentrality, action) => {
	switch (action.type) {
		case types.SELECT_CENTRALITY_SORT:
			return action.centrality
		default:
			break;
	}

	return state;
}


export default centralityReducer;