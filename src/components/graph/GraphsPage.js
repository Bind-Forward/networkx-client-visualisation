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
			activeTabKey: 1
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
		if (wasClicked)
			return;

		el.classList.toggle('word-hover');
		this.setState({
			dispatchEventName: graphEvents.overNode,
			actionNode: el.dataset.nominative
		});
	}

	onWordNodeMouseLeave = (event) => {
		const el = event.currentTarget;
		if (el.dataset.clicked === '1') {
			return false;
		}
			
		el.classList.toggle('word-hover');
		this.setState({
			dispatchEventName: graphEvents.outNode
		});
	}

	onWordNodeClick = (event) => {
		const el = event.currentTarget;
		el.classList.toggle('word-click');
		el.dataset.clicked = el.dataset.clicked === '1' ? '0' : '1';
		
		this.setState(prevState => ({
			dispatchEventName: graphEvents.clickNode,
			actionNode: el.dataset.nominative
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

		if (_.isEmpty(this.props.dictionaryTypes)) {
			errorMsgs.push("Select word type.")
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

	render = () => {
		const {
			graph,
			articles,
			selectedArticle,
			dictionaryTypes,
			layoutType
		} = this.props;
		
		return (
			<div>
				<Row>
					<Col xs={12} md={this.state.isFullscreen ? 12 : 8} lg={this.state.isFullscreen ? 12 : 8}>
						<GraphWindow
							graph={graph}
							loading={this.state.loading}
							settings={graphSettings}
							renderer={"canvas"}
							selectedArticle={selectedArticle}
							dispatchEventName={this.state.dispatchEventName}
							actionNode={this.state.actionNode}
							layoutType={layoutType}
							isFullscreen={this.state.isFullscreen}
							onChangeGraphSize={this.onChangeGraphSize} />
					</Col>
					<Col xs={12} md={this.state.isFullscreen ? 12 : 4} lg={this.state.isFullscreen ? 12 : 4}>
						<GraphMenu
							articles={articles}
							selectedArticleId={selectedArticle.id}
							onSelectedArticle={this.onSelectedArticle}
							onMenuAccept={this.onMenuAccept}
							loading={this.state.loading}
							selectedDictionaryTypes={dictionaryTypes}
							onDictionaryTypeChange={this.onDictionaryTypeChange}
							layoutType={layoutType}							
							onLayoutChange={this.onLayoutChange} />
							
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={12} lg={6}>
						<TextWindow
							article={selectedArticle}
							nodes={graph.nodes}
							loading={this.state.loading}
							onWordNodeMouseOver={this.onWordNodeMouseOver}
							onWordNodeMouseLeave={this.onWordNodeMouseLeave}
							onWordNodeClick={this.onWordNodeClick} />
					</Col>
					<Col xs={12} md={12} lg={6}>
						<GraphDetails 
							graph={graph}
							loading={this.state.loading}
							activeTabKey={this.state.activeTabKey}
							onSelectedTab={this.onSelectedTab} />
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
		layoutType: state.layoutType
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(graphActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphsPage);