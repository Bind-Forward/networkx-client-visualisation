import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Panel, Tabs, Tab, Row, Col, Checkbox } from 'react-bootstrap';
import TabNodes from './TabNodes';
import TabEdges from './TabEdges';

const GraphDetails = ({ graph, loading, activeTabKey, onSelectedTab, onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked, centralitySort,
	shouldHoverTableTrigger, onShouldHoverTableChange, shouldClickTableTrigger, onShouldClickTableChange }) => {

	return (
		<Panel bsStyle="info">
			<Panel.Heading>
				<Row>
					<Col xs={6} sm={6} md={6} lg={6}>
						<Panel.Title componentClass="h3">Graph Details</Panel.Title>
					</Col>
					<Col xs={6} sm={6} md={6} lg={6}>
						<Panel style={{ color: '#000' }}>
							<Checkbox
								value={1}
								checked={shouldHoverTableTrigger}
								onChange={onShouldHoverTableChange}
								inline>
								Show on mouse hover
							</Checkbox>
							<Checkbox
								value={1}
								checked={shouldClickTableTrigger}
								onChange={onShouldClickTableChange}
								inline>
								Show on mouse click
							</Checkbox>
						</Panel>
					</Col>
				</Row>

			</Panel.Heading>
			<Panel.Body style={{ maxHeight: '450px', overflowY: 'auto' }}>
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
									centralitySort={centralitySort}
									shouldClickTableTrigger={shouldClickTableTrigger} />
							</Tab>
							<Tab eventKey={2} title="Edges">
								<TabEdges
									edges={graph.edges}
									onTableRowMouseOver={onTableRowMouseOver}
									onTableRowMouseLeave={onTableRowMouseLeave}
									onTableRowClicked={onTableRowClicked} />
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
	centralitySort: PropTypes.string,
	shouldHoverTableTrigger: PropTypes.bool.isRequired,
	onShouldHoverTableChange: PropTypes.func.isRequired,
	shouldClickTableTrigger: PropTypes.bool.isRequired,
	onShouldClickTableChange: PropTypes.func.isRequired
};

export default GraphDetails;
