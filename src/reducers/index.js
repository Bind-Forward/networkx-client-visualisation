import { combineReducers } from 'redux';
import graph from './graphReducer';
import articles from './articleReducer';
import dictionaryTypes from './dictionaryTypesReducer';

const rootReducer = combineReducers({
	graph,
	articles,
	dictionaryTypes
});

export default rootReducer;