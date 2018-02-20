import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Panel, Tabs, Tab, Row, Col, Checkbox } from 'react-bootstrap';
import graphEvents from '../../constants/graphEvents';
import TabNodes from './TabNodes';
import TabEdges from './TabEdges';
import TabDetails from './TabDetails';

class GraphDetails extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTabKey: 1,
			shouldHoverTableTrigger: false,
			shouldClickTableTrigger: true,
		};
	}

	/* --- Lifecycle methods --- */
	shouldComponentUpdate = (nextProps, nextState) => {
		const {
			graph,
			loading
		} = this.props;

		if (!_.isEqual(graph, nextProps.graph) ||
			loading !== nextProps.loading ||
			!_.isEqual(this.state, nextState)) {
			return true;
		}
		return false;
	}

	/* --- Private methods --- */
	_handleTabNodesRowMouseOver = (htmlElement) => {
		if (htmlElement.dataset.clicked === '1') {
			return;
		}

		const id = htmlElement.cells[1].innerText;
		htmlElement.classList.toggle('node-row-hover');
		htmlElement.style.cssText = "background-color: #BFEFFF;";
		this.props.dispatchGraphEventOnNode(graphEvents.overNode, id);
	}

	_handleTabNodesMouseLeave = (htmlElement) => {
		if (htmlElement.dataset.clicked === '1') {
			return;
		}

		const id = htmlElement.cells[1].innerText;
		htmlElement.classList.toggle('node-row-hover');
		htmlElement.style.cssText = "";
		this.props.dispatchGraphEventOnNode(graphEvents.outNode, id);
	}

	/* --- Public methods --- */
	onTableRowMouseOver = (event) => {
		if (!this.state.shouldHoverTableTrigger) {
			return;
		}

		const el = event.currentTarget;

		switch (this.state.activeTabKey) {
			case 1:
				this._handleTabNodesRowMouseOver(el);
				break;
			default:
				break;
		}
	}

	onTableRowMouseLeave = (event) => {
		if (!this.state.shouldHoverTableTrigger) {
			return;
		}

		const el = event.currentTarget;

		switch (this.state.activeTabKey) {
			case 1:
				this._handleTabNodesMouseLeave(el);
				break;
			default:
				break;
		}
	}

	onTableRowClicked = (event) => {
		if (!this.state.shouldClickTableTrigger) {
			return;
		}

		const el = event.currentTarget;

		switch (this.state.activeTabKey) {
			case 1:
				const id = el.cells[1].innerText;
				el.dataset.clicked = el.dataset.clicked === '1' ? '0' : '1';

				this.props.dispatchGraphEventOnNode(graphEvents.clickNode, id);
				break;
			default:
				break;
		}
	}

	onShouldHoverTableChange = (event) => {
		const el = event.currentTarget;
		el.checked = true;
		this.setState(prevState => ({
			shouldHoverTableTrigger: !prevState.shouldHoverTableTrigger
		}));
	}

	onShouldClickTableChange = (event) => {
		this.setState(prevState => ({
			shouldClickTableTrigger: !prevState.shouldClickTableTrigger
		}));
	}

	onSelectedTab = (key) => {
		this.setState({
			activeTabKey: key
		});
	}

	render() {
		const {
			graph,
			loading,
			centralitySort
		} = this.props;

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
									checked={this.state.shouldHoverTableTrigger}
									onChange={this.onShouldHoverTableChange}
									inline>
									Show on mouse hover
								</Checkbox>
								<Checkbox
									value={1}
									checked={this.state.shouldClickTableTrigger}
									onChange={this.onShouldClickTableChange}
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
								activeKey={this.state.activeTabKey}
								onSelect={this.onSelectedTab}
								id="graph-details-tab">
								<Tab eventKey={1} title="Nodes">
									<TabNodes
										nodes={graph.nodes}
										centralitySort={centralitySort}
										onTableRowMouseOver={this.onTableRowMouseOver}
										onTableRowMouseLeave={this.onTableRowMouseLeave}
										onTableRowClicked={this.onTableRowClicked}
										shouldClickTableTrigger={this.state.shouldClickTableTrigger}
										handleTableChange={this.handleTableChange} />
								</Tab>
								<Tab eventKey={2} title="Edges">
									<TabEdges
										edges={graph.edges}
										onTableRowMouseOver={this.onTableRowMouseOver}
										onTableRowMouseLeave={this.onTableRowMouseLeave}
										onTableRowClicked={this.onTableRowClicked} />
								</Tab>
								<Tab eventKey={3} title="Keywords">

								</Tab>
								<Tab eventKey={4} title="Details">
									<TabDetails
										graph={graph} />
								</Tab>
							</Tabs>
					}
				</Panel.Body>
			</Panel>
		);
	}
}

GraphDetails.defaultProps = {
	loading: true
}

GraphDetails.propTypes = {
	graph: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	centralitySort: PropTypes.string.isRequired,
	dispatchGraphEventOnNode: PropTypes.func.isRequired
};

export default GraphDetails;
