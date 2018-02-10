import React from 'react';
import PropTypes from 'prop-types'
import { Sigma, RandomizeNodePositions, EdgeShapes, NodeShapes, NOverlap, ForceAtlas2 } from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink';
import Dagre from 'react-sigma/lib/Dagre';
import { Panel } from 'react-bootstrap';
import _ from 'lodash';
import SigmaExtender from './SigmaExtender';
import * as constants from '../../constants/appConstants';

const GraphWindow = ({ graph, loading, settings, renderer, selectedArticle, dispatchEventName, actionNode, layoutType }) => {
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
							<SigmaExtender graph={graph}
								dispatchEventName={dispatchEventName}
								actionNode={actionNode} />
							<EdgeShapes default={settings.edgeShapes} />
							<NodeShapes default={settings.nodeShapes} />
							{ getGraphLayout(layoutType, settings) }
						</Sigma>
				}
			</Panel.Body>
		</Panel>
	);
}

function getGraphLayout(layoutType, settings) {
	switch (layoutType) {
		case constants.LAYOUT_TYPE.Random:
			return <RandomizeNodePositions />;
		case constants.LAYOUT_TYPE.ForceAtlas2:
			return <ForceAtlas2 />;
		case constants.LAYOUT_TYPE.ForceLink:
			return <ForceLink background easing="cubicInOut" />;
		case constants.LAYOUT_TYPE.Dagre:
			return <Dagre />
		case constants.LAYOUT_TYPE.NOverlap:
			return <NOverlap
				gridSize={settings.gridSize}
				maxIterations={settings.maxIterations}
				nodeMargin={settings.nodeMargin} />;
	}
}

GraphWindow.defaultProps = {
	renderer: "webgl"
}

GraphWindow.propTypes = {
	graph: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	settings: PropTypes.object,
	renderer: PropTypes.string,
	selectedArticle: PropTypes.object,
	dispatchEventName: PropTypes.string,
	actionNode: PropTypes.string,
	layoutType: PropTypes.string
}

export default GraphWindow;