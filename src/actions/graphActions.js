import * as types from './actionTypes';
import GraphApi from '../api/GraphApi';

function loadGraphSuccess(graph) {
	return {
		type: types.LOAD_GRAPH_SUCCESS,
		graph
	};
}

export function loadGraph(articleId, dictionaryTypes) {
	return dispatch => {
		GraphApi.getGraph(articleId, dictionaryTypes).then(graph => {
			return dispatch(loadGraphSuccess(graph));
		}).catch(error => {
			throw(error)
		});
	};	
}
