import toastr from 'toastr';
import _ from 'lodash';
import * as constants from './constants/appConstants';
import graphSettings from './constants/graphSettings';

const toastrOptions = {
	closeButton: true,
	closeMethod: 'fadeOut',
	closeDuration: 300,
	closeEasing: 'swing',
	progressBar: true,
	timeOut: 5,
	extendedTimeOut: 10
};

export function displayAlertMessages(messages = [], header = "Error", type = 3) {
	messages.map(msg => {
		return displayAlertMessage(msg, header, type)
	})
}

export function displayAlertMessage(message, header, type = 3) {
	toastr.options = toastrOptions;
	switch (type) {
		case 1:
			toastr.success(message, header);
			break;
		case 2:
			toastr.warning(message, header);
			break;
		default:
			toastr.error(message, header);
	}
}

export function setNodeStyle(sigmaNode, color, size) {
	sigmaNode.color = color;
	sigmaNode.size = size;
}

export function setStyleToAdjacentEdges(graph, sourceNode, edgeColor, adjacentNodeColor, sizeCallback) {
	let adjacentEdges = _.filter(graph.edges(), edge => edge.source === sourceNode.id);
	if (!_.isEmpty(adjacentEdges)) {
		adjacentEdges.map(edge => {
			edge.color = edgeColor;
			edge.size = sizeCallback(edge.size);
			let targetNode = _.find(graph.nodes(), { id: edge.target });
			if (targetNode) {
				// targetNode.color = adjacentNodeColor;
				targetNode.size = sizeCallback(targetNode.size);
			}
			return edge;
		});
	}
}

export function setNodesByCentralitySort(nodes, centralitySort, highlightCentralityNodesNum) {
	let centrality;

	switch (centralitySort) {
		case constants.CENTRALITY.DegreeCentrality:
			centrality = 'degreeCentrality';
			break;
		case constants.CENTRALITY.BetweennessCentrality:
			centrality = 'betweennessCentrality';
			break;
		case constants.CENTRALITY.Pagerank:
			centrality = 'pagerank';
			break;
		default:
			alert('Unknown centrality sort type.')
			return;
	}

	return _.sortBy(nodes, [centrality])
		.reverse()
		.map((node, idx) => {

			if (idx < highlightCentralityNodesNum) {
				node.color = node.isClicked ? graphSettings.nodeClickColor : graphSettings.highlightCentralityNodeColor;
				node.defaultColor = graphSettings.highlightCentralityNodeColor; // Use it to mark that it is default color to set after hover or click event
			} else {
				node.color = node.isClicked ? graphSettings.nodeClickColor : graphSettings.defaultNodeColor;
				node.defaultColor = graphSettings.defaultNodeColor;
			}

			node.size = node[centrality] * 20;

			return node;
		});
}

export function setEdgesByWeight(edges, sizeCallback) {
	return edges.map(edge => {
		edge.size = sizeCallback(edge.weight);
		return edge;
	})
}

export function getWordType(typeCode) {
	let type = undefined;
	Object.keys(constants.DICTIONARY_TYPE).forEach((key, idx) => {
		if (constants.DICTIONARY_TYPE[key] === typeCode) {
			type = key;
			return;	
		}
	});

	return type;
}