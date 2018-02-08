import * as types from './actionTypes';
import GraphApi from '../api/GraphApi';

function loadGraphSuccess(graph) {	
	return {
		type: types.LOAD_GRAPH_SUCCESS,
		graph
	};
}

export function loadGraph(articleId, dictionaryTypes) {
	return (dispatch, getState) => {
		return GraphApi.getGraph(articleId, dictionaryTypes).then(graph => {
			dispatch(loadGraphSuccess(graph));
		}).catch(error => {
			throw(error);
		});
	};
}

