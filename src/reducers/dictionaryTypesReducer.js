import * as constants from '../constants/appConstants';
import _ from 'lodash';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const dictionaryTypesReducer = (state = initialState.dictionaryTypes, action) => {	
	switch (action.type) {
		case types.ADD_DICTIONARY_TYPE:
			return [...state, action.dictionaryType];
		case types.REMOVE_DICTIONARY_TYPE:
			return state.filter(dictType => dictType !== action.dictionaryType);
			break;
	}
	return state;
}

export default dictionaryTypesReducer;
