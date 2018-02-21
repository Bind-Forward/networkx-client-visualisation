import mockData from './mockGraphData.json';
// import mockData from './mockGraphDataSmall.json'; // USed for CodeSandbox
import _ from 'lodash';

class MockGraphApi {
	static getGraph(articleId, dictionaryTypes) {
		return new Promise((resolve, reject) => {

			setTimeout(() => {
				// Assign without reference
				let newGraph = Object.assign({}, _.find(mockData, (graph) => {
					if (graph.articleId === articleId) {
						return graph;
					}
				}));

				if (_.isEmpty(newGraph)) {
					reject("Unable to find graph");
					return;
				}

				newGraph.nodes = newGraph.nodes.filter((node) => {
					return _.includes(dictionaryTypes, node.wordType);
				});

				newGraph.edges = newGraph.edges.filter((edge) => {
					// Check if edge's source and target exists in filtered nodes
					return _.some(newGraph.nodes, node => node.id === edge.source) &&
					_.some(newGraph.nodes, node => node.id === edge.target);
				});

				resolve(newGraph);

			}, 1000)
		});
	}
}

export default MockGraphApi;