import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import graphEvents from '../../constants/graphEvents';
import graphSettings from '../../constants/graphSettings';

const SigmaExtender = ({ graph, sigma, dispatchEventName, hoveredWordNode }) => {
	if (!(_.isEmpty(graph) && _.isEmpty(graph.nodes))) {
		// Remove nodes and edges
		sigma.graph.clear();
		sigma.refresh();

		sigma.graph.read({ nodes: graph.nodes, edges: graph.edges });

		dispatchEvent(sigma, dispatchEventName, hoveredWordNode);
		sigma.refresh({ skipIndexation: true });
	}

	return <div></div>;
}

function dispatchEvent(sigma, event, nodeId) {
	let node = _.find(sigma.graph.nodes(), { id: nodeId });
	let renderer = sigma.renderers[0];
	if (!_.isEmpty(node)) {
		renderer.dispatchEvent(event, { node: node });
		doAfterDispatchedAfterEvent(sigma.graph, event, node);
	}
}

function doAfterDispatchedAfterEvent(graph, event, sigmaNode) {
	switch (event) {
		case graphEvents.overNode:
			setNodeStyle(sigmaNode, graphSettings.nodeHoverColor, sigmaNode.size * 2);
			setStyleToAdjacentEdges(graph, sigmaNode, graphSettings.edgeHoverColor, graphSettings.adjacentNodeHoverColor, (size) => size * 2);			
			break;
		case graphEvents.outNode:
			setNodeStyle(sigmaNode, graphSettings.defaultNodeColor, sigmaNode.size / 2);
			setStyleToAdjacentEdges(graph, sigmaNode, graphSettings.defaultEdgeColor, graphSettings.defaultNodeColor, (size) => size / 2);		
			break;
		default:
			return;
	}
}

function setNodeStyle(sigmaNode, color, size) {
	sigmaNode.color = color;
	sigmaNode.size = size;
}

function setStyleToAdjacentEdges(graph, sourceNode, edgeColor, adjacentNodeColor, sizeCallback) {
	let adjacentEdges = _.filter(graph.edges(), edge => edge.source === sourceNode.id);
	if (!_.isEmpty(adjacentEdges)) {
		adjacentEdges.map(edge => {
			edge.color = edgeColor;
			edge.size = sizeCallback(edge.size);
			let targetNode = _.find(graph.nodes(), { id: edge.target });
			if (targetNode) {
				targetNode.color = adjacentNodeColor;
				targetNode.size = sizeCallback(targetNode.size);
			}
		});
	}	
}

SigmaExtender.propTypes = {
	graph: PropTypes.object.isRequired,
	sigma: PropTypes.object,
	dispatchEventName: PropTypes.string,
	hoveredWordNode: PropTypes.string
};

export default SigmaExtender;
