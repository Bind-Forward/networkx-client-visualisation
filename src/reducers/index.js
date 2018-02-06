import { combineReducers } from 'redux';
import graph from './graphReducer';
import articles from './articleReducer';

const rootReducer = combineReducers({
	graph,
	articles
});

export default rootReducer;