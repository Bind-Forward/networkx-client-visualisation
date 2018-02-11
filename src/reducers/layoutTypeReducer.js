import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';

const layoutTypeReducer = (state = initialState.layoutType, action) => {
	switch (action.type) {
		case types.SET_LAYOUT:
			return action.layoutType;
		default:
	}
	return state;
}

export default layoutTypeReducer;