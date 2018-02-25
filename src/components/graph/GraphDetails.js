import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Panel, Tabs, Tab, Row, Col, Checkbox } from 'react-bootstrap';
import graphEvents from '../../constants/graphEvents';
import TabNodes from './TabNodes';
import TabEdges from './TabEdges';
import TabDetails from './TabDetails';
import TabKeywords from './TabKeywords';

class GraphDetails extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTabKey: 1,
			shouldHoverTrigger: false,
			shouldClickTrigger: true,
			hoverTriggerCheckboxEnabled: true,
			clickTriggerCheckboxEnabled: true,
		};
	}

	/* --- Lifecycle methods --- */
	shouldComponentUpdate = (nextProps, nextState) => {
		const {
			graph,
			loading,
			keywords
		} = this.props;

		if (!_.isEqual(graph, nextProps.graph) ||
			loading !== nextProps.loading ||
			!_.isEqual(this.state, nextState) ||
			!_.isEqual(keywords, nextProps.keywords)) {
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
		if (!this.state.shouldHoverTrigger) {
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
		if (!this.state.shouldHoverTrigger) {
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
		if (!this.state.shouldClickTrigger) {
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
			shouldHoverTrigger: !prevState.shouldHoverTrigger
		}));
	}

	onShouldClickTableChange = (event) => {
		this.setState(prevState => ({
			shouldClickTrigger: !prevState.shouldClickTrigger
		}));
	}

	onSelectedTab = (key) => {
		let hoverCheckboxEnabled = this.state.hoverTriggerCheckboxEnabled;
		let clickCheckboxEnabled = this.state.clickTriggerCheckboxEnabled;

		switch (key) {
			case 1:
				hoverCheckboxEnabled = true;
				clickCheckboxEnabled = true;
				break;
			case 2:
				hoverCheckboxEnabled = false;
				clickCheckboxEnabled = false;
				break;
			case 3:
				hoverCheckboxEnabled = false;
				clickCheckboxEnabled = true;
				break;
			case 4:
				hoverCheckboxEnabled = false;
				clickCheckboxEnabled = false;
				break;
			default:
				return;
		}

		this.setState({
			activeTabKey: key,
			hoverTriggerCheckboxEnabled: hoverCheckboxEnabled,
			clickTriggerCheckboxEnabled: clickCheckboxEnabled
		});
	}

	onSelectedKeyword = (event) => {
		if (!this.state.shouldClickTrigger) {
			return;
		}

		const el = event.currentTarget;
		el.classList.toggle('active');
		const nodeId = el.innerText;

		this.props.dispatchGraphEventOnNode(graphEvents.clickNode, nodeId);
	}

	render() {
		const {
			graph,
			loading,
			centrality,
			keywords
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
									checked={this.state.shouldHoverTrigger}
									onChange={this.onShouldHoverTableChange}
									disabled={!this.state.hoverTriggerCheckboxEnabled}
									inline>
									Show on mouse hover
								</Checkbox>
								<Checkbox
									value={1}
									checked={this.state.shouldClickTrigger}
									onChange={this.onShouldClickTableChange}
									disabled={!this.state.clickTriggerCheckboxEnabled}
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
										centrality={centrality}
										onTableRowMouseOver={this.onTableRowMouseOver}
										onTableRowMouseLeave={this.onTableRowMouseLeave}
										onTableRowClicked={this.onTableRowClicked}
										shouldClickTrigger={this.state.shouldClickTrigger}
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
									<TabKeywords
										keywords={keywords}
										onSelectedKeyword={this.onSelectedKeyword} />
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
	centrality: PropTypes.string.isRequired,
	dispatchGraphEventOnNode: PropTypes.func.isRequired,
	keywords: PropTypes.array,
	onSelectedKeyword: PropTypes.func
};

export default GraphDetails;
