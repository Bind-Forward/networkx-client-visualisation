import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Panel, Tabs, Tab } from 'react-bootstrap';
import TabNodes from './TabNodes';

const GraphDetails = ({ graph, loading, activeTabKey, onSelectedTab, onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked, centralitySort }) => {

	return (
		<Panel bsStyle="info">
			<Panel.Heading>
				<Panel.Title componentClass="h3">Graph Details</Panel.Title>
			</Panel.Heading>
			<Panel.Body>
				{
					_.isEmpty(graph) || loading ?
						<div className="loader"></div> :
						<Tabs
							activeKey={activeTabKey}
							onSelect={onSelectedTab}
							id="graph-details-tab">
							<Tab eventKey={1} title="Nodes">
								<TabNodes
									nodes={graph.nodes}
									onTableRowMouseOver={onTableRowMouseOver}
									onTableRowMouseLeave={onTableRowMouseLeave}
									onTableRowClicked={onTableRowClicked}
									centralitySort={centralitySort} />
							</Tab>
							<Tab eventKey={2} title="Edges">

							</Tab>
							<Tab eventKey={3} title="Keywords">

							</Tab>
							<Tab eventKey={4} title="Details">

							</Tab>
						</Tabs>
				}
			</Panel.Body>
		</Panel>
	);
}

GraphDetails.defaultProps = {
	loading: true,
	activeTabKey: 1
}

GraphDetails.propTypes = {
	graph: PropTypes.object,
	loading: PropTypes.bool,
	activeTabKey: PropTypes.number,
	onSelectedTab: PropTypes.func,
	onTableRowMouseOver: PropTypes.func,
	onTableRowMouseLeave: PropTypes.func,
	onTableRowClicked: PropTypes.func,
	centralitySort: PropTypes.string
};

export default GraphDetails;
