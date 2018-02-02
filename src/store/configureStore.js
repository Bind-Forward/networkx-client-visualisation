import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialStore) {
	/* eslint-disable no-underscore-dangle */
	return createStore (
		rootReducer,
		initialStore,
		applyMiddleware(thunk, reduxImmutableStateInvariant())
	);
	/* eslint-enable */
}
