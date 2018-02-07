import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SigmaExtender = ({ graph, sigma, dispatchEventName, hoveredWordNode }) => {	
	if (!(_.isEmpty(graph) && _.isEmpty(graph.nodes))) {		
		// Remove nodes and edges
		sigma.graph.clear();
		sigma.refresh();
		// Remove assigned methods
		// sigma.graph.kill();
				
		sigma.graph.read({nodes: graph.nodes, edges: graph.edges});

		dispatchEvent(sigma, dispatchEventName, hoveredWordNode);
		sigma.refresh({skipIndexation: true});
	}

	return <div></div>;
}

function dispatchEvent(sigma, event, nodeId) {
	let node = _.find(sigma.graph.nodes(), {id: nodeId});
	let renderer = sigma.renderers[0];
	if (!_.isEmpty(node)) {		
		renderer.dispatchEvent(event, {node: node})
	}
}

SigmaExtender.propTypes = {	
	graph: PropTypes.object.isRequired,
	sigma: PropTypes.object,
	dispatchEventName: PropTypes.string,
	hoveredWordNode: PropTypes.string
};

export default SigmaExtender;
