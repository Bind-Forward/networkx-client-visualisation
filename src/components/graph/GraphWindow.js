import React from 'react';
import PropTypes from 'prop-types'
import { Sigma, RandomizeNodePositions, EdgeShapes, NodeShapes, NOverlap, ForceAtlas2 } from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink';
import Dagre from 'react-sigma/lib/Dagre';
import { Panel, Button, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import SigmaExtender from './SigmaExtender';
import * as constants from '../../constants/appConstants';
import graphSettings from '../../constants/graphSettings';

class GraphWindow extends React.Component {

	/* --- Private methods --- */
	_getGraphLayout(layoutType, settings) {
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
			default:
				alert("Undefined type");
		}
	}

	/* --- Public methods --- */
	render() {
		const {
			graph,
			loading,
			selectedArticle,
			dispatchEventName,
			actionNode,
			layoutType,
			onChangeGraphSize,
			centralitySort,
			highlightCentralityNodesNum
		} = this.props;

		let title = (_.isEmpty(graph.nodes) || loading || !selectedArticle) ? "Graph" : selectedArticle.name;

		return (
			<Panel bsStyle={"primary"}>
				<Panel.Heading>
					<Row>
						<Col lg={6}>
							<Panel.Title componentClass="h3">{title}</Panel.Title>
						</Col>
						<Col lg={6}>
							<Button bsStyle={"default"} className="pull-right"
								onClick={onChangeGraphSize}>
								<i className="glyphicon glyphicon-fullscreen"></i>
							</Button>
						</Col>
					</Row>
				</Panel.Heading>
				<Panel.Body>
					{
						_.isEmpty(graph.nodes) || loading ?
							<div className="loader">Loading...</div> :
							<Sigma style={{ graphWidth: 'inherit', height: '750px' }}
								renderer={graphSettings.renderer}
								settings={graphSettings}>
								<SigmaExtender graph={graph}
									dispatchEventName={dispatchEventName}
									actionNode={actionNode}
									centralitySort={centralitySort}
									highlightCentralityNodesNum={highlightCentralityNodesNum} />
								<EdgeShapes default={graphSettings.edgeShapes} />
								<NodeShapes default={graphSettings.nodeShapes} />
								{this._getGraphLayout(layoutType, graphSettings)}
							</Sigma>
					}
				</Panel.Body>
			</Panel>
		);
	}
}

GraphWindow.propTypes = {
	graph: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	selectedArticle: PropTypes.object,
	dispatchEventName: PropTypes.string,
	actionNode: PropTypes.string,
	layoutType: PropTypes.string,
	onChangeGraphSize: PropTypes.func,
	centralitySort: PropTypes.string
}

export default GraphWindow;