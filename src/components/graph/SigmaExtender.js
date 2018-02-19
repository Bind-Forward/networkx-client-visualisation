import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import graphEvents from '../../constants/graphEvents';
import graphSettings from '../../constants/graphSettings';
import * as utility from '../../utility';

const SigmaExtender = ({ graph, sigma, dispatchEventName, actionNode, centralitySort, highlightCentralityNodesNum }) => {
	if (!(_.isEmpty(graph) && _.isEmpty(graph.nodes))) {
		// Remove nodes and edges
		sigma.graph.clear();

		// Read graph nodes and edges
		sigma.graph.read({ 
			nodes: utility.setNodesByCentralitySort(graph.nodes, centralitySort, highlightCentralityNodesNum),
			edges: utility.setEdgesByWeight(graph.edges, (weight) => weight * 0.8)
		});
		
		dispatchNodeEvent(sigma, dispatchEventName, actionNode);
		sigma.refresh({ skipIndexation: true });
	}

	return <div></div>;
}

function dispatchNodeEvent(sigma, event, nodeId) {
	let node = _.find(sigma.graph.nodes(), { id: nodeId });	
	if (!_.isEmpty(node)) {
		// let renderer = sigma.renderers[0];
		// renderer.dispatchEvent(event, { node: node });		
		doAfterDispatchedAfterEvent(sigma, event, node);
	}	
}

function doAfterDispatchedAfterEvent(sigma, event, sigmaNode) {
	switch (event) {
		case graphEvents.overNode:		
			utility.setNodeStyle(sigmaNode, graphSettings.nodeHoverColor, sigmaNode.size);
			utility.setStyleToAdjacentEdges(sigma.graph, sigmaNode, graphSettings.edgeHoverColor, graphSettings.adjacentNodeHoverColor, (size) => size);
			sigma.cameras[0].goTo({x: sigmaNode["read_cam0:x"], y: sigmaNode["read_cam0:y"], ratio: 1});
			break;
		case graphEvents.outNode:		
			utility.setNodeStyle(sigmaNode, sigmaNode.defaultColor || graphSettings.defaultNodeColor, sigmaNode.size);
			utility.setStyleToAdjacentEdges(sigma.graph, sigmaNode, graphSettings.defaultEdgeColor, graphSettings.defaultNodeColor, (size) => size);
			break;
		case graphEvents.clickNode:
			if (sigmaNode.isClicked) {				
				utility.setNodeStyle(sigmaNode, sigmaNode.defaultColor || graphSettings.defaultNodeColor, sigmaNode.size);
				utility.setStyleToAdjacentEdges(sigma.graph, sigmaNode, graphSettings.defaultEdgeColor, sigmaNode.defaultColor || graphSettings.defaultNodeColor, (size) => size);
			} else {
				utility.setNodeStyle(sigmaNode, graphSettings.nodeClickColor, sigmaNode.size);
				utility.setStyleToAdjacentEdges(sigma.graph, sigmaNode, graphSettings.edgeClickColor, graphSettings.nodeClickColor, (size) => size);			
				sigma.cameras[0].goTo({x: sigmaNode["read_cam0:x"], y: sigmaNode["read_cam0:y"], ratio: graphSettings.zoomRatio});					
			}
			sigmaNode.isClicked = !sigmaNode.isClicked;
			break;
		default:
			return;
	}
}

SigmaExtender.propTypes = {
	graph: PropTypes.object.isRequired,
	sigma: PropTypes.object,
	dispatchEventName: PropTypes.string,
	actionNode: PropTypes.string,
	centralitySort: PropTypes.string.isRequired,
	highlightCentralityNodesNum: PropTypes.number.isRequired
};

export default SigmaExtender;
