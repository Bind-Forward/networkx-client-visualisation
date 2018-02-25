import mockData from './mockData/mockGraphData.json';
import _ from 'lodash';
import axios from 'axios';
import * as urls from '../constants/urls';

class MockGraphApi {

	static headers = {
		"Accept": "application/json"
	};

	static getGraph(articleId, dictionaryTypes, fetchFromUri = true) {
		return new Promise((resolve, reject) => {
			if (fetchFromUri) {
				resolve(MockGraphApi.getGraphFromUri(articleId, dictionaryTypes));
			} else {
				resolve(MockGraphApi.getGraphFromLocalResource(articleId, dictionaryTypes));
			}
		});		
	}

	static getGraphFromUri(articleId, dictionaryTypes) {
		return axios.get(urls.MOCK_GRAPHS_URL, { headers: MockGraphApi.headers })
			.then(response => {
				let graph = MockGraphApi.getGraphFromArray(response.data, articleId);

				if (_.isEmpty(graph)) {
					throw Object("Unable to find graph");
				}

				return MockGraphApi.setupGraph(graph, dictionaryTypes);
			}).catch(error => {
				throw error;
			});
	}

	static getGraphFromLocalResource(articleId, dictionaryTypes) {
		return new Promise((resolve, reject) => {

			setTimeout(() => {
				// Assign without reference
				let newGraph = MockGraphApi.getGraphFromArray(mockData.data, articleId);

				if (_.isEmpty(newGraph)) {
					reject("Unable to find graph");
				}

				resolve(MockGraphApi.setupGraph(newGraph, dictionaryTypes));
			}, 1000)
		});		
	}

	static getGraphFromArray(graphs, articleId) {
		return Object.assign({}, _.find(graphs, (graph) => {
			if (graph.articleId === articleId) {
				return graph;
			}
		}));
	}

	static setupGraph(graph, dictionaryTypes) {
		graph.nodes = graph.nodes.filter((node) => {
			return _.includes(dictionaryTypes, node.wordType);
		});

		graph.edges = graph.edges.filter((edge) => {
			// Check if edge's source and target exists in filtered nodes
			return _.some(graph.nodes, node => node.id === edge.source) &&
				_.some(graph.nodes, node => node.id === edge.target);
		});

		return graph;
	}
}

export default MockGraphApi;