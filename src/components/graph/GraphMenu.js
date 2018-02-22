import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Row, Col, FormGroup, Checkbox, ControlLabel, Radio, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from '../common/Dropdown';
import * as constants from '../../constants/appConstants';
import * as utility from '../../utility';

class GraphMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedArticleId: -1
		};
	}

	/* --- Lifecycle methods --- */
	componentWillReceiveProps = (nextProps) => {
		if (!_.isEmpty(nextProps.selectedArticle)) {
			this.setState({
				selectedArticleId: nextProps.selectedArticle.id
			});
		}
	}
	
	/* --- Public methods --- */
	onSelectedArticle = (event) => {
		this.setState({
			selectedArticleId: _.toNumber(event.currentTarget.value)
		});
	}

	onNodeShapesChanged = (event) => {
		const el = event.currentTarget;
		this.props.updateGraphSettings("nodeShapes", el.value);
	}

	onEdgeShapesChanged = (event) => {
		const el = event.currentTarget;
		this.props.updateGraphSettings("edgeShapes", el.value);
	}

	onSubmit = (event) => {
		let errorMsgs = [];
		if (this.state.selectedArticleId < 0) {
			errorMsgs.push("Select article.")
		}

		if (this.props.selectedDictionaryTypes.length === 0) {
			errorMsgs.push("Select any dictionary type.")
		}

		if (!_.isEmpty(errorMsgs)) {
			utility.displayAlertMessages(errorMsgs);
			return;
		}

		this.props.changeGraphData(this.state.selectedArticleId);
	}

	render() {

		const {
			articles,
			loading,
			selectedDictionaryTypes,
			onDictionaryTypeChange,
			layoutType,
			onLayoutChange,
			centrality,
			onCentralityChange,
			highlightCentralityNodesNum,
			onHighlightCentralityNodesNumChange,
			nodeShapes,
			edgeShapes
		} = this.props;

		return (
			<Panel bsStyle={"danger"}>
				<Panel.Heading>
					<Panel.Title componentClass="h3">Graph Menu</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					{
						_.isEmpty(articles) || loading ?
							<div className="loader">Loading...</div> :
							<div>
								<Row>
									<Button bsStyle={"default"}
										onClick={this.onSubmit}
										style={{ width: '100%' }}>
										Submit
									</Button>
								</Row>
								<hr />
								<Row style={{ maxHeight: '700px', overflowY: 'auto' }}>
									<Col xs={12} sm={12} md={12} lg={12}>
										<FormGroup>
											<Dropdown
												items={articles}
												labelText={"Articles"}
												onSelectedItemChange={this.onSelectedArticle}
												selectedItemId={this.state.selectedArticleId}
												emptyFieldText={"Select article"} />
										</FormGroup>
										<FormGroup>
											<ControlLabel>Select Graph Layout</ControlLabel>
											<Panel style={{ maxHeight: '150px', overflow: 'auto' }}>
												<Panel.Body>
													{
														Object.keys(constants.LAYOUT_TYPE).map(key => {
															let value = constants.LAYOUT_TYPE[key];
															const checked = layoutType === value;
															return (
																<Radio key={key}
																	value={value}
																	name="layoutType"
																	checked={checked}
																	onChange={onLayoutChange}
																	id={value}>
																	{value}
																</Radio>
															);
														})
													}
												</Panel.Body>
											</Panel>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Select Word Types</ControlLabel>
											<Panel style={{ maxHeight: '225px', overflow: 'auto' }}>
												<Panel.Body>
													{
														Object.keys(constants.DICTIONARY_TYPE).map(key => {
															const value = constants.DICTIONARY_TYPE[key];
															let checked = _.indexOf(selectedDictionaryTypes, value) > -1;
															return (
																<Checkbox key={key}
																	value={value}
																	checked={checked}
																	onChange={onDictionaryTypeChange}
																	id={value}>
																	{key} ({value})
																</Checkbox>
															);
														})
													}
												</Panel.Body>
											</Panel>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Centrality</ControlLabel>
											<Panel>
												<Panel.Body>
													<ControlLabel>Number of highlighted nodes</ControlLabel>
													<FormControl
														type="number"
														min="0"
														value={highlightCentralityNodesNum}
														placeholder="Enter number"
														onChange={onHighlightCentralityNodesNumChange}
													/>
													<hr />
													<ControlLabel>Select Centrality</ControlLabel>
													{
														Object.keys(constants.CENTRALITY).map(key => {
															const value = constants.CENTRALITY[key];
															const checked = centrality === value;
															return (
																<Radio key={key}
																	value={value}
																	name="centrality"
																	checked={checked}
																	onChange={onCentralityChange}
																	id={value}>
																	{key}
																</Radio>
															);
														})
													}
												</Panel.Body>
											</Panel>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Select Nodes Shape</ControlLabel>
											<Panel style={{ maxHeight: '150px', overflow: 'auto' }}>
												<Panel.Body>
													{
														Object.keys(constants.NODE_SHAPE).map(key => {
															let value = constants.NODE_SHAPE[key];
															const checked = nodeShapes === value;
															return (
																<Radio key={key}
																	value={value}
																	name="nodeShapes"
																	checked={checked}
																	onChange={this.onNodeShapesChanged}
																	id={value}>
																	{key}
																</Radio>
															);
														})
													}
												</Panel.Body>
											</Panel>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Select Edges Shape</ControlLabel>
											<Panel style={{ maxHeight: '150px', overflow: 'auto' }}>
												<Panel.Body>
													{
														Object.keys(constants.EDGE_SHAPE).map(key => {
															let value = constants.EDGE_SHAPE[key];
															const checked = edgeShapes === value;
															return (
																<Radio key={key}
																	value={value}
																	name="edgeShapes"
																	checked={checked}
																	onChange={this.onEdgeShapesChanged}
																	id={value}>
																	{key}
																</Radio>
															);
														})
													}
												</Panel.Body>
											</Panel>
										</FormGroup>
									</Col>
								</Row>
							</div>
					}
				</Panel.Body>
			</Panel>
		);
	}
}

GraphMenu.propTypes = {
	changeGraphData: PropTypes.func.isRequired,
	updateGraphSettings: PropTypes.func.isRequired,
	articles: PropTypes.array.isRequired,	
	loading: PropTypes.bool.isRequired,
	selectedArticle: PropTypes.object,
	selectedDictionaryTypes: PropTypes.array,
	onDictionaryTypeChange: PropTypes.func,
	layoutType: PropTypes.string,
	onLayoutChange: PropTypes.func,
	centrality: PropTypes.string,
	onCentralityChange: PropTypes.func,
	highlightCentralityNodesNum: PropTypes.number,
	onHighlightCentralityNodesNumChange: PropTypes.func,
	nodeShapes: PropTypes.string,	
	edgeShapes: PropTypes.string,	
};

export default GraphMenu;
