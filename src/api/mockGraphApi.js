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
					// Filter edges where node id exists as source 
					let idx = _.findIndex(newGraph.nodes, (node) => {
						return node.id === edge.source
					});

					// Filter edges where node id exists as target if node exists in edge.source
					if (idx > -1) {
						idx = _.findIndex(newGraph.nodes, (node) => {
							return node.id === edge.target
						});
					}

					return idx > -1;
				})

				resolve(newGraph);

			}, 1000)
		});
	}
}

export default MockGraphApi;