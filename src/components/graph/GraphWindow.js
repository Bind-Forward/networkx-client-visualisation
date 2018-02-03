import React from 'react';
import PropTypes from 'prop-types'
import { Sigma, RelativeSize, RandomizeNodePositions } from 'react-sigma';
import _ from 'lodash';

const GraphWindow = ({graph, settings, initialSize}) => {
	return (
		<div>
				{
						_.isEmpty(graph) ?
							<div className="loader">Loading...</div> :
							<Sigma 
								graph={graph}
								renderer="webgl" 
								settings={settings}>
							<RandomizeNodePositions />
						</Sigma>
				}
		</div>
	);
}

GraphWindow.defaultProps = {
	initialSize: 15
}

GraphWindow.propTypes = {
	graph: PropTypes.object.isRequired,
	settings: PropTypes.object,
	initialSize: PropTypes.number,
	style: PropTypes.object
}

export default GraphWindow;