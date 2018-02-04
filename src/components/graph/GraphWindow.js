import React from 'react';
import PropTypes from 'prop-types'
import { Sigma, RandomizeNodePositions } from 'react-sigma';
import { Panel } from 'react-bootstrap';
import _ from 'lodash';
import SigmaExtender from './SigmaExtender';


const GraphWindow = ({ graph, loading, settings, initialSize }) => {
	return (
		<div>
			<Panel>
				<Panel.Heading>
					<Panel.Title componentClass="h3">{graph.article.name}</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					{
						_.isEmpty(graph.nodes) || loading ?
							<div className="loader">Loading...</div> :
							<Sigma
								renderer="webgl"
								settings={settings}>
								<SigmaExtender graph={graph} />
								<RandomizeNodePositions />
							</Sigma>
					}
				</Panel.Body>
			</Panel>
		</div>
	);
}

GraphWindow.defaultProps = {
	initialSize: 15
}

GraphWindow.propTypes = {
	graph: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	settings: PropTypes.object,
	initialSize: PropTypes.number,
	style: PropTypes.object
}

export default GraphWindow;