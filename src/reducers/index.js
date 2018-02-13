import { combineReducers } from 'redux';
import graph from './graphReducer';
import articles from './articleReducer';
import dictionaryTypes from './dictionaryTypesReducer';
import layoutType from './layoutTypeReducer';
import centralitySort from './centralitySortReducer';

const rootReducer = combineReducers({
	graph,
	articles,
	dictionaryTypes,
	layoutType,
	centralitySort
});

export default rootReducer;