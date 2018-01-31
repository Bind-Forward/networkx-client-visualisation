import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function graphReducer(state = initialState.graph, action) {
	switch (action.type) {
		case types.LOAD_GRAPH_SUCCESS:
			return action.graph;
		default:
			return state;
	}
}