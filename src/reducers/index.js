import { combineReducers } from 'redux';
import graph from './graphReducer';
import articles from './articleReducer';
import dictionaryTypes from './dictionaryTypesReducer';
import layoutType from './layoutTypeReducer';
import centrality from './centralityReducer';

const rootReducer = combineReducers({
	graph,
	articles,
	dictionaryTypes,
	layoutType,
	centrality
});

export default rootReducer;