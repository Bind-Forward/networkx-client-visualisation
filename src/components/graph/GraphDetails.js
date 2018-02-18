import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Panel, Tabs, Tab, Row, Col, Checkbox } from 'react-bootstrap';
import TabNodes from './TabNodes';
import TabEdges from './TabEdges';

class GraphDetails extends React.Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate = (nextProps, nextState) => {	
		const {
			graph,
			loading
		} = this.props;

		if (!_.isEqual(graph, nextProps.graph) || loading !== nextProps.loading) {
			return true;
		}
		return false;
	}	
	
	render() {
		debugger;
		let s = this.props.shouldHoverTableTrigger;
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
									checked={this.props.shouldHoverTableTrigger}
									onChange={this.props.onShouldHoverTableChange}
									inline>
									Show on mouse hover
								</Checkbox>
								<Checkbox
									value={1}
									checked={this.props.shouldClickTableTrigger}
									onChange={this.props.onShouldClickTableChange}
									inline>
									Show on mouse click
								</Checkbox>
							</Panel>
						</Col>
					</Row>

				</Panel.Heading>
				<Panel.Body style={{ maxHeight: '450px', overflowY: 'auto' }}>
					{
						_.isEmpty(this.props.graph) || this.props.loading ?
							<div className="loader"></div> :
							<Tabs
								activeKey={this.props.activeTabKey}
								onSelect={this.props.onSelectedTab}
								id="graph-details-tab">
								<Tab eventKey={1} title="Nodes">
									<TabNodes
										nodes={this.props.graph.nodes}
										onTableRowMouseOver={this.props.onTableRowMouseOver}
										onTableRowMouseLeave={this.props.onTableRowMouseLeave}
										onTableRowClicked={this.props.onTableRowClicked}
										centralitySort={this.props.centralitySort}
										shouldClickTableTrigger={this.props.shouldClickTableTrigger} />
								</Tab>
								<Tab eventKey={2} title="Edges">
									<TabEdges
										edges={this.props.graph.edges}
										onTableRowMouseOver={this.props.onTableRowMouseOver}
										onTableRowMouseLeave={this.props.onTableRowMouseLeave}
										onTableRowClicked={this.props.onTableRowClicked} />
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
