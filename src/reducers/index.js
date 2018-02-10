import { combineReducers } from 'redux';
import graph from './graphReducer';
import articles from './articleReducer';
import dictionaryTypes from './dictionaryTypesReducer';
import layoutType from './layoutTypeReducer';

const rootReducer = combineReducers({
	graph,
	articles,
	dictionaryTypes,
	layoutType
});

export default rootReducer;