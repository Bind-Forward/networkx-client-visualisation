import mockData from './mockGraphData.json';
import _ from 'lodash';

class GraphApi {
	static headers = {
		"Accept": "application/json"
	};

	static getGraph(articleId, dictionaryTypes) {
		return new Promise((resolve, reject) => {

			setTimeout(() => {

				let newGraph = _.find(mockData, (graph) => {
					if (graph.articleId === articleId) {
						return Object.assign({}, graph);
					}
				});

				if (_.isEmpty(newGraph)) {
					reject("Unable to find graph");
				}

				const newNodes = newGraph.nodes.filter((node) => {
					return _.includes(dictionaryTypes, node.wordType);
				});
				
				let newEdges = newGraph.edges.filter((edge) => { // Filter edges where node id exists as source 
					let idx = _.findIndex(newNodes, (node) => {
						return node.id === edge.source
					});
					return (idx > -1);
				}).filter((edge) => {
					let idx = _.findIndex(newNodes, (node) => { // Filter edges where node id exists as target 
						return node.id === edge.target
					});
					return (idx > -1);
				});

				resolve({ nodes: newNodes, edges: newEdges, articleId: newGraph.articleId, name: newGraph.articleId });

			}, 1000)
		});
	}
}

export default GraphApi;