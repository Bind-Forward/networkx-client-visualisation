import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SigmaExtender = ({ graph, sigma }) => {	
	if (!(_.isEmpty(graph) && _.isEmpty(graph.nodes))) {		
		// Remove nodes and edges
		sigma.graph.clear();
		sigma.refresh();
		// Remove assigned methods
		// sigma.graph.kill();

		sigma.graph.read({nodes: graph.nodes, edges: graph.edges});
		sigma.refresh();
	}

	return <div></div>;
}

export default SigmaExtender;
