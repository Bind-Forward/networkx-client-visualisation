import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import * as graphActions from '../../actions/graphActions';
import GraphWindow from './GraphWindow';
import TextWindow from './TextWindow';
import GraphMenu from './GraphMenu';
import graphSettings from '../../constants/graphSettings';
import * as utility from '../../utility';
import graphEvents from '../../constants/graphEvents';
import GraphDetails from './GraphDetails';

class GraphsPage extends React.Component {

	constructor(props, context) {
		super(props);

		this.state = {
			loading: false,
			selectedArticleId: -1,
			dispatchEventName: '',
			actionNode: '',
			isFullscreen: false,
			activeTabKey: 1,
			shouldHoverWordTrigger: true,
			shouldClickWordTrigger: true,
			shouldHoverTableTrigger: false,
			shouldClickTableTrigger: true,
		};
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			selectedArticleId: nextProps.selectedArticle.id
		});
	}

	onWordNodeMouseOver = (event) => {		
		const el = event.currentTarget;
		const wasClicked = !_.isEmpty(el.dataset.clicked);
		if (wasClicked || !this.state.shouldHoverWordTrigger)
			return;

		el.classList.toggle('word-hover');
		this.setState({
			dispatchEventName: graphEvents.overNode,
			actionNode: el.dataset.nominative
		});
	}

	onWordNodeMouseLeave = (event) => {
		const el = event.currentTarget;
		if (el.dataset.clicked === '1' || !this.state.shouldHoverWordTrigger) {
			return;
		}

		el.classList.toggle('word-hover');
		this.setState({
			dispatchEventName: graphEvents.outNode
		});
	}

	onWordNodeClick = (event) => {
		if (!this.state.shouldClickWordTrigger) {
			return;
		}

		const el = event.currentTarget;
		el.classList.toggle('word-click');
		el.dataset.clicked = el.dataset.clicked === '1' ? '0' : '1';

		this.setState(prevState => ({
			dispatchEventName: graphEvents.clickNode,
			actionNode: el.dataset.nominative
		}));
	}

	onShouldHoverWordChange = (event) => {
		this.setState(prevState => ({
			shouldHoverWordTrigger: !prevState.shouldHoverWordTrigger
		}));
	}

	onShouldClickWordChange = (event) => {
		this.setState(prevState => ({
			shouldClickWordTrigger: !prevState.shouldClickWordTrigger
		}));
	}

	onTableRowMouseOver = (event) => {
		if (!this.state.shouldHoverTableTrigger) {
			return;
		}

		const el = event.currentTarget;

		switch (this.state.activeTabKey) {
			case 1:
				const wasClicked = !_.isEmpty(el.dataset.clicked) || el.dataset.clicked === '1';
				if (wasClicked)
					return;
				const id = el.cells[1].innerText;
				el.classList.toggle('node-row-hover');
				el.style.cssText = "background-color: #BFEFFF;";
				this.setState({
					dispatchEventName: graphEvents.overNode,
					actionNode: id
				});
				break;
			default:
		}
	}

	onTableRowMouseLeave = (event) => {
		if (!this.state.shouldHoverTableTrigger) {
			return;
		}

		const el = event.currentTarget;

		switch (this.state.activeTabKey) {
			case 1:
				if (el.dataset.clicked === '1') {
					return;
				}
				el.classList.toggle('node-row-hover');
				el.style.cssText = "";
				this.setState({
					dispatchEventName: graphEvents.outNode
				});
				break;
			default:
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
				this.setState(prevState => ({
					dispatchEventName: graphEvents.clickNode,
					actionNode: id
				}));
				break;
			default:
		}
	}

	onShouldHoverTableChange = (event) => {	
		this.setState(prevState => ({
			shouldHoverTableTrigger: !prevState.shouldHoverTableTrigger
		}));
	}

	onShouldClickTableChange = (event) => {	
		this.setState(prevState => ({
			shouldClickTableTrigger: !prevState.shouldClickTableTrigger
		}));
	}

	onSelectedArticle = (event) => {
		this.setState({
			selectedArticleId: _.toNumber(event.currentTarget.value)
		});
	}

	onDictionaryTypeChange = (event) => {
		const el = event.currentTarget;

		if (_.includes(this.props.dictionaryTypes, el.value)) {
			this.props.actions.removeDictionaryType(el.value);
			el.checked = false;
		} else {
			this.props.actions.addDictionaryType(el.value);
			el.checked = true;
		}
	}

	onLayoutChange = (event) => {
		const el = event.currentTarget;
		el.checked = true;
		this.props.actions.setLayout(el.value);
	}

	onMenuAccept = (event) => {
		let errorMsgs = [];
		if (this.state.selectedArticleId < 0) {
			errorMsgs.push("Select article.")
		}

		if (!_.isEmpty(errorMsgs)) {
			utility.displayAlertMessages(errorMsgs);
			return;
		}

		this.setState({
			loading: true
		}, () => {
			this.props.actions.loadGraph(this.state.selectedArticleId, this.props.dictionaryTypes)
				.then(() => {
					this.setState({
						loading: false
					});
				}).catch(error => {
					utility.displayAlertMessage(error, 'Error');
				});
		});
	}

	onChangeGraphSize = (event) => {
		this.setState(prevState => ({
			isFullscreen: !prevState.isFullscreen
		}));
	}

	onSelectedTab = (key) => {
		this.setState({
			activeTabKey: key
		});
	}

	onCentralitySortChange = (event) => {
		const el = event.currentTarget;
		el.checked = true;
		this.props.actions.selectCentralitySort(el.value);
	}

	render = () => {
		const {
			graph,
			articles,
			selectedArticle,
			dictionaryTypes,
			layoutType,
			centralitySort
		} = this.props;

		return (
			<div>
				<Row>
					<Col xs={8} sm={8} md={10} lg={10}>
						<Col xs={12} sm={12} md={this.state.isFullscreen ? 12 : 6} lg={this.state.isFullscreen ? 12 : 6}>
							<Row>
								<GraphWindow
									graph={graph}
									loading={this.state.loading}
									settings={graphSettings}
									renderer={"canvas"}
									selectedArticle={selectedArticle}
									dispatchEventName={this.state.dispatchEventName}
									actionNode={this.state.actionNode}
									layoutType={layoutType}
									onChangeGraphSize={this.onChangeGraphSize}
									centralitySort={centralitySort} />
							</Row>
						</Col>
						<Col xs={12} sm={12} md={this.state.isFullscreen ? 12 : 6} lg={this.state.isFullscreen ? 12 : 6}>
							<Row style={{paddingLeft: '5px'}}>
								<GraphDetails
									graph={graph}
									loading={this.state.loading}
									activeTabKey={this.state.activeTabKey}
									onSelectedTab={this.onSelectedTab}
									onTableRowMouseOver={this.onTableRowMouseOver}
									onTableRowMouseLeave={this.onTableRowMouseLeave}
									onTableRowClicked={this.onTableRowClicked}
									centralitySort={centralitySort}
									shouldHoverTableTrigger={this.state.shouldHoverTableTrigger}
									onShouldHoverTableChange={this.onShouldHoverTableChange}
									shouldClickTableTrigger={this.state.shouldClickTableTrigger}								
									onShouldClickTableChange={this.onShouldClickTableChange} />
							</Row>
							<Row style={{paddingLeft: '5px'}}>
								<TextWindow
									article={selectedArticle}
									nodes={graph.nodes}
									loading={this.state.loading}
									onWordNodeMouseOver={this.onWordNodeMouseOver}
									onWordNodeMouseLeave={this.onWordNodeMouseLeave}
									onWordNodeClick={this.onWordNodeClick}
									shouldHoverWordTrigger={this.state.shouldHoverWordTrigger}
									onShouldHoverWordChange={this.onShouldHoverWordChange}
									shouldClickWordTrigger={this.state.shouldClickWordTrigger}								
									onShouldClickWordChange={this.onShouldClickWordChange} />
							</Row>
						</Col>
					</Col>
					<Col xs={4} sm={4} md={2} lg={2}>
						<Row>
							<GraphMenu
								articles={articles}
								selectedArticleId={selectedArticle.id}
								onSelectedArticle={this.onSelectedArticle}
								onMenuAccept={this.onMenuAccept}
								loading={this.state.loading}
								selectedDictionaryTypes={dictionaryTypes}
								onDictionaryTypeChange={this.onDictionaryTypeChange}
								layoutType={layoutType}
								onLayoutChange={this.onLayoutChange}
								centralitySort={centralitySort}
								onCentralitySortChange={this.onCentralitySortChange} />
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

GraphsPage.propTypes = {
	graph: PropTypes.object.isRequired,
	articles: PropTypes.array.isRequired,
	dictionaryTypes: PropTypes.array.isRequired,
	layoutType: PropTypes.string.isRequired
}

function get_selected_article(articles, graph) {
	if (graph && !_.isEmpty(articles)) {
		let selectedArticle = _.find(articles, { id: graph.articleId });
		if (selectedArticle) {
			return selectedArticle;
		}
	}

	return { id: -1, url: "", sentences: [], name: "" };
}

function mapStateToProps(state, ownProps) {
	let selectedArticle = get_selected_article(state.articles, state.graph);

	return {
		graph: state.graph,
		articles: state.articles,
		selectedArticle: selectedArticle,
		dictionaryTypes: state.dictionaryTypes,
		layoutType: state.layoutType,
		centralitySort: state.centralitySort
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(graphActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphsPage);