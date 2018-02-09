import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import graphEvents from '../../constants/graphEvents';
import graphSettings from '../../constants/graphSettings';
import * as utility from '../../utility';

const SigmaExtender = ({ graph, sigma, dispatchEventName, actionNode }) => {
	if (!(_.isEmpty(graph) && _.isEmpty(graph.nodes))) {
		// Remove nodes and edges
		sigma.graph.clear();
		sigma.refresh();

		sigma.graph.read({ nodes: graph.nodes, edges: graph.edges });

		dispatchEvent(sigma, dispatchEventName, actionNode);
		sigma.refresh({ skipIndexation: true });
	}

	return <div></div>;
}

function dispatchEvent(sigma, event, nodeId) {
	let node = _.find(sigma.graph.nodes(), { id: nodeId });
	let renderer = sigma.renderers[0];
	if (!_.isEmpty(node)) {
		renderer.dispatchEvent(event, { node: node });
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
			utility.setNodeStyle(sigmaNode, graphSettings.defaultNodeColor, sigmaNode.size);
			utility.setStyleToAdjacentEdges(sigma.graph, sigmaNode, graphSettings.defaultEdgeColor, graphSettings.defaultNodeColor, (size) => size);
			break;
		case graphEvents.clickNode:
			if (sigmaNode.isClicked) {
				
				utility.setNodeStyle(sigmaNode, graphSettings.nodeHoverColor, sigmaNode.size);
				utility.setStyleToAdjacentEdges(sigma.graph, sigmaNode, graphSettings.edgeHoverColor, graphSettings.adjacentNodeHoverColor, (size) => size);
			} else {
				utility.setNodeStyle(sigmaNode, graphSettings.nodeClickColor, sigmaNode.size);
				utility.setStyleToAdjacentEdges(sigma.graph, sigmaNode, graphSettings.edgeClickColor, graphSettings.nodeClickColor, (size) => size);			
				sigma.cameras[0].goTo({x: sigmaNode["read_cam0:x"], y: sigmaNode["read_cam0:y"], ratio: graphSettings.zoomRatio});					
			}
			debugger;
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
	actionNode: PropTypes.string
};

export default SigmaExtender;
