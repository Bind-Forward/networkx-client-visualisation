import * as types from './actionTypes';
// import graphApi from '../api/graphApi'; // Uncomment to fetch data from web
import graphApi from '../api/mockGraphApi'; // Comment to fetch data from web

function loadGraphSuccess(graph) {	
	return {
		type: types.LOAD_GRAPH_SUCCESS,
		graph
	};
}

export function loadGraph(articleId, dictionaryTypes) {
	return (dispatch, getState) => {
		return graphApi.getGraph(articleId, dictionaryTypes).then(graph => {
			dispatch(loadGraphSuccess(graph));
		}).catch(error => {
			throw(error);
		});
	};
}

export function addDictionaryType(dictionaryType) {
	return {
		type: types.ADD_DICTIONARY_TYPE,
		dictionaryType
	}
}

export function removeDictionaryType(dictionaryType) {
	return {
		type: types.REMOVE_DICTIONARY_TYPE,
		dictionaryType
	}
}

export function setLayout(layoutType) {
	return {
		type: types.SET_LAYOUT,
		layoutType
	}
}
