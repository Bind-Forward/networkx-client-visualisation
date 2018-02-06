import React from 'react';
import PropTypes from 'prop-types'
import { Sigma, RandomizeNodePositions } from 'react-sigma';
import { Panel } from 'react-bootstrap';
import _ from 'lodash';
import SigmaExtender from './SigmaExtender';


const GraphWindow = ({ graph, loading, settings, renderer, selectedArticle }) => {
	let title = (_.isEmpty(graph.nodes) || loading || !selectedArticle) ? "Graph" : selectedArticle.name;

	return (
		<Panel bsStyle={"primary"}>
			<Panel.Heading>
				<Panel.Title componentClass="h3">{title}</Panel.Title>
			</Panel.Heading>
			<Panel.Body>
				{
					_.isEmpty(graph.nodes) || loading ?
						<div className="loader">Loading...</div> :
						<Sigma
							renderer={renderer}
							settings={settings}>
							<SigmaExtender graph={graph} />
							<RandomizeNodePositions />
						</Sigma>
				}
			</Panel.Body>
		</Panel>
	);
}

GraphWindow.defaultProps = {
	renderer: "webgl"
}

GraphWindow.propTypes = {
	graph: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,	
	settings: PropTypes.object,
	renderer: PropTypes.string,
	selectedArticle: PropTypes.object
}

export default GraphWindow;