import * as constants from '../constants/appConstants';
import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';

const layoutTypeReducer = (state = initialState.layoutType, action) => {
	switch (action.type) {
		case types.SET_LAYOUT:
			return action.layoutType;
	}
	return state;
}

export default layoutTypeReducer;