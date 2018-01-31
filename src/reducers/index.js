import { combineReducers } from 'redux';
import graphReducer from './graphReducer';

const rootReducer = combineReducers(
	graphReducer
);

export default rootReducer;