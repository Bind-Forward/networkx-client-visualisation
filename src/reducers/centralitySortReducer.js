import initialState from './initialState';
import * as types from '../actions/actionTypes';

const centralitySortReducer = (state = initialState.defaultCentralitySort, action) => {
	switch (action.type) {
		case types.SELECT_CENTRALITY_SORT:
			return action.centrality
		default:
			break;
	}

	return state;
}


export default centralitySortReducer;